#!/bin/bash
set -euo pipefail

# Color output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "🚀 Setting up Fortaleza Transparente development environment..."
echo ""

# Function to check if command exists
command_exists() {
    command -v "$1" &> /dev/null
}

# Check prerequisites
echo "📋 Checking prerequisites..."

PREREQUISITES=("git" "node" "npm")
MISSING=()

for cmd in "${PREREQUISITES[@]}"; do
    if command_exists "$cmd"; then
        echo -e "${GREEN}✓${NC} $cmd is installed"
    else
        echo -e "${RED}✗${NC} $cmd is not installed"
        MISSING+=("$cmd")
    fi
done

if [ ${#MISSING[@]} -ne 0 ]; then
    echo ""
    echo -e "${RED}Error: Missing prerequisites: ${MISSING[*]}${NC}"
    echo "Please install them and try again."
    exit 1
fi

echo ""
echo -e "${GREEN}✓${NC} All prerequisites installed"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

echo ""
echo -e "${GREEN}✓${NC} Dependencies installed"
echo ""

# Setup Husky
echo "🪝 Setting up Git hooks..."
npm run prepare || true

echo ""
echo -e "${GREEN}✓${NC} Git hooks configured"
echo ""

# Setup environment variables
if [ ! -f .env.local ]; then
    echo "🔐 Creating .env.local from example..."
    cp .env.example .env.local 2>/dev/null || cat > .env.local << EOF
# Gemini API Key (optional - currently unused in code)
GEMINI_API_KEY=

# Vite configuration
VITE_API_KEY=
EOF
    echo -e "${YELLOW}⚠${NC}  Created .env.local - update it with your values if needed"
else
    echo -e "${GREEN}✓${NC} .env.local already exists"
fi

echo ""
echo "✅ Development environment setup complete!"
echo ""
echo "Quick start commands:"
echo "  npm run dev          - Start development server on port 3000"
echo "  npm run build        - Build for production"
echo "  npm run typecheck    - Run TypeScript type checking"
echo "  npm run lint         - Run ESLint"
echo "  npm run format       - Format code with Prettier"
echo ""
echo "Happy coding! 🎨"
