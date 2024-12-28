import { SkinDimensions } from './skinDimensions';

interface ProcessedImageData {
  pixels: string[][];
  width: number;
  height: number;
}

export const processImageData = (
  file: File,
  validateDimensions: (width: number, height: number) => SkinDimensions | null
): Promise<ProcessedImageData> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const img = new Image();
      
      img.onload = () => {
        const dimensions = validateDimensions(img.width, img.height);
        
        if (!dimensions) {
          reject(new Error('Invalid skin dimensions. Please use a 64x32, 64x64, or 128x128 Minecraft skin.'));
          return;
        }

        const canvas = document.createElement('canvas');
        canvas.width = dimensions.width;
        canvas.height = dimensions.height;
        const ctx = canvas.getContext('2d');
        
        if (!ctx) {
          reject(new Error('Failed to create canvas context'));
          return;
        }

        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, dimensions.width, dimensions.height);
        const pixelData: string[][] = [];
        
        for (let y = 0; y < dimensions.height; y++) {
          const row: string[] = [];
          for (let x = 0; x < dimensions.width; x++) {
            const i = (y * dimensions.width + x) * 4;
            const r = imageData.data[i];
            const g = imageData.data[i + 1];
            const b = imageData.data[i + 2];
            const a = imageData.data[i + 3] / 255;
            row.push(`rgba(${r},${g},${b},${a})`);
          }
          pixelData.push(row);
        }
        
        resolve({
          pixels: pixelData,
          width: dimensions.width,
          height: dimensions.height
        });
      };

      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = e.target?.result as string;
    };

    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
};