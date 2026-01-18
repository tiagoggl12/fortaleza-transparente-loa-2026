
import React from 'react';
import { Users, Lightbulb, CheckSquare, MessageSquare } from 'lucide-react';

const ParticipatoryView: React.FC = () => {
  const initiatives = [
    { title: 'Educação Integral', description: 'Ampliação de escolas de tempo integral nos territórios 5, 8 e 11.', budget: 'R$ 237,1M' },
    { title: 'Saúde Digital', description: 'Implementação de pontos de telessaúde em todas as Regionais.', budget: 'R$ 1,9M' },
    { title: 'Fortaleza Jovem', description: 'Manutenção dos CUCAs e Faróis da Juventude com novos cursos.', budget: 'R$ 51,6M' },
    { title: 'Proteção Animal', description: 'Novo centro de atendimento e defesa sanitária animal.', budget: 'R$ 7,7M' },
    { title: 'Urbanismo Sustentável', description: 'Gestão ambiental e recuperação de recursos hídricos.', budget: 'R$ 44,7M' },
    { title: 'Locação Social', description: 'Auxílio moradia para famílias em vulnerabilidade e vítimas de violência.', budget: 'R$ 8,2M' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-indigo-700 p-8 rounded-3xl text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <h3 className="text-2xl font-bold mb-4">Orçamento Participativo 2026</h3>
          <p className="text-indigo-100 max-w-2xl leading-relaxed">
            O processo de escuta cidadã envolveu 39 Fóruns Territoriais e uma plataforma virtual, permitindo que a população priorizasse 12 temas estruturantes para o desenvolvimento da cidade.
          </p>
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <span className="block text-3xl font-bold">39</span>
              <span className="text-xs uppercase font-medium text-indigo-300">Fóruns Realizados</span>
            </div>
            <div className="text-center">
              <span className="block text-3xl font-bold">12</span>
              <span className="text-xs uppercase font-medium text-indigo-300">Temas Chave</span>
            </div>
            <div className="text-center">
              <span className="block text-3xl font-bold">R$ 532M</span>
              <span className="text-xs uppercase font-medium text-indigo-300">Total Priorizado</span>
            </div>
            <div className="text-center">
              <span className="block text-3xl font-bold">100%</span>
              <span className="text-xs uppercase font-medium text-indigo-300">Rastreabilidade</span>
            </div>
          </div>
        </div>
        <Users className="absolute -right-8 -bottom-8 text-white opacity-10 w-64 h-64 rotate-12" />
      </div>

      <h4 className="text-lg font-bold text-gray-900 mt-8 mb-4 flex items-center gap-2">
        <Lightbulb className="text-amber-500" />
        Iniciativas Priorizadas pela População
      </h4>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {initiatives.map((item, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all group">
            <div className="flex items-start justify-between mb-4">
              <div className="p-2 bg-indigo-50 rounded-xl text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <CheckSquare size={24} />
              </div>
              <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-lg">Prioritário</span>
            </div>
            <h5 className="font-bold text-gray-900 mb-2">{item.title}</h5>
            <p className="text-sm text-gray-500 leading-relaxed mb-4">{item.description}</p>
            <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-400 uppercase">Investimento</span>
              <span className="text-sm font-bold text-gray-900">{item.budget}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-8 rounded-3xl border border-dashed border-gray-300 text-center">
        <MessageSquare size={48} className="mx-auto text-gray-300 mb-4" />
        <h3 className="text-xl font-bold text-gray-900 mb-2">Escuta Digital</h3>
        <p className="text-gray-500 max-w-lg mx-auto mb-6">
          Além das votações, coletamos manifestações livres em 39 perguntas abertas, subsididando as diretrizes populares do PPA 2026-2029.
        </p>
        <button className="bg-gray-900 text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-gray-800 transition-colors">
          Baixar Relatório de Participação
        </button>
      </div>
    </div>
  );
};

export default ParticipatoryView;
