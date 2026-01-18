
import React, { useState } from 'react';
import {
  LayoutDashboard,
  TrendingUp,
  PieChart as PieChartIcon,
  Map as MapIcon,
  Users,
  Search,
  Menu,
  X,
  Building2,
  Calendar,
  ChevronRight,
  BookOpen,
  MessageSquare
} from 'lucide-react';
import { ViewType } from './types';
import DashboardView from './components/DashboardView';
import RevenueView from './components/RevenueView';
import ExpenseView from './components/ExpenseView';
import RegionalView from './components/RegionalView';
import ParticipatoryView from './components/ParticipatoryView';
import ChatView from './components/ChatView';
import GlossarySidebar from './components/glossary/GlossarySidebar';
import { useGlossary } from './hooks/useGlossary';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewType>('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { ativo: glossaryAtivo, openGlossary, closeGlossary } = useGlossary();

  const navItems = [
    { id: 'overview', label: 'Visão Geral', icon: LayoutDashboard },
    { id: 'revenue', label: 'Receitas', icon: TrendingUp },
    { id: 'expense', label: 'Despesas', icon: PieChartIcon },
    { id: 'regional', label: 'Investimento Regional', icon: MapIcon },
    { id: 'participatory', label: 'Participação Social', icon: Users },
    { id: 'chat', label: 'Assistente LOA', icon: MessageSquare },
  ];

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden" 
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out lg:relative lg:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="h-full flex flex-col">
          <div className="p-6 border-b border-gray-100 flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Building2 className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="font-bold text-gray-900 leading-none">Fortaleza</h1>
              <p className="text-xs text-gray-500 mt-1">LOA 2026</p>
            </div>
          </div>

          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveView(item.id as ViewType);
                  setIsSidebarOpen(false);
                }}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                  ${activeView === item.id 
                    ? 'bg-blue-50 text-blue-700 shadow-sm ring-1 ring-blue-100' 
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}
                `}
              >
                <item.icon size={20} className={activeView === item.id ? 'text-blue-600' : ''} />
                <span className="font-medium text-sm">{item.label}</span>
                {activeView === item.id && <ChevronRight size={16} className="ml-auto" />}
              </button>
            ))}
          </nav>

          <div className="p-4 border-t border-gray-100">
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
              <div className="flex items-center gap-2 mb-2">
                <Calendar size={16} className="text-blue-600" />
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Exercício 2026</span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                Documento referenciado: Mensagem nº 55, de 15 de outubro de 2025.
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-4">
            <button 
              type="button"
              title="Abrir menu"
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg text-gray-600"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
            <h2 className="text-lg font-semibold text-gray-800">
              {navItems.find(n => n.id === activeView)?.label}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-full border border-gray-200">
              <Users size={16} className="text-gray-500" />
              <span className="text-xs font-medium text-gray-700">Prefeito: Evandro Leitão</span>
            </div>
            <button 
              type="button"
              title="Dicionário do Cidadão"
              onClick={openGlossary}
              className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors"
            >
              <BookOpen size={20} />
            </button>
            <button 
              type="button"
              title="Buscar"
              className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors"
            >
              <Search size={20} />
            </button>
          </div>
        </header>

        {/* View Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeView === 'overview' && <DashboardView />}
          {activeView === 'revenue' && <RevenueView />}
          {activeView === 'expense' && <ExpenseView />}
          {activeView === 'regional' && <RegionalView />}
          {activeView === 'participatory' && <ParticipatoryView />}
          {activeView === 'chat' && <ChatView />}
        </div>
      </main>
      
      {/* Glossary Sidebar Global */}
      {activeView !== 'overview' && (
        <GlossarySidebar 
          isOpen={glossaryAtivo}
          onClose={closeGlossary}
        />
      )}
    </div>
  );
};

export default App;
