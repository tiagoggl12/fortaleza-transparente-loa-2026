
import { BudgetUnit, ProgramData, RevenueCategory, RegionalData } from './types';

// Fonte: Lei nº 11.615, de 23 de dezembro de 2025 (LOA 2026 sancionada)
export const TOTAL_BUDGET = 15991418235;
export const FISCAL_BUDGET = 9757239967;
export const SOCIAL_SECURITY_BUDGET = 6234178268;

// Anexo I — Receita por categoria econômica e origem (R$ 1,00)
export const REVENUES: RevenueCategory[] = [
  { specification: 'Receitas Correntes', value: 15157116090 },
  { specification: 'Impostos, Taxas e Contribuições', value: 3921300248 },
  { specification: 'Contribuições', value: 841176786 },
  { specification: 'Receita Patrimonial', value: 524118921 },
  { specification: 'Receita de Serviços', value: 168928787 },
  { specification: 'Transferências Correntes', value: 9088359907 },
  { specification: 'Outras Receitas Correntes', value: 613231441 },
  { specification: 'Receitas de Capital', value: 768234828 },
  { specification: 'Operações de Crédito', value: 716976312 },
  { specification: 'Amortização de Empréstimos', value: 3918155 },
  { specification: 'Alienação de Bens', value: 13749642 },
  { specification: 'Transferências de Capital', value: 33590719 },
  { specification: 'Deduções da Receita Corrente', value: -828485248 },
  { specification: 'Receitas Intraorçamentárias', value: 894552565 },
];

// Anexo II — Despesa por Unidade Orçamentária (R$ 1,00)
export const BUDGET_UNITS: BudgetUnit[] = [
  { name: 'Câmara Municipal', value: 363898545 },
  { name: 'Gabinete do Prefeito', value: 22450324 },
  { name: 'Autarquia de Trânsito (AMC)', value: 276523583 },
  { name: 'Sec. de Planejamento (SEPOG)', value: 649650203 },
  { name: 'Previdência (PREVFOR)', value: 1613372637 },
  { name: 'Sec. de Conservação e Serviços Públicos', value: 531129955 },
  { name: 'Fundo Municipal de Educação', value: 3833545305 },
  { name: 'Fundo Municipal de Saúde', value: 2966653736 },
  { name: 'Inst. Dr. José Frota (IJF)', value: 918469186 },
  { name: 'Fundo de Assistência Social', value: 122417950 },
  { name: 'Fundo de Limpeza Urbana', value: 597095538 },
  { name: 'Sec. de Governo', value: 153565131 },
  { name: 'Governança das Regionais', value: 311296799 },
  { name: 'Sec. de Infraestrutura', value: 291347960 },
  { name: 'Sec. de Finanças', value: 150909664 },
];

export const PROGRAMS: ProgramData[] = [
  { 
    id: '0001',
    name: 'Gestão e Manutenção',
    total: 5039877657,
    fiscal: 2035899883,
    social: 3003977774,
    objective: 'Garantir a continuidade dos serviços públicos e a manutenção administrativa de toda a estrutura municipal.'
  },
  { 
    id: '0042',
    name: 'Ensino Fundamental',
    total: 2696889253,
    fiscal: 2696889253,
    social: 0,
    objective: 'Promover a universalização do acesso e a melhoria da qualidade do ensino, com foco na alfabetização e tempo integral.'
  },
  { 
    id: '0119',
    name: 'Atenção Primária à Saúde',
    total: 974235557,
    fiscal: 0,
    social: 974235557,
    objective: 'Fortalecer as Unidades Básicas de Saúde, garantindo atendimento preventivo e acompanhamento familiar.'
  },
  { 
    id: '0123',
    name: 'Atenção Especializada à Saúde',
    total: 1473637351,
    fiscal: 0,
    social: 1473637351,
    objective: 'Assegurar o acesso a exames, consultas especializadas e procedimentos hospitalares de média e alta complexidade.'
  },
  { 
    id: '0132',
    name: 'Fortaleza Iluminada',
    total: 206275037,
    fiscal: 206275037,
    social: 0,
    objective: 'Modernizar o parque de iluminação pública com tecnologia LED para aumentar a segurança e eficiência energética.'
  },
  { 
    id: '0012', 
    name: 'Encargos Gerais', 
    total: 1349528326, 
    fiscal: 1322255516, 
    social: 27272810,
    objective: 'Cumprir obrigações financeiras da cidade, incluindo o pagamento de sentenças judiciais e encargos da dívida.'
  },
  { 
    id: '0052',
    name: 'Educação Infantil',
    total: 661849435,
    fiscal: 661849435,
    social: 0,
    objective: 'Expandir a rede de creches e pré-escolas, priorizando comunidades com maior vulnerabilidade social.'
  },
  { 
    id: '2123',
    name: 'Gestão Ambiental e Riscos',
    total: 812638630,
    fiscal: 812638630,
    social: 0,
    objective: 'Preservar recursos naturais e implementar infraestrutura de drenagem para prevenir riscos de inundações.'
  },
];

// Projetos por regional conforme demonstrativos de subprodutos por região da
// Lei nº 11.615/2025 (LOA 2026). Valores e regionais validados contra o texto oficial.
// Bairros por regional conforme o Decreto Municipal nº 14.899, de 31/12/2020
// (divisão de Fortaleza em 12 regionais e 39 territórios).
export const REGIONALS: RegionalData[] = [
  {
    name: 'Regional 1',
    total: 476742636,
    neighborhoods: ['Álvaro Weyne', 'Barra do Ceará', 'Carlito Pamplona', 'Cristo Redentor', 'Floresta', 'Jacarecanga', 'Jardim Guanabara', 'Jardim Iracema', 'Pirambu', 'Vila Velha'],
    projects: [
      { title: 'ETI Nossa Senhora de Fátima Reformada - Floresta', description: 'Reforma completa da escola no Território 6. Valor: R$ 4,2M.', category: 'Educação' },
      { title: 'CUCA Barra do Ceará Mantido', description: 'Manutenção do equipamento de juventude. Valor: R$ 4,1M.', category: 'Social' },
      { title: 'Espaços e Parques Públicos Mantidos/Reformados', description: 'Manutenção de áreas de lazer. Valor: R$ 3,97M.', category: 'Urbanismo' },
      { title: 'Quadra Esportiva Reformada - EM Casimiro José Lima Filho - Barra do Ceará', description: 'Reforma da quadra escolar no Território 3. Valor: R$ 1,48M.', category: 'Infraestrutura' },
      { title: 'Mini Areninha das Goiabeiras Reformada - Barra do Ceará', description: 'Reforma da arena de esportes. EP/LOM nº 1139/2025. Valor: R$ 80K.', category: 'Infraestrutura' }
    ]
  },
  {
    name: 'Regional 2',
    total: 255710324,
    neighborhoods: ['Aldeota', 'Cais do Porto', 'De Lourdes', 'Dionísio Torres', 'Joaquim Távora', 'Meireles', 'Mucuripe', 'Papicu', 'São João do Tauape', 'Varjota', 'Vicente Pinzón'],
    projects: [
      { title: 'CUCA Grande Mucuripe Construído - Cais do Porto', description: 'Novo centro de juventude no Território 9. Valor: R$ 7,3M.', category: 'Social' },
      { title: 'CEI Maria Felício Construído - Cais do Porto', description: 'Nova creche no Território 9. Valor: R$ 2,2M.', category: 'Educação' },
      { title: 'Praça da Estiva Reformada - Serviluz', description: 'Reforma completa. EP/LOM nº 1396/2025. Valor: R$ 150K.', category: 'Urbanismo' },
      { title: 'Areninha Serviluz Reformada', description: 'Reforma completa. EP/LOM nº 1407/2025. Valor: R$ 100K.', category: 'Infraestrutura' },
      { title: 'CUCA Vicente Pinzon Reformado', description: 'Reforma do centro urbano. EP/LOM nº 1405/2025. Valor: R$ 50K.', category: 'Social' }
    ]
  },
  {
    name: 'Regional 3',
    total: 276734864,
    neighborhoods: ['Amadeu Furtado', 'Antônio Bezerra', 'Ellery', 'Farias Brito', 'Monte Castelo', 'Olavo Oliveira', 'Padre Andrade', 'Parque Araxá', 'Parquelândia', 'Presidente Kennedy', 'Quintino Cunha', 'Rodolfo Teófilo', 'São Gerardo'],
    projects: [
      { title: 'UBS Anastácio Magalhães Construído', description: 'Nova unidade de saúde no Território 14. Valor: R$ 1,95M.', category: 'Saúde' },
      { title: 'UBS Construída - Antônio Bezerra', description: 'Nova unidade de saúde. EP/LOM nº 1568/2025. Valor: R$ 1M.', category: 'Saúde' },
      { title: 'Espaço Girassol Construído - Padre Andrade', description: 'Novo equipamento social. EP/LOM nº 1269/2025. Valor: R$ 550K.', category: 'Social' },
      { title: 'ETI Prof. Joaquim Francisco de Sousa Filho Reformada - Presidente Kennedy', description: 'Reforma no Território 12. Valor: R$ 350K.', category: 'Educação' },
      { title: 'Praça Reformada (Praça Tabajara - Farias Brito)', description: 'Reforma de praça. EP/LOM nº 1312/2025. Valor: R$ 300K.', category: 'Urbanismo' }
    ]
  },
  {
    name: 'Regional 4',
    total: 208751749,
    neighborhoods: ['Aeroporto', 'Benfica', 'Bom Futuro', 'Damas', 'Fátima', 'Itaoca', 'Jardim América', 'José Bonifácio', 'Montese', 'Parangaba', 'Parreão', 'Vila Peri', 'Vila União'],
    projects: [
      { title: 'Casa dos Direitos de Parangaba Mantida', description: 'Manutenção do equipamento de direitos humanos. Valor: R$ 2,43M.', category: 'Social' },
      { title: 'Areninha Parreão II Construída', description: 'Nova arena no Território 18. Valor: R$ 1,97M.', category: 'Infraestrutura' },
      { title: 'CEI Antônio Costa Mendes Construído - Vila Peri', description: 'Nova creche no Território 17. Valor: R$ 1,5M.', category: 'Educação' },
      { title: 'Escola Raimundo Soares de Souza Reformada - Vila Peri', description: 'Reforma. EP/LOM nº 1081/2025. Valor: R$ 100K.', category: 'Educação' },
      { title: 'Areninha da Lagoa da Parangaba Reformada', description: 'Reforma completa. EP/LOM nº 1421/2025. Valor: R$ 100K.', category: 'Infraestrutura' }
    ]
  },
  {
    name: 'Regional 5',
    total: 493785956,
    neighborhoods: ['Bom Jardim', 'Bonsucesso', 'Granja Lisboa', 'Granja Portugal', 'Siqueira'],
    projects: [
      { title: 'ETI Francisca Fernandes Magalhães Reformada - Bonsucesso', description: 'Reforma no Território 39. Valor: R$ 550K.', category: 'Educação' },
      { title: 'Espaço Público Urbanizado Comunidade Beira Rio - Bom Jardim', description: 'Urbanização completa. EP/LOM nº 1566/2025. Valor: R$ 500K.', category: 'Urbanismo' },
      { title: 'EEF Zacarias Florindo Construída - Granja Portugal', description: 'Nova escola no Território 39. Valor: R$ 350K.', category: 'Educação' },
      { title: 'Creche Construída - Bonsucesso', description: 'Nova creche. EP/LOM nº 1083/2025. Valor: R$ 250K.', category: 'Educação' },
      { title: 'Escola Creusa do Carmo Rocha Reformada - Granja Portugal', description: 'Reforma. EP/LOM nº 1080/2025. Valor: R$ 100K.', category: 'Educação' },
      { title: 'EMEIF Irmã Rocha Reformada', description: 'Reforma. EP/LOM nº 1134/2025. Valor: R$ 100K.', category: 'Educação' },
      { title: 'Santuário de São Pedro Construído - Praça Oliveira Sobrinho', description: 'Nova capela. EP/LOM nº 1107/2025. Valor: R$ 80K.', category: 'Social' }
    ]
  },
  {
    name: 'Regional 6',
    total: 295987059,
    neighborhoods: ['Aerolândia', 'Alto da Balança', 'Cambeba', 'Cidade dos Funcionários', 'Coaçu', 'Curió', 'Guajeru', 'Jardim das Oliveiras', 'José de Alencar', 'Lagoa Redonda', 'Messejana', 'Parque Iracema', 'Parque Manibura', 'Paupina', 'São Bento'],
    projects: [
      { title: 'CEI Lagoa Redonda Construído', description: 'Nova creche no Território 29. Valor: R$ 648,9K.', category: 'Educação' },
      { title: 'EEF São Bento Construída', description: 'Nova escola no Território 30. Valor: R$ 350K.', category: 'Educação' },
      { title: 'Equipamento Ampliado - Escola João Nogueira Juca', description: 'Ampliação. EP/LOM nº 1550/2025. Valor: R$ 279K.', category: 'Educação' },
      { title: 'Espaço Público Urbanizado Lagoa da Paupina', description: 'Urbanização. EP/LOM nº 1547/2025. Valor: R$ 100K.', category: 'Urbanismo' },
      { title: 'ETI Construída - Bairro Aerolândia', description: 'Nova escola de tempo integral. EP/LOM nº 1515/2025. Valor: R$ 40K.', category: 'Educação' },
      { title: 'Instalação de Gradil e Calçadas Rua Birmânia - São Bento', description: 'Infraestrutura urbana. EP/LOM nº 1506/2025. Valor: R$ 35K.', category: 'Infraestrutura' }
    ]
  },
  {
    name: 'Regional 7',
    total: 217330136,
    neighborhoods: ['Cidade 2000', 'Cocó', 'Edson Queiroz', 'Engenheiro Luciano Cavalcante', 'Guararapes', 'Manuel Dias Branco', 'Praia do Futuro I', 'Praia do Futuro II', 'Sabiaguaba', 'Salinas', 'Sapiranga/Coité'],
    projects: [
      { title: 'CEI Luciano Cavalcante Construído', description: 'Nova creche no Território 24. Valor: R$ 1,35M.', category: 'Educação' },
      { title: 'Urbanização Entorno Lagoa da Sapiranga', description: 'Recuperação ambiental. EP/LOM nº 1030/2025. Valor: R$ 50K.', category: 'Urbanismo' },
      { title: 'Urbanização Comunidade da Rocinha - Edson Queiroz', description: 'Urbanização. EP/LOM nº 1031/2025. Valor: R$ 50K.', category: 'Urbanismo' },
      { title: 'Quadra Esportiva Construída - Escola Irmã Simas - Sapiranga', description: 'Nova quadra. EP/LOM nº 1042/2025. Valor: R$ 50K.', category: 'Infraestrutura' },
      { title: 'Praça Árbitro Iran do Vale Reformada - Luciano Cavalcante', description: 'Reforma de praça. EP/LOM nº 1399/2025. Valor: R$ 49,1K.', category: 'Urbanismo' }
    ]
  },
  {
    name: 'Regional 8',
    total: 561487654,
    neighborhoods: ['Boa Vista', 'Dias Macedo', 'Itaperi', 'José Walter', 'Parque Dois Irmãos', 'Passaré', 'Planalto Ayrton Senna', 'Raquel de Queiroz', 'Serrinha'],
    projects: [
      { title: 'ETI Jardim Castelão Construída - Passaré', description: 'Nova escola no Território 20. Valor: R$ 3,3M.', category: 'Educação' },
      { title: 'EEF André Luís Construída - Passaré', description: 'Nova escola no Território 20. Valor: R$ 1,9M.', category: 'Educação' },
      { title: 'EEF Diogo Vital de Siqueira Reformada e Ampliada - José Walter', description: 'Ampliação no Território 21. Valor: R$ 1,55M.', category: 'Educação' },
      { title: 'Areninha na Praça 3ª Etapa José Walter Construída', description: 'Nova arena. EP/LOM nº 1403/2025. Valor: R$ 250K.', category: 'Infraestrutura' },
      { title: 'Hospital Distrital Gonzaga Mota Reformado - José Walter', description: 'Reforma hospitalar. EP/LOM nº 1006/2025. Valor: R$ 200K.', category: 'Saúde' },
      { title: 'Cultura na Calçada - Jardim União Passaré', description: 'Evento cultural. EP/LOM nº 1447/2025. Valor: R$ 50K.', category: 'Social' }
    ]
  },
  {
    name: 'Regional 9',
    total: 371475813,
    neighborhoods: ['Ancuri', 'Barroso', 'Cajazeiras', 'Conjunto Palmeiras', 'Jangurussu', 'Parque Santa Maria', 'Pedras'],
    projects: [
      { title: 'CEI Cajazeiras Construído', description: 'Nova creche no Território 31. Valor: R$ 600K.', category: 'Educação' },
      { title: 'EEF João Germano da Ponte Neto Reformada - Conjuntos Palmeiras', description: 'Reforma no Território 32. Valor: R$ 300K.', category: 'Educação' },
      { title: 'Praça do Conjunto Palmeiras Reformada e Requalificada', description: 'Reforma completa. EP/LOM nº 1112/2025. Valor: R$ 100K.', category: 'Urbanismo' },
      { title: 'Urbanização Entorno Lagoa São Cristóvão - Jangurussu', description: 'Drenagem e urbanização. EP/LOM nº 1029/2025. Valor: R$ 50K.', category: 'Urbanismo' },
      { title: 'Cultura na Calçada - Sítio São João Jangurussu', description: 'Evento cultural. EP/LOM nº 1449/2025. Valor: R$ 50K.', category: 'Social' }
    ]
  },
  {
    name: 'Regional 10',
    total: 406676210,
    neighborhoods: ['Aracapé', 'Canindezinho', 'Conjunto Esperança', 'Jardim Cearense', 'Maraponga', 'Mondubim', 'Novo Mondubim', 'Parque Santa Rosa', 'Parque São José', 'Presidente Vargas', 'Vila Manoel Sátiro'],
    projects: [
      { title: 'UBS Parque Santana Construído - Mondubim', description: 'Novo posto de saúde no Território 35. Valor: R$ 3M.', category: 'Saúde' },
      { title: 'Praça Vila Manoel Sátiro Reformada', description: 'Reforma completa. EP/LOM nº 1210/2025. Valor: R$ 174,8K.', category: 'Urbanismo' },
      { title: 'Escola João Nogueira Juca Reformada - Parque Santa Rosa', description: 'Reforma. EP/LOM nº 1531/2025. Valor: R$ 100K.', category: 'Educação' },
      { title: 'Quadra Esportiva Reformada - Escola Viviane Benevides', description: 'Reforma. EP/LOM nº 1102/2025. Valor: R$ 50K.', category: 'Infraestrutura' },
      { title: 'Reforma Praça Igreja N.Sra. das Graças - Vila Manoel Sátiro', description: 'Reforma. EP/LOM nº 1165/2025. Valor: R$ 40K.', category: 'Urbanismo' },
      { title: 'Reforma Areninha Campo São Paulo - Vila Manoel Sátiro', description: 'Reforma. EP/LOM nº 1179/2025. Valor: R$ 40K.', category: 'Infraestrutura' }
    ]
  },
  {
    name: 'Regional 11',
    total: 397606081,
    neighborhoods: ['Autran Nunes', 'Bela Vista', 'Conjunto Ceará I', 'Conjunto Ceará II', 'Couto Fernandes', 'Demócrito Rocha', 'Dom Lustosa', 'Genibaú', 'Henrique Jorge', 'João XXIII', 'Jóquei Clube', 'Panamericano', 'Pici'],
    projects: [
      { title: 'Areninha João XXIII Construída', description: 'Nova arena no Território 37. Valor: R$ 4M.', category: 'Infraestrutura' },
      { title: 'ETI Prof. Ademar Nunes Batista Reformada - Conjunto Ceará', description: 'Reforma da escola no Território 38. Valor: R$ 2M.', category: 'Educação' },
      { title: 'CEI Autran Nunes Construído', description: 'Nova creche no Território 37. Valor: R$ 475K.', category: 'Educação' },
      { title: 'Equipamento Público Construído Regional 11', description: 'Novos equipamentos. EP/LOM nº 1163/2025. Valor: R$ 147,7K.', category: 'Social' },
      { title: 'Reforma Lavanderia Comunitária Lourdes Ary - Pici', description: 'Reforma completa. EP/LOM nº 1188/2025. Valor: R$ 100K.', category: 'Social' }
    ]
  },
  {
    name: 'Regional 12',
    total: 59402590,
    neighborhoods: ['Centro', 'Moura Brasil', 'Praia de Iracema'],
    projects: [
      { title: 'Casa dos Direitos do Centro Mantida', description: 'Manutenção do equipamento de direitos humanos. Valor: R$ 1,43M.', category: 'Social' },
      { title: 'UTI do Hospital IJF Reformada', description: 'Reforma da UTI no Território 1. Valor: R$ 660,9K.', category: 'Saúde' },
      { title: 'Reforma e Restauração da Igreja do Rosário - Centro', description: 'Restauração. EP/LOM nº 1160/2025. Valor: R$ 500K.', category: 'Urbanismo' },
      { title: 'Revitalização Cultural do Centro', description: 'Intervenções culturais no Centro Histórico (escopo municipal). Valor: R$ 100K.', category: 'Social' },
      { title: 'Escola Jesus, Maria e José Conservada', description: 'Conservação patrimonial (escopo municipal). Valor: R$ 100K.', category: 'Educação' }
    ]
  },
];
