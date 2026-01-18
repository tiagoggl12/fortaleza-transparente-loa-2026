export interface ConceitoOrçamentário {
  id: string;                    // slug único: "receita-corrente"
  term: string;                  // "Receita Corrente"
  essencial: string;             // "Dinheiro do dia a dia da prefeitura"
  detalhado: string;            // Explicação completa com exemplos
  exemplos: string[];            // ["Seu IPTU ajuda a pagar professores"]
  impactoReal: string;           // "Isso financia escolas e hospitais"
  categoria: 'receitas' | 'despesas' | 'gerais' | 'regionais';
  relacionadoCom: string[];      // IDs de conceitos relacionados
  tags: string[];               // ["cotidiano", "tributos", "cidadão"]
  complexidade: 'essencial' | 'detalhado';
}

export interface CategoriaGlossario {
  id: string;
  nome: string;
  descricao: string;
  icone: string;
  cor: string;
}

export interface EstadoGlossario {
  // UI State
  ativo: boolean;
  termoBusca: string;
  categoriaSelecionada: string;
  conceitoAtual: string | null;
  
  // Progresso Usuário
  conceitosVisitados: Set<string>;
  favoritos: Set<string>;
  nivelAtual: 'essencial' | 'detalhado';
}