
import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell,
  Legend
} from 'recharts';
import { 
  DollarSign, 
  PieChart as PieChartIcon, 
  ArrowUpRight, 
  CheckCircle2,
  Building,
  GraduationCap,
  // Fix: Add HelpCircle to imports
  HelpCircle
} from 'lucide-react';
import { TOTAL_BUDGET, FISCAL_BUDGET, SOCIAL_SECURITY_BUDGET, BUDGET_UNITS, PROGRAMS } from '../constants';
import EnhancedInfoTooltip from './glossary/EnhancedInfoTooltip';
import GlossarySidebar from './glossary/GlossarySidebar';
import GlossaryHeader from './glossary/GlossaryHeader';
import { useGlossary } from '../hooks/useGlossary';

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', { 
    style: 'currency', 
    currency: 'BRL',
    maximumFractionDigits: 0
  }).format(value);
};

const DashboardView: React.FC = () => {
  const { ativo: glossaryAtivo, openGlossary, closeGlossary } = useGlossary();
  const budgetData = [
    { name: 'Orçamento Fiscal', value: FISCAL_BUDGET, desc: 'Dinheiro para manutenção da cidade, obras e salários administrativos.' },
    { name: 'Seguridade Social', value: SOCIAL_SECURITY_BUDGET, desc: 'Recursos exclusivos para Saúde, Previdência e Assistência Social.' },
  ];

  const COLORS = ['#2563eb', '#10b981'];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Glossary Header */}
      <GlossaryHeader />
      
      {/* Welcome Educational Header */}
      <div className="bg-blue-600 p-8 rounded-[2rem] text-white shadow-xl flex flex-col md:flex-row items-center gap-6">
        <div className="p-4 bg-white/20 rounded-2xl">
          <GraduationCap size={48} />
        </div>
        <div>
          <h2 className="text-2xl font-black">Bem-vindo à sua Aula de Cidadania</h2>
          <p className="text-blue-100 mt-1 max-w-2xl">
            Este dashboard não apenas mostra números, mas ensina como Fortaleza planeja gastar o dinheiro público em 2026. 
            Passe o mouse nos ícones <HelpCircle size={14} className="inline mb-1" /> para aprender os termos técnicos.
          </p>
        </div>
      </div>

      {/* KPI Cards with Tooltips */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm transition-all hover:shadow-md group">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
              <DollarSign size={20} />
            </div>
          </div>
          <EnhancedInfoTooltip 
            term="Orçamento Total" 
            definition="É a soma de tudo o que a prefeitura estima arrecadar e planeja gastar no ano de 2026."
            onOpenGlossary={openGlossary}
          >
            <p className="text-gray-500 text-xs font-black uppercase tracking-widest">Orçamento Total</p>
          </EnhancedInfoTooltip>
          <h3 className="text-2xl font-black text-gray-900 mt-1">{formatCurrency(TOTAL_BUDGET)}</h3>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4 text-emerald-600">
            <div className="p-2 bg-emerald-50 rounded-lg">
              <Building size={20} />
            </div>
          </div>
          <EnhancedInfoTooltip 
            term="Orçamento Fiscal" 
            definition="Cobre as despesas gerais da máquina pública: educação, transporte, segurança e administração municipal."
            onOpenGlossary={openGlossary}
          >
            <p className="text-gray-500 text-xs font-black uppercase tracking-widest">Orçamento Fiscal</p>
          </EnhancedInfoTooltip>
          <h3 className="text-2xl font-black text-gray-900 mt-1">{formatCurrency(FISCAL_BUDGET)}</h3>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4 text-amber-600">
            <div className="p-2 bg-amber-50 rounded-lg">
              <PieChartIcon size={20} />
            </div>
          </div>
          <EnhancedInfoTooltip 
            term="Seguridade Social" 
            definition="Dinheiro 'carimbado' que só pode ser usado em Saúde, Assistência Social e Previdência dos servidores."
            onOpenGlossary={openGlossary}
          >
            <p className="text-gray-500 text-xs font-black uppercase tracking-widest">Seguridade Social</p>
          </EnhancedInfoTooltip>
          <h3 className="text-2xl font-black text-gray-900 mt-1">{formatCurrency(SOCIAL_SECURITY_BUDGET)}</h3>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4 text-indigo-600">
            <div className="p-2 bg-indigo-50 rounded-lg">
              <CheckCircle2 size={20} />
            </div>
          </div>
          <EnhancedInfoTooltip 
            term="Lim. Suplementação" 
            definition="Margem de segurança que permite ao prefeito ajustar verbas entre secretarias sem precisar de nova lei."
            onOpenGlossary={openGlossary}
          >
            <p className="text-gray-500 text-xs font-black uppercase tracking-widest">Limite de Ajuste</p>
          </EnhancedInfoTooltip>
          <h3 className="text-2xl font-black text-gray-900 mt-1">30%</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pie Chart with Educational Legend */}
        <div className="lg:col-span-1 bg-white p-8 rounded-[2rem] border border-gray-200 shadow-sm flex flex-col">
          <div className="flex items-center gap-2 mb-6">
            <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest">Esferas de Atuação</h4>
          </div>
          <div className="flex-1 min-h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={budgetData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {budgetData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number | undefined) => value !== undefined ? formatCurrency(value) : ''}
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-3">
            {budgetData.map((item, i) => (
              <div key={i} className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 rounded-full" style={{backgroundColor: COLORS[i]}} />
                  <span className="text-xs font-black text-gray-900">{item.name}</span>
                </div>
                <p className="text-[10px] text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bar Chart explaining Spending Units */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-gray-200 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest">Quem mais gerencia recursos?</h4>
            <EnhancedInfoTooltip term="Unidade Orçamentária" definition="É o órgão (Secretaria ou Fundo) responsável por executar os projetos e gerenciar o dinheiro destinado a ele." onOpenGlossary={openGlossary} />
          </div>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={[...BUDGET_UNITS].sort((a,b) => b.value - a.value).slice(0, 6)}
                margin={{ top: 0, right: 30, left: 40, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
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
                  formatter={(value: number | undefined) => value !== undefined ? formatCurrency(value) : ''}
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="value" fill="#2563eb" radius={[0, 8, 8, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* Glossary Sidebar */}
      <GlossarySidebar 
        isOpen={glossaryAtivo}
        onClose={closeGlossary}
      />
    </div>
  );
};

export default DashboardView;
