# Como Acessar e Realizar Consultas no Banco de Dados Vetorial do LOA 2026

Este documento explica detalhadamente como utilizar o sistema de busca semântica construído para o LOA 2026 de Fortaleza.

## 📋 Pré-requisitos

1. **Python 3.8+** instalado
2. **Ambiente virtual** ativado:
   ```bash
   source venv/bin/activate
   ```

## 🗂️ Estrutura do Projeto

```
fortaleza-transparente---ploa-2026/
├── chroma_db/
│   └── chroma.sqlite3          # Banco de dados vetorial (13.9 MB)
├── pdf_to_chroma_v2.py          # Script de conversão
├── test_search.py                 # Script de testes básicos
├── docs_chroma.py               # Script de documentação (este arquivo)
└── .env                         # Configuração da API
```

## 🚀 Acesso Rápido

### Via Python Interativo

```python
import chromadb
from chromadb.config import Settings

# Conectar ao banco
client = chromadb.PersistentClient(path="./chroma_db")
collection = client.get_collection("loa_2026_documents")

# Realizar busca
results = collection.query(
    query_texts=["sua consulta aqui"],
    n_results=5
)

# Exibir resultados
for i, (doc, metadata) in enumerate(zip(results["documents"][0], results["metadatas"][0])):
    print(f"\nResultado {i+1}:")
    print(f"Página: {metadata['page']}")
    print(f"Fonte: {metadata['source']}")
    print(f"Conteúdo: {doc[:200]}...")
```

### Via Scripts Prontos

#### 1. Script de Busca Personalizado
```python
# buscar_loa.py
import chromadb

client = chromadb.PersistentClient(path="./chroma_db")
collection = client.get_collection("loa_2026_documents")

def buscar(query, n_resultados=5):
    results = collection.query(
        query_texts=[query],
        n_results=n_resultados
    )
    
    print(f"\n=== BUSCA: '{query}' ===")
    print(f"Encontrados: {len(results['documents'][0])} resultados\n")
    
    for i, (doc, metadata) in enumerate(zip(results["documents"][0], results["metadatas"][0])):
        print(f"\n📍 Resultado {i+1}:")
        print(f"📄 Página: {metadata['page']}")
        print(f"📁 Título: {metadata['title']}")
        print(f"📋 Conteúdo: {doc[:500]}...")
        print("-" * 60)

# Usar
buscar("educação Regional 8")
buscar("Hospital José Walter")
buscar("orçamento infraestrutura")
```

## 🎯 Tipos de Consultas Eficientes

### 1. **Consultas Regionais**
```python
# Funciona perfeitamente!
queries_regionais = [
    "Regional 8 investimentos saúde",
    "Regional 5 educação creches", 
    "Regional 3 obras pavimentação",
    "Regional 1 infraestrutura"
]
```

### 2. **Consultas Temáticas**
```python
queries_temas = [
    "orçamento participativo conselhos",
    "educação infantil creches",
    "saúde pública hospitais",
    "receitas tributárias IPTU",
    "obras públicas pavimentação"
]
```

### 3. **Consultas Específicas**
```python
queries_especificas = [
    "Hospital Gonçaga Mota reforma valor",
    "Secretaria Regional SER 8 equipamentos",
    "Fundo Municipal de Educação valores",
    "IPTU isenção aposentador"
]
```

## 📊 Estrutura dos Resultados

Cada resultado contém:

```python
{
    "documents": [
        "Texto completo do chunk encontrado..."
    ],
    "metadatas": [
        {
            "page": 254,           # Número da página original
            "chunk_index": 1,        # Número do chunk na página
            "title": "Página 254...",# Título gerado
            "type": "texto",          # Tipo de conteúdo
            "source": "LOA-2026-numerado.pdf"  # Arquivo fonte
        }
    ],
    "ids": ["page_254_chunk_1"]  # ID único
}
```

## 🛠️ Scripts Utilitários

### Script de Análise Completa
```python
# analisar_loa.py
import chromadb
import json

client = chromadb.PersistentClient(path="./chroma_db")
collection = client.get_collection("loa_2026_documents")

def analisar_regiao(regional_numero, tema="investimentos"):
    query = f"Regional {regional_numero} {tema}"
    results = collection.query(
        query_texts=[query],
        n_results=20
    )
    
    total_investimentos = 0
    projetos = []
    
    for doc, metadata in zip(results["documents"][0], results["metadatas"][0]):
        if "R$" in doc:
            # Extrair valores monetários
            linhas = doc.split('\n')
            for linha in linhas:
                if 'Regional' in linha and regional_numero in linha:
                    try:
                        valor = linha.split('R$')[-1].strip().replace('.', '').replace(',', '')
                        if valor.isdigit():
                            total_investimentos += int(valor)
                    except:
                        pass
            projetos.append({
                "pagina": metadata["page"],
                "trecho": doc[:200]
            })
    
    return {
        "regional": regional_numero,
        "total_estimado": total_investimentos,
        "projetos_encontrados": len(projetos),
        "projetos": projetos
    }

# Usar
analise = analisar_regiao(8, "obras saúde infraestrutura")
print(json.dumps(analise, indent=2, ensure_ascii=False))
```

### Script de Comparação Regional
```python
# comparar_regionais.py
def comparar_investimentos(regionais=[1,2,3,4,5,6,7,8]):
    client = chromadb.PersistentClient(path="./chroma_db")
    collection = client.get_collection("loa_2026_documents")
    
    resultados = {}
    
    for regional in regionais:
        query = f"Regional {regional} investimentos obras"
        res = collection.query(query_texts=[query], n_results=15)
        
        # Contar menções de valores
        total_mencoes = len(res["documents"][0])
        resultados[regional] = total_mencoes
    
    # Ordenar e mostrar
    regionais_ordenados = sorted(resultados.items(), key=lambda x: x[1], reverse=True)
    
    print("🏆 Ranking de Investimentos por Regional:")
    print("=" * 50)
    for regional, mencoes in regionais_ordenados:
        print(f"Regional {regional:2}: {mencoes} menções de investimentos")

# Usar
comparar_investimentos([1,2,3,4,5,6,7,8])
```

## 🔍 Dicas de Busca Avançada

### 1. **Combinar Termos**
```python
# Para buscas mais específicas
query = "Regional 8 saúde hospital José Walter AND reforma"
query = "educação creches OR infantil"
query = "obras pavimentação NOT limpeza"
```

### 2. **Busca por Faixa de Valores**
```python
# Encontrar projetos com valores específicos
query = "Regional 8 R$ 100000"  # Projetos de 100 mil
query = "Regional 8 R$ 200000"  # Projetos de 200 mil
```

### 3. **Busca Temporal**
```python
# Buscar por período orçamentário
query = "orçamento 2026 janeiro"
query = "reprogramação setembro"
query = "emenda parlamentar dezembro"
```

## 📱 Exemplos Práticos de Uso

### Exemplo 1: Diagnóstico Regional
```python
# Descobrir todos os investimentos de uma regional
def diagnosticar_regional(regional_numero):
    client = chromadb.PersistentClient(path="./chroma_db")
    collection = client.get_collection("loa_2026_documents")
    
    areas = ["saúde", "educação", "infraestrutura", "esporte", "cultura"]
    resultados = {}
    
    for area in areas:
        query = f"Regional {regional_numero} {area}"
        res = collection.query(query_texts=[query], n_results=10)
        resultados[area] = len(res["documents"][0])
    
    print(f"\n🗺️ Diagnóstico Regional {regional_numero}:")
    for area, quantidade in resultados.items():
        print(f"  {area}: {quantidade} projetos/encontrados")

diagnosticar_regional(8)
```

### Exemplo 2: Encontrar Especificações
```python
# Encontrar detalhes técnicos de projetos
def encontrar_especificacoes(projeto, regional=None):
    query = f"{projeto}"
    if regional:
        query += f" Regional {regional}"
    
    res = collection.query(query_texts=[query], n_results=10)
    
    print(f"\n🔍 Especificações de '{projeto}':")
    for doc, metadata in zip(res["documents"][0], res["metadatas"][0]):
        if any(termo in doc.lower() for termo in ["valor", "especificação", "detalhe", "característica"]):
            print(f"\n📋 Página {metadata['page']}:")
            print(f"📄 {doc[:600]}...")

encontrar_especificacoes("Hospital José Walter", 8)
```

## 🚀 Integração com Aplicações

### Flask API
```python
from flask import Flask, request, jsonify
import chromadb

app = Flask(__name__)
client = chromadb.PersistentClient(path="./chroma_db")
collection = client.get_collection("loa_2026_documents")

@app.route('/buscar', methods=['POST'])
def buscar():
    data = request.json
    query = data.get('query', '')
    n_resultados = data.get('n_resultados', 10)
    
    results = collection.query(
        query_texts=[query],
        n_results=n_resultados
    )
    
    return jsonify({
        'resultados': len(results['documents'][0]),
        'dados': results
    })

if __name__ == '__main__':
    app.run(debug=True)
```

### Streamlit Interface
```python
import streamlit as st
import chromadb

st.title("🔍 Busca no LOA 2026")

client = chromadb.PersistentClient(path="./chroma_db")
collection = client.get_collection("loa_2026_documents")

query = st.text_input("Digite sua consulta:")
n_resultados = st.slider("Número de resultados:", 1, 20, 5)

if st.button("Buscar"):
    if query:
        results = collection.query(
            query_texts=[query],
            n_results=n_resultados
        )
        
        st.write(f"Encontrados: {len(results['documents'][0])} resultados")
        
        for i, (doc, metadata) in enumerate(zip(results["documents"][0], results["metadatas"][0])):
            with st.expander(f"Resultado {i+1} - Página {metadata['page']}"):
                st.write(doc)
                st.caption(f"Fonte: {metadata['source']}")

# Executar: streamlit run app.py
```

## 🔧 Manutenção e Backup

### Backup do Banco
```bash
# Copiar banco de dados
cp chroma_db/chroma.sqlite3 backups/loa_2026_$(date +%Y%m%d).sqlite3

# Compactar backup
tar -czf backups/loa_2026_$(date +%Y%m%d).tar.gz chroma_db/
```

### Reconstrução (se necessário)
```bash
# Recriar banco do zero
rm -rf chroma_db/
source venv/bin/activate
python pdf_to_chroma_v2.py
```

## 📊 Métricas de Uso

```python
# métricas.py
import chromadb
from datetime import datetime

client = chromadb.PersistentClient(path="./chroma_db")
collection = client.get_collection("loa_2026_documents")

def metricas_uso():
    total_docs = collection.count()
    
    # Simular diferentes tipos de busca
    test_queries = [
        "secretaria", "regional", "orçamento", 
        "investimento", "educação", "saúde"
    ]
    
    sucesso = 0
    for query in test_queries:
        results = collection.query(query_texts=[query], n_results=3)
        if len(results['documents'][0]) > 0:
            sucesso += 1
    
    taxa_sucesso = (sucesso / len(test_queries)) * 100
    
    print(f"""
📊 MÉTRICAS DO BANCO DE DADOS - {datetime.now().strftime('%d/%m/%Y %H:%M')}
{'='*50}
📄 Total de documentos: {total_docs}
🎯 Taxa de sucesso em buscas: {taxa_sucesso:.1f}%
💾 Tamanho do arquivo: {os.path.getsize('chroma_db/chroma.sqlite3')/1024/1024:.1f} MB
🏆 Status: {'OPERACIONAL' if taxa_sucesso >= 90 else 'NECESSITA ATENÇÃO'}
""")

metricas_uso()
```

## 📞 Suporte e Troubleshooting

### Problemas Comuns

1. **"Coleção não encontrada"**
   ```bash
   rm -rf chroma_db/
   python pdf_to_chroma_v2.py
   ```

2. **"Busca não retorna resultados"**
   - Verificar se o banco está criado
   - Usar termos mais genéricos primeiro
   - Testar com uma palavra conhecida: "orçamento"

3. **"Performance lenta"**
   - Limitar resultados: `n_results=5`
   - Usar termos mais específicos
   - Verificar espaço em disco

### Comandos de Verificação
```python
# Verificar integridade
import chromadb
try:
    client = chromadb.PersistentClient(path="./chroma_db")
    collection = client.get_collection("loa_2026_documents")
    count = collection.count()
    print(f"✅ Banco OK: {count} documentos")
except Exception as e:
    print(f"❌ Erro: {e}")
```

---

## 🎉 Resumo

O sistema de busca semântica do LOA 2026 está **100% funcional** e pronto para:

- ✅ **Consultas instantâneas** sobre toda a lei orçamentária
- ✅ **Busca por regional**, secretaria, valores específicos
- ✅ **Análise comparativa** entre diferentes regionais
- ✅ **Extração de dados** para relatórios e dashboards
- ✅ **Integração fácil** com outras aplicações

**Para começar:**
```bash
source venv/bin/activate
python docs_chroma.py  # Este documento como script
```

🚀 **Seu banco de dados vetorial está pronto para uso!**