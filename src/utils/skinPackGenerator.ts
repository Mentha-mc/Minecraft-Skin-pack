import JSZip from 'jszip';
import { SkinPack } from '../types/skin';

export const generateSkinPack = async (skinPack: SkinPack): Promise<Blob> => {
  try {
    const zip = new JSZip();

    // Create manifest.json
    const manifest = {
      format_version: 1,
      header: {
        name: skinPack.name,
        uuid: crypto.randomUUID(),
        version: [1, 0, 0]
      },
      modules: [
        {
          type: "skin_pack",
          uuid: crypto.randomUUID(),
          version: [1, 0, 0]
        }
      ]
    };

    // Create skins.json
    const skins = {
      skins: skinPack.skins.map((skin, index) => ({
        localization_name: skin.name,
        geometry: skin.modelType === 'slim' 
          ? "geometry.humanoid.customSlim"
          : "geometry.humanoid.custom",
        texture: `skin_${index}.png`,
        type: "free"
      })),
      serialize_name: skinPack.name,
      localization_name: skinPack.name
    };

    // Add manifest and skins json
    zip.file("manifest.json", JSON.stringify(manifest, null, 2));
    zip.file("skins.json", JSON.stringify(skins, null, 2));

    // Add each skin PNG
    await Promise.all(skinPack.skins.map(async (skin, index) => {
      const canvas = document.createElement('canvas');
      canvas.width = skin.width;
      canvas.height = skin.height;
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        throw new Error('Could not create canvas context');
      }

      skin.pixels.forEach((row, y) => {
        row.forEach((color, x) => {
          ctx.fillStyle = color;
          ctx.fillRect(x, y, 1, 1);
        });
      });

      const skinBlob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob((blob) => {
          if (!blob) {
            reject(new Error('Failed to create skin image'));
            return;
          }
          resolve(blob);
        }, 'image/png');
      });

      zip.file(`skin_${index}.png`, skinBlob);
    }));

    return await zip.generateAsync({ type: "blob" });
  } catch (error) {
    throw new Error(`Failed to generate skin pack: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};