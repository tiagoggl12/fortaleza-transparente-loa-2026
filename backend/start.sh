#!/bin/bash

# Script de inicialização da API LOA 2026 Semantic Search

set -e

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Diretórios
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
VENV_DIR="$PROJECT_ROOT/venv"

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}LOA 2026 Semantic Search API${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# Verifica Python
if ! command -v python3 &> /dev/null; then
    echo -e "${RED}ERRO: Python 3 não encontrado${NC}"
    exit 1
fi

PYTHON_VERSION=$(python3 --version | cut -d' ' -f2)
echo -e "${GREEN}Python encontrado:${NC} $PYTHON_VERSION"

# Cria virtual environment se não existe
if [ ! -d "$VENV_DIR" ]; then
    echo -e "${YELLOW}Criando virtual environment...${NC}"
    python3 -m venv "$VENV_DIR"
fi

# Ativa virtual environment
echo -e "${YELLOW}Ativando virtual environment...${NC}"
source "$VENV_DIR/bin/activate"

# Instala dependências
echo -e "${YELLOW}Verificando dependências...${NC}"
pip install -q --upgrade pip
pip install -q -r "$SCRIPT_DIR/requirements.txt"

# Verifica GEMINI_API_KEY
if [ -z "$GEMINI_API_KEY" ]; then
    if [ -f "$PROJECT_ROOT/.env" ]; then
        export $(grep -v '^#' "$PROJECT_ROOT/.env" | xargs)
    fi
fi

if [ -z "$GEMINI_API_KEY" ]; then
    echo -e "${RED}ERRO: GEMINI_API_KEY não encontrada!${NC}"
    echo "Configure no arquivo .env ou exporte a variável de ambiente."
    exit 1
fi

echo -e "${GREEN}GEMINI_API_KEY configurada ✓${NC}"

# Verifica PDF
PDF_PATH="$PROJECT_ROOT/Arquivo completo LOA 2026/LOA-2026-numerado.pdf"
if [ ! -f "$PDF_PATH" ]; then
    echo -e "${YELLOW}AVISO: PDF não encontrado em: $PDF_PATH${NC}"
else
    echo -e "${GREEN}PDF encontrado ✓${NC}"
fi

# Inicia API
echo ""
echo -e "${GREEN}Iniciando API em http://localhost:8000${NC}"
echo -e "${BLUE}API docs disponíveis em: http://localhost:8000/docs${NC}"
echo ""
echo "Pressione Ctrl+C para parar"
echo ""

cd "$SCRIPT_DIR"
python3 main.py
