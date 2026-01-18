<div align="center">

# 🏛️ Fortaleza Transparente - PLOA 2026

**Uma plataforma interativa de transparência pública para visualização do Orçamento Anual de Fortaleza**

[![CI](https://github.com/tiagoggl12/fortaleza-transparente-ploa-2026/workflows/CI/badge.svg)](https://github.com/tiagoggl12/fortaleza-transparente-ploa-2026/actions/workflows/ci.yml)
[![Deploy](https://github.com/tiagoggl12/fortaleza-transparente-ploa-2026/workflows/Deploy%20to%20GitHub%20Pages/badge.svg)](https://github.com/tiagoggl12/fortaleza-transparente-ploa-2026/actions/workflows/deploy.yml)
[![Code Quality](https://github.com/tiagoggl12/fortaleza-transparente-ploa-2026/workflows/Code%20Quality/badge.svg)](https://github.com/tiagoggl12/fortaleza-transparente-ploa-2026/actions/workflows/code-quality.yml)
[![License](https://img.shields.io/github/license/tiagoggl12/fortaleza-transparente-ploa-2026)](LICENSE)

**[🌐 Visite o site](https://tiagoggl12.github.io/fortaleza-transparente-ploa-2026/)** • **[📊 Dados da LOA 2026](#fonte-dos-dados)**

</div>

---

## 📋 Sobre o Projeto

O **Fortaleza Transparente - PLOA 2026** é um aplicativo web interativo que torna o Orçamento Anual de Fortaleza acessível a todos os cidadãos. Através de visualizações claras e intuitivas, qualquer pessoa pode entender como os recursos públicos são distribuídos e aplicados.

### 🎯 Objetivos

- **Transparência**: Tornar o orçamento público acessível e compreensível
- **Educação**: Explicar conceitos orçamentários de forma didática
- **Participação**: Incentivar a participação cidadã no acompanhamento das verbas
- **Visualização**: Apresentar dados complexos de forma visual e interativa

### ✨ Funcionalidades

| Funcionalidade | Descrição |
|----------------|-----------|
| **Visão Geral** | Resumo executivo com destaque para as unidades com maior orçamento |
| **Receitas** | Breakdown das fontes de receita (fiscal, previdenciária, operações de crédito) |
| **Despesas** | Distribuição por secretarias e programas governamentais |
| **Regional** | Investimentos distribuídos pelas 12 regiões da cidade |
| **Participativo** | Métricas de participação social e orçamento participativo |
| **Glossário Interativo** | Definições contextuais de termos técnicos |

---

## 🚀 Demonstração

O projeto está publicado em: **[https://tiagoggl12.github.io/fortaleza-transparente-ploa-2026/](https://tiagoggl12.github.io/fortaleza-transparente-ploa-2026/)**

---

## 🛠️ Stack Tecnológico

- **Framework**: [React 19](https://react.dev/) com TypeScript
- **Build**: [Vite 6](https://vitejs.dev/)
- **Gráficos**: [Recharts](https://recharts.org/)
- **Ícones**: [Lucide React](https://lucide.dev/)
- **Estado**: [Zustand](https://zustand-demo.pmnd.rs/)
- **Estilos**: CSS Modules com Tailwind via CDN
- **Qualidade**: ESLint, Prettier, TypeScript

---

## 📦 Instalação

### Pré-requisitos

- Node.js 22+
- npm ou yarn

### Passos

```bash
# Clone o repositório
git clone https://github.com/tiagoggl12/fortaleza-transparente-ploa-2026.git
cd fortaleza-transparente-ploa-2026

# Instale as dependências
npm install

# Copie o arquivo de ambiente (opcional)
cp .env.example .env.local
```

---

## 🏃 Desenvolvimento

```bash
# Inicie o servidor de desenvolvimento
npm run dev

# Abra http://localhost:3000
```

### Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia servidor de desenvolvimento (porta 3000) |
| `npm run build` | Build para produção |
| `npm run preview` | Preview do build de produção |
| `npm run typecheck` | Verificação de tipos TypeScript |
| `npm run lint` | Análise de código ESLint |
| `npm run lint:fix` | Corrige problemas automaticamente |
| `npm run format` | Formata código com Prettier |
| `npm run ci:local` | Executa verificações de CI localmente |

---

## 🏗️ Estrutura do Projeto

```
fortaleza-transparente-ploa-2026/
├── .github/
│   └── workflows/       # CI/CD com GitHub Actions
├── components/          # Componentes React
│   └── glossary/       # Componentes do glossário interativo
├── scripts/            # Scripts de automação
├── App.tsx             # Componente principal
├── constants.ts        # Dados do orçamento (fonte única)
├── types.ts            # Definições TypeScript
└── vite.config.ts      # Configuração do Vite
```

### Arquitetura

O projeto segue uma arquitetura **pura de frontend**:

- **Sem backend**: Todos os dados estão em `constants.ts`
- **State management**: Zustand para estado global (view ativa)
- **Routing**: Baseado em views (`activeView` state)
- **Dados**: Tipados com TypeScript interfaces

---

## 📊 Fonte dos Dados

Todos os dados do orçamento provêm do documento oficial:

**[Arquivo completo LOA 2026](./Arquivo%20completo%20LOA%202026/LOA-2026-numerado.pdf)**

- Lei Orçamentária Anual de Fortaleza
- Exercício de 2026
- Documento oficial da Prefeitura de Fortaleza

### Atualização dos Dados

Para atualizar os dados do orçamento:

1. Abra `constants.ts`
2. Atualize os valores conforme o documento oficial
3. Mantenha a consistência entre totais e parcelas
4. Execute `npm run typecheck` para verificar tipos

---

## 🧪 Testes

```bash
# Testes unitários
npm run test

# Testes E2E
npm run test:e2e

# Testes com interface visual
npm run test:ui
```

---

## 🚢 Deploy

O deploy é automático via GitHub Actions ao fazer push para `main`.

### Deploy Manual

```bash
# Build
npm run build

# Preview local
npm run preview
```

### Variáveis de Ambiente

| Variável | Descrição |
|----------|-----------|
| `GEMINI_API_KEY` | Chave da API Gemini (opcional, não utilizada atualmente) |

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:

1. Fazer um fork do projeto
2. Criar uma branch para sua feature (`git checkout -b feature/NovaFuncionalidade`)
3. Commit suas mudanças (`git commit -m 'feat: adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abrir um Pull Request

### Convenções de Commit

Seguimos [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` Nova funcionalidade
- `fix:` Correção de bug
- `docs:` Mudanças na documentação
- `style:` Formatação (sem mudança lógica)
- `refactor:` Refatoração de código
- `perf:` Melhoria de performance
- `test:` Adição de testes
- `chore:` Tarefas de manutenção

---

## 📞 Contato

- **GitHub Issues**: [Reportar problemas](https://github.com/tiagoggl12/fortaleza-transparente-ploa-2026/issues)
- **Pull Requests**: [Contribuir](https://github.com/tiagoggl12/fortaleza-transparente-ploa-2026/pulls)

---

<div align="center">

**Feito com ❤️ para a cidade de Fortaleza**

[⬆ Voltar ao topo](#-fortaleza-transparente---ploa-2026)

</div>
