import React from 'react';
import { Trash2, User } from 'lucide-react';
import { Skin } from '../types/skin';

interface SkinListProps {
  skins: Skin[];
  onDelete: (id: string) => void;
  onSelect: (id: string) => void;
  selectedId: string | null;
}

const SkinList: React.FC<SkinListProps> = ({ skins, onDelete, onSelect, selectedId }) => {
  if (skins.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-gray-400">
        <User className="w-12 h-12 mb-2 opacity-50" />
        <p>还没有添加皮肤。上传一些皮肤开始使用吧！</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {skins.map((skin) => (
        <div
          key={skin.id}
          className={`flex items-center justify-between p-4 rounded-lg cursor-pointer transition-all duration-200 ${
            selectedId === skin.id 
              ? 'bg-emerald-500/20 border border-emerald-500/30' 
              : 'bg-gray-900/50 border border-gray-700 hover:border-gray-600'
          }`}
          onClick={() => onSelect(skin.id)}
        >
          <div className="flex items-center space-x-3">
            <canvas
              width={32}
              height={32}
              className="border border-gray-700 rounded bg-gray-900"
              style={{ imageRendering: 'pixelated' }}
              ref={(canvas) => {
                if (canvas) {
                  const ctx = canvas.getContext('2d');
                  if (ctx) {
                    skin.pixels.forEach((row, y) => {
                      row.forEach((color, x) => {
                        ctx.fillStyle = color;
                        ctx.fillRect(x/2, y/2, 1, 1);
                      });
                    });
                  }
                }
              }}
            />
            <div>
              <div className="font-medium text-gray-200">{skin.name}</div>
              <div className="text-sm text-gray-400">
                {skin.width}x{skin.height} • {skin.modelType === 'classic' ? '经典版' : '纤细版'}
              </div>
            </div>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(skin.id);
            }}
            className="p-2 hover:bg-red-500/20 rounded-lg text-gray-400 hover:text-red-400 transition-colors"
          >
            <Trash2 size={18} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default SkinList;