# LOA 2026 Semantic Search API

Backend para busca semântica na Lei Orçamentária Anual (LOA) 2026 de Fortaleza.

## 🚀 Tecnologias

- **FastAPI**: Framework web moderno e rápido
- **ChromaDB**: Banco de dados vetorial para busca semântica
- **Google Gemini Embeddings**: Embeddings de alta qualidade (768 dimensões)
- **PyPDF2**: Extração de texto de PDFs

## 📋 Pré-requisitos

- Python 3.10+
- GEMINI_API_KEY (obtenha em [Google AI Studio](https://makersuite.google.com/app/apikey))

## 🔧 Instalação

1. **Clone o projeto** (já deve ter)

2. **Configure a API Key**:

```bash
# No diretório raiz do projeto
echo "GEMINI_API_KEY=sua_chave_aqui" >> .env
```

3. **Instale as dependências**:

```bash
cd backend
pip install -r requirements.txt
```

## ▶️ Executando

### Opção 1: Script de inicialização

```bash
cd backend
chmod +x start.sh
./start.sh
```

### Opção 2: Comando direto

```bash
cd backend
export GEMINI_API_KEY=sua_chave_aqui
python3 main.py
```

A API estará disponível em `http://localhost:8000`

## 📚 API Endpoints

### `GET /` - Informações da API

Retorna informações básicas sobre a API.

### `GET /api/health` - Health Check

Verifica se a API está funcionando e quantos documentos estão indexados.

**Resposta**:
```json
{
  "status": "healthy",
  "collection_loaded": true,
  "total_documents": 1234,
  "api_version": "1.0.0"
}
```

### `GET /api/stats` - Estatísticas

Retorna estatísticas detalhadas da coleção.

**Resposta**:
```json
{
  "collection_name": "loa_2026",
  "total_documents": 1234,
  "embedding_model": "models/embedding-001",
  "embedding_dimension": 768
}
```

### `POST /api/search` - Busca Semântica

Realiza busca semântica na LOA 2026.

**Request**:
```json
{
  "query": "quanto foi investido em educação",
  "n_results": 5,
  "filters": {
    "section": "DESPESA"
  }
}
```

**Resposta**:
```json
{
  "query": "quanto foi investido em educação",
  "total_results": 5,
  "results": [
    {
      "rank": 1,
      "text": "O programa Ensino Fundamental recebeu...",
      "metadata": {
        "page": 42,
        "section": "DESPESA",
        "program_code": "0042",
        "chunk_type": "programa"
      },
      "score": 0.892,
      "distance": 0.108
    }
  ]
}
```

### `GET /api/search` - Busca via GET

Versão simplificada para testes rápidos.

```
GET /api/search?query=educação&n_results=3&section=DESPESA
```

### `POST /api/reindex` - Reindexar PDF

Reindexa o PDF da LOA 2026. Executa em background.

**Resposta**:
```json
{
  "status": "started",
  "message": "Indexação iniciada em background. Use GET /api/indexing-status para verificar progresso."
}
```

### `GET /api/indexing-status` - Status da Indexação

Verifica o progresso da indexação em background.

### `DELETE /api/clear` - Limpar Coleção

**PERIGO**: Limpa todos os documentos da coleção. Irreversível!

## 🔍 Filtros Disponíveis

| Filtro | Valores Exemplo | Descrição |
|--------|-----------------|-----------|
| `section` | RECEITA, DESPESA, INVESTIMENTO | Seção do documento |
| `chunk_type` | texto, tabela, projeto, programa, regional | Tipo de conteúdo |
| `page` | 1, 42, 100 | Número da página |
| `program_code` | 0042, 0119, 2123 | Código do programa |
| `regional` | Regional 1, Regional 2 | Secretaria regional |

## 🧪 Testando a API

### Via navegador

Abra `http://localhost:8000/docs` para a interface Swagger interativa.

### Via curl

```bash
# Health check
curl http://localhost:8000/api/health

# Busca simples
curl "http://localhost:8000/api/search?query=educação&n_results=3"

# Busca com filtros
curl -X POST http://localhost:8000/api/search \
  -H "Content-Type: application/json" \
  -d '{"query": "investimento em saúde", "n_results": 5}'
```

### Via Python

```python
import requests

response = requests.post(
    "http://localhost:8000/api/search",
    json={
        "query": "orçamento educação",
        "n_results": 5
    }
)

results = response.json()
for r in results['results']:
    print(f"[{r['score']:.2f}] Página {r['metadata']['page']}")
    print(f"  {r['text'][:100]}...")
```

## 📁 Estrutura do Projeto

```
backend/
├── main.py              # API FastAPI
├── loa_vectorizer.py    # Lógica de vetorização
├── requirements.txt     # Dependências Python
├── .env.example         # Exemplo de variáveis de ambiente
├── start.sh             # Script de inicialização
└── README.md            # Este arquivo
```

## ⚠️ Troubleshooting

### "GEMINI_API_KEY não encontrada"

Certifique-se de configurar a variável de ambiente:

```bash
export GEMINI_API_KEY=sua_chave_aqui
```

Ou adicione ao arquivo `.env` no diretório raiz do projeto.

### "Coleção vazia"

O PDF ainda não foi indexado. Execute:

```bash
curl -X POST http://localhost:8000/api/reindex
```

### Erro ao importar chromadb

Reinstale as dependências:

```bash
pip install -r requirements.txt --force-reinstall
```

## 📊 Notas de Performance

- **Indexação**: ~1-2 minutos para 100 páginas
- **Busca**: < 1 segundo para 5 resultados
- **Uso de memória**: ~200-500MB dependendo do tamanho do PDF
- **Embeddings**: 768 dimensões ( Gemini embedding-001)

## 🔐 Segurança

Em produção:

1. Configure `CORS` para origens específicas
2. Use autenticação (JWT, API keys)
3. Rate limiting para prevenir abuso
4. HTTPS obrigatório

## 📄 Licença

Este projeto faz parte do Fortaleza Transparente - LOA 2026.
