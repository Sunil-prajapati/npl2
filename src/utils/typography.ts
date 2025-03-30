// Base font size in pixels (typically 16px)
const BASE_FONT_SIZE = 16;

/**
 * Converts rem units to pixels
 * @param rem The rem value to convert
 * @returns The equivalent in pixels
 */
export const remToPixels = (rem: number): number => {
  return rem * BASE_FONT_SIZE;
};