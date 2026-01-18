import React, { useState } from 'react';
import { HelpCircle, ExternalLink, Info } from 'lucide-react';
import { conceitoPorId, conceitoPorTermo } from '../../data/glossary';
import { ConceitoOrçamentário } from '../../types/glossary';

interface EnhancedInfoTooltipProps {
  term: string;
  definition?: string; // Manter compatibilidade com versão antiga
  mode?: 'essencial' | 'detalhado';
  showRelations?: boolean;
  onOpenGlossary?: (conceitoId: string) => void;
  children?: React.ReactNode;
  className?: string;
}

const EnhancedInfoTooltip: React.FC<EnhancedInfoTooltipProps> = ({ 
  term, 
  definition, 
  mode = 'essencial',
  showRelations = true,
  onOpenGlossary,
  children,
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(false);
  
  // Procura o conceito no glossário primeiro, senão usa definition (compatibilidade)
  const conceito: ConceitoOrçamentário | undefined = conceitoPorId[term] || conceitoPorTermo[term];
  const textoEssencial = conceito ? conceito.essencial : (definition || term);
  const textoDetalhado = conceito ? conceito.detalhado : definition;

  const handleVerDetalhes = () => {
    if (conceito && onOpenGlossary) {
      onOpenGlossary(conceito.id);
    }
    setIsVisible(false);
  };

  const temDetalhes = conceito && (conceito.detalhado !== conceito.essencial || conceito.exemplos.length > 0);
  const temRelacoes = showRelations && conceito && conceito.relacionadoCom.length > 0;

  return (
    <div className={`relative inline-flex items-center group ${className}`}>
      <div 
        className="flex items-center gap-1 cursor-help"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children || <span className="border-b border-dotted border-gray-400 hover:border-blue-400 transition-colors">{term}</span>}
        <HelpCircle size={14} className="text-gray-400 group-hover:text-blue-500 transition-colors flex-shrink-0" />
      </div>
      
      {isVisible && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-80 p-4 bg-gray-900 text-white text-xs rounded-xl shadow-2xl z-[100] animate-in fade-in zoom-in-95 duration-200">
          {/* Cabeçalho com categoria se houver conceito */}
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <p className="font-bold mb-1 text-blue-400 uppercase tracking-tighter text-xs">{term}</p>
              {conceito && (
                <span className="inline-block px-2 py-0.5 bg-gray-800 rounded-full text-[10px] text-gray-400">
                  {conceito.categoria}
                </span>
              )}
            </div>
            <Info size={12} className="text-gray-500 flex-shrink-0 ml-2" />
          </div>
          
          {/* Conteúdo principal */}
          <p className="leading-relaxed opacity-90 mb-3">
            <strong className="text-white text-[11px]">Traduzindo:</strong> {textoEssencial}
          </p>
          
          {/* Conteúdo detalhado se modo detalhado ou se houver conceito rico */}
          {(mode === 'detalhado' && textoDetalhado && textoDetalhado !== textoEssencial) && (
            <p className="leading-relaxed opacity-85 mb-3 text-gray-300">
              <strong className="text-white text-[11px]">Explicando melhor:</strong> {textoDetalhado}
            </p>
          )}

          {/* Exemplos práticos se houver conceito */}
          {conceito && conceito.exemplos.length > 0 && mode === 'detalhado' && (
            <div className="mb-3">
              <p className="font-semibold text-[11px] text-green-400 mb-1">Exemplos práticos:</p>
              <ul className="space-y-1 opacity-90">
                {conceito.exemplos.slice(0, 2).map((exemplo, i) => (
                  <li key={i} className="flex items-start gap-1">
                    <span className="text-green-400 mt-0.5">•</span>
                    <span className="text-[10px]">{exemplo}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Impacto real se houver conceito e modo detalhado */}
          {conceito && conceito.impactoReal && mode === 'detalhado' && (
            <div className="mb-3 p-2 bg-blue-900/50 rounded-lg border border-blue-800">
              <p className="font-semibold text-[11px] text-blue-300 mb-1">Impacto na sua vida:</p>
              <p className="text-[10px] opacity-90">{conceito.impactoReal}</p>
            </div>
          )}

          {/* Relacionamentos se houver e tiver espaço */}
          {temRelacoes && mode === 'detalhado' && (
            <div className="mb-3">
              <p className="font-semibold text-[11px] text-purple-400 mb-1">Conceitos relacionados:</p>
              <div className="flex flex-wrap gap-1">
                {conceito!.relacionadoCom.slice(0, 3).map((relId) => {
                  const relConceito = conceitoPorId[relId];
                  return relConceito ? (
                    <span key={relId} className="px-2 py-0.5 bg-purple-900/50 rounded text-[10px] text-purple-300">
                      {relConceito.term}
                    </span>
                  ) : null;
                })}
              </div>
            </div>
          )}

          {/* Ações */}
          <div className="flex justify-between items-center pt-2 border-t border-gray-700">
            {temDetalhes ? (
              <button 
                onClick={handleVerDetalhes}
                className="flex items-center gap-1 text-blue-400 hover:text-blue-300 transition-colors text-[10px]"
              >
                Ver detalhes completos
                <ExternalLink size={10} />
              </button>
            ) : (
              <div></div>
            )}
            
            {conceito && (
              <span className="text-gray-500 text-[9px]">
                Nível: {conceito.complexidade}
              </span>
            )}
          </div>

          {/* Ponta do balão */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-gray-900" />
        </div>
      )}
    </div>
  );
};

export default EnhancedInfoTooltip;