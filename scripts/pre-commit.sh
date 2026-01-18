#!/bin/bash
# Pre-commit hook for quality checks
# This script runs the same checks as CI to catch issues early

set -euo pipefail

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo "🔍 Running pre-commit checks..."
echo ""

# Get staged files
STAGED_FILES=$(git diff --cached --name-only --diff-filter=ACM | grep -E '\.(ts|tsx|js|jsx)$' || true)

if [ -z "$STAGED_FILES" ]; then
    echo "No TypeScript/JavaScript files staged, skipping checks."
    exit 0
fi

echo "Staged files:"
echo "$STAGED_FILES"
echo ""

# Check formatting
echo "📐 Checking formatting..."
if ! npm run format:check; then
    echo ""
    echo -e "${RED}✗${NC} Formatting issues found."
    echo "Run ${YELLOW}npm run format${NC} to fix."
    exit 1
fi
echo -e "${GREEN}✓${NC} Formatting check passed"
echo ""

# Run linting
echo "🔎 Running linter..."
if ! npm run lint -- --quiet; then
    echo ""
    echo -e "${RED}✗${NC} Linting errors found."
    echo "Run ${YELLOW}npm run lint:fix${NC} to attempt auto-fix."
    exit 1
fi
echo -e "${GREEN}✓${NC} Linting passed"
echo ""

# Type check
echo "🔷 Type checking..."
if ! npm run typecheck; then
    echo ""
    echo -e "${RED}✗${NC} Type errors found."
    echo "Fix the type errors before committing."
    exit 1
fi
echo -e "${GREEN}✓${NC} Type check passed"
echo ""

echo -e "${GREEN}✅ All checks passed!${NC}"
exit 0
