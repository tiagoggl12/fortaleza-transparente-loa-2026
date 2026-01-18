
import React, { useState } from 'react';
import { HelpCircle } from 'lucide-react';

interface InfoTooltipProps {
  term: string;
  definition: string;
  children?: React.ReactNode;
}

const InfoTooltip: React.FC<InfoTooltipProps> = ({ term, definition, children }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative inline-flex items-center group">
      <div 
        className="flex items-center gap-1 cursor-help"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children || <span className="border-b border-dotted border-gray-400">{term}</span>}
        <HelpCircle size={14} className="text-gray-400 group-hover:text-blue-500 transition-colors" />
      </div>
      
      {isVisible && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-gray-900 text-white text-xs rounded-xl shadow-2xl z-[100] animate-in fade-in zoom-in-95 duration-200">
          <p className="font-bold mb-1 text-blue-400 uppercase tracking-tighter">{term}</p>
          <p className="leading-relaxed opacity-90">{definition}</p>
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-gray-900" />
        </div>
      )}
    </div>
  );
};

export default InfoTooltip;
