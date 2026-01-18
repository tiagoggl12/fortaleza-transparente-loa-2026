import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { EstadoGlossario } from '../types/glossary';

interface GlossaryStore extends EstadoGlossario {
  // Actions
  toggleGlossary: () => void;
  openGlossary: (conceitoId?: string) => void;
  closeGlossary: () => void;
  setTermoBusca: (termo: string) => void;
  setCategoriaSelecionada: (categoria: string) => void;
  setConceitoAtual: (conceitoId: string | null) => void;
  addVisitado: (conceitoId: string) => void;
  toggleFavorito: (conceitoId: string) => void;
  setNivel: (nivel: 'essencial' | 'detalhado') => void;
}

export const useGlossaryStore = create<GlossaryStore>()(
  persist(
    (set, get) => ({
      // Estado inicial
      ativo: false,
      termoBusca: '',
      categoriaSelecionada: '',
      conceitoAtual: null,
      conceitosVisitados: new Set(),
      favoritos: new Set(),
      nivelAtual: 'essencial',

      // Actions
      toggleGlossary: () => {
        set((state) => ({ ativo: !state.ativo }));
      },

      openGlossary: (conceitoId?: string) => {
        set({ 
          ativo: true,
          conceitoAtual: conceitoId || null,
          ...(conceitoId && { conceitosVisitados: new Set([...get().conceitosVisitados, conceitoId]) })
        });
      },

      closeGlossary: () => {
        set({ 
          ativo: false,
          termoBusca: '',
          categoriaSelecionada: '',
          conceitoAtual: null 
        });
      },

      setTermoBusca: (termo: string) => {
        set({ termoBusca: termo });
      },

      setCategoriaSelecionada: (categoria: string) => {
        set({ categoriaSelecionada: categoria });
      },

      setConceitoAtual: (conceitoId: string | null) => {
        if (conceitoId) {
          set((state) => ({
            conceitoAtual: conceitoId,
            conceitosVisitados: new Set([...state.conceitosVisitados, conceitoId])
          }));
        } else {
          set({ conceitoAtual: null });
        }
      },

      addVisitado: (conceitoId: string) => {
        set((state) => ({
          conceitosVisitados: new Set([...state.conceitosVisitados, conceitoId])
        }));
      },

      toggleFavorito: (conceitoId: string) => {
        set((state) => {
          const novosFavoritos = new Set(state.favoritos);
          if (novosFavoritos.has(conceitoId)) {
            novosFavoritos.delete(conceitoId);
          } else {
            novosFavoritos.add(conceitoId);
          }
          return { favoritos: novosFavoritos };
        });
      },

      setNivel: (nivel: 'essencial' | 'detalhado') => {
        set({ nivelAtual: nivel });
      }
    }),
    {
      name: 'glossary-storage',
      // Transforma Sets para arrays para persistência
      serialize: (state) => ({
        ...state,
        conceitosVisitados: Array.from(state.conceitosVisitados),
        favoritos: Array.from(state.favoritos)
      }),
      deserialize: (state) => ({
        ...state,
        conceitosVisitados: new Set(state.conceitosVisitados || []),
        favoritos: new Set(state.favoritos || [])
      }),
      // Só persiste dados do usuário, não estado UI transitório
      partialize: (state) => ({
        conceitosVisitados: state.conceitosVisitados,
        favoritos: state.favoritos,
        nivelAtual: state.nivelAtual
      })
    }
  )
);

// Hook convenience para acesso rápido
export const useGlossary = () => {
  const store = useGlossaryStore();
  
  return {
    ...store,
    isVisitado: (conceitoId: string) => store.conceitosVisitados.has(conceitoId),
    isFavorito: (conceitoId: string) => store.favoritos.has(conceitoId),
    stats: {
      visitados: store.conceitosVisitados.size,
      favoritos: store.favoritos.size,
      progresso: Math.round((store.conceitosVisitados.size / 20) * 100) // Ajustar para total real
    }
  };
};