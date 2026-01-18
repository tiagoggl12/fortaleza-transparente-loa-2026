
import React, { useState } from 'react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid,
  Cell,
  PieChart,
  Pie
} from 'recharts';
import { REGIONALS } from '../constants';
import { RegionalData, RegionalProject } from '../types';
import { 
  MapIcon, 
  Info, 
  Hammer, 
  GraduationCap, 
  Stethoscope, 
  Trees, 
  Users,
  Target,
  Navigation,
  X,
  ExternalLink,
  FileText,
  TrendingUp
} from 'lucide-react';

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', { 
    style: 'currency', 
    currency: 'BRL',
    maximumFractionDigits: 0
  }).format(value);
};

const getCategoryStyles = (category: RegionalProject['category']) => {
  switch (category) {
    case 'Educação': return { icon: <GraduationCap size={14} />, color: 'text-purple-600', bg: 'bg-purple-50', colorHex: '#9333ea' };
    case 'Saúde': return { icon: <Stethoscope size={14} />, color: 'text-red-600', bg: 'bg-red-50', colorHex: '#dc2626' };
    case 'Infraestrutura': return { icon: <Hammer size={14} />, color: 'text-amber-600', bg: 'bg-amber-50', colorHex: '#d97706' };
    case 'Urbanismo': return { icon: <Trees size={14} />, color: 'text-emerald-600', bg: 'bg-emerald-50', colorHex: '#059669' };
    case 'Social': return { icon: <Users size={14} />, color: 'text-blue-600', bg: 'bg-blue-50', colorHex: '#2563eb' };
    default: return { icon: <Info size={14} />, color: 'text-gray-600', bg: 'bg-gray-50', colorHex: '#4b5563' };
  }
};

const RegionalView: React.FC = () => {
  const [activeModal, setActiveModal] = useState<RegionalData | null>(null);
  const sortedRegionals = [...REGIONALS].sort((a, b) => b.total - a.total);

  // Simulação de distribuição de gastos para o modal
  const getMockedDistribution = (reg: RegionalData) => [
    { name: 'Infraestrutura', value: reg.total * 0.4, fill: '#d97706' },
    { name: 'Educação', value: reg.total * 0.25, fill: '#9333ea' },
    { name: 'Saúde', value: reg.total * 0.2, fill: '#dc2626' },
    { name: 'Social', value: reg.total * 0.15, fill: '#2563eb' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-20">
      {/* Resumo do Investimento Territorial */}
      <div className="bg-gradient-to-br from-blue-700 to-indigo-900 p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-blue-200 uppercase tracking-widest text-xs font-black">
              <Navigation size={14} />
              Geografia do Orçamento
            </div>
            <h3 className="text-4xl font-black">Investimento Regionalizado</h3>
            <p className="text-blue-100 max-w-xl text-sm leading-relaxed">
              Descubra como os R$ 3,92 Bilhões do PLOA 2026 são aplicados em cada território para reduzir as desigualdades sociais de Fortaleza.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-3xl">
            <p className="text-xs font-bold text-blue-200 uppercase mb-1">Total para as Regionais</p>
            <p className="text-4xl font-black tracking-tighter">R$ 3,92B</p>
          </div>
        </div>
        <MapIcon className="absolute -right-12 -bottom-12 w-64 h-64 text-white opacity-5" />
      </div>

      {/* Grid de Cards Detalhados */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedRegionals.map((reg, idx) => (
          <div key={idx} className="bg-white rounded-[2rem] border border-gray-200 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col group overflow-hidden">
            {/* Cabeçalho do Card */}
            <div className="p-6 border-b border-gray-50 bg-gray-50/50">
              <div className="flex justify-between items-start mb-4">
                <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter">
                  {reg.name}
                </span>
                <span className="text-blue-700 font-black text-lg">{formatCurrency(reg.total)}</span>
              </div>
              <div className="flex items-center gap-1.5 mb-2">
                <Target size={14} className="text-gray-400" />
                <h5 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Bairros e Territórios</h5>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {reg.neighborhoods.map((bairro, bidx) => (
                  <span key={bidx} className="text-[10px] font-bold text-gray-600 bg-white border border-gray-100 px-2.5 py-1 rounded-lg">
                    {bairro}
                  </span>
                ))}
              </div>
            </div>

            {/* Projetos no Card */}
            <div className="p-6 flex-1 space-y-5">
              <h6 className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                <FileText size={14} className="text-gray-400" />
                Destaques do Plano
              </h6>
              {reg.projects.map((proj, pidx) => {
                const style = getCategoryStyles(proj.category);
                return (
                  <div key={pidx} className="relative pl-4 border-l-2 border-gray-100 group-hover:border-blue-200 transition-all">
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className={`${style.bg} ${style.color} p-1 rounded-md`}>
                        {style.icon}
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-tighter text-gray-500">{proj.category}</span>
                    </div>
                    <p className="text-sm font-bold text-gray-800 leading-tight group-hover:text-blue-700 transition-colors">{proj.title}</p>
                    <p className="text-xs text-gray-500 mt-1.5 leading-relaxed line-clamp-2">{proj.description}</p>
                  </div>
                );
              })}
            </div>

            {/* Botão de Ação */}
            <div className="px-6 py-5 bg-gray-50/50 border-t border-gray-100">
              <button 
                type="button"
                onClick={() => setActiveModal(reg)}
                className="w-full py-3 bg-white hover:bg-blue-600 border border-blue-100 hover:border-blue-600 text-blue-600 hover:text-white rounded-2xl text-xs font-black uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 shadow-sm"
              >
                Ver Plano Completo
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL DE DETALHES */}
      {activeModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          {/* Overlay */}
          <div 
            className="absolute inset-0 bg-gray-900/60 backdrop-blur-md transition-opacity"
            onClick={() => setActiveModal(null)}
          />
          
          {/* Modal Content */}
          <div className="relative bg-white w-full max-w-4xl max-h-[90vh] rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-300">
            {/* Modal Header */}
            <div className="bg-blue-700 p-8 text-white relative">
              <button 
                type="button"
                onClick={() => setActiveModal(null)}
                className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                title="Fechar modal"
                aria-label="Fechar"
              >
                <X size={24} />
              </button>
              <div className="flex items-center gap-3 mb-2">
                <span className="bg-white/20 px-3 py-1 rounded-lg text-xs font-bold uppercase">{activeModal.name}</span>
                <span className="bg-emerald-500 text-white px-3 py-1 rounded-lg text-xs font-bold uppercase">Planejado 2026</span>
              </div>
              <h2 className="text-3xl font-black">Detalhamento do Plano de Investimento</h2>
              <p className="text-blue-100 mt-2 flex items-center gap-2">
                <Navigation size={16} />
                {activeModal.neighborhoods.join(' • ')}
              </p>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-8 space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Financeiro */}
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Divisão por Área de Atuação</h4>
                    <div className="h-[200px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={getMockedDistribution(activeModal)}
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                          >
                            {getMockedDistribution(activeModal).map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(val: number | undefined) => val ? formatCurrency(val) : ''} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {getMockedDistribution(activeModal).map((item, i) => (
                      <div key={i} className="flex justify-between items-center p-3 rounded-xl bg-gray-50 border border-gray-100">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.fill }} />
                          <span className="text-sm font-bold text-gray-700">{item.name}</span>
                        </div>
                        <span className="text-sm font-black text-gray-900">{formatCurrency(item.value)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Lista Completa de Projetos */}
                <div className="space-y-4">
                  <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Ações e Metas Estratégicas</h4>
                  {activeModal.projects.map((proj, pidx) => {
                    const style = getCategoryStyles(proj.category);
                    return (
                      <div key={pidx} className="p-5 rounded-2xl border border-gray-100 bg-white hover:border-blue-200 transition-all shadow-sm">
                        <div className="flex items-center justify-between mb-3">
                          <span className={`${style.bg} ${style.color} px-2 py-1 rounded text-[10px] font-black uppercase flex items-center gap-1.5`}>
                            {style.icon}
                            {proj.category}
                          </span>
                          <span className="text-[10px] text-gray-400 font-bold uppercase">Prioridade Alta</span>
                        </div>
                        <h5 className="font-bold text-gray-900 mb-1">{proj.title}</h5>
                        <p className="text-sm text-gray-500 leading-relaxed">{proj.description}</p>
                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex -space-x-2">
                            {[1,2,3].map(i => <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-gray-200" />)}
                          </div>
                          <span className="text-[10px] font-bold text-blue-600 uppercase">Acompanhar Licitação</span>
                        </div>
                      </div>
                    );
                  })}
                  <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl flex gap-3">
                    <TrendingUp size={20} className="text-blue-600 shrink-0" />
                    <p className="text-xs text-blue-800 leading-relaxed">
                      Este plano visa aumentar o IDH-B (Índice de Desenvolvimento Humano por Bairro) desta regional em até <strong>4.2%</strong> até o final de 2026.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-8 bg-gray-50 border-t border-gray-100 flex flex-col md:flex-row gap-4 justify-between items-center">
              <div className="flex items-center gap-3">
                <Info size={20} className="text-gray-400" />
                <p className="text-xs text-gray-500">Dados baseados no PLOA 2026 - Versão Preliminar de Outubro/2025</p>
              </div>
              <div className="flex gap-3 w-full md:w-auto">
                <button className="flex-1 md:flex-none px-6 py-3 bg-gray-900 text-white rounded-xl text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors">
                  <ExternalLink size={14} />
                  Transparência
                </button>
                <button className="flex-1 md:flex-none px-6 py-3 bg-blue-600 text-white rounded-xl text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200">
                  <FileText size={14} />
                  Baixar PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Nota sobre Metodologia */}
      <div className="bg-amber-50 border border-amber-200 p-8 rounded-[2rem] flex flex-col md:flex-row gap-6 shadow-sm">
        <div className="p-4 bg-amber-100 rounded-2xl text-amber-600 shrink-0 h-fit">
          <Info size={32} />
        </div>
        <div>
          <h5 className="font-bold text-amber-900 text-lg uppercase mb-2 tracking-tighter">Sobre a Regionalização dos Recursos</h5>
          <p className="text-sm text-amber-800 leading-relaxed">
            A distribuição orçamentária por Regional em Fortaleza não é aleatória. Ela utiliza a metodologia do <strong>Índice de Vulnerabilidade Multidimensional</strong>. Isso significa que bairros com menores indicadores de saneamento, iluminação e renda recebem aportes prioritários para que toda a cidade cresça de forma equilibrada.
          </p>
          <div className="mt-4 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-900 bg-amber-200/50 px-3 py-1.5 rounded-lg">
              <div className="w-2 h-2 bg-amber-600 rounded-full" />
              Equidade Territorial
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-900 bg-amber-200/50 px-3 py-1.5 rounded-lg">
              <div className="w-2 h-2 bg-amber-600 rounded-full" />
              Participação Popular
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ChevronRight = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
);

export default RegionalView;
