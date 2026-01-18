#!/bin/bash
# Run CI checks locally before pushing
# This simulates what GitHub Actions CI will run

set -euo pipefail

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Track results
FAILED=()
PASSED=()

# Function to run a check
run_check() {
    local name=$1
    local command=$2

    echo -e "${BLUE}▶${NC} $name..."
    if eval "$command"; then
        echo -e "${GREEN}✓${NC} $name passed"
        PASSED+=("$name")
        return 0
    else
        echo -e "${RED}✗${NC} $name failed"
        FAILED+=("$name")
        return 1
    fi
}

echo "🔄 Running CI checks locally..."
echo "===================================="
echo ""

# Run all checks
run_check "TypeScript Type Check" "npm run typecheck"
echo ""
run_check "ESLint" "npm run lint"
echo ""
run_check "Prettier Format Check" "npm run format:check"
echo ""
run_check "Build" "npm run build"
echo ""

# Optional: run tests if they exist
if grep -q '"test"' package.json; then
    run_check "Tests" "npm run test"
    echo ""
fi

# Summary
echo "===================================="
echo ""
if [ ${#FAILED[@]} -eq 0 ]; then
    echo -e "${GREEN}✅ All checks passed!${NC}"
    echo ""
    echo "You can safely push your changes."
    exit 0
else
    echo -e "${RED}❌ Some checks failed:${NC}"
    for check in "${FAILED[@]}"; do
        echo "  - $check"
    done
    echo ""
    echo "Please fix the issues before pushing."
    exit 1
fi
