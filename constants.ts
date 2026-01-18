
import { BudgetUnit, ProgramData, RevenueCategory, RegionalData } from './types';

export const TOTAL_BUDGET = 15991418235;
export const FISCAL_BUDGET = 9779974931;
export const SOCIAL_SECURITY_BUDGET = 6211443304;

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
  { specification: 'Alienação de Bens', value: 13749642 },
];

export const BUDGET_UNITS: BudgetUnit[] = [
  { name: 'Câmara Municipal', value: 363898545 },
  { name: 'Gabinete do Prefeito', value: 22450324 },
  { name: 'Autarquia de Trânsito (AMC)', value: 274743583 },
  { name: 'Sec. de Planejamento (SEPOG)', value: 649650203 },
  { name: 'Previdência (PREVFOR)', value: 1613372637 },
  { name: 'Sec. de Conservação e Serviços Públicos', value: 530779955 },
  { name: 'Fundo Municipal de Educação', value: 3833205305 },
  { name: 'Fundo Municipal de Saúde', value: 2962721023 },
  { name: 'Inst. Dr. José Frota (IJF)', value: 917144186 },
  { name: 'Fundo de Assistência Social', value: 117499980 },
  { name: 'Fundo de Limpeza Urbana', value: 597020538 },
  { name: 'Sec. de Governo', value: 153965131 },
  { name: 'Governança das Regionais', value: 304061747 },
  { name: 'Sec. de Infraestrutura', value: 270290985 },
  { name: 'Sec. de Finanças', value: 150909664 },
];

export const PROGRAMS: ProgramData[] = [
  { 
    id: '0001', 
    name: 'Gestão e Manutenção', 
    total: 5038935657, 
    fiscal: 2035422883, 
    social: 3003512774,
    objective: 'Garantir a continuidade dos serviços públicos e a manutenção administrativa de toda a estrutura municipal.'
  },
  { 
    id: '0042', 
    name: 'Ensino Fundamental', 
    total: 2693655253, 
    fiscal: 2693655253, 
    social: 0,
    objective: 'Promover a universalização do acesso e a melhoria da qualidade do ensino, com foco na alfabetização e tempo integral.'
  },
  { 
    id: '0119', 
    name: 'Atenção Primária à Saúde', 
    total: 969136415, 
    fiscal: 0, 
    social: 969136415,
    objective: 'Fortalecer as Unidades Básicas de Saúde, garantindo atendimento preventivo e acompanhamento familiar.'
  },
  { 
    id: '0123', 
    name: 'Atenção Especializada à Saúde', 
    total: 1466590496, 
    fiscal: 0, 
    social: 1466590496,
    objective: 'Assegurar o acesso a exames, consultas especializadas e procedimentos hospitalares de média e alta complexidade.'
  },
  { 
    id: '0132', 
    name: 'Fortaleza Iluminada', 
    total: 206185037, 
    fiscal: 206185037, 
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
    total: 660649435, 
    fiscal: 660649435, 
    social: 0,
    objective: 'Expandir a rede de creches e pré-escolas, priorizando comunidades com maior vulnerabilidade social.'
  },
  { 
    id: '2123', 
    name: 'Gestão Ambiental e Riscos', 
    total: 809027204, 
    fiscal: 809027204, 
    social: 0,
    objective: 'Preservar recursos naturais e implementar infraestrutura de drenagem para prevenir riscos de inundações.'
  },
];

export const REGIONALS: RegionalData[] = [
  {
    name: 'Regional 1',
    total: 476742636,
    neighborhoods: ['Barra do Ceará', 'Vila Velha', 'Cristo Redentor', 'Pirambu', 'Floresta', 'Álvaro Weyne'],
    projects: [
      { title: 'ETI Nossa Senhora de Fátima Reformada - Floresta', description: 'Reforma completa da escola no Território 6. Valor: R$ 4,2M.', category: 'Educação' },
      { title: 'EEF Diogo Vital de Siqueira Reformada e Ampliada - José Walter', description: 'Ampliação da escola no Território 21. Valor: R$ 1,55M.', category: 'Educação' },
      { title: 'Escola João Nogueira Juca Reformada - Parque Santa Rosa', description: 'Reforma completa. EP/LOM nº 1531/2025. Valor: R$ 100K.', category: 'Educação' },
      { title: 'Mini Areninha das Goiabeiras Reformada - Barra do Ceará', description: 'Reforma da arena de esportes. EP/LOM nº 1139/2025. Valor: R$ 80K.', category: 'Infraestrutura' },
      { title: 'Espaços e Parques Públicos Mantidos/Reformados', description: 'Manutenção de áreas de lazer. Valor: R$ 3,97M.', category: 'Urbanismo' }
    ]
  },
  {
    name: 'Regional 2',
    total: 255710324,
    neighborhoods: ['Meireles', 'Aldeota', 'Mucuripe', 'Papicu', 'Varjota', 'Cais do Porto'],
    projects: [
      { title: 'CEI Maria Felício Construído - Cais do Porto', description: 'Nova creche no Território 9. Valor: R$ 2,2M.', category: 'Educação' },
      { title: 'Praça da Estiva Reformada - Serviluz', description: 'Reforma completa. EP/LOM nº 1396/2025. Valor: R$ 150K.', category: 'Urbanismo' },
      { title: 'Praça Árbitro Iran do Vale Reformada - Luciano Cavalcante', description: 'Reforma de praça. EP/LOM nº 1399/2025. Valor: R$ 100K.', category: 'Urbanismo' },
      { title: 'CUCA Vicente Pinzon Reformado', description: 'Reforma do centro urbano. EP/LOM nº 1405/2025. Valor: R$ 50K.', category: 'Social' },
      { title: 'Areninha Serviluz Reformada', description: 'Reforma completa. EP/LOM nº 1407/2025. Valor: R$ 100K.', category: 'Infraestrutura' }
    ]
  },
  {
    name: 'Regional 3',
    total: 276734864,
    neighborhoods: ['Antônio Bezerra', 'Pici', 'Parquelândia', 'Amadeu Furtado', 'Padre Andrade'],
    projects: [
      { title: 'ETI Francisca Fernandes Magalhães Reformada - Bonsucesso', description: 'Reforma no Território 39. Valor: R$ 3,3M.', category: 'Educação' },
      { title: 'ETI Prof. Joaquim Francisco de Sousa Filho Reformada - Presidente Kennedy', description: 'Reforma no Território 12. Valor: R$ 350K.', category: 'Educação' },
      { title: 'Reforma Lavanderia Comunitária Lourdes Ary - Pici', description: 'Reforma completa. EP/LOM nº 1188/2025. Valor: R$ 300K.', category: 'Social' },
      { title: 'Praça Vila Manoel Sátiro Reformada', description: 'Reforma completa. EP/LOM nº 1210/2025. Valor: R$ 300K.', category: 'Urbanismo' },
      { title: 'Praça Reformada (Praça Tabajara - Farias Brito)', description: 'Reforma de praça. EP/LOM nº 1312/2025. Valor: R$ 300K.', category: 'Urbanismo' }
    ]
  },
  {
    name: 'Regional 4',
    total: 208751749,
    neighborhoods: ['Benfica', 'Fátima', 'Montese', 'Parangaba', 'Vila União'],
    projects: [
      { title: 'Escola Creusa do Carmo Rocha Reformada - Granja Portugal', description: 'Reforma completa. EP/LOM nº 1080/2025. Valor: R$ 1,41M.', category: 'Educação' },
      { title: 'Escola Raimundo Soares de Souza Reformada - Vila Peri', description: 'Reforma completa. EP/LOM nº 1081/2025. Valor: R$ 1,41M.', category: 'Educação' },
      { title: 'EMEIF Irmã Rocha Reformada', description: 'Reforma completa. EP/LOM nº 1134/2025. Valor: R$ 1,41M.', category: 'Educação' },
      { title: 'Areninha Parreão II Construída', description: 'Nova arena no Território 18. Valor: R$ 1,97M.', category: 'Infraestrutura' },
      { title: 'Areninha da Lagoa da Parangaba Reformada', description: 'Reforma completa. EP/LOM nº 1421/2025. Valor: R$ 100K.', category: 'Infraestrutura' }
    ]
  },
  {
    name: 'Regional 5',
    total: 493785956,
    neighborhoods: ['Conjunto Ceará', 'Granja Lisboa', 'Granja Portugal', 'Bom Jardim', 'Siqueira'],
    projects: [
      { title: 'EEF João Germano da Ponte Neto Reformada - Conjuntos Palmeiras', description: 'Reforma no Território 32. Valor: R$ 550K.', category: 'Educação' },
      { title: 'EEF Zacarias Florindo Construída - Granja Portugal', description: 'Nova escola no Território 39. Valor: R$ 350K.', category: 'Educação' },
      { title: 'Creche Construída - Bonsucesso', description: 'Nova creche. EP/LOM nº 1083/2025. Valor: R$ 250K.', category: 'Educação' },
      { title: 'Espaço Público Urbanizado Comunidade Beira Rio - Bom Jardim', description: 'Urbanização completa. EP/LOM nº 1566/2025. Valor: R$ 500K.', category: 'Urbanismo' },
      { title: 'Santuário de São Pedro Construído - Praça Oliveira Sobrinho', description: 'Nova capela. EP/LOM nº 1107/2025. Valor: R$ 80K.', category: 'Social' }
    ]
  },
  {
    name: 'Regional 6',
    total: 295987059,
    neighborhoods: ['Messejana', 'Lagoa Redonda', 'Cidade dos Funcionários', 'Jardim das Oliveiras'],
    projects: [
      { title: 'CEI Lagoa Redonda Construído', description: 'Nova creche no Território 29. Valor: R$ 648,9K.', category: 'Educação' },
      { title: 'EEF São Bento Construída', description: 'Nova escola no Território 30. Valor: R$ 350K.', category: 'Educação' },
      { title: 'ETI Construída - Bairro Aerolândia', description: 'Nova escola técnica. EP/LOM nº 1515/2025. Valor: R$ 40K.', category: 'Educação' },
      { title: 'Espaço Público Urbanizado Lagoa da Paupina', description: 'Urbanização. EP/LOM nº 1547/2025. Valor: R$ 100K.', category: 'Urbanismo' },
      { title: 'Instalação de Gradil e Calçadas Rua Birmânia - São Bento', description: 'Infraestrutura urbana. EP/LOM nº 1506/2025. Valor: R$ 35K.', category: 'Infraestrutura' }
    ]
  },
  {
    name: 'Regional 7',
    total: 217330136,
    neighborhoods: ['Praia do Futuro', 'Luciano Cavalcante', 'Edson Queiroz', 'Sabiaguaba'],
    projects: [
      { title: 'CEI Luciano Cavalcante Construído', description: 'Nova creche no Território 24. Valor: R$ 1,35M.', category: 'Educação' },
      { title: 'CEI Autran Nunes Construído', description: 'Nova creche no Território 37. Valor: R$ 650K.', category: 'Educação' },
      { title: 'Urbanização Entorno Lagoa da Sapiranga', description: 'Recuperação ambiental. EP/LOM nº 1030/2025. Valor: R$ 50K.', category: 'Urbanismo' },
      { title: 'Urbanização Comunidade da Rocinha - Edson Queiroz', description: 'Urbanização. EP/LOM nº 1031/2025. Valor: R$ 50K.', category: 'Urbanismo' },
      { title: 'Quiosques Padronizados Pirambu', description: 'Construção de quiosques. EP/LOM nº 1208/2025. Valor: R$ 50K.', category: 'Social' }
    ]
  },
  {
    name: 'Regional 8',
    total: 561487654,
    neighborhoods: ['Passaré', 'José Walter', 'Planalto Ayrton Senna', 'Mondubim'],
    projects: [
      { title: 'ETI Jardim Castelão Construída - Passaré', description: 'Nova escola no Território 20. Valor: R$ 3,3M.', category: 'Educação' },
      { title: 'EEF André Luiz Construída - Passaré', description: 'Nova escola no Território 20. Valor: R$ 1,9M.', category: 'Educação' },
      { title: 'EEF Diogo Vital de Siqueira Reformada e Ampliada - José Walter', description: 'Ampliação no Território 21. Valor: R$ 1,55M.', category: 'Educação' },
      { title: 'Areninha na Praça 3ª Etapa José Walter Construída', description: 'Nova arena. EP/LOM nº 1403/2025. Valor: R$ 250K.', category: 'Infraestrutura' },
      { title: 'Hospital Distrital Gonzaga Mota Reformado - José Walter', description: 'Reforma hospitalar. EP/LOM nº 1006/2025.', category: 'Saúde' }
    ]
  },
  {
    name: 'Regional 9',
    total: 371475813,
    neighborhoods: ['Conjunto Palmeiras', 'Jangurussu', 'Ancuri', 'Pedras'],
    projects: [
      { title: 'CEI Cajazeiras Construído', description: 'Nova creche no Território 31. Valor: R$ 600K.', category: 'Educação' },
      { title: 'CEI Maria Felício Construído - Cais do Porto', description: 'Nova creche no Território 9. Valor: R$ 600K.', category: 'Educação' },
      { title: 'EEF João Germano da Ponte Neto Reformada - Conjuntos Palmeiras', description: 'Reforma no Território 32. Valor: R$ 300K.', category: 'Educação' },
      { title: 'Urbanização Entorno Lagoa São Cristóvão - Jangurussu', description: 'Drenagem e urbanização. EP/LOM nº 1029/2025. Valor: R$ 50K.', category: 'Urbanismo' },
      { title: 'Praça do Conjunto Palmeiras Reformada e Requalificada', description: 'Reforma completa. EP/LOM nº 1112/2025. Valor: R$ 100K.', category: 'Urbanismo' }
    ]
  },
  {
    name: 'Regional 10',
    total: 406676210,
    neighborhoods: ['Maraponga', 'Manoel Sátiro', 'Vila Manoel Sátiro', 'Parque Dois Irmãos'],
    projects: [
      { title: 'Escola João Nogueira Juca Reformada - Parque Santa Rosa', description: 'Reforma. EP/LOM nº 1531/2025. Valor: R$ 100K.', category: 'Educação' },
      { title: 'Equipamento Ampliado - Escola João Nogueira Juca', description: 'Ampliação. EP/LOM nº 1550/2025. Valor: R$ 100K.', category: 'Educação' },
      { title: 'Reforma Praça Igreja N.Sra. das Graças - Vila Manoel Sátiro', description: 'Reforma. EP/LOM nº 1165/2025. Valor: R$ 40K.', category: 'Urbanismo' },
      { title: 'Micro Parque Implantado', description: 'Novo parque. Valor: R$ 40K.', category: 'Urbanismo' },
      { title: 'Reforma Areninha Campo São Paulo - Vila Manoel Sátiro', description: 'Reforma. EP/LOM nº 1179/2025. Valor: R$ 40K.', category: 'Infraestrutura' }
    ]
  },
  {
    name: 'Regional 11',
    total: 397606081,
    neighborhoods: ['Autran Nunes', 'Dom Lustosa', 'Henrique Jorge', 'João XXIII', 'Pono do Coruja'],
    projects: [
      { title: 'Quadra Esportiva Construída - Escola Irmã Simas - Sapiranga', description: 'Nova quadra. EP/LOM nº 1042/2025. Valor: R$ 50K.', category: 'Infraestrutura' },
      { title: 'Quadra Esportiva Reformada - Escola Viviane Benevides', description: 'Reforma. EP/LOM nº 1102/2025. Valor: R$ 50K.', category: 'Infraestrutura' },
      { title: 'Equipamento Público Construído Regional 11', description: 'Novos equipamentos. EP/LOM nº 1163/2025. Valor: R$ 147,7K.', category: 'Social' },
      { title: 'Praça da Estiva Reformada - Serviluz', description: 'Reforma. EP/LOM nº 1396/2025. Valor: R$ 50K.', category: 'Urbanismo' },
      { title: 'Areninha Construída Praça 3ª Etapa José Walter', description: 'Nova arena. EP/LOM nº 1403/2025. Valor: R$ 250K.', category: 'Infraestrutura' }
    ]
  },
  {
    name: 'Regional 12',
    total: 59402590,
    neighborhoods: ['Centro', 'Praia de Iracema'],
    projects: [
      { title: 'Reforma Igreja do Rosário - Centro', description: 'Restauração. EP/LOM nº 1160/2025. Valor: R$ 100K.', category: 'Urbanismo' },
      { title: 'Revitalização Cultural do Centro', description: 'Intervenções culturais no Centro Histórico.', category: 'Social' },
      { title: 'Escola Jesus, Maria e José Conservada', description: 'Manutenção patrimonial.', category: 'Educação' },
      { title: 'Cultura na Calçada - Jardim União Passaré', description: 'Evento cultural. EP/LOM nº 1447/2025. Valor: R$ 50K.', category: 'Social' },
      { title: 'Cultura na Calçada - Sítio São João Jangurussu', description: 'Evento cultural. EP/LOM nº 1449/2025.', category: 'Social' }
    ]
  },
];
