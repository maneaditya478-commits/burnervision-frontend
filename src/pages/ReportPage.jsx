import React from 'react';
import { useApp } from '../context/AppContext';
import { OverallStatusCard } from '../components/inspection/OverallStatusCard';
import { BurnerImageViewer } from '../components/visualization/BurnerImageViewer';
import { GeometryDiagram } from '../components/visualization/GeometryDiagram';
import { SurfaceSection } from '../components/inspection/SurfaceSection';
import { DamageSection } from '../components/inspection/DamageSection';
import { RecommendationPanel } from '../components/inspection/RecommendationPanel';
import { ArrowLeft, ScanEye } from 'lucide-react';

export function ReportPage() {
  const { currentReport, setActiveTab } = useApp();

  if (!currentReport) {
    return (
      <div className="glass-card rounded-2xl p-12 text-center border border-slate-800 space-y-4 max-w-lg mx-auto">
        <h3 className="text-lg font-bold text-slate-100">No Report Selected</h3>
        <p className="text-xs text-slate-400">
          Please upload a circular multi-ring burner photo or select a report from Inspection History.
        </p>
        <button
          onClick={() => setActiveTab('new-inspection')}
          className="px-5 py-2.5 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow-lg hover:bg-amber-400 inline-flex items-center gap-2"
        >
          <ScanEye className="w-4 h-4" />
          <span>Start New Inspection</span>
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Top Action Back Button */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setActiveTab('dashboard')}
          className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold rounded-xl border border-slate-800 flex items-center gap-2 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </button>

        <span className="text-xs font-mono text-slate-400">
          CV Pipeline Output: <strong className="text-cyan-400">V0.4.1 Frozen</strong>
        </span>
      </div>

      {/* 1. Overall Status Header */}
      <OverallStatusCard report={currentReport} />

      {/* 2. Visual Overlay Viewer & Geometry Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BurnerImageViewer report={currentReport} />
        <GeometryDiagram geometry={currentReport.geometry} ports={currentReport.ports} />
      </div>

      {/* 3. Surface & Damage Analysis Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SurfaceSection report={currentReport} />
        <DamageSection report={currentReport} />
      </div>

      {/* 4. Actionable Recommendations */}
      <RecommendationPanel report={currentReport} />
    </div>
  );
}
