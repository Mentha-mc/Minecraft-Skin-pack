import React, { useState } from 'react';
import { Download } from 'lucide-react';
import SkinUploader from './SkinUploader';
import SkinPreview from './SkinPreview';
import SkinList from './SkinList';
import ModelSelector from './ModelSelector';
import { generateSkinPack } from '../utils/skinPackGenerator';
import { Skin, SkinPack } from '../types/skin';

const SkinEditor: React.FC = () => {
  const [skins, setSkins] = useState<Skin[]>([]);
  const [selectedSkinId, setSelectedSkinId] = useState<string | null>(null);
  const [packName, setPackName] = useState('我的皮肤包');
  const [packDescription, setPackDescription] = useState('自定义 Minecraft 皮肤包');
  const [error, setError] = useState<string | null>(null);

  const handleSkinUpload = (
    pixels: string[][],
    width: number,
    height: number,
    modelType: 'classic' | 'slim'
  ) => {
    const newSkin: Skin = {
      id: crypto.randomUUID(),
      pixels,
      width,
      height,
      modelType,
      name: `皮肤 ${skins.length + 1}`
    };
    setSkins(prev => [...prev, newSkin]);
    setSelectedSkinId(newSkin.id);
    setError(null);
  };

  const handleSkinDelete = (id: string) => {
    setSkins(prev => prev.filter(skin => skin.id !== id));
    if (selectedSkinId === id) {
      setSelectedSkinId(null);
    }
  };

  const handleModelTypeChange = (modelType: 'classic' | 'slim') => {
    if (selectedSkinId) {
      setSkins(prev => prev.map(skin => 
        skin.id === selectedSkinId ? { ...skin, modelType } : skin
      ));
    }
  };

  const selectedSkin = selectedSkinId ? skins.find(skin => skin.id === selectedSkinId) : null;

  const handleDownload = async () => {
    if (skins.length === 0) {
      setError('请至少添加一个皮肤到皮肤包中');
      return;
    }

    if (!packName.trim()) {
      setError('请输入皮肤包名称');
      return;
    }

    const skinPack: SkinPack = {
      name: packName,
      description: packDescription,
      skins
    };

    try {
      const zipBlob = await generateSkinPack(skinPack);
      const url = URL.createObjectURL(zipBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${packName.toLowerCase().replace(/\s+/g, '_')}.mcpack`;
      link.click();
      URL.revokeObjectURL(url);
      setError(null);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '生成皮肤包失败';
      setError(errorMessage);
      console.error(errorMessage);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Minecraft 皮肤包生成器
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <SkinUploader onSkinUpload={handleSkinUpload} onError={setError} />
            
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4">皮肤包详情</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    皮肤包名称
                  </label>
                  <input
                    type="text"
                    value={packName}
                    onChange={(e) => setPackName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    描述
                  </label>
                  <textarea
                    value={packDescription}
                    onChange={(e) => setPackDescription(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    rows={3}
                  />
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4">皮肤列表</h3>
              <SkinList
                skins={skins}
                onDelete={handleSkinDelete}
                onSelect={setSelectedSkinId}
                selectedId={selectedSkinId}
              />
            </div>
          </div>

          <div className="space-y-6">
            {selectedSkin && (
              <>
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold mb-4">模型类型</h3>
                  <ModelSelector
                    modelType={selectedSkin.modelType}
                    onChange={handleModelTypeChange}
                  />
                </div>

                <SkinPreview
                  skinData={selectedSkin.pixels}
                  width={selectedSkin.width}
                  height={selectedSkin.height}
                />
              </>
            )}
          </div>
        </div>

        {error && (
          <div className="mt-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
            {error}
          </div>
        )}

        <button
          onClick={handleDownload}
          className="mt-6 w-full p-4 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center justify-center gap-2"
          disabled={skins.length === 0}
        >
          <Download size={20} />
          生成皮肤包 ({skins.length} 个皮肤)
        </button>
      </div>
    </div>
  );
};

export default SkinEditor;