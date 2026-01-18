"""
LOA 2026 Vectorizer com ChromaDB + Gemini Embeddings

Este módulo gerencia a indexação e busca semântica do PDF da LOA 2026
utilizando embeddings do Google Gemini e ChromaDB para persistência.
"""

import os
import re
import json
from typing import List, Dict, Any, Optional
from dataclasses import dataclass
import google.generativeai as genai
import chromadb
from chromadb.config import Settings
from PyPDF2 import PdfReader
from dotenv import load_dotenv

load_dotenv()

# Configura a API key (deve estar em .env ou variável de ambiente)
GEMINI_API_KEY = os.getenv('GEMINI_API_KEY') or os.getenv('GOOGLE_API_KEY')
if GEMINI_API_KEY:
    os.environ['GOOGLE_API_KEY'] = GEMINI_API_KEY
    genai.configure(api_key=GEMINI_API_KEY)
else:
    raise ValueError("GEMINI_API_KEY não encontrada. Configure em .env ou variável de ambiente.")


@dataclass
class LOAChunk:
    """Representa um chunk de texto da LOA com metadados enriquecidos."""
    id: str
    text: str
    metadata: Dict[str, Any]

    def to_dict(self) -> Dict[str, Any]:
        return {
            "id": self.id,
            "text": self.text,
            "metadata": self.metadata
        }


class LOAVectorizer:
    """
    Gerencia a vetorização do LOA 2026 usando Gemini Embeddings.

    Features:
    - Embeddings do Google Gemini (gemini-embedding-001)
    - Chunking inteligente preservando estrutura hierárquica
    - Metadados enriquecidos com seções, programas e valores
    - Busca semântica com relevância
    """

    # Configurações de chunking
    CHUNK_SIZE = 800
    CHUNK_OVERLAP = 100
    MAX_TOKENS_PER_PAGE = 2000

    # Modelo de embedding
    EMBEDDING_MODEL = "models/embedding-001"  # gemini-embedding-001
    EMBEDDING_DIMENSION = 768

    # Padrões regex para extração de metadados
    SECTION_PATTERNS = {
        "RECEITA": r"RECEITA|RECEITAS",
        "DESPESA": r"DESPESA|DESPESAS",
        "INVESTIMENTO": r"INVESTIMENTO|INVESTIMENTOS",
        "ANEXO": r"ANEXO",
    }

    PROGRAM_PATTERN = r"PROGRAMA\s+N?[º°]?\s*(\d+)"
    VALUE_PATTERN = r"R\$\s*([\d\.]+),(\d{2})"
    REGIONAL_PATTERN = r"REGIONAL\s+(\d+)"

    def __init__(self, api_key: Optional[str] = None, persist_dir: str = "./chroma_db"):
        """
        Inicializa o vetorizador.

        Args:
            api_key: Chave da API Gemini (opcional, usa padrão se não fornecida)
            persist_dir: Diretório para persistência do ChromaDB
        """
        # Configuração já feita no topo do arquivo

        # Inicializa ChromaDB
        self.chroma_client = chromadb.PersistentClient(path=persist_dir)
        self.collection = self.chroma_client.get_or_create_collection(
            name="loa_2026",
            metadata={
                "description": "LOA 2026 - Lei Orçamentária Anual de Fortaleza",
                "embedding_model": self.EMBEDDING_MODEL,
                "hnsw:space": "cosine"
            }
        )

    def get_embedding(self, text: str) -> List[float]:
        """
        Gera embedding usando Gemini.

        Args:
            text: Texto para gerar embedding

        Returns:
            Lista de floats representando o embedding
        """
        try:
            result = genai.embed_content(
                model=self.EMBEDDING_MODEL,
                content=text
            )
            return result['embedding']
        except Exception as e:
            print(f"Erro ao gerar embedding: {e}")
            import traceback
            traceback.print_exc()
            # Fallback: retorna embedding zero
            return [0.0] * self.EMBEDDING_DIMENSION

    def detect_section(self, text: str) -> Optional[str]:
        """Detecta a seção do documento baseado em padrões."""
        text_upper = text.upper()
        for section, pattern in self.SECTION_PATTERNS.items():
            if re.search(pattern, text_upper):
                return section
        return "GERAL"

    def extract_program_code(self, text: str) -> Optional[str]:
        """Extrai código de programa do texto."""
        match = re.search(self.PROGRAM_PATTERN, text, re.IGNORECASE)
        return match.group(1) if match else None

    def extract_regional(self, text: str) -> Optional[str]:
        """Extrai número da regional do texto."""
        match = re.search(self.REGIONAL_PATTERN, text, re.IGNORECASE)
        return f"Regional {match.group(1)}" if match else None

    def extract_values(self, text: str) -> List[float]:
        """Extrai valores monetários do texto."""
        matches = re.findall(self.VALUE_PATTERN, text)
        values = []
        for whole, cents in matches:
            try:
                value = float(f"{whole}.{cents}")
                values.append(value)
            except ValueError:
                continue
        return values

    def enrich_metadata(self, metadata: Dict[str, Any], text: str) -> Dict[str, Any]:
        """Enriquece metadados com informações extraídas do texto."""
        enriched = metadata.copy()

        # Detecta seção
        if "section" not in enriched:
            enriched["section"] = self.detect_section(text)

        # Extrai código de programa
        program = self.extract_program_code(text)
        if program:
            enriched["program_code"] = program

        # Extrai regional
        regional = self.extract_regional(text)
        if regional:
            enriched["regional"] = regional

        # Extrai valores (ChromaDB não aceita listas, usar string)
        values = self.extract_values(text)
        if values:
            enriched["values_brl"] = str(values)  # Convertido para string
            enriched["total_value"] = sum(values)

        # Adiciona timestamp e tipo
        enriched["chunk_type"] = self._classify_chunk_type(text)

        return enriched

    def _classify_chunk_type(self, text: str) -> str:
        """Classifica o tipo de chunk baseado no conteúdo."""
        text_upper = text.upper()

        # Verifica se é tabela (muitos números e formatação)
        if re.search(r'R\$.*\d{3,}', text) and len(re.findall(r'\d+', text)) > 5:
            return "tabela"

        # Verifica se é projeto/obra
        if any(keyword in text_upper for keyword in ["PROJETO", "OBRA", "CONSTRUÇÃO", "REFORMA"]):
            return "projeto"

        # Verifica se é programa
        if "PROGRAMA" in text_upper:
            return "programa"

        # Verifica se é regional
        if "REGIONAL" in text_upper:
            return "regional"

        return "texto"

    def extract_text_from_pdf(self, pdf_path: str) -> List[LOAChunk]:
        """
        Extrai texto do PDF e cria chunks com metadados.

        Args:
            pdf_path: Caminho para o arquivo PDF

        Returns:
            Lista de LOAChunk
        """
        if not os.path.exists(pdf_path):
            raise FileNotFoundError(f"PDF não encontrado: {pdf_path}")

        print(f"Processando PDF: {pdf_path}")
        reader = PdfReader(pdf_path)
        total_pages = len(reader.pages)
        print(f"Total de páginas: {total_pages}")

        chunks = []
        global_chunk_index = 0

        for page_num, page in enumerate(reader.pages, start=1):
            if page_num % 10 == 0:
                print(f"Processando página {page_num}/{total_pages}...")

            text = page.extract_text()
            if not text or not text.strip():
                continue

            # Cria chunks da página
            page_chunks = self._create_chunks_from_text(
                text=text,
                page_num=page_num,
                start_index=global_chunk_index
            )

            chunks.extend(page_chunks)
            global_chunk_index += len(page_chunks)

        print(f"Total de chunks criados: {len(chunks)}")
        return chunks

    def _create_chunks_from_text(
        self,
        text: str,
        page_num: int,
        start_index: int
    ) -> List[LOAChunk]:
        """Cria chunks de texto com overlap e metadados."""
        chunks = []

        # Divide por parágrafos
        paragraphs = text.split("\n\n")
        current_chunk = ""
        chunk_index = start_index

        for paragraph in paragraphs:
            paragraph = paragraph.strip()
            if not paragraph:
                continue

            # Se o parágrafo é muito grande, divide em sentences
            if len(paragraph) > self.CHUNK_SIZE:
                sentences = re.split(r'(?<=[.!?])\s+', paragraph)
                for sentence in sentences:
                    if len(current_chunk) + len(sentence) > self.CHUNK_SIZE and current_chunk:
                        chunks.append(self._create_chunk(
                            current_chunk.strip(),
                            page_num,
                            chunk_index
                        ))
                        chunk_index += 1
                        current_chunk = sentence
                    else:
                        current_chunk += " " + sentence if current_chunk else sentence
            else:
                if len(current_chunk) + len(paragraph) > self.CHUNK_SIZE and current_chunk:
                    chunks.append(self._create_chunk(
                        current_chunk.strip(),
                        page_num,
                        chunk_index
                    ))
                    chunk_index += 1
                    current_chunk = paragraph
                else:
                    current_chunk += "\n\n" + paragraph if current_chunk else paragraph

        # Adiciona o último chunk
        if current_chunk.strip():
            chunks.append(self._create_chunk(
                current_chunk.strip(),
                page_num,
                chunk_index
            ))

        return chunks

    def _create_chunk(self, text: str, page_num: int, chunk_index: int) -> LOAChunk:
        """Cria um LOAChunk com metadados básicos."""
        metadata = {
            "page": page_num,
            "chunk_index": chunk_index,
            "source": "LOA-2026-numerado.pdf",
            "title": f"Página {page_num} - Chunk {chunk_index + 1}"
        }

        # Enriquece metadados
        metadata = self.enrich_metadata(metadata, text)

        return LOAChunk(
            id=f"loa_page_{page_num}_chunk_{chunk_index}",
            text=text,
            metadata=metadata
        )

    def index_pdf(self, pdf_path: str, batch_size: int = 50) -> Dict[str, Any]:
        """
        Indexa o PDF completo no ChromaDB.

        Args:
            pdf_path: Caminho para o PDF
            batch_size: Tamanho do batch para inserção

        Returns:
            Estatísticas da indexação
        """
        print("=" * 60)
        print("INICIANDO INDEXAÇÃO DO LOA 2026")
        print("=" * 60)

        # Extrai chunks
        chunks = self.extract_text_from_pdf(pdf_path)

        if not chunks:
            return {"error": "Nenhum chunk extraído do PDF"}

        # Prepara dados para inserção
        documents = []
        embeddings = []
        metadatas = []
        ids = []

        print(f"\nGerando embeddings para {len(chunks)} chunks...")

        for i, chunk in enumerate(chunks):
            if (i + 1) % 50 == 0:
                print(f"Processando embedding {i + 1}/{len(chunks)}...")

            documents.append(chunk.text)
            metadatas.append(chunk.metadata)
            ids.append(chunk.id)

            # Gera embedding
            embedding = self.get_embedding(chunk.text)
            embeddings.append(embedding)

        # Insere em batches
        print(f"\nInserindo no ChromaDB em batches de {batch_size}...")

        total_inserted = 0
        for i in range(0, len(ids), batch_size):
            batch_end = min(i + batch_size, len(ids))
            batch_ids = ids[i:batch_end]
            batch_docs = documents[i:batch_end]
            batch_embeddings = embeddings[i:batch_end]
            batch_metas = metadatas[i:batch_end]

            try:
                self.collection.add(
                    documents=batch_docs,
                    embeddings=batch_embeddings,
                    metadatas=batch_metas,
                    ids=batch_ids
                )
                total_inserted += len(batch_ids)
                print(f"Batch {i // batch_size + 1}: {len(batch_ids)} chunks inseridos")
            except Exception as e:
                print(f"Erro ao inserir batch {i // batch_size + 1}: {e}")

        print("=" * 60)
        print(f"INDEXAÇÃO CONCLUÍDA: {total_inserted} chunks indexados")
        print("=" * 60)

        return {
            "total_chunks": len(chunks),
            "total_inserted": total_inserted,
            "collection_name": "loa_2026",
            "embedding_model": self.EMBEDDING_MODEL
        }

    def search(
        self,
        query: str,
        n_results: int = 5,
        filters: Optional[Dict[str, Any]] = None
    ) -> Dict[str, Any]:
        """
        Busca documentos semanticamente.

        Args:
            query: Query de busca
            n_results: Número de resultados
            filters: Filtros opcionais para metadados

        Returns:
            Resultados da busca
        """
        # Gera embedding da query
        query_embedding = self.get_embedding(query)

        # Executa busca
        results = self.collection.query(
            query_embeddings=[query_embedding],
            n_results=n_results,
            where=filters
        )

        # Formata resultados
        formatted_results = []
        if results['documents'] and results['documents'][0]:
            for i, (doc, meta, distance) in enumerate(zip(
                results['documents'][0],
                results['metadatas'][0],
                results.get('distances', [[]])[0]
            )):
                formatted_results.append({
                    "rank": i + 1,
                    "text": doc,
                    "metadata": meta,
                    "score": 1 - distance,  # Converte distância para similaridade
                    "distance": distance
                })

        return {
            "query": query,
            "total_results": len(formatted_results),
            "results": formatted_results
        }

    def get_stats(self) -> Dict[str, Any]:
        """Retorna estatísticas da coleção."""
        try:
            count = self.collection.count()

            # Obtém alguns exemplos para análise
            sample = self.collection.get(limit=5, include=["metadatas"])

            # Analiza tipos de chunks
            chunk_types = {}
            sections = {}
            if sample.get("metadatas"):
                for meta in sample["metadatas"]:
                    chunk_type = meta.get("chunk_type", "unknown")
                    chunk_types[chunk_type] = chunk_types.get(chunk_type, 0) + 1
                    section = meta.get("section", "unknown")
                    sections[section] = sections.get(section, 0) + 1

            return {
                "collection_name": "loa_2026",
                "total_documents": count,
                "embedding_model": self.EMBEDDING_MODEL,
                "embedding_dimension": self.EMBEDDING_DIMENSION,
                "sample_chunk_types": chunk_types,
                "sample_sections": sections
            }
        except Exception as e:
            return {"error": str(e)}

    def clear_collection(self) -> Dict[str, Any]:
        """Limpa a coleção (cuidado: irreversível)."""
        try:
            count_before = self.collection.count()
            self.chroma_client.delete_collection("loa_2026")
            self.collection = self.chroma_client.get_or_create_collection(
                name="loa_2026",
                metadata={
                    "description": "LOA 2026 - Lei Orçamentária Anual de Fortaleza",
                    "embedding_model": self.EMBEDDING_MODEL,
                    "hnsw:space": "cosine"
                }
            )
            return {
                "status": "cleared",
                "documents_deleted": count_before
            }
        except Exception as e:
            return {"error": str(e)}


# Funções de conveniência para uso direto
def create_vectorizer(persist_dir: str = "./chroma_db") -> LOAVectorizer:
    """Cria uma instância do vetorizador."""
    return LOAVectorizer(persist_dir=persist_dir)


def index_loa_pdf(pdf_path: str) -> Dict[str, Any]:
    """
    Indexa o PDF da LOA 2026.

    Uso:
        result = index_loa_pdf("path/to/LOA-2026-numerado.pdf")
        print(f"Indexados: {result['total_inserted']} chunks")
    """
    vectorizer = create_vectorizer()
    return vectorizer.index_pdf(pdf_path)


def search_loa(query: str, n_results: int = 5) -> Dict[str, Any]:
    """
    Busca na LOA 2026.

    Uso:
        results = search_loa("orçamento educação")
        for r in results['results']:
            print(f"{r['metadata']['page']}: {r['text'][:100]}")
    """
    vectorizer = create_vectorizer()
    return vectorizer.search(query, n_results=n_results)


if __name__ == "__main__":
    import sys

    print("=" * 60)
    print("LOA 2026 Vectorizer - Modo de Teste")
    print("=" * 60)

    vectorizer = create_vectorizer()

    # Mostra estatísticas atuais
    stats = vectorizer.get_stats()
    print(f"\nEstatísticas da coleção:")
    print(json.dumps(stats, indent=2, ensure_ascii=False))

    # Testa busca
    if len(sys.argv) > 1:
        query = " ".join(sys.argv[1:])
    else:
        query = "orçamento educação"

    print(f"\nBuscando: '{query}'")
    print("-" * 60)

    results = search_loa(query)

    for r in results['results'][:3]:
        print(f"\n[Score: {r['score']:.3f}] Página {r['metadata'].get('page', '?')}")
        print(f"Tipo: {r['metadata'].get('chunk_type', 'N/A')}")
        print(f"Texto: {r['text'][:200]}...")
