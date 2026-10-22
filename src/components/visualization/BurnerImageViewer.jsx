import React, { useState, useEffect, useRef } from 'react';
import { renderBurnerOverlayCanvas } from '../../services/canvasOverlay';
import { MapLegend } from './MapLegend';
import { Layers, Eye, ShieldAlert, Sparkles, Activity, Camera, CheckCircle2, AlertTriangle, Loader2 } from 'lucide-react';

export function BurnerImageViewer({ report }) {
  const [activeOverlay, setActiveOverlay] = useState('annotated');
  const canvasRef = useRef(null);
  const imageObjRef = useRef(null);
  const [loadedSrc, setLoadedSrc] = useState(null);
  const [failedSrc, setFailedSrc] = useState(null);

  const currentSrc = report?.original_image;
  const imageLoaded = loadedSrc === currentSrc;
  const hasImageError = failedSrc === currentSrc;

  const overlays = [
    { id: 'original', label: 'Original Image', icon: Eye },
    { id: 'annotated', label: 'Annotated Map', icon: Layers },
    { id: 'crack', label: 'Crack Map', icon: ShieldAlert },
    { id: 'damage', label: 'Damage Map', icon: Activity },
    { id: 'surface', label: 'Surface Anomaly Map', icon: Sparkles }
  ];

  useEffect(() => {
    if (!currentSrc) return;

    let isMounted = true;
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = currentSrc;
    img.onload = () => {
      if (!isMounted) return;
      imageObjRef.current = img;
      setLoadedSrc(currentSrc);
    };
    img.onerror = () => {
      if (!isMounted) return;
      console.warn('Failed to load burner image for canvas overlay');
      setFailedSrc(currentSrc);
    };

    return () => {
      isMounted = false;
    };
  }, [currentSrc]);

  useEffect(() => {
    if (imageLoaded && canvasRef.current && imageObjRef.current && report) {
      renderBurnerOverlayCanvas(canvasRef.current, imageObjRef.current, activeOverlay, report);
    }
  }, [imageLoaded, activeOverlay, report]);

  if (!report) return null;

  const isRealTestImage = report.image_meta?.source === 'real_test_image' || (typeof report.original_image === 'string' && (report.original_image.includes('/burner/good/') || report.original_image.includes('/burner/challenging/')));
  const isLiveAnalysis = report.badge_label === 'LIVE CV ANALYSIS' || report.isDemoResult === false;

  const badgeText = isLiveAnalysis
    ? 'Live CV Analysis'
    : isRealTestImage
    ? 'Real Image / Simulated CV Result'
    : 'Demo / Simulated CV Results';

  return (
    <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-4">
      {/* Overlay Tab Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-amber-400" />
          <h3 className="font-bold text-slate-100 text-sm tracking-wide">
            Interactive Visual Overlay Maps
          </h3>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 bg-slate-900/90 p-1 rounded-xl border border-slate-800">
          {overlays.map(tab => {
            const Icon = tab.icon;
            const isActive = activeOverlay === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveOverlay(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-bold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Canvas Container */}
      <div className="relative w-full aspect-square max-w-[540px] mx-auto rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl flex items-center justify-center">
        <canvas
          ref={canvasRef}
          width={600}
          height={600}
          className="w-full h-full object-contain"
        />

        {/* Loading Overlay */}
        {!imageLoaded && !hasImageError && (
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xs flex flex-col items-center justify-center gap-2 z-10">
            <Loader2 className="w-8 h-8 text-amber-400 animate-spin" />
            <span className="text-xs font-mono text-slate-400">Rendering visual overlay...</span>
          </div>
        )}

        {/* Image Load Failure Fallback */}
        {hasImageError && (
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center gap-3 z-10">
            <div className="p-3 bg-amber-500/10 rounded-2xl border border-amber-500/30 text-amber-400">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <h4 className="text-sm font-bold text-slate-100">Burner Visual Preview Unavailable</h4>
            <p className="text-xs text-slate-400 max-w-xs">
              The original photo could not be rendered on the overlay canvas. Diagnostic metrics and defect detections are available below.
            </p>
          </div>
        )}

        {/* Dynamic Mode Badge overlay on canvas */}
        <div className={`absolute top-3 left-3 backdrop-blur-md border text-[11px] font-mono px-2.5 py-1 rounded-md flex items-center gap-1.5 shadow-lg ${
          isLiveAnalysis
            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
            : isRealTestImage
            ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
            : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
        }`}>
          {isLiveAnalysis ? (
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          ) : isRealTestImage ? (
            <Camera className="w-3.5 h-3.5 text-cyan-400" />
          ) : (
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          )}
          <span>{badgeText}</span>
        </div>

        {/* Active Overlay Watermark */}
        <div className="absolute bottom-3 right-3 bg-slate-900/80 backdrop-blur-md text-slate-300 border border-slate-800 text-[11px] font-mono px-2.5 py-1 rounded-md">
          Layer: <span className="text-amber-400 font-bold capitalize">{activeOverlay}</span>
        </div>
      </div>

      {/* Color Code Legend */}
      <MapLegend />
    </div>
  );
}
