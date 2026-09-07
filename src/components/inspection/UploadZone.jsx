import React, { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { generateSampleBurnerImage } from '../../services/mockData';
import { PhotoGuideCard } from './PhotoGuideCard';
import {
  Upload,
  Camera,
  Image as ImageIcon,
  X,
  Play,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  RotateCcw
} from 'lucide-react';

export function UploadZone() {
  const { runAnalysis, isDemoMode } = useApp();
  const [selectedImage, setSelectedImage] = useState(null);
  const [presetType, setPresetType] = useState('normal');
  const [isDragOver, setIsDragOver] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const loadPreset = (type) => {
    setPresetType(type);
    const sampleUrl = generateSampleBurnerImage(type);
    setSelectedImage(sampleUrl);
  };

  const startCamera = async () => {
    setIsCameraActive(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.warn('Camera access not granted or unavailable, using simulation camera feed');
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const canvas = document.createElement('canvas');
      canvas.width = 600;
      canvas.height = 600;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(videoRef.current, 0, 0, 600, 600);
      const dataUrl = canvas.toDataURL('image/jpeg');

      // Stop camera stream
      const stream = videoRef.current.srcObject;
      stream.getTracks().forEach(track => track.stop());
      setIsCameraActive(false);
      setSelectedImage(dataUrl);
    } else {
      // Simulation camera capture
      setIsCameraActive(false);
      loadPreset('normal');
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      stream.getTracks().forEach(track => track.stop());
    }
    setIsCameraActive(false);
  };

  const handleStartAnalysis = () => {
    if (selectedImage) {
      runAnalysis(selectedImage, presetType);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Sample Image Quick Test Selector */}
      <div className="glass-card rounded-2xl p-4 border border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-bold text-slate-200">
            Quick Test Presets (Simulated Cast-Iron Burners):
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => loadPreset('normal')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 ${
              presetType === 'normal' && selectedImage
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-sm'
                : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:bg-slate-800'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Normal Burner</span>
          </button>

          <button
            onClick={() => loadPreset('cleaning')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 ${
              presetType === 'cleaning' && selectedImage
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-sm'
                : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:bg-slate-800'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Surface Dirt & Deposit</span>
          </button>

          <button
            onClick={() => loadPreset('inspection')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 ${
              presetType === 'inspection' && selectedImage
                ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 shadow-sm'
                : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:bg-slate-800'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
            <span>Possible Crack & Rust</span>
          </button>
        </div>
      </div>

      {/* Main Drag-and-Drop Area / Camera View */}
      <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
        {isCameraActive ? (
          <div className="relative w-full aspect-video max-w-md mx-auto rounded-xl overflow-hidden bg-slate-950 border border-slate-800 flex flex-col items-center justify-center">
            <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
            <div className="absolute bottom-4 flex items-center gap-3">
              <button
                onClick={capturePhoto}
                className="px-4 py-2 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow-lg hover:bg-amber-400 flex items-center gap-1.5"
              >
                <Camera className="w-4 h-4" />
                <span>Capture Frame</span>
              </button>
              <button
                onClick={stopCamera}
                className="px-3 py-2 bg-slate-800 text-slate-300 font-semibold text-xs rounded-xl hover:bg-slate-700"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : !selectedImage ? (
          <div
            onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
            onDragLeave={() => setIsDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-4 ${
              isDragOver
                ? 'border-amber-400 bg-amber-500/10 scale-[1.01]'
                : 'border-slate-800 hover:border-amber-500/40 hover:bg-slate-900/60'
            }`}
          >
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-inner">
              <Upload className="w-8 h-8 animate-pulse" />
            </div>

            <div>
              <h3 className="text-base font-bold text-slate-100">
                Upload or Capture Burner Photo
              </h3>
              <p className="text-xs text-slate-400 mt-1 max-w-md">
                Drag and drop your high-resolution circular multi-ring gas burner image here, or click to browse.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFileChange}
                className="hidden"
              />
              <button
                type="button"
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 flex items-center gap-2"
              >
                <ImageIcon className="w-4 h-4 text-amber-400" />
                <span>Browse File</span>
              </button>

              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); startCamera(); }}
                className="px-4 py-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-xs font-semibold rounded-xl border border-amber-500/40 flex items-center gap-2"
              >
                <Camera className="w-4 h-4 text-amber-400" />
                <span>Take Photo / Camera</span>
              </button>
            </div>

            <span className="text-[11px] font-mono text-slate-500">
              Supported Formats: JPG, PNG, WEBP (Up to 15 MB)
            </span>
          </div>
        ) : (
          /* Image Preview & Action Controls */
          <div className="space-y-4">
            <div className="relative w-full max-w-md mx-auto aspect-square rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl group">
              <img
                src={selectedImage}
                alt="Selected Burner Preview"
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-3 right-3 p-2 bg-slate-900/90 hover:bg-rose-600 text-slate-200 rounded-xl border border-slate-700 transition-colors shadow-lg"
                title="Remove image"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-mono text-amber-300 border border-slate-800">
                Preview Ready: Circular Multi-Ring Burner
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setSelectedImage(null)}
                className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl border border-slate-700 flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Choose Different Photo</span>
              </button>

              <button
                onClick={handleStartAnalysis}
                className="px-6 py-2.5 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-sm rounded-xl shadow-lg shadow-amber-500/25 flex items-center gap-2 transition-all transform hover:scale-[1.02]"
              >
                <Play className="w-4 h-4 fill-slate-950" />
                <span>Analyze Burner (V0.1–V0.4.1)</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Visual Capture Guidelines */}
      <PhotoGuideCard />
    </div>
  );
}
