import React from 'react';

interface ModelSelectorProps {
  modelType: 'classic' | 'slim';
  onChange: (modelType: 'classic' | 'slim') => void;
}

const ModelSelector: React.FC<ModelSelectorProps> = ({ modelType, onChange }) => {
  return (
    <div className="flex gap-4 mb-4">
      <label className="flex items-center">
        <input
          type="radio"
          name="modelType"
          value="classic"
          checked={modelType === 'classic'}
          onChange={() => onChange('classic')}
          className="mr-2"
        />
        <span>经典版 (Steve)</span>
      </label>
      <label className="flex items-center">
        <input
          type="radio"
          name="modelType"
          value="slim"
          checked={modelType === 'slim'}
          onChange={() => onChange('slim')}
          className="mr-2"
        />
        <span>纤细版 (Alex)</span>
      </label>
    </div>
  );
};

export default ModelSelector;