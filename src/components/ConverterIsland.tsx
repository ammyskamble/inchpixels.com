import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import {
  Copy,
  Check,
  Lock,
  Unlock,
  ArrowLeftRight,
  RotateCcw,
  Share2,
  Printer,
  Image as ImageIcon,
  Monitor,
  Maximize2,
  Sliders,
  Sparkles,
  Code2,
  FileCode,
  FileJson,
  Layers,
} from 'lucide-react';
import {
  inchesToPixels,
  pixelsToInches,
  inchesToCm,
  inchesToMm,
  getAspectRatio,
  calculateMegapixels,
  calculateDiagonal,
  generateRawPx,
  generateCss,
  generateTailwindClass,
  generatePrintCss,
  generateSvgViewBox,
  generateJsonSpec,
} from '../lib/converter';
import { STANDARD_DPIS, PRESET_TRAY, type DimensionPreset } from '../lib/presets';

type Mode = '2d' | '1d';
type ActivePresetCategory = 'all' | 'print' | 'photo' | 'screen';

export interface ConverterLabels {
  heading?: string;
  subheading?: string;
  inToPx?: string;
  pxToIn?: string;
  width?: string;
  height?: string;
  dpi?: string;
  copyRaw?: string;
  copyCss?: string;
  copyTailwind?: string;
  copyPrint?: string;
  [key: string]: string | undefined;
}

export interface ConverterIslandProps {
  labels?: ConverterLabels;
  initialMode?: '2d' | '1d';
  initialWidth?: number;
  initialHeight?: number;
  initialSingle?: number;
  initialDpi?: number;
}

export default function ConverterIsland({
  labels,
  initialMode = '2d',
  initialWidth = 8.5,
  initialHeight = 11,
  initialSingle = 8.5,
  initialDpi = 300,
}: ConverterIslandProps = {}) {
  // State initialization
  const [mode, setMode] = useState<Mode>(initialMode);
  const [widthIn, setWidthIn] = useState<number>(initialWidth);
  const [heightIn, setHeightIn] = useState<number>(initialHeight);
  const [singleIn, setSingleIn] = useState<number>(initialSingle);
  const [dpi, setDpi] = useState<number>(initialDpi);
  const [customDpi, setCustomDpi] = useState<string>(String(initialDpi));
  const [isCustomDpi, setIsCustomDpi] = useState<boolean>(!STANDARD_DPIS.some((item) => item.value === initialDpi));
  const [lockAspectRatio, setLockAspectRatio] = useState<boolean>(true);
  const [precision, setPrecision] = useState<number>(2);
  const [activeCategory, setActiveCategory] = useState<ActivePresetCategory>('all');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [ariaAnnouncement, setAriaAnnouncement] = useState<string>('');

  // Derived Pixel Values
  const widthPx = useMemo(() => inchesToPixels(widthIn, dpi, 0), [widthIn, dpi]);
  const heightPx = useMemo(() => inchesToPixels(heightIn, dpi, 0), [heightIn, dpi]);
  const singlePx = useMemo(() => inchesToPixels(singleIn, dpi, 0), [singleIn, dpi]);

  // Derived Metric Values
  const widthCm = useMemo(() => inchesToCm(widthIn, precision), [widthIn, precision]);
  const heightCm = useMemo(() => inchesToCm(heightIn, precision), [heightIn, precision]);
  const singleCm = useMemo(() => inchesToCm(singleIn, precision), [singleIn, precision]);

  const widthMm = useMemo(() => inchesToMm(widthIn, 1), [widthIn]);
  const heightMm = useMemo(() => inchesToMm(heightIn, 1), [heightIn]);
  const singleMm = useMemo(() => inchesToMm(singleIn, 1), [singleIn]);

  // Aspect ratio and resolution metrics
  const aspectRatio = useMemo(() => getAspectRatio(widthIn, heightIn), [widthIn, heightIn]);
  const megapixels = useMemo(() => calculateMegapixels(widthPx, heightPx), [widthPx, heightPx]);
  const diagonalIn = useMemo(() => calculateDiagonal(widthIn, heightIn), [widthIn, heightIn]);
  const diagonalPx = useMemo(() => calculateDiagonal(widthPx, heightPx), [widthPx, heightPx]);

  // Read URL parameters on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const m = params.get('mode');
    const w = parseFloat(params.get('w') || '');
    const h = parseFloat(params.get('h') || '');
    const d = parseInt(params.get('dpi') || '', 10);
    const val = parseFloat(params.get('val') || '');

    if (m === '1d' || m === '2d') setMode(m);
    if (!isNaN(d) && d > 0) {
      setDpi(d);
      setCustomDpi(String(d));
      setIsCustomDpi(!STANDARD_DPIS.some((item) => item.value === d));
    }
    if (!isNaN(w) && w > 0) setWidthIn(w);
    if (!isNaN(h) && h > 0) setHeightIn(h);
    if (!isNaN(val) && val > 0) setSingleIn(val);
  }, []);

  // Update URL parameters when values change (debounced to avoid browser IPC thrashing while typing)
  const urlDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const updateUrl = useCallback(
    (newMode: Mode, newW: number, newH: number, newSingle: number, newDpi: number, immediate = false) => {
      if (typeof window === 'undefined') return;
      if (urlDebounceRef.current) clearTimeout(urlDebounceRef.current);

      const apply = () => {
        const params = new URLSearchParams();
        params.set('mode', newMode);
        params.set('dpi', String(newDpi));
        if (newMode === '2d') {
          params.set('w', String(newW));
          params.set('h', String(newH));
        } else {
          params.set('val', String(newSingle));
        }
        const newUrl = `${window.location.pathname}?${params.toString()}`;
        window.history.replaceState({}, '', newUrl);
      };

      if (immediate) {
        apply();
      } else {
        urlDebounceRef.current = setTimeout(apply, 350);
      }
    },
    []
  );

  // Synchronized Handlers for 2D
  const handleWidthInChange = (val: number) => {
    if (isNaN(val) || val <= 0) return;
    const oldRatio = widthIn > 0 ? heightIn / widthIn : 1;
    setWidthIn(val);
    let newH = heightIn;
    if (lockAspectRatio && widthIn > 0) {
      newH = Number((val * oldRatio).toFixed(3));
      setHeightIn(newH);
    }
    updateUrl(mode, val, newH, singleIn, dpi, false);
    setAriaAnnouncement(`Width set to ${val} inches, equals ${inchesToPixels(val, dpi)} pixels`);
  };

  const handleWidthPxChange = (pxVal: number) => {
    if (isNaN(pxVal) || pxVal <= 0) return;
    const newInches = pixelsToInches(pxVal, dpi, 3);
    const oldRatio = widthIn > 0 ? heightIn / widthIn : 1;
    setWidthIn(newInches);
    let newH = heightIn;
    if (lockAspectRatio && widthIn > 0) {
      newH = Number((newInches * oldRatio).toFixed(3));
      setHeightIn(newH);
    }
    updateUrl(mode, newInches, newH, singleIn, dpi, false);
    setAriaAnnouncement(`Width set to ${pxVal} pixels, equals ${newInches} inches`);
  };

  const handleHeightInChange = (val: number) => {
    if (isNaN(val) || val <= 0) return;
    const oldRatio = heightIn > 0 ? widthIn / heightIn : 1;
    setHeightIn(val);
    let newW = widthIn;
    if (lockAspectRatio && heightIn > 0) {
      newW = Number((val * oldRatio).toFixed(3));
      setWidthIn(newW);
    }
    updateUrl(mode, newW, val, singleIn, dpi, false);
    setAriaAnnouncement(`Height set to ${val} inches, equals ${inchesToPixels(val, dpi)} pixels`);
  };

  const handleHeightPxChange = (pxVal: number) => {
    if (isNaN(pxVal) || pxVal <= 0) return;
    const newInches = pixelsToInches(pxVal, dpi, 3);
    const oldRatio = heightIn > 0 ? widthIn / heightIn : 1;
    setHeightIn(newInches);
    let newW = widthIn;
    if (lockAspectRatio && heightIn > 0) {
      newW = Number((newInches * oldRatio).toFixed(3));
      setWidthIn(newW);
    }
    updateUrl(mode, newW, newInches, singleIn, dpi, false);
    setAriaAnnouncement(`Height set to ${pxVal} pixels, equals ${newInches} inches`);
  };

  // Synchronized Handlers for 1D
  const handleSingleInChange = (val: number) => {
    if (isNaN(val) || val <= 0) return;
    setSingleIn(val);
    updateUrl(mode, widthIn, heightIn, val, dpi, false);
    setAriaAnnouncement(`${val} inches equals ${inchesToPixels(val, dpi)} pixels`);
  };

  const handleSinglePxChange = (pxVal: number) => {
    if (isNaN(pxVal) || pxVal <= 0) return;
    const inVal = pixelsToInches(pxVal, dpi, 3);
    setSingleIn(inVal);
    updateUrl(mode, widthIn, heightIn, inVal, dpi, false);
    setAriaAnnouncement(`${pxVal} pixels equals ${inVal} inches`);
  };

  // DPI Selection
  const handleSelectDpi = (newDpi: number) => {
    setDpi(newDpi);
    setCustomDpi(String(newDpi));
    setIsCustomDpi(false);
    updateUrl(mode, widthIn, heightIn, singleIn, newDpi, true);
    setAriaAnnouncement(`Resolution set to ${newDpi} DPI`);
  };

  const handleCustomDpiChange = (valStr: string) => {
    setCustomDpi(valStr);
    const parsed = parseInt(valStr, 10);
    if (!isNaN(parsed) && parsed > 0 && parsed <= 9600) {
      setDpi(parsed);
      setIsCustomDpi(true);
      updateUrl(mode, widthIn, heightIn, singleIn, parsed, false);
    }
  };

  // Orientation Swap (Landscape <-> Portrait)
  const handleSwapOrientation = () => {
    const newW = heightIn;
    const newH = widthIn;
    setWidthIn(newW);
    setHeightIn(newH);
    updateUrl(mode, newW, newH, singleIn, dpi, true);
    setAriaAnnouncement(`Swapped dimensions to ${newW} by ${newH} inches`);
  };

  // Apply Preset
  const handleApplyPreset = (preset: DimensionPreset) => {
    setWidthIn(preset.widthIn);
    setHeightIn(preset.heightIn);
    setDpi(preset.defaultDpi);
    setCustomDpi(String(preset.defaultDpi));
    setIsCustomDpi(false);
    setMode('2d');
    updateUrl('2d', preset.widthIn, preset.heightIn, singleIn, preset.defaultDpi, true);
    showToast(`Loaded ${preset.name} (${preset.widthIn} × ${preset.heightIn}" @ ${preset.defaultDpi} DPI)`);
  };

  // Copy to Clipboard with toast
  const copyToClipboard = async (text: string, key: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      showToast(`Copied ${label} to clipboard!`);
      setTimeout(() => setCopiedKey(null), 2000);
    } catch {
      showToast('Failed to copy to clipboard');
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Share URL
  const handleShareUrl = () => {
    if (typeof window === 'undefined') return;
    copyToClipboard(window.location.href, 'share', 'shareable link');
  };

  // Filtered Presets
  const filteredPresets = useMemo(() => {
    if (activeCategory === 'all') return PRESET_TRAY;
    return PRESET_TRAY.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="w-full relative">
      {/* Hidden Live Region for Screen Readers */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {ariaAnnouncement}
      </div>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 bg-card border border-border/80 shadow-2xl rounded-xl text-sm font-medium text-foreground animate-in fade-in slide-in-from-bottom-4 duration-200">
          <Check className="w-4 h-4 text-success" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Converter Card */}
      <div className="bg-card md:bg-card/95 md:backdrop-blur-md border border-border/70 rounded-2xl shadow-xl overflow-hidden">
        {/* Converter Header & Mode Switcher */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between border-b border-border/60 px-5 py-4 gap-3 bg-muted/20">
          {/* 1D vs 2D Toggle */}
          <div className="flex items-center p-1 bg-muted/70 rounded-xl border border-border/50 self-start">
            <button
              type="button"
              onClick={() => {
                setMode('2d');
                updateUrl('2d', widthIn, heightIn, singleIn, dpi, true);
              }}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                mode === '2d'
                  ? 'bg-card text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Maximize2 className="w-3.5 h-3.5" />
              {labels?.inToPx || '2D Canvas (W × H)'}
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('1d');
                updateUrl('1d', widthIn, heightIn, singleIn, dpi, true);
              }}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                mode === '1d'
                  ? 'bg-card text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <ArrowLeftRight className="w-3.5 h-3.5" />
              {labels?.pxToIn || '1D Single Unit'}
            </button>
          </div>

          {/* Quick Actions (Share URL, Reset) */}
          <div className="flex items-center gap-2 self-end sm:self-center">
            <button
              type="button"
              onClick={handleShareUrl}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-muted/60 hover:bg-muted border border-border/60 text-foreground transition-all"
              title="Copy shareable link with current dimensions"
            >
              {copiedKey === 'share' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-success" />
                  <span className="text-success">Link Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-muted-foreground" />
                  <span>Share Link</span>
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => {
                setWidthIn(8.5);
                setHeightIn(11);
                setSingleIn(8.5);
                setDpi(300);
                setCustomDpi('300');
                setIsCustomDpi(false);
                setLockAspectRatio(true);
                updateUrl(mode, 8.5, 11, 8.5, 300, true);
                showToast('Reset to default US Letter (8.5 × 11" @ 300 DPI)');
              }}
              className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted border border-border/50 transition-all"
              title="Reset to default (US Letter @ 300 DPI)"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* DPI / PPI Selector Section */}
        <div className="px-5 py-3.5 bg-muted/10 border-b border-border/50 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-primary" />
              {labels?.dpi ? `${labels.dpi}:` : 'Target Resolution:'}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {STANDARD_DPIS.map((item) => {
              const isSelected = dpi === item.value && !isCustomDpi;
              return (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => handleSelectDpi(item.value)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold tabular-numbers transition-all ${
                    isSelected
                      ? 'bg-primary text-primary-foreground font-bold shadow-sm shadow-primary/25 scale-105 border border-primary'
                      : 'bg-card text-foreground font-semibold hover:bg-muted border border-border'
                  }`}
                  title={item.description}
                  aria-label={`Set resolution to ${item.value} DPI`}
                >
                  {item.value}{' '}
                  <span className={isSelected ? 'font-semibold text-primary-foreground' : 'font-semibold text-foreground/85'}>
                    DPI
                  </span>
                </button>
              );
            })}

            {/* Custom DPI Input */}
            <div className="flex items-center gap-1.5 ml-1">
              <div className="relative flex items-center">
                <label htmlFor="converter-custom-dpi" className="sr-only">Custom DPI Resolution</label>
                <input
                  id="converter-custom-dpi"
                  name="customDpi"
                  type="number"
                  min="1"
                  max="9600"
                  value={customDpi}
                  onChange={(e) => handleCustomDpiChange(e.target.value)}
                  className={`w-20 px-2.5 py-1 text-xs font-semibold tabular-numbers rounded-lg border transition-all text-center ${
                    isCustomDpi
                      ? 'bg-primary/10 border-primary text-primary ring-1 ring-primary'
                      : 'bg-background border-border text-foreground hover:border-border/80'
                  }`}
                  placeholder="Custom"
                  aria-label="Custom DPI resolution"
                />
                <span className="absolute right-1.5 text-[10px] text-muted-foreground pointer-events-none font-semibold">
                  DPI
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Converter Work Area */}
        <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Interactive Inputs & Formulas (7 cols) */}
          <form role="form" aria-label="Inches to pixels conversion calculator" onSubmit={(e) => e.preventDefault()} className="lg:col-span-7 flex flex-col gap-5">
            {mode === '2d' ? (
              /* 2D Canvas Controls */
              <div className="flex flex-col gap-4">
                {/* Width Card */}
                <div className="p-4 rounded-xl bg-muted/20 border border-border/60 hover:border-border transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <label htmlFor="converter-width-in" className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5 cursor-pointer">
                      <span className="w-2 h-2 rounded-full bg-primary" />
                      {labels?.width ? `${labels.width} Dimension` : 'Width Dimension'}
                    </label>
                    <span className="text-xs tabular-numbers font-mono text-muted-foreground">
                      {widthCm} cm / {widthMm} mm
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Inches Input */}
                    <div className="relative">
                      <input
                        id="converter-width-in"
                        name="widthInches"
                        type="number"
                        step="any"
                        min="0.01"
                        value={widthIn || ''}
                        onChange={(e) => handleWidthInChange(parseFloat(e.target.value))}
                        aria-label="Width in inches"
                        className="w-full pl-3 pr-14 py-2.5 bg-background border border-border rounded-xl text-lg font-bold tabular-numbers text-foreground focus:ring-2 focus:ring-primary/40 focus:border-primary outline-none transition-all"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold uppercase text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                        Inches
                      </span>
                    </div>

                    {/* Pixels Input */}
                    <div className="relative">
                      <input
                        id="converter-width-px"
                        name="widthPixels"
                        type="number"
                        step="1"
                        min="1"
                        value={widthPx || ''}
                        onChange={(e) => handleWidthPxChange(parseInt(e.target.value, 10))}
                        aria-label="Width in pixels"
                        className="w-full pl-3 pr-14 py-2.5 bg-background border border-border rounded-xl text-lg font-bold tabular-numbers text-foreground focus:ring-2 focus:ring-primary/40 focus:border-primary outline-none transition-all"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold uppercase text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                        Pixels
                      </span>
                    </div>
                  </div>
                </div>

                {/* Linking Controls (Aspect Ratio Lock & Orientation Swap) */}
                <div className="flex items-center justify-center gap-3 py-1">
                  <button
                    type="button"
                    onClick={() => setLockAspectRatio(!lockAspectRatio)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                      lockAspectRatio
                        ? 'bg-primary/10 border-primary/40 text-primary'
                        : 'bg-muted/40 border-border text-muted-foreground hover:text-foreground'
                    }`}
                    title={lockAspectRatio ? 'Aspect ratio locked' : 'Aspect ratio unlocked'}
                    aria-label={lockAspectRatio ? 'Aspect ratio is locked, click to unlock' : 'Aspect ratio is unlocked, click to lock'}
                  >
                    {lockAspectRatio ? (
                      <>
                        <Lock className="w-3.5 h-3.5" />
                        <span>Ratio Locked</span>
                      </>
                    ) : (
                      <>
                        <Unlock className="w-3.5 h-3.5" />
                        <span>Ratio Unlocked</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleSwapOrientation}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-muted/40 hover:bg-muted border border-border text-foreground transition-all"
                    title="Swap Width and Height (Portrait / Landscape)"
                    aria-label="Swap width and height dimensions"
                  >
                    <ArrowLeftRight className="w-3.5 h-3.5 text-muted-foreground" />
                    <span>Swap Orientation</span>
                  </button>
                </div>

                {/* Height Card */}
                <div className="p-4 rounded-xl bg-muted/20 border border-border/60 hover:border-border transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <label htmlFor="converter-height-in" className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5 cursor-pointer">
                      <span className="w-2 h-2 rounded-full bg-cyan-glow" />
                      {labels?.height ? `${labels.height} Dimension` : 'Height Dimension'}
                    </label>
                    <span className="text-xs tabular-numbers font-mono text-muted-foreground">
                      {heightCm} cm / {heightMm} mm
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Inches Input */}
                    <div className="relative">
                      <input
                        id="converter-height-in"
                        name="heightInches"
                        type="number"
                        step="any"
                        min="0.01"
                        value={heightIn || ''}
                        onChange={(e) => handleHeightInChange(parseFloat(e.target.value))}
                        aria-label="Height in inches"
                        className="w-full pl-3 pr-14 py-2.5 bg-background border border-border rounded-xl text-lg font-bold tabular-numbers text-foreground focus:ring-2 focus:ring-primary/40 focus:border-primary outline-none transition-all"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold uppercase text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                        Inches
                      </span>
                    </div>

                    {/* Pixels Input */}
                    <div className="relative">
                      <input
                        id="converter-height-px"
                        name="heightPixels"
                        type="number"
                        step="1"
                        min="1"
                        value={heightPx || ''}
                        onChange={(e) => handleHeightPxChange(parseInt(e.target.value, 10))}
                        aria-label="Height in pixels"
                        className="w-full pl-3 pr-14 py-2.5 bg-background border border-border rounded-xl text-lg font-bold tabular-numbers text-foreground focus:ring-2 focus:ring-primary/40 focus:border-primary outline-none transition-all"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold uppercase text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                        Pixels
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* 1D Single Unit Controls */
              <div className="p-6 rounded-xl bg-muted/20 border border-border/60 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Bi-Directional Length Converter
                  </span>
                  <span className="text-xs font-mono text-muted-foreground tabular-numbers">
                    {singleCm} cm / {singleMm} mm
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Single Inches */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="converter-single-in" className="text-xs font-semibold text-muted-foreground cursor-pointer">
                      Length in Inches
                    </label>
                    <div className="relative">
                      <input
                        id="converter-single-in"
                        name="singleInches"
                        type="number"
                        step="any"
                        min="0.01"
                        value={singleIn || ''}
                        onChange={(e) => handleSingleInChange(parseFloat(e.target.value))}
                        aria-label="Length in inches"
                        className="w-full pl-3 pr-14 py-3 bg-background border border-border rounded-xl text-xl font-bold tabular-numbers text-foreground focus:ring-2 focus:ring-primary/40 focus:border-primary outline-none transition-all"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold uppercase text-primary bg-primary/10 px-2 py-1 rounded">
                        IN
                      </span>
                    </div>
                  </div>

                  {/* Single Pixels */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="converter-single-px" className="text-xs font-semibold text-muted-foreground cursor-pointer">
                      Length in Pixels
                    </label>
                    <div className="relative">
                      <input
                        id="converter-single-px"
                        name="singlePixels"
                        type="number"
                        step="1"
                        min="1"
                        value={singlePx || ''}
                        onChange={(e) => handleSinglePxChange(parseInt(e.target.value, 10))}
                        aria-label="Length in pixels"
                        className="w-full pl-3 pr-14 py-3 bg-background border border-border rounded-xl text-xl font-bold tabular-numbers text-foreground focus:ring-2 focus:ring-primary/40 focus:border-primary outline-none transition-all"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold uppercase text-cyan-glow bg-cyan-glow/10 px-2 py-1 rounded">
                        PX
                      </span>
                    </div>
                  </div>
                </div>

                {/* 1D Formula Breakdown Box */}
                <div className="mt-2 p-3.5 rounded-lg bg-card border border-border/80 text-xs font-mono flex flex-col gap-1.5">
                  <div className="text-muted-foreground font-sans text-[11px] font-semibold uppercase">
                    Calculation Math Breakdown:
                  </div>
                  <div className="text-foreground">
                    <span className="text-primary font-bold">{singleIn} in</span> ×{' '}
                    <span className="text-muted-foreground">{dpi} DPI</span> ={' '}
                    <span className="text-cyan-glow font-bold">{singlePx} px</span>
                  </div>
                  <div className="text-muted-foreground text-[11px]">
                    Reverse: {singlePx} px ÷ {dpi} DPI = {singleIn} in
                  </div>
                </div>
              </div>
            )}

            {/* Quick Precision Selector */}
            <div className="flex items-center justify-between px-1 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                Display Precision:
              </span>
              <div className="flex items-center gap-1">
                {[0, 1, 2, 3].map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPrecision(p)}
                    className={`px-2 py-0.5 rounded text-[11px] font-semibold tabular-numbers transition-all ${
                      precision === p
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted/50 hover:bg-muted text-muted-foreground'
                    }`}
                  >
                    .{p}
                  </button>
                ))}
              </div>
            </div>
          </form>

          {/* Right Column: Dynamic Aspect Ratio Visualizer Canvas & Metrics (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {/* Visualizer Frame */}
            <div className="p-4 rounded-xl bg-muted/20 border border-border/60 flex flex-col items-center justify-between min-h-[260px] relative overflow-hidden">
              <div className="w-full flex items-center justify-between text-xs text-muted-foreground mb-2">
                <span className="font-semibold uppercase tracking-wider flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-primary" />
                  Aspect Ratio Preview
                </span>
                <span className="px-2 py-0.5 rounded bg-primary/10 text-primary font-bold font-mono text-[11px]">
                  {mode === '2d' ? aspectRatio.label : '1D Vector'}
                </span>
              </div>

              {/* Dynamic SVG Box Visualizer */}
              <div className="w-full h-44 flex items-center justify-center p-2 relative">
                {mode === '2d' ? (
                  <div className="relative flex items-center justify-center w-full h-full">
                    {/* Visual Scaling Box */}
                    <div
                      style={{
                        aspectRatio: `${widthIn} / ${heightIn}`,
                        maxWidth: '100%',
                        maxHeight: '100%',
                      }}
                      className="w-full h-full max-w-[210px] max-h-[140px] rounded-lg border-2 border-dashed border-primary/60 bg-gradient-to-br from-primary/10 via-background to-cyan-glow/10 shadow-inner flex flex-col items-center justify-center p-2 relative group transition-all duration-300"
                    >
                      {/* Dimension Labels on Border */}
                      <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] font-mono font-bold text-primary bg-card/80 px-1.5 py-0.5 rounded border border-border/60">
                        {widthIn}" ({widthPx}px)
                      </span>
                      <span className="absolute -left-6 top-1/2 -translate-y-1/2 -rotate-90 text-[10px] font-mono font-bold text-cyan-glow bg-card/80 px-1.5 py-0.5 rounded border border-border/60">
                        {heightIn}" ({heightPx}px)
                      </span>

                      {/* Center Metrics Pill */}
                      <div className="text-center bg-card px-2.5 py-1.5 rounded-lg border border-border/80 shadow-md">
                        <div className="text-xs font-bold font-mono text-foreground">
                          {widthPx} × {heightPx}
                        </div>
                        <div className="text-[10px] text-muted-foreground font-mono">
                          {megapixels.megapixels} • {widthIn > heightIn ? 'Landscape' : widthIn < heightIn ? 'Portrait' : 'Square'}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* 1D Single Unit Visualizer (Linear Ruler) */
                  <div className="w-full flex flex-col items-center justify-center gap-3">
                    <div className="w-full max-w-[260px] h-9 bg-card border border-border rounded-lg relative overflow-hidden flex items-center justify-center shadow-inner">
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-cyan-glow/20 to-primary/20" />
                      <div className="relative text-xs font-mono font-bold text-foreground">
                        {singleIn}" ➔ {singlePx}px @ {dpi} DPI
                      </div>
                    </div>
                    <div className="text-[11px] text-muted-foreground font-mono">
                      Equivalent to {singleCm} cm or {singleMm} mm
                    </div>
                  </div>
                )}
              </div>

              {/* Canvas Specifications Row */}
              {mode === '2d' && (
                <div className="w-full grid grid-cols-3 gap-2 pt-2 border-t border-border/50 text-center text-xs">
                  <div>
                    <div className="text-[10px] uppercase text-muted-foreground">Total Pixels</div>
                    <div className="font-bold font-mono text-foreground" suppressHydrationWarning>
                      {megapixels.totalPixels.toLocaleString('en-US')}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase text-muted-foreground">Megapixels</div>
                    <div className="font-bold font-mono text-primary">{megapixels.megapixels}</div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase text-muted-foreground">Diagonal</div>
                    <div className="font-bold font-mono text-foreground">{diagonalIn}" / {diagonalPx}px</div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Export Cards Hub */}
            <div className="rounded-xl bg-card border border-border/80 p-3.5 flex flex-col gap-2.5">
              <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground">
                <span className="flex items-center gap-1.5 uppercase tracking-wider">
                  <Code2 className="w-3.5 h-3.5 text-primary" />
                  Instant Developer Export
                </span>
                <span className="text-[11px] text-muted-foreground">One-click copy</span>
              </div>

              {/* Format Buttons Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                {/* 1. Raw PX */}
                <button
                  type="button"
                  onClick={() =>
                    copyToClipboard(
                      generateRawPx(mode === '2d' ? widthPx : singlePx, heightPx, mode === '2d'),
                      'raw-px',
                      'Raw Pixels'
                    )
                  }
                  className="flex flex-col items-start p-2 rounded-lg bg-muted/30 hover:bg-muted/70 border border-border/50 transition-all text-left group"
                >
                  <div className="flex items-center justify-between w-full text-[11px] text-muted-foreground mb-1">
                    <span>{labels?.copyRaw || 'Raw PX'}</span>
                    {copiedKey === 'raw-px' ? (
                      <Check className="w-3 h-3 text-success" />
                    ) : (
                      <Copy className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </div>
                  <span className="font-mono text-xs font-bold text-foreground truncate w-full">
                    {mode === '2d' ? `${widthPx}×${heightPx}` : `${singlePx}px`}
                  </span>
                </button>

                {/* 2. CSS Rule */}
                <button
                  type="button"
                  onClick={() =>
                    copyToClipboard(
                      generateCss(mode === '2d' ? widthPx : singlePx, heightPx, mode === '2d'),
                      'css',
                      'CSS Declaration'
                    )
                  }
                  className="flex flex-col items-start p-2 rounded-lg bg-muted/30 hover:bg-muted/70 border border-border/50 transition-all text-left group"
                >
                  <div className="flex items-center justify-between w-full text-[11px] text-muted-foreground mb-1">
                    <span>{labels?.copyCss || 'CSS Rule'}</span>
                    {copiedKey === 'css' ? (
                      <Check className="w-3 h-3 text-success" />
                    ) : (
                      <Copy className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </div>
                  <span className="font-mono text-xs font-bold text-foreground truncate w-full">
                    width: {mode === '2d' ? widthPx : singlePx}px;
                  </span>
                </button>

                {/* 3. Tailwind CSS v4 Class */}
                <button
                  type="button"
                  onClick={() =>
                    copyToClipboard(
                      generateTailwindClass(mode === '2d' ? widthPx : singlePx, heightPx, mode === '2d'),
                      'tailwind',
                      'Tailwind v4 class'
                    )
                  }
                  className="flex flex-col items-start p-2 rounded-lg bg-muted/30 hover:bg-muted/70 border border-border/50 transition-all text-left group"
                >
                  <div className="flex items-center justify-between w-full text-[11px] text-muted-foreground mb-1">
                    <span>{labels?.copyTailwind || 'Tailwind v4'}</span>
                    {copiedKey === 'tailwind' ? (
                      <Check className="w-3 h-3 text-success" />
                    ) : (
                      <Copy className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </div>
                  <span className="font-mono text-xs font-bold text-primary truncate w-full">
                    w-[{mode === '2d' ? widthPx : singlePx}px]
                  </span>
                </button>

                {/* 4. Print CSS @page */}
                <button
                  type="button"
                  onClick={() =>
                    copyToClipboard(
                      generatePrintCss(mode === '2d' ? widthIn : singleIn, heightIn, mode === '2d'),
                      'print-css',
                      'Print @page CSS'
                    )
                  }
                  className="flex flex-col items-start p-2 rounded-lg bg-muted/30 hover:bg-muted/70 border border-border/50 transition-all text-left group"
                >
                  <div className="flex items-center justify-between w-full text-[11px] text-muted-foreground mb-1">
                    <span>{labels?.copyPrint || 'Print @page'}</span>
                    {copiedKey === 'print-css' ? (
                      <Check className="w-3 h-3 text-success" />
                    ) : (
                      <Copy className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </div>
                  <span className="font-mono text-xs font-bold text-foreground truncate w-full">
                    @page size: {mode === '2d' ? widthIn : singleIn}in
                  </span>
                </button>

                {/* 5. SVG viewBox */}
                <button
                  type="button"
                  onClick={() =>
                    copyToClipboard(
                      generateSvgViewBox(mode === '2d' ? widthPx : singlePx, heightPx),
                      'svg',
                      'SVG viewBox'
                    )
                  }
                  className="flex flex-col items-start p-2 rounded-lg bg-muted/30 hover:bg-muted/70 border border-border/50 transition-all text-left group"
                >
                  <div className="flex items-center justify-between w-full text-[11px] text-muted-foreground mb-1">
                    <span>SVG viewBox</span>
                    {copiedKey === 'svg' ? (
                      <Check className="w-3 h-3 text-success" />
                    ) : (
                      <Copy className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </div>
                  <span className="font-mono text-xs font-bold text-foreground truncate w-full">
                    viewBox="0 0..."
                  </span>
                </button>

                {/* 6. JSON Spec */}
                <button
                  type="button"
                  onClick={() =>
                    copyToClipboard(
                      generateJsonSpec({
                        widthIn: mode === '2d' ? widthIn : singleIn,
                        heightIn,
                        widthPx: mode === '2d' ? widthPx : singlePx,
                        heightPx,
                        dpi,
                        is2D: mode === '2d',
                      }),
                      'json',
                      'JSON metadata'
                    )
                  }
                  className="flex flex-col items-start p-2 rounded-lg bg-muted/30 hover:bg-muted/70 border border-border/50 transition-all text-left group"
                >
                  <div className="flex items-center justify-between w-full text-[11px] text-muted-foreground mb-1">
                    <span>JSON Spec</span>
                    {copiedKey === 'json' ? (
                      <Check className="w-3 h-3 text-success" />
                    ) : (
                      <Copy className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </div>
                  <span className="font-mono text-xs font-bold text-foreground truncate w-full">
                    {'{ "dpi": ' + dpi + ' }'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Standard Preset Tray Section */}
        <div className="px-6 py-5 bg-muted/15 border-t border-border/60">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                Designer & Printmaker Preset Trays:
              </span>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1">
              {[
                { id: 'all', label: 'All Presets' },
                { id: 'print', label: 'Print Paper' },
                { id: 'photo', label: 'Photo Prints' },
                { id: 'screen', label: 'Screen & Social' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id as ActivePresetCategory)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                    activeCategory === cat.id
                      ? 'bg-card text-foreground shadow-sm font-semibold border border-border/80'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Preset Chips Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {filteredPresets.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => handleApplyPreset(preset)}
                className={`p-2.5 rounded-xl border text-left transition-all hover:border-primary/60 hover:bg-muted/30 group ${
                  widthIn === preset.widthIn && heightIn === preset.heightIn && dpi === preset.defaultDpi
                    ? 'bg-card border-primary ring-1 ring-primary/40'
                    : 'bg-card border-border'
                }`}
              >
                <div className="text-xs font-bold text-foreground truncate group-hover:text-primary transition-colors">
                  {preset.name}
                </div>
                <div className="text-[11px] font-mono text-muted-foreground font-semibold tabular-numbers mt-0.5">
                  {preset.widthIn} × {preset.heightIn}"
                </div>
                <div className="text-[10px] text-muted-foreground font-medium mt-1.5 flex items-center justify-between">
                  <span>{preset.defaultDpi} DPI</span>
                  <span className="text-[9px] uppercase font-bold text-foreground/80 bg-muted px-1.5 py-0.5 rounded">
                    {preset.category}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
