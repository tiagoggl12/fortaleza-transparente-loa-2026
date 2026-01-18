# PDF para Chroma - LOA 2026

Este projeto converte o PDF do LOA 2026 para um banco de dados vetorial Chroma para busca semântica eficiente.

## Configuração

1. Ative o ambiente virtual:
```bash
source venv/bin/activate
```

2. Instale as dependências (se necessário):
```bash
pip install chromadb PyPDF2 python-dotenv
```

## Uso

### Processamento do PDF
Execute o script principal para converter o PDF:
```bash
python pdf_to_chroma_simple.py
```

### Teste de Busca
Após o processamento, teste as buscas:
```bash
python test_search.py
```

## Funcionalidades

- ✅ Extração de texto do PDF usando PyPDF2
- ✅ Chunking inteligente por parágrafos 
- ✅ Armazenamento vetorial em Chroma DB
- ✅ Busca semântica nos documentos
- ✅ Metadados (página, chunk, fonte)

## Estatísticas do Processamento

- **Total de páginas processadas**: 1.155
- **Total de chunks criados**: 1.155
- **Banco de dados**: `chroma_db/chroma.sqlite3` (167KB)
- **Status**: ✅ Concluído com sucesso

## Estrutura

- `pdf_to_chroma_simple.py`: Script principal de conversão
- `test_search.py`: Script para testar buscas
- `chroma_db/`: Banco de dados Chroma persistente
- `.env`: Variáveis de ambiente

## Exemplo de Busca

```python
import chromadb
from chromadb.config import Settings

client = chromadb.PersistentClient(path="./chroma_db")
collection = client.get_collection("loa_2026_documents")

# Buscar documentos
results = collection.query(
    query_texts=["orçamento educação"],
    n_results=5
)

print(results)
```

## Queries de Exemplo Testadas

- "orçamento educação"
- "saúde pública" 
- "investimento infraestrutura"
- "receitas tributárias"
- "despesas com pessoal"
GEMINI_API_KEY=sua_api_key_aqui
```

2. Ative o ambiente virtual:
```bash
source venv/bin/activate
```

## Uso

Execute o script principal:
```bash
python pdf_to_chroma.py
```

## Funcionalidades

- Extração inteligente de texto do PDF usando PyPDF2
- Processamento de conteúdo com Gemini 1.5 Flash para chunking semântico
- Armazenamento vetorial em banco de dados Chroma
- Busca semântica nos documentos

## Estrutura

- `pdf_to_chroma.py`: Script principal para conversão
- `chroma_db/`: Banco de dados Chroma persistente
- `.env`: Variáveis de ambiente

## Exemplo de busca

```python
from pdf_to_chroma import PDFToChromaConverter

converter = PDFToChromaConverter()
results = converter.search_documents("orçamento educação")
```