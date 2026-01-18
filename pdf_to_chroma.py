import os
import json
from typing import List, Dict
import chromadb
from chromadb.config import Settings
import google.generativeai as genai
from PyPDF2 import PdfReader
from dotenv import load_dotenv

load_dotenv()


class PDFToChromaConverter:
    def __init__(self):
        # Configure Gemini API
        genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
        self.text_model = genai.GenerativeModel("gemini-3-pro")

        # Initialize Chroma client
        self.client = chromadb.PersistentClient(path="./chroma_db")
        self.collection = self.client.get_or_create_collection(
            name="loa_2026_documents",
            metadata={"description": "LOA 2026 document embeddings"},
        )

    def extract_text_from_pdf(self, pdf_path: str) -> List[Dict[str, any]]:
        """Extract text chunks from PDF using PyPDF2 and process with Gemini"""
        reader = PdfReader(pdf_path)
        chunks = []

        for page_num, page in enumerate(reader.pages):
            text = page.extract_text()
            if text.strip():
                # Use Gemini to process and chunk the text intelligently
                processed_chunks = self._process_text_with_gemini(text, page_num + 1)
                chunks.extend(processed_chunks)

        return chunks

    def _process_text_with_gemini(
        self, text: str, page_num: int
    ) -> List[Dict[str, any]]:
        """Use Gemini to split text into meaningful chunks"""
        prompt = f"""
        Analise o seguinte texto de uma página do LOA 2026 e divida-o em blocos de conteúdo significativos.
        Cada bloco deve ser logicamente coerente e conter informações relacionadas.
        
        Retorne a resposta em formato JSON com uma lista de objetos, cada objeto contendo:
        - "content": o texto do bloco
        - "title": um título resumido para o bloco (se aplicável)
        - "type": o tipo de conteúdo (ex: "tabela", "texto", "seção", etc.)
        
        Texto da página {page_num}:
        {text}
        """

        try:
            response = self.text_model.generate_content(prompt)
            # Parse the JSON response
            chunks_data = json.loads(response.text)

            processed_chunks = []
            for i, chunk_data in enumerate(chunks_data):
                chunk = {
                    "id": f"page_{page_num}_chunk_{i + 1}",
                    "content": chunk_data.get("content", ""),
                    "metadata": {
                        "page": page_num,
                        "chunk_index": i + 1,
                        "title": chunk_data.get("title", f"Chunk {i + 1}"),
                        "type": chunk_data.get("type", "texto"),
                        "source": "LOA-2026-numerado.pdf",
                    },
                }
                processed_chunks.append(chunk)

            return processed_chunks

        except Exception as e:
            print(f"Error processing page {page_num} with Gemini: {e}")
            # Fallback: split text into smaller chunks
            chunk_size = 1000
            chunks = []
            for i in range(0, len(text), chunk_size):
                chunk_text = text[i : i + chunk_size]
                chunk = {
                    "id": f"page_{page_num}_chunk_{len(chunks) + 1}",
                    "content": chunk_text,
                    "metadata": {
                        "page": page_num,
                        "chunk_index": len(chunks) + 1,
                        "title": f"Page {page_num} - Chunk {len(chunks) + 1}",
                        "type": "texto",
                        "source": "LOA-2026-numerado.pdf",
                    },
                }
                chunks.append(chunk)
            return chunks

    def create_embeddings_and_store(self, chunks: List[Dict[str, any]]):
        """Create embeddings and store in Chroma"""
        documents = [chunk["content"] for chunk in chunks]
        metadatas = [chunk["metadata"] for chunk in chunks]
        ids = [chunk["id"] for chunk in chunks]

        # Add to Chroma collection
        self.collection.add(documents=documents, metadatas=metadatas, ids=ids)

        print(f"Successfully stored {len(chunks)} chunks in Chroma database")

    def process_pdf(self, pdf_path: str):
        """Main method to process PDF and store in Chroma"""
        print(f"Starting to process PDF: {pdf_path}")

        # Extract and process text
        chunks = self.extract_text_from_pdf(pdf_path)
        print(f"Extracted {len(chunks)} text chunks")

        # Store in Chroma
        self.create_embeddings_and_store(chunks)

        print("PDF processing completed successfully!")

    def search_documents(self, query: str, n_results: int = 5) -> List[Dict]:
        """Search documents in the Chroma database"""
        results = self.collection.query(query_texts=[query], n_results=n_results)

        return results

    def get_database_stats(self):
        """Get statistics about the database"""
        count = self.collection.count()
        return {"total_documents": count}


if __name__ == "__main__":
    # Create .env file if it doesn't exist
    if not os.path.exists(".env"):
        print("Creating .env file...")
        with open(".env", "w") as f:
            f.write("GEMINI_API_KEY=your_gemini_api_key_here\n")
        print("Please add your Gemini API key to the .env file")
        exit()

    # Initialize converter
    converter = PDFToChromaConverter()

    # Process the PDF
    pdf_path = "/Users/tiago/Developer/fortaleza-transparente---ploa-2026/Arquivo completo LOA 2026/LOA-2026-numerado.pdf"

    if os.path.exists(pdf_path):
        converter.process_pdf(pdf_path)

        # Show statistics
        stats = converter.get_database_stats()
        print(f"\nDatabase Statistics: {stats}")

        # Example search
        print("\nExample search for 'orçamento':")
        results = converter.search_documents("orçamento")
        for i, (doc, metadata) in enumerate(
            zip(results["documents"][0], results["metadatas"][0])
        ):
            print(f"\nResult {i + 1}:")
            print(f"Source: {metadata['source']}, Page: {metadata['page']}")
            print(f"Content preview: {doc[:200]}...")
    else:
        print(f"PDF file not found: {pdf_path}")
