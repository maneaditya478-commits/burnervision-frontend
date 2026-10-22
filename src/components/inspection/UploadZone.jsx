import React, { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import {
  generateSampleBurnerImage
} from '../../services/mockData';
import { PhotoGuideCard } from './PhotoGuideCard';
import { InspectionScopeSelector } from './InspectionScopeSelector';
import {
  Upload,
  Camera,
  Image as ImageIcon,
  X,
  Play,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Check,
  Loader2
} from 'lucide-react';

export function UploadZone() {
  const { runAnalysis, isDemoMode, inspectionScope, setInspectionScope } = useApp();
  const [selectedImage, setSelectedImage] = useState(null);
  const [presetType, setPresetType] = useState('normal');
  const [imageMeta, setImageMeta] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isConverting, setIsConverting] = useState(false);
  const [convertMessage, setConvertMessage] = useState('');
  const [imageError, setImageError] = useState(null);
  const [isImageLoading, setIsImageLoading] = useState(false);

  const fileInputRef = useRef(null);
  const videoRef = useRef(null);

  const processImageFile = async (file) => {
    if (!file) return;

    setImageError(null);
    setIsImageLoading(true);

    const isHeic =
      file.name?.toLowerCase().endsWith('.heic') ||
      file.name?.toLowerCase().endsWith('.heif') ||
      file.type === 'image/heic' ||
      file.type === 'image/heif';

    if (isHeic) {
      setIsConverting(true);
      setConvertMessage('Converting HEIC image to high-resolution JPEG...');
      try {
        const heic2anyModule = await import('heic2any');
        const heic2any = heic2anyModule.default || heic2anyModule;
        const convertedBlob = await heic2any({
          blob: file,
          toType: 'image/jpeg',
          quality: 0.92,
        });
        const finalBlob = Array.isArray(convertedBlob) ? convertedBlob[0] : convertedBlob;

        const reader = new FileReader();
        reader.onload = (event) => {
          setSelectedImage(event.target.result);
          setImageMeta({
            source: 'user_upload',
            filename: file.name,
            convertedFromHeic: true,
            demo: isDemoMode,
          });
          setIsConverting(false);
          setConvertMessage('');
          setIsImageLoading(false);
        };
        reader.onerror = () => {
          setIsConverting(false);
          setConvertMessage('');
          setIsImageLoading(false);
          setImageError('Failed to read the converted HEIC image.');
        };
        reader.readAsDataURL(finalBlob);
      } catch (err) {
        console.error('HEIC conversion failed:', err);
        setIsConverting(false);
        setConvertMessage('');
        setIsImageLoading(false);
        setImageError('Unable to convert HEIC image. Please upload a standard JPG, PNG, or WEBP photo.');
      }
      return;
    }

    // Standard format reading (JPG, PNG, WEBP)
    const reader = new FileReader();
    reader.onload = (event) => {
      setSelectedImage(event.target.result);
      setImageMeta({
        source: 'user_upload',
        filename: file.name,
        demo: isDemoMode,
      });
    };
    reader.onerror = () => {
      setIsImageLoading(false);
      setImageError('Failed to read file. Please select a valid image.');
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      processImageFile(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processImageFile(file);
    }
  };

  // Load procedural canvas simulation preset
  const loadSimulatedPreset = (type) => {
    setImageError(null);
    setIsImageLoading(false);
    setIsConverting(false);
    setPresetType(type);
    setImageMeta({
      source: 'simulated_preset',
      test_category: type,
      demo: true
    });
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
      setImageError(null);
      setIsImageLoading(false);
      setIsConverting(false);
      setImageMeta({
        source: 'camera_capture',
        filename: 'camera_frame.jpg',
        demo: isDemoMode
      });
      setSelectedImage(dataUrl);
    } else {
      setIsCameraActive(false);
      loadSimulatedPreset('normal');
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
    if (selectedImage && !imageError && !isConverting) {
      runAnalysis(selectedImage, presetType, imageMeta);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* 1. SIMULATED PRESETS SECTION */}
      <div className="glass-card rounded-2xl p-4 border border-slate-800 space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">
              Simulated Procedural Presets
            </span>
          </div>
          <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
            Procedural Canvas Models
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => loadSimulatedPreset('normal')}
            className={`p-2.5 rounded-xl text-xs font-semibold border transition-all flex items-center justify-between ${
              presetType === 'normal' && selectedImage && imageMeta?.source === 'simulated_preset'
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 shadow-md shadow-emerald-950/40'
                : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:bg-slate-800/80 hover:text-slate-100'
            }`}
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Normal Burner</span>
            </div>
            {presetType === 'normal' && selectedImage && imageMeta?.source === 'simulated_preset' && (
              <Check className="w-3.5 h-3.5 text-emerald-400" />
            )}
          </button>

          <button
            type="button"
            onClick={() => loadSimulatedPreset('cleaning')}
            className={`p-2.5 rounded-xl text-xs font-semibold border transition-all flex items-center justify-between ${
              presetType === 'cleaning' && selectedImage && imageMeta?.source === 'simulated_preset'
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-md shadow-amber-950/40'
                : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:bg-slate-800/80 hover:text-slate-100'
            }`}
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Surface Dirt & Deposit</span>
            </div>
            {presetType === 'cleaning' && selectedImage && imageMeta?.source === 'simulated_preset' && (
              <Check className="w-3.5 h-3.5 text-amber-400" />
            )}
          </button>

          <button
            type="button"
            onClick={() => loadSimulatedPreset('inspection')}
            className={`p-2.5 rounded-xl text-xs font-semibold border transition-all flex items-center justify-between ${
              presetType === 'inspection' && selectedImage && imageMeta?.source === 'simulated_preset'
                ? 'bg-rose-500/20 text-rose-300 border-rose-500/50 shadow-md shadow-rose-950/40'
                : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:bg-slate-800/80 hover:text-slate-100'
            }`}
          >
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              <span>Possible Crack & Rust</span>
            </div>
            {presetType === 'inspection' && selectedImage && imageMeta?.source === 'simulated_preset' && (
              <Check className="w-3.5 h-3.5 text-rose-400" />
            )}
          </button>
        </div>
      </div>

      {/* 2. MAIN UPLOAD / CAMERA / PREVIEW ZONE */}
      <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4 shadow-xl">
        {isCameraActive ? (
          <div className="relative w-full aspect-video max-w-md mx-auto rounded-xl overflow-hidden bg-slate-950 border border-slate-800 flex flex-col items-center justify-center">
            <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
            <div className="absolute bottom-4 flex items-center gap-3">
              <button
                type="button"
                onClick={capturePhoto}
                className="px-4 py-2 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow-lg hover:bg-amber-400 flex items-center gap-1.5"
              >
                <Camera className="w-4 h-4" />
                <span>Capture Frame</span>
              </button>
              <button
                type="button"
                onClick={stopCamera}
                className="px-3 py-2 bg-slate-800 text-slate-300 font-semibold text-xs rounded-xl hover:bg-slate-700"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : isConverting ? (
          /* Converting HEIC or processing state */
          <div className="relative w-full max-w-md mx-auto aspect-square rounded-2xl overflow-hidden bg-slate-900 border border-amber-500/30 shadow-2xl flex flex-col items-center justify-center p-6 text-center space-y-4">
            <div className="p-4 bg-amber-500/10 rounded-2xl border border-amber-500/30 text-amber-400">
              <Loader2 className="w-8 h-8 animate-spin" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-100">Converting Image Format</h4>
              <p className="text-xs text-amber-300 font-mono mt-1">
                {convertMessage || 'Processing burner photograph...'}
              </p>
            </div>
            <p className="text-[11px] text-slate-400 max-w-xs">
              Converting high-efficiency HEIC capture into browser-ready RGB format for computer vision analysis.
            </p>
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
                Drag and drop your circular multi-ring gas burner image here, browse your files, or capture with camera.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/heic,image/heif,.heic,.heif,.jpg,.jpeg,.png,.webp"
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
              Supported Formats: JPG, PNG, WEBP, HEIC (Up to 25 MB)
            </span>
          </div>
        ) : (
          /* Image Preview & Action Controls */
          <div className="space-y-4">
            <div className="relative w-full max-w-md mx-auto aspect-square rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl group flex items-center justify-center">
              {imageError ? (
                <div className="flex flex-col items-center justify-center p-6 text-center space-y-3">
                  <div className="p-3 bg-rose-500/10 rounded-2xl border border-rose-500/30 text-rose-400">
                    <AlertTriangle className="w-8 h-8" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-100">Image Preview Unavailable</h4>
                  <p className="text-xs text-rose-300 max-w-xs leading-relaxed">{imageError}</p>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedImage(null);
                      setImageMeta(null);
                      setImageError(null);
                    }}
                    className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 transition-colors"
                  >
                    Select Another Image
                  </button>
                </div>
              ) : (
                <>
                  <img
                    src={selectedImage}
                    alt="Selected Burner Preview"
                    className="w-full h-full object-contain"
                    onLoad={() => setIsImageLoading(false)}
                    onError={() => {
                      setIsImageLoading(false);
                      setImageError('The browser could not decode this image file. Please use a standard JPG, PNG, or WEBP photo.');
                    }}
                  />
                  {isImageLoading && (
                    <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center z-10">
                      <Loader2 className="w-7 h-7 text-amber-400 animate-spin" />
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedImage(null);
                      setImageMeta(null);
                      setImageError(null);
                    }}
                    className="absolute top-3 right-3 p-2 bg-slate-900/90 hover:bg-rose-600 text-slate-200 rounded-xl border border-slate-700 transition-colors shadow-lg z-10"
                    title="Remove image"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  {/* Preview Source Tag */}
                  <div className="absolute bottom-3 left-3 bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs font-mono border border-slate-800 flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span className="text-amber-300">
                      {imageMeta?.source === 'user_upload'
                        ? `User Upload: ${imageMeta.filename}${imageMeta.convertedFromHeic ? ' (HEIC Converted)' : ''}`
                        : imageMeta?.source === 'camera_capture'
                        ? 'Live Camera Capture'
                        : 'Procedural Simulation Preset'}
                    </span>
                  </div>
                </>
              )}
            </div>

            {/* Step 3: Optional Inspection Scope Selector */}
            <InspectionScopeSelector
              selectedScope={inspectionScope}
              onSelectScope={setInspectionScope}
            />

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setSelectedImage(null);
                  setImageMeta(null);
                  setImageError(null);
                }}
                className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl border border-slate-700 flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Choose Different Photo</span>
              </button>

              <button
                type="button"
                disabled={!selectedImage || Boolean(imageError) || isConverting}
                onClick={handleStartAnalysis}
                className={`px-6 py-2.5 font-bold text-sm rounded-xl shadow-lg flex items-center gap-2 transition-all transform ${
                  !selectedImage || Boolean(imageError) || isConverting
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed shadow-none'
                    : 'bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-400 text-slate-950 shadow-amber-500/25 hover:scale-[1.02]'
                }`}
              >
                <Play className={`w-4 h-4 ${!selectedImage || Boolean(imageError) || isConverting ? 'fill-slate-500' : 'fill-slate-950'}`} />
                <span>Analyze Burner (V0.1–V0.4.1)</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 4. VISUAL CAPTURE GUIDELINES */}
      <PhotoGuideCard />
    </div>
  );
}
