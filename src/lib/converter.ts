/**
 * Core mathematical engine and export generators for InchPixels
 */

export interface DimensionState {
  widthIn: number;
  heightIn: number;
  widthPx: number;
  heightPx: number;
  dpi: number;
  precision: number;
  is2D: boolean;
  lockAspectRatio: boolean;
}

/**
 * Convert Inches to Pixels
 * Pixels = Inches * DPI
 */
export function inchesToPixels(inches: number, dpi: number, precision: number = 0): number {
  if (isNaN(inches) || isNaN(dpi) || dpi <= 0) return 0;
  const raw = inches * dpi;
  if (precision === 0) {
    return Math.round(raw);
  }
  const factor = Math.pow(10, precision);
  return Math.round(raw * factor) / factor;
}

/**
 * Convert Pixels to Inches
 * Inches = Pixels / DPI
 */
export function pixelsToInches(pixels: number, dpi: number, precision: number = 3): number {
  if (isNaN(pixels) || isNaN(dpi) || dpi <= 0) return 0;
  const raw = pixels / dpi;
  const factor = Math.pow(10, precision);
  return Math.round(raw * factor) / factor;
}

/**
 * Convert Inches to Centimeters (1 in = 2.54 cm)
 */
export function inchesToCm(inches: number, precision: number = 2): number {
  if (isNaN(inches)) return 0;
  const factor = Math.pow(10, precision);
  return Math.round(inches * 2.54 * factor) / factor;
}

/**
 * Convert Inches to Millimeters (1 in = 25.4 mm)
 */
export function inchesToMm(inches: number, precision: number = 1): number {
  if (isNaN(inches)) return 0;
  const factor = Math.pow(10, precision);
  return Math.round(inches * 25.4 * factor) / factor;
}

/**
 * Greatest Common Divisor
 */
function gcd(a: number, b: number): number {
  a = Math.abs(Math.round(a));
  b = Math.abs(Math.round(b));
  while (b) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a || 1;
}

/**
 * Calculate aspect ratio label and decimal
 */
export function getAspectRatio(width: number, height: number): { label: string; decimal: number; ratioX: number; ratioY: number } {
  if (!width || !height || width <= 0 || height <= 0) {
    return { label: '1:1', decimal: 1, ratioX: 1, ratioY: 1 };
  }

  const decimal = Number((width / height).toFixed(3));
  const commonRatios: [number, number, string][] = [
    [1, 1, '1:1'],
    [16, 9, '16:9'],
    [9, 16, '9:16'],
    [4, 3, '4:3'],
    [3, 4, '3:4'],
    [3, 2, '3:2'],
    [2, 3, '2:3'],
    [5, 4, '5:4'],
    [4, 5, '4:5'],
    [21, 9, '21:9'],
    [8.5, 11, '8.5:11 (US Letter)'],
    [11, 8.5, '11:8.5 (US Letter Landscape)'],
    [1, 1.414, '1:√2 (ISO A4)'],
    [1.414, 1, '√2:1 (ISO A4 Landscape)'],
  ];

  for (const [w, h, label] of commonRatios) {
    if (Math.abs(width / height - w / h) < 0.015) {
      return { label, decimal, ratioX: w, ratioY: h };
    }
  }

  // Fallback to integer reduction if reasonable
  const roundedW = Math.round(width * 10);
  const roundedH = Math.round(height * 10);
  const divisor = gcd(roundedW, roundedH);
  const simpW = roundedW / divisor;
  const simpH = roundedH / divisor;

  if (simpW <= 50 && simpH <= 50) {
    return { label: `${simpW}:${simpH}`, decimal, ratioX: simpW, ratioY: simpH };
  }

  return { label: `${decimal}:1`, decimal, ratioX: decimal, ratioY: 1 };
}

/**
 * Calculate Megapixels and Total Pixel Count
 */
export function calculateMegapixels(widthPx: number, heightPx: number): { megapixels: string; totalPixels: number } {
  const total = Math.round(widthPx * heightPx);
  const mp = (total / 1_000_000).toFixed(2);
  return { megapixels: `${mp} MP`, totalPixels: total };
}

/**
 * Calculate Diagonal Dimension
 */
export function calculateDiagonal(w: number, h: number): number {
  return Number(Math.sqrt(w * w + h * h).toFixed(2));
}

/**
 * Pro Developer & Designer Export Format Generators
 */

export function generateRawPx(wPx: number, hPx: number, is2D: boolean): string {
  return is2D ? `${Math.round(wPx)} × ${Math.round(hPx)} px` : `${Math.round(wPx)} px`;
}

export function generateCss(wPx: number, hPx: number, is2D: boolean): string {
  if (is2D) {
    return `width: ${Math.round(wPx)}px;\nheight: ${Math.round(hPx)}px;`;
  }
  return `width: ${Math.round(wPx)}px;`;
}

export function generateTailwindClass(wPx: number, hPx: number, is2D: boolean): string {
  if (is2D) {
    return `w-[${Math.round(wPx)}px] h-[${Math.round(hPx)}px]`;
  }
  return `w-[${Math.round(wPx)}px]`;
}

export function generatePrintCss(wIn: number, hIn: number, is2D: boolean): string {
  if (is2D) {
    return `@page {\n  size: ${wIn}in ${hIn}in;\n  margin: 0.5in;\n}`;
  }
  return `@page {\n  size: ${wIn}in auto;\n}`;
}

export function generateSvgViewBox(wPx: number, hPx: number): string {
  return `viewBox="0 0 ${Math.round(wPx)} ${Math.round(hPx)}"`;
}

export function generateJsonSpec(state: {
  widthIn: number;
  heightIn: number;
  widthPx: number;
  heightPx: number;
  dpi: number;
  is2D: boolean;
}): string {
  const payload = state.is2D
    ? {
        unit: 'inches_to_pixels',
        dpi: state.dpi,
        dimensions: {
          inches: { width: state.widthIn, height: state.heightIn },
          pixels: { width: Math.round(state.widthPx), height: Math.round(state.heightPx) },
          metricCm: { width: inchesToCm(state.widthIn), height: inchesToCm(state.heightIn) },
        },
        aspectRatio: getAspectRatio(state.widthIn, state.heightIn).label,
        megapixels: calculateMegapixels(state.widthPx, state.heightPx).megapixels,
      }
    : {
        unit: 'inches_to_pixels',
        dpi: state.dpi,
        inches: state.widthIn,
        pixels: Math.round(state.widthPx),
        metricCm: inchesToCm(state.widthIn),
      };

  return JSON.stringify(payload, null, 2);
}
