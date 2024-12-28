import React from 'react';
import { Upload } from 'lucide-react';
import { validateSkinDimensions } from '../utils/skinDimensions';
import { processImageData } from '../utils/imageProcessor';

interface SkinUploaderProps {
  onSkinUpload: (imageData: string[][], width: number, height: number, modelType: 'classic' | 'slim') => void;
  onError: (message: string) => void;
}

const SkinUploader: React.FC<SkinUploaderProps> = ({ onSkinUpload, onError }) => {
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const imageData = await processImageData(file, validateSkinDimensions);
      if (imageData) {
        onSkinUpload(imageData.pixels, imageData.width, imageData.height, 'classic');
      }
    } catch (error) {
      onError(error instanceof Error ? error.message : '处理皮肤文件失败');
    }
  };

  return (
    <div className="mb-6">
      <label className="flex items-center justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-blue-400 focus:outline-none">
        <div className="flex flex-col items-center space-y-2">
          <Upload className="w-8 h-8 text-gray-400" />
          <span className="font-medium text-gray-600">
            将 Minecraft 皮肤拖放到此处或点击上传
          </span>
          <span className="text-sm text-gray-500">
            支持 64x32、64x64 和 128x128 的皮肤
          </span>
        </div>
        <input
          type="file"
          accept=".png"
          className="hidden"
          onChange={handleFileUpload}
        />
      </label>
    </div>
  );
};

export default SkinUploader;