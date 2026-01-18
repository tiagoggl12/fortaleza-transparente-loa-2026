import React, { useState } from 'react';
import { Network, ArrowRight } from 'lucide-react';
import { ConceitoOrçamentário } from '../../types/glossary';
import { conceitoPorId } from '../../data/glossary';

interface RelationGraphProps {
  conceitos: ConceitoOrçamentário[];
  conceitoSelecionado: string | null;
  onConceitoClick: (conceitoId: string) => void;
  conceitosVisitados: Set<string>;
  favoritos: Set<string>;
}

const RelationGraph: React.FC<RelationGraphProps> = ({
  conceitos,
  conceitoSelecionado,
  onConceitoClick,
  conceitosVisitados,
  favoritos
}) => {
  const [hoveredConceito, setHoveredConceito] = useState<string | null>(null);

  const conceitoAtual = conceitoSelecionado ? conceitoPorId[conceitoSelecionado] : null;
  const relacionados = conceitoAtual ? conceitoAtual.relacionadoCom
    .map(id => conceitoPorId[id])
    .filter(Boolean) : [];

  // Layout simples: conceito central + relacionados ao redor
  const getNodePosition = (index: number, total: number) => {
    const centerX = 50;
    const centerY = 50;
    const radius = 30;
    
    if (index === 0) {
      // Conceito central
      return { x: centerX, y: centerY };
    }
    
    // Conceitos relacionados em círculo
    const angle = ((index - 1) / Math.max(1, total - 1)) * 2 * Math.PI - Math.PI / 2;
    return {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle)
    };
  };

  const displayConceitos = conceitoAtual 
    ? [conceitoAtual, ...relacionados]
    : conceitos.slice(0, 6); // Limita para não sobrecarregar

  const handleNodeClick = (conceitoId: string) => {
    if (conceitoId !== conceitoSelecionado) {
      onConceitoClick(conceitoId);
    }
  };

  const getCategoriaColor = (categoria: string) => {
    const colorMap: Record<string, string> = {
      'receitas': 'emerald',
      'despesas': 'red',
      'gerais': 'blue',
      'regionais': 'purple'
    };
    return colorMap[categoria] || 'blue';
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
          <Network size={20} className="text-purple-600" />
          Mapa de Relações dos Conceitos
        </h2>
        <p className="text-sm text-gray-600">
          Clique em um conceito para explorar suas conexões. As linhas mostram como os termos se relacionam entre si.
        </p>
      </div>

      {/* Grafo Visual */}
      <div className="flex-1 relative bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border border-gray-200 p-8 overflow-hidden">
        <div className="relative w-full h-full">
          {conceitoAtual ? (
            // Modo com conceito central selecionado
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
              {/* Linhas de conexão */}
              {relacionados.map((rel, index) => {
                const fromPos = getNodePosition(0, relacionados.length + 1);
                const toPos = getNodePosition(index + 1, relacionados.length + 1);
                return (
                  <line
                    key={rel.id}
                    x1={fromPos.x}
                    y1={fromPos.y}
                    x2={toPos.x}
                    y2={toPos.y}
                    stroke="#d1d5db"
                    strokeWidth="0.5"
                    strokeDasharray="2,2"
                  />
                );
              })}
              
              {/* Nós */}
              {displayConceitos.map((conceito, index) => {
                const pos = getNodePosition(index, displayConceitos.length);
                const isCentral = index === 0;
                const isHovered = hoveredConceito === conceito.id;
                const isVisitado = conceitosVisitados.has(conceito.id);
                const isFavorito = favoritos.has(conceito.id);
                const categoriaCor = getCategoriaColor(conceito.categoria);
                
                return (
                  <g key={conceito.id}>
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r={isCentral ? 6 : 4}
                      className={`cursor-pointer transition-all ${
                        isCentral 
                          ? `fill-${categoriaCor}-600 stroke-white stroke-2` 
                          : `fill-${categoriaCor}-500 stroke-white`
                      } ${isHovered ? 'opacity-100' : 'opacity-80'}`}
                      onMouseEnter={() => setHoveredConceito(conceito.id)}
                      onMouseLeave={() => setHoveredConceito(null)}
                      onClick={() => handleNodeClick(conceito.id)}
                    />
                    
                    {/* Labels */}
                    <text
                      x={pos.x}
                      y={isCentral ? pos.y - 8 : pos.y + 6}
                      textAnchor="middle"
                      className={`text-xs font-medium pointer-events-none ${
                        isCentral ? 'fill-gray-900 font-bold' : 'fill-gray-700'
                      }`}
                    >
                      {isCentral ? conceito.term : conceito.term.split(' ')[0]}
                    </text>
                    
                    {isFavorito && (
                      <text
                        x={pos.x + (isCentral ? 8 : 6)}
                        y={pos.y - (isCentral ? 6 : 4)}
                        textAnchor="middle"
                        className="text-yellow-500 text-lg pointer-events-none"
                      >
                        ⭐
                      </text>
                    )}
                    
                    {isVisitado && (
                      <circle
                        cx={pos.x + (isCentral ? -8 : -6)}
                        cy={pos.y - (isCentral ? -6 : -4)}
                        r="2"
                        className="fill-green-500 pointer-events-none"
                      />
                    )}
                  </g>
                );
              })}
            </svg>
          ) : (
            // Modo grade (sem conceito central)
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 h-full items-center justify-center">
              {displayConceitos.map(conceito => {
                const categoriaCor = getCategoriaColor(conceito.categoria);
                return (
                  <div
                    key={conceito.id}
                    onClick={() => handleNodeClick(conceito.id)}
                    className={`bg-white p-4 rounded-xl border-2 cursor-pointer transition-all hover:shadow-lg hover:scale-105 ${
                      conceitosVisitados.has(conceito.id) 
                        ? 'border-blue-300 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`w-3 h-3 bg-${categoriaCor}-500 rounded-full`}></div>
                      <span className="text-xs font-medium text-gray-600 capitalize">
                        {conceito.categoria}
                      </span>
                      {favoritos.has(conceito.id) && <span className="text-yellow-500 ml-auto">⭐</span>}
                    </div>
                    <h3 className="font-bold text-gray-900 text-sm mb-1">{conceito.term}</h3>
                    <p className="text-xs text-gray-600 line-clamp-2">{conceito.essencial}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Detalhes do conceito hover */}
      {hoveredConceito && conceitoPorId[hoveredConceito] && (
        <div className="mt-4 p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-start gap-3">
            <div className={`p-2 bg-${getCategoriaColor(conceitoPorId[hoveredConceito]!.categoria)}-100 rounded-lg`}>
              <Network size={16} className={`text-${getCategoriaColor(conceitoPorId[hoveredConceito]!.categoria)}-600`} />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-gray-900 mb-1">{conceitoPorId[hoveredConceito]!.term}</h4>
              <p className="text-sm text-gray-600">{conceitoPorId[hoveredConceito]!.essencial}</p>
              <button
                onClick={() => handleNodeClick(hoveredConceito)}
                className="mt-2 text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                Ver detalhes
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Legenda */}
      <div className="mt-4 flex items-center justify-center gap-6 text-xs text-gray-600">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <span>Receitas</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <span>Despesas</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span>Explorado</span>
        </div>
        <div className="flex items-center gap-1">
          <span>⭐</span>
          <span>Favorito</span>
        </div>
      </div>
    </div>
  );
};

export default RelationGraph;