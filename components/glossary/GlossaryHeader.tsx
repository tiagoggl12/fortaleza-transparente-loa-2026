import React from 'react';
import { BookOpen, GraduationCap, Trophy } from 'lucide-react';
import { useGlossary } from '../../hooks/useGlossary';

const GlossaryHeader: React.FC = () => {
  const { stats, toggleGlossary } = useGlossary();

  return (
    <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded-2xl shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-white/20 rounded-lg">
            <BookOpen size={24} />
          </div>
          <div>
            <h3 className="font-bold text-lg">Dicionário do Cidadão</h3>
            <p className="text-purple-100 text-sm">
              Termos técnicos explicados de forma simples
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          {/* Estatísticas */}
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Trophy size={16} className="text-yellow-300" />
              <span>{stats.favoritos} favoritos</span>
            </div>
            <div className="flex items-center gap-1">
              <GraduationCap size={16} className="text-green-300" />
              <span>{stats.visitados} explorados</span>
            </div>
          </div>

          {/* Botão de ação */}
          <button
            onClick={toggleGlossary}
            className="bg-white text-purple-600 px-4 py-2 rounded-lg font-bold hover:bg-purple-50 transition-colors flex items-center gap-2"
          >
            <BookOpen size={16} />
            Explorar Glossário
          </button>
        </div>
      </div>

      {/* Barra de progresso */}
      <div className="mt-4">
        <div className="flex justify-between text-xs mb-1">
          <span>Seu progresso</span>
          <span>{stats.progresso}%</span>
        </div>
        <div className="w-full bg-white/20 rounded-full h-2">
          <div 
            className="bg-white rounded-full h-2 transition-all duration-500"
            style={{ width: `${stats.progresso}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default GlossaryHeader;