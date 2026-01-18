import React, { useState, useMemo } from 'react';
import { Search, X, BookOpen, TrendingUp, TrendingDown, MapPin, Filter } from 'lucide-react';
import { CATEGORIAS_GLOSSARIO, GLOSSARIO_CONCEITOS } from '../../data/glossary';
import { ConceitoOrçamentário, CategoriaGlossario, EstadoGlossario } from '../../types/glossary';
import ConceptDetail from './ConceptDetail';
import RelationGraph from './RelationGraph';

interface GlossarySidebarProps {
  isOpen: boolean;
  onClose: () => void;
  initialConcept?: string;
}

const GlossarySidebar: React.FC<GlossarySidebarProps> = ({ 
  isOpen, 
  onClose, 
  initialConcept 
}) => {
  const [estado, setEstado] = useState<EstadoGlossario>({
    ativo: true,
    termoBusca: '',
    categoriaSelecionada: '',
    conceitoAtual: initialConcept || null,
    conceitosVisitados: new Set(),
    favoritos: new Set(),
    nivelAtual: 'essencial'
  });

  const [showGraph, setShowGraph] = useState(false);

  // Filtrar conceitos baseado na busca e categoria
  const conceitosFiltrados = useMemo(() => {
    let filtrados = GLOSSARIO_CONCEITOS;

    // Filtrar por categoria
    if (estado.categoriaSelecionada) {
      filtrados = filtrados.filter(c => c.categoria === estado.categoriaSelecionada);
    }

    // Filtrar por termo de busca
    if (estado.termoBusca) {
      const termoLower = estado.termoBusca.toLowerCase();
      filtrados = filtrados.filter(c => 
        c.term.toLowerCase().includes(termoLower) ||
        c.essencial.toLowerCase().includes(termoLower) ||
        c.detalhado.toLowerCase().includes(termoLower) ||
        c.tags.some(tag => tag.toLowerCase().includes(termoLower))
      );
    }

    return filtrados.sort((a, b) => a.term.localeCompare(b.term));
  }, [estado.termoBusca, estado.categoriaSelecionada]);

  const conceitoAtual = estado.conceitoAtual 
    ? GLOSSARIO_CONCEITOS.find(c => c.id === estado.conceitoAtual)
    : null;

  // Marcamos conceito como visitado quando selecionado
  const selecionarConceito = (conceitoId: string) => {
    setEstado(prev => ({
      ...prev,
      conceitoAtual: conceitoId,
      conceitosVisitados: new Set([...prev.conceitosVisitados, conceitoId])
    }));
  };

  const toggleFavorito = (conceitoId: string) => {
    setEstado(prev => {
      const novosFavoritos = new Set(prev.favoritos);
      if (novosFavoritos.has(conceitoId)) {
        novosFavoritos.delete(conceitoId);
      } else {
        novosFavoritos.add(conceitoId);
      }
      return { ...prev, favoritos: novosFavoritos };
    });
  };

  const getCategoriaIcon = (categoriaId: string) => {
    const categoria = CATEGORIAS_GLOSSARIO.find(c => c.id === categoriaId);
    const iconMap: Record<string, React.ReactNode> = {
      'trending-up': <TrendingUp size={16} />,
      'trending-down': <TrendingDown size={16} />,
      'book-open': <BookOpen size={16} />,
      'map-pin': <MapPin size={16} />
    };
    return categoria ? iconMap[categoria.icone] || <BookOpen size={16} /> : <BookOpen size={16} />;
  };

  const getCategoriaColor = (categoriaId: string) => {
    const categoria = CATEGORIAS_GLOSSARIO.find(c => c.id === categoriaId);
    return categoria ? categoria.cor : 'blue';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className="relative w-full max-w-2xl h-full bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-lg text-white">
              <BookOpen size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Dicionário do Cidadão</h2>
              <p className="text-sm text-gray-600">Entenda a linguagem do orçamento</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        {/* Busca e Filtros */}
        <div className="p-6 border-b border-gray-200 space-y-4">
          {/* Barra de busca */}
          <div className="relative">
            <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar conceitos, termos ou exemplos..."
              value={estado.termoBusca}
              onChange={(e) => setEstado(prev => ({ ...prev, termoBusca: e.target.value }))}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filtros de categoria */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setEstado(prev => ({ ...prev, categoriaSelecionada: '' }))}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                !estado.categoriaSelecionada 
                  ? 'bg-blue-600 text-white shadow-sm' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Todos
            </button>
            {CATEGORIAS_GLOSSARIO.map(categoria => (
              <button
                key={categoria.id}
                onClick={() => setEstado(prev => ({ ...prev, categoriaSelecionada: categoria.id }))}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  estado.categoriaSelecionada === categoria.id 
                    ? 'bg-blue-600 text-white shadow-sm' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {getCategoriaIcon(categoria.icone)}
                {categoria.nome}
              </button>
            ))}
          </div>

          {/* Toggle modo visualização */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter size={16} className="text-gray-500" />
              <span className="text-sm text-gray-600">
                {conceitosFiltrados.length} conceito(s) encontrado(s)
              </span>
            </div>
            <button
              onClick={() => setShowGraph(!showGraph)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                showGraph 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {showGraph ? 'Lista' : 'Mapa'} Relações
            </button>
          </div>
        </div>

        {/* Conteúdo Principal */}
        <div className="flex-1 overflow-hidden">
          {showGraph ? (
            // Visualização em Grafo
            <div className="h-full p-6">
              <RelationGraph 
                conceitos={conceitosFiltrados}
                conceitoSelecionado={estado.conceitoAtual}
                onConceitoClick={selecionarConceito}
                conceitosVisitados={estado.conceitosVisitados}
                favoritos={estado.favoritos}
              />
            </div>
          ) : conceitoAtual ? (
            // Detalhe do Conceito
            <ConceptDetail 
              conceito={conceitoAtual}
              onBack={() => setEstado(prev => ({ ...prev, conceitoAtual: null }))}
              onRelatedClick={selecionarConceito}
              isFavorito={estado.favoritos.has(conceitoAtual.id)}
              onToggleFavorito={() => toggleFavorito(conceitoAtual.id)}
              conceitosVisitados={estado.conceitosVisitados}
            />
          ) : (
            // Lista de Conceitos
            <div className="h-full overflow-y-auto p-6">
              <div className="space-y-3">
                {conceitosFiltrados.map(conceito => {
                  const visitado = estado.conceitosVisitados.has(conceito.id);
                  const favorito = estado.favoritos.has(conceito.id);
                  const categoriaCor = getCategoriaColor(conceito.categoria);

                  return (
                    <div
                      key={conceito.id}
                      onClick={() => selecionarConceito(conceito.id)}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all hover:shadow-md ${
                        visitado 
                          ? 'bg-blue-50 border-blue-200' 
                          : 'bg-white border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 bg-${categoriaCor}-100 text-${categoriaCor}-700 rounded-full text-[10px] font-medium`}>
                              {getCategoriaIcon(conceito.categoria)}
                              {conceito.categoria}
                            </span>
                            {favorito && <span className="text-yellow-500">⭐</span>}
                            {visitado && <span className="text-green-500">✓</span>}
                          </div>
                          <h3 className="font-bold text-gray-900 mb-1">{conceito.term}</h3>
                          <p className="text-sm text-gray-600 leading-relaxed">{conceito.essencial}</p>
                          
                          {/* Tags */}
                          <div className="flex flex-wrap gap-1 mt-2">
                            {conceito.tags.slice(0, 3).map(tag => (
                              <span key={tag} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-[10px]">
                                #{tag}
                              </span>
                            ))}
                            {conceito.complexidade === 'detalhado' && (
                              <span className="px-2 py-0.5 bg-orange-100 text-orange-700 rounded text-[10px] font-medium">
                                Avançado
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer com estatísticas */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex justify-between text-xs text-gray-600">
            <span>✅ {estado.conceitosVisitados.size} conceitos explorados</span>
            <span>⭐ {estado.favoritos.size} favoritos</span>
            <span>📚 {GLOSSARIO_CONCEITOS.length} conceitos totais</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlossarySidebar;