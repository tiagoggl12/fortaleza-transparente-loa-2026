import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2, FileText, AlertCircle, Sparkles } from 'lucide-react';

const API_URL = 'http://localhost:8000';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  sources?: SearchResult[];
  timestamp: Date;
}

export interface SearchResult {
  rank: number;
  text: string;
  metadata: {
    page: number;
    chunk_type?: string;
    section?: string;
    title?: string;
    program_code?: string;
    regional?: string;
  };
  score: number;
}

const ChatView: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Mensagem de boas-vindas
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{
        id: 'welcome',
        role: 'assistant',
        content: 'Olá! Eu sou o assistente virtual da LOA 2026. Posso ajudar você a encontrar informações sobre o orçamento de Fortaleza.\n\n**Exemplos de perguntas:**\n• Quanto foi investido em educação?\n• Quais são as principais receitas?\n• O que está previsto para a Regional VI?\n• Quanto custa o programa de saúde?',
        timestamp: new Date()
      }]);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const query = input.trim();
    if (!query || isLoading) return;

    // Adiciona mensagem do usuário
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: query,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/search`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, n_results: 5 })
      });

      if (!response.ok) {
        throw new Error(`Erro na API: ${response.status}`);
      }

      const data = await response.json();

      // Constrói resposta baseada nos resultados
      let responseContent = '';
      const sources = data.results || [];

      if (sources.length === 0) {
        responseContent = 'Não encontrei informações relevantes sobre isso na LOA 2026. Tente reformular sua pergunta com outros termos.';
      } else {
        // Gera uma resposta resumida
        responseContent = generateResponse(query, sources);
      }

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responseContent,
        sources,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao buscar informações');
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Desculpe, ocorreu um erro ao buscar as informações. Verifique se o servidor backend está rodando.',
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Gera uma resposta baseada nos resultados da busca
  const generateResponse = (query: string, sources: SearchResult[]): string => {
    if (sources.length === 0) return 'Não encontrei informações relevantes.';

    const queryLower = query.toLowerCase();
    let response = '';

    // Detecta o tipo de pergunta e personaliza a resposta
    if (queryLower.includes('educação')) {
      response = '📚 **Sobre Educação na LOA 2026:**\n\n';
    } else if (queryLower.includes('saúde')) {
      response = '🏥 **Sobre Saúde na LOA 2026:**\n\n';
    } else if (queryLower.includes('regional') || /\b[ivx]+|\d+/.test(queryLower)) {
      response = '📍 **Sobre Regionais na LOA 2026:**\n\n';
    } else if (queryLower.includes('receita') || queryLower.includes('arrecada')) {
      response = '💰 **Sobre Receitas na LOA 2026:**\n\n';
    } else if (queryLower.includes('despesa') || queryLower.includes('gasto') || queryLower.includes('investimento')) {
      response = '💸 **Sobre Despesas na LOA 2026:**\n\n';
    } else {
      response = '📄 **Informações encontradas na LOA 2026:**\n\n';
    }

    // Adiciona os trechos mais relevantes
    const topResults = sources.slice(0, 3);
    topResults.forEach((result, index) => {
      const page = result.metadata.page || '?';
      response += `\n**${index + 1}.** (Página ${page})\n`;
      response += `"${result.text.substring(0, 200)}${result.text.length > 200 ? '...' : ''}"\n`;
    });

    response += `\n📊 **Relevância**: ${Math.round(sources[0].score * 100)}%`;

    return response;
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const suggestedQuestions = [
    'Quanto foi investido em educação?',
    'Quais são as principais receitas?',
    'O que está previsto para a saúde?',
    'Quais os investimentos por regional?'
  ];

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-2xl shadow-lg">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-white/20 p-2 rounded-lg">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Assistente LOA 2026</h1>
            <p className="text-blue-100 text-sm">Pergunte sobre o orçamento de Fortaleza</p>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="flex-1 overflow-y-auto bg-white rounded-2xl shadow-sm border border-gray-200 my-4">
        <div className="p-6 space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.role === 'assistant' && (
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                </div>
              )}

              <div className={`
                max-w-[80%] rounded-2xl px-4 py-3
                ${message.role === 'user'
                  ? 'bg-blue-600 text-white rounded-br-md'
                  : 'bg-gray-100 text-gray-800 rounded-bl-md'}
              `}>
                <div className="whitespace-pre-wrap text-sm leading-relaxed">
                  {message.content}
                </div>

                {/* Fontes */}
                {message.sources && message.sources.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <div className="flex items-center gap-1 text-xs text-gray-500 mb-2">
                      <FileText size={12} />
                      <span>Fontes LOA 2026</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {message.sources.slice(0, 5).map((source, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1 px-2 py-1 bg-white rounded-md text-xs text-gray-600 border border-gray-200"
                          title={source.text.substring(0, 100)}
                        >
                          Pg. {source.metadata.page}
                          {source.metadata.section && (
                            <span className="text-blue-600">• {source.metadata.section}</span>
                          )}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {message.role === 'user' && (
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
                  <span className="text-xs font-semibold text-gray-600">Você</span>
                </div>
              )}
            </div>
          ))}

          {/* Indicador de carregamento */}
          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4 text-blue-600" />
              </div>
              <div className="bg-gray-100 rounded-2xl rounded-bl-md px-4 py-3">
                <div className="flex items-center gap-2 text-gray-500">
                  <Loader2 size={16} className="animate-spin" />
                  <span className="text-sm">Consultando a LOA 2026...</span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Sugestões de perguntas */}
      {messages.length <= 1 && !isLoading && (
        <div className="mb-4">
          <p className="text-sm text-gray-500 mb-3">Perguntas sugeridas:</p>
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.map((question, idx) => (
              <button
                key={idx}
                onClick={() => setInput(question)}
                className="px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-sm font-medium transition-colors border border-blue-200"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Erro */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
          <AlertCircle size={16} />
          <span className="text-sm">{error}</span>
        </div>
      )}

      {/* Input */}
      <form onSubmit={handleSubmit} className="relative">
        <textarea
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Digite sua pergunta sobre a LOA 2026..."
          rows={2}
          className="w-full px-4 py-3 pr-12 bg-white border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="absolute right-3 bottom-3 p-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
        >
          {isLoading ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <Send size={18} />
          )}
        </button>
      </form>

      <p className="text-xs text-gray-400 mt-2 text-center">
        Pressione Enter para enviar, Shift+Enter para nova linha
      </p>
    </div>
  );
};

export default ChatView;
