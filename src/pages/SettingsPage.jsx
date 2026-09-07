import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Settings, Server, Sparkles, Sliders, ShieldAlert, Save } from 'lucide-react';

export function SettingsPage() {
  const { apiBaseUrl, setApiBaseUrl, isDemoMode, setIsDemoMode } = useApp();
  const [urlInput, setUrlInput] = useState(apiBaseUrl);
  const [dirtSensitivity, setDirtSensitivity] = useState(75);
  const [crackSensitivity, setCrackSensitivity] = useState(80);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSaveSettings = (e) => {
    e.preventDefault();
    setApiBaseUrl(urlInput);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <form onSubmit={handleSaveSettings} className="space-y-6">
        {/* Backend API Connection Settings Card */}
        <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <Server className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-slate-100 text-sm tracking-wide">
              FastAPI Backend Endpoint Configuration
            </h3>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 block">
              Backend Base URL (`VITE_API_BASE_URL`):
            </label>
            <input
              type="text"
              value={urlInput}
              onChange={e => setUrlInput(e.target.value)}
              placeholder="http://localhost:8000"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs font-mono text-slate-200 focus:outline-none focus:border-amber-500/50"
            />
            <p className="text-[11px] text-slate-400">
              The frontend sends POST `/analyze` and GET `/health` requests to this endpoint when live mode is active.
            </p>
          </div>
        </div>

        {/* Demo / Simulated CV Mode Switch */}
        <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <div>
                <h3 className="font-bold text-slate-100 text-sm">Demo / Simulated CV Mode</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Generates realistic computer vision simulation outputs without requiring live Python backend
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsDemoMode(!isDemoMode)}
              className={`relative w-14 h-7 rounded-full transition-colors ${
                isDemoMode ? 'bg-amber-500' : 'bg-slate-800'
              }`}
            >
              <span
                className={`absolute top-1 left-1 w-5 h-5 rounded-full bg-slate-950 transition-transform ${
                  isDemoMode ? 'translate-x-7' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Inspection Sensitivity Threshold Sliders (Demo Mode) */}
        <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-5">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <Sliders className="w-5 h-5 text-cyan-400" />
            <h3 className="font-bold text-slate-100 text-sm tracking-wide">
              Computer Vision Sensitivity Controls (Simulation)
            </h3>
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-slate-300">
                <span>Dirt & Carbon Deposit Sensitivity:</span>
                <span className="font-mono font-bold text-amber-400">{dirtSensitivity}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={dirtSensitivity}
                onChange={e => setDirtSensitivity(Number(e.target.value))}
                className="w-full accent-amber-500 bg-slate-950 rounded-lg"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs text-slate-300">
                <span>Possible Crack-Like Indication Sensitivity:</span>
                <span className="font-mono font-bold text-rose-400">{crackSensitivity}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={crackSensitivity}
                onChange={e => setCrackSensitivity(Number(e.target.value))}
                className="w-full accent-rose-500 bg-slate-950 rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Save Controls */}
        <div className="flex items-center justify-between pt-2">
          {saveSuccess ? (
            <span className="text-xs font-semibold text-emerald-400 font-mono">
              ✓ Settings saved successfully!
            </span>
          ) : (
            <span></span>
          )}

          <button
            type="submit"
            className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-amber-500/20 flex items-center gap-2 transition-all"
          >
            <Save className="w-4 h-4" />
            <span>Save Configuration</span>
          </button>
        </div>
      </form>
    </div>
  );
}
