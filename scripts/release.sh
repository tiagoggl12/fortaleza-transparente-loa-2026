#!/bin/bash
# Helper script for creating releases
# This script helps create a release with proper changelog

set -euo pipefail

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Get the current version
CURRENT_VERSION=$(node -p "require('./package.json').version")

echo "📦 Release Helper"
echo "=================="
echo ""
echo "Current version: ${YELLOW}$CURRENT_VERSION${NC}"
echo ""

# Prompt for version bump
echo "Select version bump type:"
echo "  1) patch (${YELLOW}x.x.X${NC}) - Bug fixes"
echo "  2) minor (${YELLOW}x.X.x${NC}) - New features, backward compatible"
echo "  3) major (${YELLOW}X.x.x${NC}) - Breaking changes"
echo "  4) custom"
echo ""
read -p "Enter choice [1-4]: " choice

case $choice in
    1)
        BUMP="patch"
        ;;
    2)
        BUMP="minor"
        ;;
    3)
        BUMP="major"
        ;;
    4)
        read -p "Enter new version (e.g., 1.2.3): " NEW_VERSION
        ;;
    *)
        echo -e "${RED}Invalid choice${NC}"
        exit 1
        ;;
esac

if [ -z "${NEW_VERSION:-}" ]; then
    NEW_VERSION=$(npm version "$BUMP" --no-git-tag-version | sed 's/v//')
fi

echo ""
echo "New version will be: ${GREEN}$NEW_VERSION${NC}"
echo ""

# Confirm
read -p "Continue? [y/N]: " confirm
if [[ ! "$confirm" =~ ^[Yy]$ ]]; then
    echo "Cancelled."
    exit 0
fi

# Update version
npm version "$NEW_VERSION" --no-git-tag-version

# Run checks
echo ""
echo "Running pre-release checks..."
npm run typecheck
npm run lint
npm run build

# Create changelog entry
echo ""
echo "Creating CHANGELOG entry..."
cat > CHANGELOG-entry.md << EOF
## [$NEW_VERSION] - $(date +%Y-%m-%d)

### Added
-

### Changed
-

### Fixed
-

### Removed
-
EOF

echo ""
echo -e "${YELLOW}⚠${NC}  Please update CHANGELOG-entry.md with the actual changes"
echo ""
read -p "Press Enter when done..."

# Commit changes
echo ""
echo "Creating commit and tag..."
git add package.json package-lock.json CHANGELOG.md CHANGELOG-entry.md || true
git commit -m "chore(release): $NEW_VERSION"

# Create tag
git tag -a "v$NEW_VERSION" -m "Release v$NEW_VERSION"

echo ""
echo -e "${GREEN}✅ Release $NEW_VERSION created!${NC}"
echo ""
echo "Next steps:"
echo "  1. Review the commit and CHANGELOG"
echo "  2. Push with: ${YELLOW}git push && git push --tags${NC}"
echo "  3. The release workflow will automatically:"
echo "     - Build and test"
echo "     - Create GitHub Release"
echo "     - Build and push Docker image"
echo "     - Deploy to production"
