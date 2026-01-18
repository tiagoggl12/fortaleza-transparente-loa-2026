"""
API FastAPI para Busca Semântica no LOA 2026

Esta API oferece endpoints para buscar informações na Lei Orçamentária Anual
de Fortaleza 2026 usando embeddings do Google Gemini e ChromaDB.
"""

import os
import asyncio
from typing import List, Optional, Dict, Any
from contextlib import asynccontextmanager

from fastapi import FastAPI, HTTPException, Query, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field
import uvicorn

from loa_vectorizer import LOAVectorizer, create_vectorizer


# Configurações
API_TITLE = "LOA 2026 Semantic Search API"
API_VERSION = "1.0.0"
API_DESCRIPTION = """
API de busca semântica na Lei Orçamentária Anual (LOA) de Fortaleza 2026.

## Features

- **Busca semântica**: Encontre informações usando linguagem natural
- **Filtragem**: Filtre por seção, página, regional, etc.
- **Estatísticas**: Consulte metadados da coleção
- **Reindexação**: Atualize o banco de dados com novo PDF

## Como usar

1. Faça uma busca: `POST /api/search`
2. Consulte estatísticas: `GET /api/stats`
3. Reindexe o PDF: `POST /api/reindex` (só se necessário)
"""

# Diretórios
PDF_PATH = os.path.join(
    os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
    "Arquivo completo LOA 2026",
    "LOA-2026-numerado.pdf"
)
CHROMA_PERSIST_DIR = os.path.join(
    os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
    "chroma_db"
)


# Instância global do vetorizador
vectorizer: Optional[LOAVectorizer] = None
indexing_status: Dict[str, Any] = {
    "is_indexing": False,
    "progress": 0,
    "message": "",
    "last_error": None
}


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Gerencia o ciclo de vida da aplicação."""
    global vectorizer

    # Startup
    print("=" * 60)
    print("Iniciando LOA 2026 Semantic Search API")
    print("=" * 60)

    try:
        vectorizer = create_vectorizer(persist_dir=CHROMA_PERSIST_DIR)
        stats = vectorizer.get_stats()
        doc_count = stats.get("total_documents", 0)

        print(f"Coleção 'loa_2026' carregada: {doc_count} documentos")

        if doc_count == 0:
            print("ATENÇÃO: Coleção vazia. Use POST /api/reindex para indexar o PDF.")
        else:
            print("API pronta para consultas!")

    except Exception as e:
        print(f"ERRO ao iniciar vetorizador: {e}")
        print("A API iniciará mas as funções de busca estarão indisponíveis.")
        vectorizer = None

    print("=" * 60)

    yield

    # Shutdown
    print("Encerrando API...")


# Cria a aplicação FastAPI
app = FastAPI(
    title=API_TITLE,
    version=API_VERSION,
    description=API_DESCRIPTION,
    lifespan=lifespan
)

# Configura CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Em produção, especifique as origens permitidas
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Modelos Pydantic para request/response

class SearchRequest(BaseModel):
    """Modelo para requisição de busca."""
    query: str = Field(..., description="Query de busca em linguagem natural", min_length=1)
    n_results: int = Field(5, description="Número de resultados a retornar", ge=1, le=20)
    filters: Optional[Dict[str, Any]] = Field(
        None,
        description="Filtros opcionais (ex: {'section': 'RECEITA'})"
    )


class SearchResponse(BaseModel):
    """Modelo para resposta de busca."""
    query: str
    total_results: int
    results: List[Dict[str, Any]]


class ReindexResponse(BaseModel):
    """Modelo para resposta de reindexação."""
    status: str
    message: str


class StatsResponse(BaseModel):
    """Modelo para resposta de estatísticas."""
    collection_name: str
    total_documents: int
    embedding_model: str
    embedding_dimension: int


class HealthResponse(BaseModel):
    """Modelo para resposta de health check."""
    status: str
    collection_loaded: bool
    total_documents: Optional[int] = None
    api_version: str


class SearchResult(BaseModel):
    """Modelo para um resultado de busca."""
    rank: int
    text: str
    metadata: Dict[str, Any]
    score: float
    distance: float


# Endpoints

@app.get("/", tags=["Root"])
async def root():
    """Rota raiz com informações da API."""
    return {
        "name": API_TITLE,
        "version": API_VERSION,
        "description": "API de busca semântica na LOA 2026 de Fortaleza",
        "endpoints": {
            "search": "/api/search",
            "stats": "/api/stats",
            "health": "/api/health",
            "reindex": "/api/reindex",
            "docs": "/docs"
        }
    }


@app.get("/api/health", response_model=HealthResponse, tags=["System"])
async def health_check():
    """
    Verifica a saúde da API.

    Retorna informações sobre o estado da coleção e se a API está funcionando.
    """
    if vectorizer is None:
        return HealthResponse(
            status="error",
            collection_loaded=False,
            api_version=API_VERSION
        )

    try:
        stats = vectorizer.get_stats()
        return HealthResponse(
            status="healthy",
            collection_loaded=True,
            total_documents=stats.get("total_documents", 0),
            api_version=API_VERSION
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao verificar saúde: {e}")


@app.get("/api/stats", response_model=StatsResponse, tags=["System"])
async def get_stats():
    """
    Retorna estatísticas da coleção ChromaDB.

    Inclui número de documentos, modelo de embedding usado, etc.
    """
    if vectorizer is None:
        raise HTTPException(status_code=503, detail="Vetorizador não disponível")

    try:
        stats = vectorizer.get_stats()

        if "error" in stats:
            raise HTTPException(status_code=500, detail=stats["error"])

        return StatsResponse(
            collection_name=stats.get("collection_name", "loa_2026"),
            total_documents=stats.get("total_documents", 0),
            embedding_model=stats.get("embedding_model", "unknown"),
            embedding_dimension=stats.get("embedding_dimension", 768)
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao buscar estatísticas: {e}")


@app.post("/api/search", response_model=SearchResponse, tags=["Search"])
async def search(request: SearchRequest):
    """
    Realiza busca semântica na LOA 2026.

    ## Exemplo de uso:

    ```
    POST /api/search
    {
        "query": "quanto foi investido em educação",
        "n_results": 5,
        "filters": {"section": "DESPESA"}
    }
    ```

    ## Filtros disponíveis:

    - `section`: RECEITA, DESPESA, INVESTIMENTO, GERAL
    - `chunk_type`: texto, tabela, projeto, programa, regional
    - `page`: Número da página específica
    - `program_code`: Código do programa (ex: "0042")
    - `regional`: "Regional 1", "Regional 2", etc.
    """
    if vectorizer is None:
        raise HTTPException(
            status_code=503,
            detail="Vetorizador não disponível. Verifique se o GEMINI_API_KEY está configurado."
        )

    if not request.query or not request.query.strip():
        raise HTTPException(status_code=400, detail="Query não pode ser vazia")

    try:
        results = vectorizer.search(
            query=request.query,
            n_results=request.n_results,
            filters=request.filters
        )

        return SearchResponse(
            query=request.query,
            total_results=results.get("total_results", 0),
            results=results.get("results", [])
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro na busca: {e}")


@app.get("/api/search", tags=["Search"])
async def search_get(
    query: str = Query(..., description="Query de busca"),
    n_results: int = Query(5, ge=1, le=20, description="Número de resultados"),
    section: Optional[str] = Query(None, description="Filtro por seção"),
    chunk_type: Optional[str] = Query(None, description="Filtro por tipo de chunk")
):
    """
    Realiza busca semântica via GET (mais fácil para testes).

    ## Exemplo:

    `/api/search?query=educação&n_results=3&section=DESPESA`
    """
    filters = {}
    if section:
        filters["section"] = section
    if chunk_type:
        filters["chunk_type"] = chunk_type

    return await search(SearchRequest(
        query=query,
        n_results=n_results,
        filters=filters if filters else None
    ))


@app.post("/api/reindex", response_model=ReindexResponse, tags=["Admin"])
async def reindex(background_tasks: BackgroundTasks):
    """
    Reindexa o PDF da LOA 2026.

    **ATENÇÃO**: Esta operação pode levar vários minutos dependendo do tamanho do PDF.
    A operação é executada em background.

    Verifique o progresso com GET /api/indexing-status.
    """
    global indexing_status

    if indexing_status["is_indexing"]:
        return ReindexResponse(
            status="error",
            message="Indexação já em andamento. Use GET /api/indexing-status para verificar progresso."
        )

    if not os.path.exists(PDF_PATH):
        return ReindexResponse(
            status="error",
            message=f"PDF não encontrado em: {PDF_PATH}"
        )

    # Inicia indexação em background
    background_tasks.add_task(run_indexing)

    return ReindexResponse(
        status="started",
        message="Indexação iniciada em background. Use GET /api/indexing-status para verificar progresso."
    )


@app.get("/api/indexing-status", tags=["Admin"])
async def get_indexing_status():
    """Retorna o status atual da indexação."""
    return indexing_status


@app.delete("/api/clear", tags=["Admin"])
async def clear_collection():
    """
    Limpa a coleção ChromaDB.

    **PERIGO**: Esta operação é irreversível!
    """
    global vectorizer

    if vectorizer is None:
        raise HTTPException(status_code=503, detail="Vetorizador não disponível")

    try:
        result = vectorizer.clear_collection()
        if "error" in result:
            raise HTTPException(status_code=500, detail=result["error"])

        return {
            "status": "success",
            "message": f"Coleção limpa. {result.get('documents_deleted', 0)} documentos deletados."
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao limpar coleção: {e}")


# Função para executar indexação em background
async def run_indexing():
    """Executa a indexação do PDF em background."""
    global indexing_status, vectorizer

    indexing_status = {
        "is_indexing": True,
        "progress": 0,
        "message": "Iniciando indexação...",
        "last_error": None
    }

    try:
        # Recria vetorizador para garantir estado limpo
        vectorizer = create_vectorizer(persist_dir=CHROMA_PERSIST_DIR)

        # Verifica se PDF existe
        if not os.path.exists(PDF_PATH):
            indexing_status["last_error"] = f"PDF não encontrado: {PDF_PATH}"
            indexing_status["is_indexing"] = False
            return

        # Executa indexação
        indexing_status["message"] = "Processando PDF..."

        def index_in_thread():
            try:
                result = vectorizer.index_pdf(PDF_PATH)
                indexing_status["progress"] = 100
                indexing_status["message"] = "Indexação concluída com sucesso!"
                indexing_status["result"] = result
            except Exception as e:
                indexing_status["last_error"] = str(e)
                indexing_status["message"] = "Erro na indexação"
            finally:
                indexing_status["is_indexing"] = False

        # Executa em thread separada pois index_pdf é síncrono e demorado
        import threading
        thread = threading.Thread(target=index_in_thread)
        thread.start()

    except Exception as e:
        indexing_status["last_error"] = str(e)
        indexing_status["is_indexing"] = False
        indexing_status["message"] = "Erro ao iniciar indexação"


# Tratamento de erros global

@app.exception_handler(Exception)
async def global_exception_handler(request, exc):
    """Tratador de exceções global."""
    return JSONResponse(
        status_code=500,
        content={
            "error": "Erro interno do servidor",
            "detail": str(exc)
        }
    )


# Main para execução direta

if __name__ == "__main__":
    print("=" * 60)
    print("LOA 2026 Semantic Search API")
    print("=" * 60)
    print(f"PDF path: {PDF_PATH}")
    print(f"ChromaDB persist: {CHROMA_PERSIST_DIR}")
    print(f" Gemini API key: {'Configurada' if os.getenv('GEMINI_API_KEY') else 'NÃO configurada'}")
    print("=" * 60)

    # Executa o servidor
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )
