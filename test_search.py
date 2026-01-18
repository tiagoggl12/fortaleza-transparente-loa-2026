import chromadb
from chromadb.config import Settings


def test_search():
    # Initialize Chroma client
    client = chromadb.PersistentClient(path="./chroma_db")
    collection = client.get_collection("loa_2026_documents")

    # Test searches
    queries = [
        "orçamento educação",
        "saúde pública",
        "investimento infraestrutura",
        "receitas tributárias",
        "despesas com pessoal",
    ]

    for query in queries:
        print(f"\n=== Buscando: '{query}' ===")
        results = collection.query(query_texts=[query], n_results=3)

        for i, (doc, metadata) in enumerate(
            zip(results["documents"][0], results["metadatas"][0])
        ):
            print(f"\nResultado {i + 1}:")
            print(f"Página: {metadata['page']}")
            print(f"Fonte: {metadata['source']}")
            print(f"Conteúdo: {doc[:300]}...")
            print("-" * 50)


if __name__ == "__main__":
    # Get database statistics
    client = chromadb.PersistentClient(path="./chroma_db")
    collection = client.get_collection("loa_2026_documents")

    print(f"Total de documentos no banco: {collection.count()}")
    test_search()
