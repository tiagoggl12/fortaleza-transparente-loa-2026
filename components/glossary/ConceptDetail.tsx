import React from 'react';
import { ArrowLeft, Star, Heart, ExternalLink, Users, Target, Zap, BookOpen, TrendingUp, TrendingDown, MapPin } from 'lucide-react';
import { ConceitoOrçamentário } from '../../types/glossary';
import { CATEGORIAS_GLOSSARIO, conceitoPorId } from '../../data/glossary';

interface ConceptDetailProps {
  conceito: ConceitoOrçamentário;
  onBack: () => void;
  onRelatedClick: (conceitoId: string) => void;
  isFavorito: boolean;
  onToggleFavorito: () => void;
  conceitosVisitados: Set<string>;
}

const ConceptDetail: React.FC<ConceptDetailProps> = ({
  conceito,
  onBack,
  onRelatedClick,
  isFavorito,
  onToggleFavorito,
  conceitosVisitados
}) => {
  const categoria = CATEGORIAS_GLOSSARIO.find(c => c.id === conceito.categoria);
  const conceitosRelacionados = conceito.relacionadoCom
    .map(id => conceitoPorId[id])
    .filter(Boolean);

  const getCategoriaIcon = (iconName: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      'trending-up': <TrendingUp size={16} />,
      'trending-down': <TrendingDown size={16} />,
      'book-open': <BookOpen size={16} />,
      'map-pin': <MapPin size={16} />
    };
    return iconMap[iconName] || <BookOpen size={16} />;
  };

  const getCategoriaColor = (cor: string) => {
    const colorMap: Record<string, string> = {
      'emerald': 'green',
      'red': 'red', 
      'blue': 'blue',
      'purple': 'purple'
    };
    return colorMap[cor] || 'blue';
  };

  const categoriaCor = getCategoriaColor(categoria?.cor || 'blue');

  return (
    <div className="h-full overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 p-6 z-10">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className={`inline-flex items-center gap-2 px-3 py-1.5 bg-${categoriaCor}-100 text-${categoriaCor}-700 rounded-full text-sm font-medium`}>
                {getCategoriaIcon(categoria?.icone || 'book-open')}
                {categoria?.nome}
              </span>
              {conceito.complexidade === 'detalhado' && (
                <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">
                  Nível Avançado
                </span>
              )}
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{conceito.term}</h1>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <button
                onClick={onToggleFavorito}
                className={`flex items-center gap-1 px-3 py-1 rounded-lg transition-all ${
                  isFavorito 
                    ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {isFavorito ? <Star size={16} className="fill-current" /> : <Star size={16} />}
                {isFavorito ? 'Favorito' : 'Favoritar'}
              </button>
              {conceitosVisitados.has(conceito.id) && (
                <span className="flex items-center gap-1 text-green-600">
                  <Target size={16} />
                  Explorado
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div className="p-6 space-y-8">
        {/* Definição Essencial */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
          <div className="flex items-start gap-3 mb-3">
            <div className="p-2 bg-blue-600 rounded-lg text-white">
              <Zap size={20} />
            </div>
            <div className="flex-1">
              <h2 className="font-bold text-blue-900 mb-2">Em linguagem simples</h2>
              <p className="text-blue-800 leading-relaxed text-lg">{conceito.essencial}</p>
            </div>
          </div>
        </div>

        {/* Explicação Detalhada */}
        <div>
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <div className="w-1 h-6 bg-gray-800 rounded-full"></div>
            Explicação Completa
          </h3>
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 leading-relaxed text-lg">{conceito.detalhado}</p>
          </div>
        </div>

        {/* Exemplos Práticos */}
        {conceito.exemplos.length > 0 && (
          <div>
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <div className="w-1 h-6 bg-green-600 rounded-full"></div>
              Exemplos do Dia a Dia
            </h3>
            <div className="space-y-3">
              {conceito.exemplos.map((exemplo, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-xl">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <p className="text-green-800 leading-relaxed">{exemplo}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Impacto Real */}
        {conceito.impactoReal && (
          <div className="bg-purple-50 border border-purple-200 rounded-2xl p-6">
            <h3 className="font-bold text-purple-900 mb-3 flex items-center gap-2">
              <Heart size={20} className="text-purple-600" />
              Como isso afeta sua vida
            </h3>
            <p className="text-purple-800 leading-relaxed text-lg">{conceito.impactoReal}</p>
          </div>
        )}

        {/* Conceitos Relacionados */}
        {conceitosRelacionados.length > 0 && (
          <div>
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <div className="w-1 h-6 bg-orange-600 rounded-full"></div>
              Continue Aprendendo
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {conceitosRelacionados.map(relacionado => (
                <div
                  key={relacionado.id}
                  onClick={() => onRelatedClick(relacionado.id)}
                  className="p-4 border-2 border-gray-200 rounded-xl cursor-pointer transition-all hover:border-orange-300 hover:bg-orange-50 hover:shadow-md"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-600">
                      {CATEGORIAS_GLOSSARIO.find(c => c.id === relacionado.categoria)?.nome}
                    </span>
                    {conceitosVisitados.has(relacionado.id) && (
                      <span className="text-xs text-green-600">✓ Explorado</span>
                    )}
                  </div>
                  <h4 className="font-bold text-gray-900 mb-1">{relacionado.term}</h4>
                  <p className="text-sm text-gray-600 line-clamp-2">{relacionado.essencial}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tags */}
        {conceito.tags.length > 0 && (
          <div>
            <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <div className="w-1 h-6 bg-gray-400 rounded-full"></div>
              Assuntos Relacionados
            </h3>
            <div className="flex flex-wrap gap-2">
              {conceito.tags.map(tag => (
                <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConceptDetail;