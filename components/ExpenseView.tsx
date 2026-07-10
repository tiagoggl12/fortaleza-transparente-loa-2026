
import React from 'react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid,
  Legend,
  Cell,
  PieChart,
  Pie
} from 'recharts';
import { PROGRAMS, TOTAL_BUDGET } from '../constants';
import { Target, Info, ShieldCheck, Briefcase, HelpCircle, GraduationCap, Landmark, Building2, HeartPulse } from 'lucide-react';
import EnhancedInfoTooltip from './glossary/EnhancedInfoTooltip';
import { useGlossary } from '../hooks/useGlossary';

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', { 
    style: 'currency', 
    currency: 'BRL',
    maximumFractionDigits: 0
  }).format(value);
};

const glossaryDespesas: Record<string, string> = {
  'Pessoal e Encargos': 'Pagamento de salários, aposentadorias, pensões e impostos sobre a folha dos servidores públicos.',
  'Manutenção de Serviços (Correntes)': 'Recursos fundamentais para manter os serviços funcionando: merenda, medicamentos, luz, água e limpeza de ruas.',
  'Investimentos': 'Dinheiro gasto na criação de novos bens, como construir escolas, praças e comprar ambulâncias.',
  'Juros e Encargos da Dívida': 'Pagamento de taxas sobre empréstimos que a cidade fez no passado.',
  'Amortização da Dívida': 'Pagamento do valor principal de empréstimos tomados para grandes obras.'
};

const ExpenseView: React.FC = () => {
  const { openGlossary } = useGlossary();
  // Despesa por Função de Governo — Demonstrativo da Despesa por Função,
  // Lei nº 11.615/2025 (LOA 2026). As 6 maiores áreas de aplicação.
  const functionBreakdown = [
    { name: 'Saúde', value: 4319793967, icon: <HeartPulse size={14} />, desc: 'Postos, hospitais, medicamentos e vigilância sanitária.' },
    { name: 'Educação', value: 3919379873, icon: <GraduationCap size={14} />, desc: 'Escolas, creches, merenda e material didático.' },
    { name: 'Administração', value: 1654732747, icon: <Briefcase size={14} />, desc: 'Gestão da máquina pública e serviços administrativos.' },
    { name: 'Previdência Social', value: 1579092299, icon: <ShieldCheck size={14} />, desc: 'Aposentadorias e pensões dos servidores municipais.' },
    { name: 'Encargos Especiais', value: 1144707945, icon: <Landmark size={14} />, desc: 'Dívida pública, precatórios e obrigações financeiras.' },
    { name: 'Urbanismo', value: 669664592, icon: <Building2 size={14} />, desc: 'Praças, parques, vias e infraestrutura urbana.' },
  ];

  // Despesa por Grupo de Natureza — todas as categorias, soma = orçamento total
  const mainCategories = [
    { name: 'Pessoal e Encargos', value: 7638847991 },
    { name: 'Manutenção de Serviços (Correntes)', value: 6479532776 },
    { name: 'Investimentos', value: 957552262 },
    { name: 'Amortização da Dívida', value: 468744354 },
    { name: 'Juros e Encargos da Dívida', value: 429722887 },
    { name: 'Reserva de Contingência', value: 12986965 },
    { name: 'Inversões Financeiras', value: 4031000 },
  ];

  const COLORS = ['#1d4ed8', '#2563eb', '#3b82f6', '#60a5fa', '#93c5fd'];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Educational Insight Header */}
      <div className="bg-blue-600 p-10 rounded-[2.5rem] text-white shadow-2xl overflow-hidden relative">
        <div className="relative z-10 max-w-2xl">
          <h3 className="text-3xl font-black mb-4">Onde o dinheiro é realmente aplicado?</h3>
          <p className="text-blue-100 text-lg leading-relaxed mb-6">
            O orçamento de Fortaleza é dividido para que a cidade não pare.
            Veja a divisão por natureza do gasto (salários, custeio, investimentos e dívida) e por área de governo — da <strong>merenda</strong> ao <strong>remédio</strong>, conforme os demonstrativos oficiais da LOA 2026.
          </p>
          <div className="flex flex-wrap gap-4">
            <EnhancedInfoTooltip term="Manutenção Urbana" definition="Refere-se ao custeio de todos os serviços que a prefeitura contrata para o dia a dia, como limpeza pública e segurança." onOpenGlossary={openGlossary} />
            <EnhancedInfoTooltip term="Custeio Administrativo" definition="Gastos com energia, água e telefone para que postos de saúde e escolas funcionem 24h." onOpenGlossary={openGlossary} />
          </div>
        </div>
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-400 rounded-full blur-[100px] opacity-20 -mr-20 -mt-20"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Gráfico Principal de Natureza */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-200 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest">Estrutura de Despesa</h4>
              <p className="text-sm font-bold text-gray-800">Divisão Geral do Orçamento</p>
            </div>
            <HelpCircle size={20} className="text-gray-300" />
          </div>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mainCategories} layout="vertical" margin={{ left: 40, right: 30 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  width={150} 
                  tick={{ fontSize: 10, fontWeight: 700, fill: '#64748b' }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip 
                  formatter={(value: number | undefined) => value ? formatCurrency(value) : ''}
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="value" radius={[0, 10, 10, 0]} barSize={24}>
                  {mainCategories.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Despesa por Função de Governo — demonstrativo oficial da LOA */}
        <div className="bg-blue-50/50 p-8 rounded-[2.5rem] border border-blue-100 flex flex-col">
          <div className="mb-6">
            <h4 className="text-xs font-black text-blue-600 uppercase tracking-widest mb-1">Para Onde Vai por Área</h4>
            <h5 className="text-xl font-black text-gray-900 leading-tight">Despesa por Função de Governo</h5>
            <p className="text-xs text-gray-500 mt-2">As 6 maiores áreas de aplicação, conforme o Demonstrativo da Despesa por Função da LOA 2026:</p>
          </div>

          <div className="flex-1 space-y-4">
            {functionBreakdown.map((item, idx) => (
              <div key={idx} className="bg-white p-4 rounded-2xl border border-blue-100 shadow-sm hover:shadow-md transition-all flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    {item.icon}
                  </div>
                  <div>
                    <h6 className="text-sm font-black text-gray-800">{item.name}</h6>
                    <p className="text-[10px] text-gray-500 max-w-[200px] leading-tight">{item.desc}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-blue-700">{formatCurrency(item.value)}</p>
                  <p className="text-[10px] font-bold text-blue-400">{( (item.value / TOTAL_BUDGET) * 100).toFixed(1)}% do Orçamento</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-white rounded-2xl border border-blue-100 flex gap-3 items-start">
            <Info size={20} className="text-blue-500 shrink-0" />
            <p className="text-[10px] text-gray-600 leading-relaxed italic">
              <strong>Entenda:</strong> Saúde e Educação, juntas, concentram mais da metade do orçamento (51,5%). As demais funções — como Saneamento, Segurança Pública, Assistência Social e Cultura — completam o total de R$ 15,99 bilhões.
            </p>
          </div>
        </div>
      </div>

      {/* Seção Detalhada dos Programas Estratégicos */}
      <div className="space-y-4 pt-8">
        <div className="flex items-center justify-between px-2">
          <h4 className="text-lg font-black text-gray-800 flex items-center gap-2">
            <Target className="text-blue-600" size={24} />
            Programas e Resultados Esperados
          </h4>
          <EnhancedInfoTooltip term="Programas de Governo" definition="São conjuntos de ações organizadas para resolver problemas específicos da cidade, como melhorar a saúde básica ou expandir escolas." onOpenGlossary={openGlossary} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PROGRAMS.map((p) => (
            <div key={p.id} className="bg-white p-6 rounded-3xl border border-gray-200 hover:border-blue-300 transition-all group shadow-sm flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-black bg-gray-100 text-gray-500 px-2 py-1 rounded uppercase tracking-widest">Cod. {p.id}</span>
                <span className="text-sm font-black text-blue-700">{formatCurrency(p.total)}</span>
              </div>
              <h5 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-blue-600 transition-colors">{p.name}</h5>
              <p className="text-sm text-gray-500 leading-relaxed mb-4 flex-1">
                {p.objective}
              </p>
              <div className="flex items-center gap-4 pt-4 border-t border-gray-50">
                <div className="flex-1">
                  <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase mb-1">
                    <span>Orçamento Fiscal</span>
                    <span>{((p.fiscal / p.total) * 100).toFixed(0)}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-gray-50 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500" style={{ width: `${(p.fiscal / p.total) * 100}%` }} />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase mb-1">
                    <span>Seguridade Social</span>
                    <span>{((p.social / p.total) * 100).toFixed(0)}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-gray-50 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500" style={{ width: `${(p.social / p.total) * 100}%` }} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExpenseView;
