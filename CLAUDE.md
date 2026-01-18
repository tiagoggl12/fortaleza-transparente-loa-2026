# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Fortaleza Transparente - PLOA 2026 is a React-based civic tech dashboard visualizing Fortaleza's 2026 Annual Budget Law (Projeto de Lei Orçamentária Anual). The app helps citizens understand public fund allocation through interactive charts and educational content.

**Tech Stack:** React 19, TypeScript, Vite 6, Recharts (charts), Lucide React (icons), Tailwind CSS (via CDN)

## Development Commands

```bash
# Install dependencies
npm install

# Development server (runs on port 3000)
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

The app requires a `GEMINI_API_KEY` in `.env.local` (configured but not currently used in code).

## Architecture

### Pure Frontend Application
No backend — all budget data is hardcoded in [constants.ts](constants.ts). This is intentional for transparency and simplicity.

### View-Based Navigation
The app uses a simple view-switching pattern via `activeView` state in [App.tsx](App.tsx:24). Five views map to `ViewType` in [types.ts](types.ts:35):
- `overview` — Budget summary with top units
- `revenue` — Revenue sources breakdown
- `expense` — Spending by secretaries and programs
- `regional` — Investment across 12 city regions
- `participatory` — Social participation metrics

Each view is a separate component in [components/](components/) that receives data from `constants.ts`.

### Data Structure
All budget data lives in [constants.ts](constants.ts):
- `TOTAL_BUDGET`, `FISCAL_BUDGET`, `SOCIAL_SECURITY_BUDGET` — Core totals
- `REVENUES` — Revenue categories with values
- `BUDGET_UNITS` — Top municipal units by allocation
- `PROGRAMS` — Government programs with fiscal/social split
- `REGIONALS` — All 12 city regions with neighborhoods and projects

TypeScript interfaces are defined in [types.ts](types.ts).

### Educational Tooltips Pattern
[InfoTooltip.tsx](components/InfoTooltip.tsx) provides contextual definitions for budget terms. Usage:
```tsx
<InfoTooltip term="Receita Corrente" definition="Revenue from ongoing operations...">
  <span>optional custom element</span>
</InfoTooltip>
```

### Currency Formatting
The app uses Brazilian Real (BRL) formatting. When displaying currency, use:
```tsx
new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
```

## Localization
All UI text is in Brazilian Portuguese. Currency is formatted as BRL (R$).

## Adding New Budget Data
1. Update values in [constants.ts](constants.ts)
2. Ensure totals match across related arrays
3. Update TypeScript interfaces in [types.ts](types.ts) if adding new fields
4. Source document: "Arquivo completo LOA 2026/" contains the original budget PDF
