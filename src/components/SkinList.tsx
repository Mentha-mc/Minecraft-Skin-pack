import React from 'react';
import { Trash2 } from 'lucide-react';
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
      <div className="text-gray-500 text-center p-4">
        还没有添加皮肤。上传一些皮肤开始使用吧！
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {skins.map((skin) => (
        <div
          key={skin.id}
          className={`flex items-center justify-between p-3 rounded-lg cursor-pointer ${
            selectedId === skin.id ? 'bg-blue-50 border border-blue-200' : 'bg-white hover:bg-gray-50'
          }`}
          onClick={() => onSelect(skin.id)}
        >
          <div className="flex items-center space-x-3">
            <canvas
              width={32}
              height={32}
              className="border border-gray-200 rounded"
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
              <div className="font-medium">{skin.name}</div>
              <div className="text-sm text-gray-500">
                {skin.width}x{skin.height} • {skin.modelType === 'classic' ? '经典版' : '纤细版'}
              </div>
            </div>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(skin.id);
            }}
            className="p-1 hover:bg-red-50 rounded text-gray-400 hover:text-red-500"
          >
            <Trash2 size={18} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default SkinList;