import React from 'react';

interface SkinPreviewProps {
  skinData: string[][];
  width: number;
  height: number;
}

const SkinPreview: React.FC<SkinPreviewProps> = ({ skinData, width, height }) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    skinData.forEach((row, y) => {
      row.forEach((color, x) => {
        ctx.fillStyle = color;
        ctx.fillRect(x, y, 1, 1);
      });
    });
  }, [skinData, width, height]);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-2">皮肤预览</h3>
      <div className="text-sm text-gray-600 mb-2">
        尺寸: {width}x{height}
      </div>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="border border-gray-300 w-full"
        style={{ 
          imageRendering: 'pixelated',
          background: 'repeating-casing-pattern(8px 8px, #FFFFFF11 0%, #00000011 100%)'
        }}
      />
    </div>
  );
};

export default SkinPreview;