import os
import json
from typing import List, Dict
import chromadb
from chromadb.config import Settings
from PyPDF2 import PdfReader
from dotenv import load_dotenv

load_dotenv()


class PDFToChromaConverter:
    def __init__(self):
        # Initialize Chroma client
        self.client = chromadb.PersistentClient(path="./chroma_db")
        self.collection = self.client.get_or_create_collection(
            name="loa_2026_documents",
            metadata={"description": "LOA 2026 document embeddings"},
        )

    def extract_text_from_pdf(self, pdf_path: str) -> List[Dict[str, any]]:
        """Extract text chunks from PDF using PyPDF2"""
        reader = PdfReader(pdf_path)
        chunks = []
        total_pages = len(reader.pages)

        print(f"Processing {total_pages} pages...")

        for page_num, page in enumerate(reader.pages):
            if (page_num + 1) % 50 == 0:
                print(f"Processed {page_num + 1}/{total_pages} pages...")

            text = page.extract_text()
            if text.strip():
                # Split text into smaller chunks
                processed_chunks = self._split_text_into_chunks(text, page_num + 1)
                chunks.extend(processed_chunks)

        print(f"Total chunks created: {len(chunks)}")
        return chunks

    def _split_text_into_chunks(
        self, text: str, page_num: int, chunk_size: int = 1500
    ) -> List[Dict[str, any]]:
        """Split text into manageable chunks"""
        chunks = []

        # Split by paragraphs first
        paragraphs = text.split("\n\n")
        current_chunk = ""

        for i, paragraph in enumerate(paragraphs):
            paragraph = paragraph.strip()
            if not paragraph:
                continue

            # If adding this paragraph exceeds chunk size, save current chunk
            if len(current_chunk) + len(paragraph) > chunk_size and current_chunk:
                chunk = {
                    "id": f"page_{page_num}_chunk_{len(chunks) + 1}",
                    "content": current_chunk.strip(),
                    "metadata": {
                        "page": page_num,
                        "chunk_index": len(chunks) + 1,
                        "title": f"Página {page_num} - Chunk {len(chunks) + 1}",
                        "type": "texto",
                        "source": "LOA-2026-numerado.pdf",
                    },
                }
                chunks.append(chunk)
                current_chunk = paragraph
            else:
                current_chunk += "\n\n" + paragraph if current_chunk else paragraph

        # Don't forget the last chunk
        if current_chunk.strip():
            chunk = {
                "id": f"page_{page_num}_chunk_{len(chunks) + 1}",
                "content": current_chunk.strip(),
                "metadata": {
                    "page": page_num,
                    "chunk_index": len(chunks) + 1,
                    "title": f"Página {page_num} - Chunk {len(chunks) + 1}",
                    "type": "texto",
                    "source": "LOA-2026-numerado.pdf",
                },
            }
            chunks.append(chunk)

        return chunks

    def create_embeddings_and_store(self, chunks: List[Dict[str, any]]):
        """Create embeddings and store in Chroma"""
        print(f"Storing {len(chunks)} chunks in Chroma database...")

        documents = [chunk["content"] for chunk in chunks]
        metadatas = [chunk["metadata"] for chunk in chunks]
        ids = [chunk["id"] for chunk in chunks]

        # Add to Chroma collection
        try:
            self.collection.add(documents=documents, metadatas=metadatas, ids=ids)
            print(f"Successfully stored {len(chunks)} chunks")
        except Exception as e:
            print(f"Error storing chunks: {e}")
            # Try storing in smaller batches
            batch_size = 100
            for i in range(0, len(chunks), batch_size):
                batch = chunks[i : i + batch_size]
                batch_docs = [chunk["content"] for chunk in batch]
                batch_metas = [chunk["metadata"] for chunk in batch]
                batch_ids = [chunk["id"] for chunk in batch]

                try:
                    self.collection.add(
                        documents=batch_docs, metadatas=batch_metas, ids=batch_ids
                    )
                    print(f"Stored batch {i // batch_size + 1}: {len(batch)} chunks")
                except Exception as be:
                    print(f"Error in batch {i // batch_size + 1}: {be}")

    def process_pdf(self, pdf_path: str):
        """Main method to process PDF and store in Chroma"""
        print(f"Starting to process PDF: {pdf_path}")

        # Extract and process text
        chunks = self.extract_text_from_pdf(pdf_path)

        # Store in Chroma
        self.create_embeddings_and_store(chunks)

        print("PDF processing completed successfully!")

    def search_documents(self, query: str, n_results: int = 5) -> List[Dict]:
        """Search documents in the Chroma database"""
        try:
            results = self.collection.query(query_texts=[query], n_results=n_results)
            return results
        except Exception as e:
            print(f"Error searching: {e}")
            return {"documents": [[]], "metadatas": [[]]}

    def get_database_stats(self):
        """Get statistics about the database"""
        try:
            count = self.collection.count()
            return {"total_documents": count}
        except Exception as e:
            print(f"Error getting stats: {e}")
            return {"total_documents": 0}


if __name__ == "__main__":
    # Initialize converter
    converter = PDFToChromaConverter()

    # Process PDF
    pdf_path = "/Users/tiago/Developer/fortaleza-transparente---ploa-2026/Arquivo completo LOA 2026/LOA-2026-numerado.pdf"

    if os.path.exists(pdf_path):
        converter.process_pdf(pdf_path)

        # Show statistics
        stats = converter.get_database_stats()
        print(f"\nDatabase Statistics: {stats}")

        # Example search
        print("\nExample search for 'orçamento':")
        results = converter.search_documents("orçamento")
        if results["documents"][0]:
            for i, (doc, metadata) in enumerate(
                zip(results["documents"][0], results["metadatas"][0])
            ):
                print(f"\nResult {i + 1}:")
                print(f"Source: {metadata['source']}, Page: {metadata['page']}")
                print(f"Content preview: {doc[:200]}...")
        else:
            print("No results found.")
    else:
        print(f"PDF file not found: {pdf_path}")
