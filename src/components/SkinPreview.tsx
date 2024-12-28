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
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
      <h3 className="text-lg font-semibold mb-2 text-gray-200">皮肤预览</h3>
      <div className="text-sm text-gray-400 mb-4">
        尺寸: {width}x{height}
      </div>
      <div className="bg-gray-900 p-4 rounded-lg">
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          className="w-full border border-gray-700 rounded"
          style={{ 
            imageRendering: 'pixelated',
            background: 'repeating-casing-pattern(8px 8px, rgba(255,255,255,0.03), rgba(0,0,0,0.03) 100%)'
          }}
        />
      </div>
    </div>
  );
};

export default SkinPreview;