import React, { useState, useEffect, useRef } from 'react';
import { renderBurnerOverlayCanvas } from '../../services/canvasOverlay';
import { MapLegend } from './MapLegend';
import { Layers, Eye, ShieldAlert, Sparkles, Activity } from 'lucide-react';

export function BurnerImageViewer({ report }) {
  const [activeOverlay, setActiveOverlay] = useState('annotated');
  const canvasRef = useRef(null);
  const imageObjRef = useRef(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  const overlays = [
    { id: 'original', label: 'Original Image', icon: Eye },
    { id: 'annotated', label: 'Annotated Map', icon: Layers },
    { id: 'crack', label: 'Crack Map', icon: ShieldAlert },
    { id: 'damage', label: 'Damage Map', icon: Activity },
    { id: 'surface', label: 'Surface Anomaly Map', icon: Sparkles }
  ];

  useEffect(() => {
    if (!report?.original_image) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = report.original_image;
    img.onload = () => {
      imageObjRef.current = img;
      setImageLoaded(true);
    };
  }, [report?.original_image]);

  useEffect(() => {
    if (imageLoaded && canvasRef.current && imageObjRef.current && report) {
      renderBurnerOverlayCanvas(canvasRef.current, imageObjRef.current, activeOverlay, report);
    }
  }, [imageLoaded, activeOverlay, report]);

  if (!report) return null;

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

      {/* Main Canvas Canvas Container */}
      <div className="relative w-full aspect-square max-w-[540px] mx-auto rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl flex items-center justify-center">
        <canvas
          ref={canvasRef}
          width={600}
          height={600}
          className="w-full h-full object-contain"
        />

        {/* Demo Mode Badge overlay on canvas */}
        {report.isDemoResult && (
          <div className="absolute top-3 left-3 bg-amber-500/20 backdrop-blur-md text-amber-300 border border-amber-500/40 text-[11px] font-mono px-2.5 py-1 rounded-md flex items-center gap-1.5 shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Demo / Simulated CV Results</span>
          </div>
        )}

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
