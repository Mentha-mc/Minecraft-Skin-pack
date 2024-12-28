import React from 'react';
import { User, UserRound } from 'lucide-react';

interface ModelSelectorProps {
  modelType: 'classic' | 'slim';
  onChange: (modelType: 'classic' | 'slim') => void;
}

const ModelSelector: React.FC<ModelSelectorProps> = ({ modelType, onChange }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <button
        onClick={() => onChange('classic')}
        className={`flex flex-col items-center p-4 rounded-lg border transition-all duration-200 ${
          modelType === 'classic'
            ? 'bg-emerald-500/20 border-emerald-500/30 text-emerald-400'
            : 'bg-gray-900/50 border-gray-700 text-gray-400 hover:border-gray-600'
        }`}
      >
        <User className="w-8 h-8 mb-2" />
        <span>经典版 (Steve)</span>
      </button>
      
      <button
        onClick={() => onChange('slim')}
        className={`flex flex-col items-center p-4 rounded-lg border transition-all duration-200 ${
          modelType === 'slim'
            ? 'bg-emerald-500/20 border-emerald-500/30 text-emerald-400'
            : 'bg-gray-900/50 border-gray-700 text-gray-400 hover:border-gray-600'
        }`}
      >
        <UserRound className="w-8 h-8 mb-2" />
        <span>纤细版 (Alex)</span>
      </button>
    </div>
  );
};

export default ModelSelector;