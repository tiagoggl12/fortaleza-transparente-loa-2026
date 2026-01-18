import { ConceitoOrçamentário, CategoriaGlossario } from '../types/glossary';

export const CATEGORIAS_GLOSSARIO: CategoriaGlossario[] = [
  {
    id: 'receitas',
    nome: 'Receitas',
    descricao: 'De onde vem o dinheiro da prefeitura',
    icone: 'trending-up',
    cor: 'emerald'
  },
  {
    id: 'despesas',
    nome: 'Despesas', 
    descricao: 'Para onde vai o dinheiro público',
    icone: 'trending-down',
    cor: 'red'
  },
  {
    id: 'gerais',
    nome: 'Conceitos Gerais',
    descricao: 'Termos técnicos importantes',
    icone: 'book-open',
    cor: 'blue'
  },
  {
    id: 'regionais',
    nome: 'Investimento Regional',
    descricao: 'O dinheiro chega no seu bairro',
    icone: 'map-pin',
    cor: 'purple'
  }
];

export const GLOSSARIO_CONCEITOS: ConceitoOrçamentário[] = [
  // ===== RECEITAS =====
  {
    id: 'receita-corrente',
    term: 'Receita Corrente',
    essencial: 'Dinheiro do dia a dia da prefeitura',
    detalhado: 'São todos os recursos que financiam as atividades contínuas do município, como pagamento de salários dos servidores, manutenção de prédios públicos, compra de materiais para escolas e hospitais. Pense como o salário de uma família.',
    exemplos: [
      'R$ 100 de IPTU financiam professores e agentes de saúde',
      'O ISS de restaurantes paga médicos e enfermeiros',
      'Mantém escolas abertas e postos de saúde funcionando'
    ],
    impactoReal: 'Isso garante que escolas, hospitais e serviços básicos funcionem todos os dias em Fortaleza.',
    categoria: 'receitas',
    relacionadoCom: ['transferencias-correntes', 'impostos-municipais', 'receita-capital'],
    tags: ['cotidiano', 'essencial', 'servicos'],
    complexidade: 'essencial'
  },
  {
    id: 'transferencias-correntes',
    term: 'Transferências Correntes',
    essencial: 'Ajuda que a prefeitura recebe de Brasília e do Estado',
    detalhado: 'Dinheiro que vem da União (governo federal) e do Estado do Ceará por determinação constitucional. Inclui o FPM (Fundo de Participação dos Municípios) e parte do ICMS (imposto sobre circulação de mercadorias). É como se Fortaleza recebesse uma mesada garantida por lei.',
    exemplos: [
      'FPM: R$ 50 milhões por mês para saúde e educação',
      'ICMS: R$ 30 milhões para manutenção de vias',
      'Cota-parte da União para programas federais na cidade'
    ],
    impactoReal: 'Mais da metade do dinheiro da prefeitura vem dessas transferências, pagando grande parte dos professores e médicos.',
    categoria: 'receitas',
    relacionadoCom: ['receita-corrente', 'fpm', 'icms'],
    tags: ['governo', 'repasses', 'constitucional'],
    complexidade: 'essencial'
  },
  {
    id: 'impostos-municipais',
    term: 'Impostos, Taxas e Contribuições',
    essencial: 'O que você paga diretamente para Fortaleza',
    detalhado: 'São os tributos que o cidadão e empresas de Fortaleza pagam diretamente à prefeitura. Os principais são: IPTU (imposto sobre imóveis), ISS (imposto sobre serviços), Taxa de Lixo e Taxa de Iluminação Pública. É o dinheiro que fica 100% na cidade.',
    exemplos: [
      'IPTU: quem tem casa ou apartamento paga anualmente',
      'ISS: médicos, advogados e outros profissionais liberais pagam',
      'Taxa de Lixo: incluída na conta de água/energia'
    ],
    impactoReal: 'Esse dinheiro paga o que está mais perto de você: limpeza de rua, iluminação, conservação de prédios públicos.',
    categoria: 'receitas',
    relacionadoCom: ['receita-corrente', 'iptu', 'iss'],
    tags: ['tributos', 'cidadão', 'local'],
    complexidade: 'essencial'
  },
  {
    id: 'receita-capital',
    term: 'Receita de Capital',
    essencial: 'Dinheiro para comprar bens e fazer obras',
    detalhado: 'Recursos usados para aumentar o patrimônio da cidade: construir novas escolas, comprar ambulâncias, fazer avenidas, construir hospitais. Diferente da receita corrente que paga o dia a dia, esta investe no futuro. Vem de empréstimos, venda de bens ou transferências específicas.',
    exemplos: [
      'Empréstimo para construir novo hospital distrital',
      'Venda de terreno velho para comprar ônibus novos',
      'Transferência federal para construir pontes'
    ],
    impactoReal: 'É esse dinheiro que permite construir novas escolas, hospitais e melhorar a infraestrutura da cidade.',
    categoria: 'receitas',
    relacionadoCom: ['receita-corrente', 'operacoes-credito', 'alienacao-bens'],
    tags: ['investimento', 'obras', 'futuro'],
    complexidade: 'essencial'
  },

  // ===== DESPESAS =====
  {
    id: 'orcamento-fiscal',
    term: 'Orçamento Fiscal',
    essencial: 'Dinheiro para a administração da cidade',
    detalhado: 'Cobre todas as despesas gerais da máquina pública: educação (salários de professores, material escolar), transporte, segurança, administração municipal, manutenção de prédios. É o orçamento que mantém a cidade funcionando no dia a dia, exceto as áreas de saúde, previdência e assistência que têm orçamento próprio.',
    exemplos: [
      'Salários dos professores da rede municipal',
      'Manutenção de vias e praças públicas',
      'Segurança pública e monitoramento',
      'Conservação de prédios da prefeitura'
    ],
    impactoReal: 'Isso paga as escolas dos seus filhos, mantém as ruas limpas e conserva os espaços públicos que você usa.',
    categoria: 'despesas',
    relacionadoCom: ['seguridade-social', 'custeio-administrativo', 'unidade-orcamentaria'],
    tags: ['administracao', 'dia-a-dia', 'essencial'],
    complexidade: 'essencial'
  },
  {
    id: 'seguridade-social',
    term: 'Seguridade Social',
    essencial: 'Dinheiro "carimbado" para saúde, previdência e assistência',
    detalhado: 'Recursos que por lei só podem ser usados em três áreas: Saúde (hospitais, postos de saúde, médicos), Previdência (aposentadorias dos servidores) e Assistência Social (programas para famílias carentes). Não pode ser desviado para outras áreas nem mesmo em caso de emergência. É um dinheiro protegido.',
    exemplos: [
      'Hospitais e postos de saúde funcionando 24h',
      'Aposentadoria dos servidores municipais',
      'Programas sociais como Auxílio Brasil municipal',
      'Medicamentos e tratamentos para população'
    ],
    impactoReal: 'Garante que sempre haverá dinheiro para hospitais, médicos e ajuda para famílias em situação de vulnerabilidade.',
    categoria: 'despesas',
    relacionadoCom: ['orcamento-fiscal', 'fundo-saude', 'fundo-assistencia'],
    tags: ['protegido', 'saude', 'social'],
    complexidade: 'essencial'
  },
  {
    id: 'unidade-orcamentaria',
    term: 'Unidade Orçamentária',
    essencial: 'Órgão que gerencia parte do dinheiro',
    detalhado: 'É cada Secretaria, Fundo ou Autarquia que recebe dinheiro para executar seus projetos. Por exemplo: Fundo Municipal de Educação (gerencia o dinheiro das escolas), Fundo Municipal de Saúde (gerencia hospitais), Secretaria de Infraestrutura (gerencia obras). Cada uma tem seu "cheque especial" para sua área.',
    exemplos: [
      'Fundo de Educação: compra material e paga professores',
      'Fundo de Saúde: mantém hospitais e postos',
      'Secretaria de Obras: executa pavimentação e construções'
    ],
    impactoReal: 'Sabendo quem gerencia o dinheiro, você pode cobrar os responsáveis diretamente por melhorias na sua região.',
    categoria: 'despesas',
    relacionadoCom: ['orcamento-fiscal', 'secretarias', 'fundos-municipais'],
    tags: ['organizacao', 'responsabilidade', 'gestao'],
    complexidade: 'essencial'
  },

  // ===== CONCEITOS GERAIS =====
  {
    id: 'ploa',
    term: 'PLOA - Projeto de Lei Orçamentária Anual',
    essencial: 'O plano de gastos de Fortaleza para 2026',
    detalhado: 'É o documento que detalha quanto dinheiro a prefeitura espera arrecadar e como planeja gastar durante o ano inteiro. É elaborado pelo prefeito, discutido na Câmara Municipal e votado pelos vereadores. Depois de aprovado, vira Lei (LOA) e passa a valer para o ano seguinte. É a constituição financeira da cidade para 2026.',
    exemplos: [
      'Previsão: "Vamos arrecadar R$ 15 bilhões"',
      'Planejamento: "Vamos gastar R$ 3,8 bilhões em educação"',
      'Detalhamento: "Cada escola vai receber R$ 50 mil para reforma"'
    ],
    impactoReal: 'Define se sua escola vai ser reformada, se vai ter novo hospital no bairro, quanto os professores vão ganhar.',
    categoria: 'gerais',
    relacionadoCom: ['loa', 'ldo', 'ppa'],
    tags: ['planejamento', 'lei', 'anual'],
    complexidade: 'essencial'
  },
  {
    id: 'loa',
    term: 'LOA - Lei Orçamentária Anual',
    essencial: 'O plano de gastos aprovado pelos vereadores',
    detalhado: 'É o PLOA depois que a Câmara Municipal aprova e o prefeito sanciona. Transforma-se em Lei, ou seja, passa a ser obrigatório. A partir daí, a prefeitura só pode gastar o que está escrito na LOA. Qualquer mudança precisa de nova autorização da Câmara.',
    exemplos: [
      'Depois de aprovada: "Está na lei, tem que cumprir"',
      'Obrigatoriedade: "Não pode gastar fora do planejado"',
      'Controle: "Vereadores fiscalizam se está sendo cumprida"'
    ],
    impactoReal: 'Garante que o dinheiro público seja usado como prometido, sem desvios ou gastos não autorizados.',
    categoria: 'gerais',
    relacionadoCom: ['ploa', 'camara-municipal'],
    tags: ['lei', 'obrigatorio', 'controle'],
    complexidade: 'detalhado'
  },
  {
    id: 'iptu',
    term: 'IPTU - Imposto Predial e Territorial Urbano',
    essencial: 'Imposto sobre imóveis em Fortaleza',
    detalhado: 'Imposto anual que todos os proprietários de imóveis (casas, apartamentos, terrenos, salas comerciais) em Fortaleza devem pagar. O valor é calculado com base no valor venal do imóvel (valor definido pela prefeitura). Pode ser parcelado em até 10x e tem desconto para pagamento à vista.',
    exemplos: [
      'Casa popular: paga R$ 200-500 por ano',
      'Apartamento no Meireles: paga R$ 2.000-5.000 por ano',
      'Loja comercial: paga R$ 1.000-10.000 por ano'
    ],
    impactoReal: 'O IPTU que você paga financia escolas, saúde e limpeza pública da sua região.',
    categoria: 'gerais',
    relacionadoCom: ['impostos-municipais', 'receita-corrente'],
    tags: ['tributo', 'imovel', 'cidadao'],
    complexidade: 'essencial'
  },
  {
    id: 'iss',
    term: 'ISS - Imposto Sobre Serviços',
    essencial: 'Imposto sobre prestação de serviços',
    detalhado: 'Imposto que profissionais e empresas pagam quando prestam serviços em Fortaleza. Inclui médicos, advogados, engenheiros, escolas particulares, hotéis, restaurantes, academias, etc. O valor é uma porcentagem sobre o preço do serviço (geralmente 2-5%).',
    exemplos: [
      'Consulta médica de R$ 200: R$ 8 de ISS (4%)',
      'Restaurante que faturou R$ 10.000: R$ 500 de ISS',
      'Advogado com honorários de R$ 5.000: R$ 150 de ISS'
    ],
    impactoReal: 'Paga agentes de saúde, mantém ruas iluminadas e financia serviços que você usa diariamente.',
    categoria: 'gerais',
    relacionadoCom: ['impostos-municipais', 'receita-corrente'],
    tags: ['tributo', 'servicos', 'empresas'],
    complexidade: 'detalhado'
  }
];

// Mapa para lookup rápido por ID
export const conceitoPorId = GLOSSARIO_CONCEITOS.reduce((acc, conceito) => {
  acc[conceito.id] = conceito;
  return acc;
}, {} as Record<string, ConceitoOrçamentário>);

// Mapa para lookup por termo exato
export const conceitoPorTermo = GLOSSARIO_CONCEITOS.reduce((acc, conceito) => {
  acc[conceito.term] = conceito;
  return acc;
}, {} as Record<string, ConceitoOrçamentário>);