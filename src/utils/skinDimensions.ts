export interface SkinDimensions {
  width: number;
  height: number;
}

const VALID_DIMENSIONS = [
  { width: 64, height: 32 },  // Legacy skin
  { width: 64, height: 64 },  // Modern skin
  { width: 128, height: 128 } // HD skin
] as const;

export const validateSkinDimensions = (width: number, height: number): SkinDimensions | null => {
  return VALID_DIMENSIONS.find(dim => dim.width === width && dim.height === height) || null;
};