
import React from 'react';
import { REVENUES, TOTAL_BUDGET } from '../constants';
import { TrendingUp, Wallet, Info, HelpCircle, ArrowRightCircle } from 'lucide-react';
import EnhancedInfoTooltip from './glossary/EnhancedInfoTooltip';
import { useGlossary } from '../hooks/useGlossary';
// import './RevenueView.css'; // Comentado temporariamente

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', { 
    style: 'currency', 
    currency: 'BRL',
    maximumFractionDigits: 0
  }).format(value);
};

const technicalGlossary: Record<string, { simple: string, detail: string }> = {
  'Receitas Correntes': { 
    simple: 'Dinheiro do dia a dia', 
    detail: 'Recursos que financiam as atividades contínuas, como salários e manutenção de prédios públicos.' 
  },
  'Transferências Correntes': { 
    simple: 'Repasses da União/Estado', 
    detail: 'Dinheiro que vem de Brasília ou do Ceará por direito constitucional (ex: FPM e ICMS).' 
  },
  'Impostos, Taxas e Contribuições': { 
    simple: 'Tributos locais', 
    detail: 'O que o cidadão de Fortaleza paga direto para a cidade (IPTU, ISS, Taxa de Lixo).' 
  },
  'Receitas de Capital': { 
    simple: 'Dinheiro para Investir', 
    detail: 'Recursos usados para aumentar o patrimônio da cidade, como construir novas pontes ou hospitais.' 
  },
  'Operações de Crédito': { 
    simple: 'Empréstimos', 
    detail: 'Dinheiro que a prefeitura pega emprestado com bancos para realizar grandes projetos estruturantes.' 
  }
};

const RevenueView: React.FC = () => {
  const { openGlossary } = useGlossary();
  const totalCorrentes = REVENUES.find(r => r.specification === 'Receitas Correntes')?.value || 0;
  const totalCapital = REVENUES.find(r => r.specification === 'Receitas de Capital')?.value || 0;

  const correntesSub = REVENUES.filter(r => 
    ['Impostos, Taxas e Contribuições', 'Contribuições', 'Receita Patrimonial', 'Receita de Serviços', 'Transferências Correntes', 'Outras Receitas Correntes'].includes(r.specification)
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Educational Banner */}
      <div className="bg-emerald-50 border border-emerald-100 p-8 rounded-[2.5rem] flex flex-col md:flex-row gap-8 items-start">
        <div className="p-4 bg-emerald-600 rounded-3xl text-white shadow-xl shadow-emerald-100 shrink-0">
          <Wallet size={40} />
        </div>
        <div className="space-y-4">
          <h3 className="text-xl font-black text-emerald-900">De onde vem o dinheiro de Fortaleza?</h3>
          <p className="text-sm text-emerald-800 leading-relaxed">
            Pense no orçamento da cidade como uma família. Temos o "salário" fixo (Transferências), as "vendas extras" (Alienação de Bens) e às vezes "empréstimos" (Operações de Crédito) para reformar a casa.
          </p>
          <div className="flex flex-wrap gap-4">
            <EnhancedInfoTooltip term="Receita" definition="Todo valor que entra nos cofres públicos para pagar as despesas previstas em lei." onOpenGlossary={openGlossary} />
            <EnhancedInfoTooltip term="Arrecadação" definition="O ato de cobrar e receber os tributos e taxas devidos pelos cidadãos e empresas." onOpenGlossary={openGlossary} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Receitas Correntes Detalhado */}
        <div className="bg-white rounded-[2.5rem] border border-gray-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-8 bg-blue-600 text-white">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[10px] font-black uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full">Recursos Ordinários</span>
              <HelpCircle size={18} className="opacity-50" />
            </div>
            <h3 className="text-2xl font-black">Receitas Correntes</h3>
            <p className="text-3xl font-black mt-2 tracking-tighter">{formatCurrency(totalCorrentes)}</p>
            <p className="text-xs text-blue-100 mt-2 opacity-80">Financia o funcionamento diário da cidade.</p>
          </div>
          <div className="p-8 space-y-6 flex-1">
            {correntesSub.map((item, idx) => (
              <div key={idx} className="group p-4 rounded-2xl hover:bg-blue-50 transition-all border border-transparent hover:border-blue-100">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <EnhancedInfoTooltip term={item.specification} definition={technicalGlossary[item.specification]?.detail || 'Outras fontes menores de receita.'} onOpenGlossary={openGlossary}>
                      <span className="text-sm font-black text-gray-800">{item.specification}</span>
                    </EnhancedInfoTooltip>
                    <p className="text-[10px] text-blue-600 font-bold uppercase mt-0.5">{technicalGlossary[item.specification]?.simple || 'Diversos'}</p>
                  </div>
                  <span className="text-sm font-black text-gray-900">{formatCurrency(item.value)}</span>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className="revenue-bar bg-blue-500 rounded-full" style={{ width: `${(item.value / totalCorrentes) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Glossário Visual */}
        <div className="bg-gray-900 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden">
          <h4 className="text-xs font-black text-blue-400 uppercase tracking-widest mb-8 flex items-center gap-2">
            <ArrowRightCircle size={16} />
            Dicionário do Cidadão
          </h4>
          <div className="space-y-8 relative z-10">
            {Object.entries(technicalGlossary).slice(0, 4).map(([term, data], i) => (
              <div key={i} className="group">
                <h5 className="text-blue-400 font-black text-lg mb-2 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  {term}
                </h5>
                <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-200 transition-colors">
                  <strong className="text-white">Traduzindo:</strong> {data.simple}. {data.detail}
                </p>
              </div>
            ))}
          </div>
          <TrendingUp className="absolute -right-20 -bottom-20 w-80 h-80 text-blue-500 opacity-5" />
        </div>
      </div>
    </div>
  );
};

export default RevenueView;
