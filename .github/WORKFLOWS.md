# CI/CD Automation Documentation

This document describes the GitHub Actions workflows and automation scripts for Fortaleza Transparente - PLOA 2026.

## Overview

The project uses GitHub Actions for continuous integration, deployment, and automation. Workflows are organized by purpose and can be triggered manually or automatically.

## Workflows

### CI Workflow (`ci.yml`)

**Trigger**: Push to `main` or `develop`, pull requests

**Jobs**:
- `quality` - TypeScript type checking, ESLint, Prettier format check
- `build` - Production build with artifact upload
- `security` - npm audit and TruffleHog secret scanning

### Test Workflow (`test.yml`)

**Trigger**: Push to `main` or `develop`, pull requests

**Jobs**:
- `unit` - Unit and component tests with coverage
- `component` - Component tests with different browsers
- `visual` - Visual regression tests

### E2E Workflow (`e2e.yml`)

**Trigger**: Push to `main` or `develop`, pull requests, weekly schedule

**Jobs**:
- `e2e` - Playwright end-to-end tests (chromium, firefox, webkit)
- `smoke` - Smoke tests after deployment
- `performance` - Performance E2E tests

### Release Workflow (`release.yml`)

**Trigger**: Push to `main`

**Jobs**:
- `release` - Semantic release with changelog
- `docker-release` - Docker image build and push
- `notify` - Release notifications

**Features**:
- Automatic version bumping based on commit messages
- Changelog generation
- GitHub Release creation
- Docker image with versioned tags

### Performance & Accessibility Workflow (`performance.yml`)

**Trigger**: Push to `main` or `develop`, pull requests, weekly schedule

**Jobs**:
- `lighthouse` - Lighthouse CI with performance budgets
- `accessibility` - axe-core accessibility tests
- `bundle-size` - Bundle size analysis
- `core-web-vitals` - PageSpeed Insights monitoring

### Code Quality Workflow (`code-quality.yml`)

**Trigger**: Push to `main` or `develop`, pull requests, weekly schedule

**Jobs**:
- `analyze` - ESLint, SonarCloud, code complexity
- `dependencies` - npm audit, outdated check, license compliance
- `security` - Trivy, CodeQL, Snyk, Semgrep, OWASP
- `secrets` - TruffleHog and Gitleaks scanning
- `coverage` - Coveralls and Codecov integration

### Dependency Management Workflow (`dependencies.yml`)

**Trigger**: Weekly schedule, manual dispatch

**Jobs**:
- `update` - Automated dependency updates with PR creation
- `security-audit` - npm audit with GitHub issue creation
- `license-check` - License compliance verification
- `outdated-check` - Outdated packages report

### Docker Build Workflow (`docker.yml`)

**Trigger**: Push to `main`, tags, pull requests

**Jobs**:
- `build` - Multi-platform Docker build with Trivy scanning

### Deploy Workflow (`deploy.yml`)

**Trigger**: Push to `main`, manual dispatch

**Jobs**:
- `deploy` - Deploy to GitHub Pages

## Commit Convention

For semantic-release to work correctly, follow conventional commits:

```
feat: add new feature
fix: fix bug
docs: update documentation
style: format code (no logic change)
refactor: refactor code
perf: performance improvement
test: add/update tests
chore: maintenance tasks
ci: CI/CD changes
build: build system changes
```

## Development Scripts

### Setup
```bash
npm run setup
# or
./scripts/setup-dev.sh
```

### Run CI Locally
```bash
npm run ci:local
# or
./scripts/ci-locally.sh
```

### Create Release
```bash
npm run release
# or
./scripts/release.sh
```

## Renovate Configuration

The project uses Renovate Bot for dependency updates. Configure options in `renovate.json`:

- Weekly updates on Sundays
- Automatic merging for non-major dev dependencies
- Grouped updates for related packages
- Separate PRs for major updates

## Required Secrets

Add these secrets in GitHub repository settings:

| Secret | Purpose | Required |
|--------|---------|----------|
| `GITHUB_TOKEN` | GitHub API (built-in) | Yes |
| `CODECOV_TOKEN` | Codecov coverage | Optional |
| `LHCI_GITHUB_APP_TOKEN` | Lighthouse CI | Optional |
| `PAGESPEED_API_KEY` | PageSpeed Insights | Optional |
| `SONAR_TOKEN` | SonarCloud analysis | Optional |
| `SNYK_TOKEN` | Snyk security | Optional |

## Performance Budgets

Defined in `.github/lighthouse-budget.json`:

| Metric | Budget |
|--------|--------|
| First Contentful Paint | 2000ms |
| Largest Contentful Paint | 2500ms |
| Cumulative Layout Shift | 0.1 |
| Total Blocking Time | 300ms |
| Time to Interactive | 5000ms |
| Total Scripts | 200KB |
| Total Styles | 50KB |
| Total Images | 200KB |
| Total Fonts | 100KB |

## Workflow Badge

Add to README.md:

```markdown
![CI](https://github.com/tiagofreire/fortaleza-transparente---ploa-2026/workflows/CI/badge.svg)
```
