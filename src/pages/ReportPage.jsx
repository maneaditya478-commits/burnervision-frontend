import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { OverallStatusCard } from '../components/inspection/OverallStatusCard';
import { BurnerImageViewer } from '../components/visualization/BurnerImageViewer';
import { GeometryDiagram } from '../components/visualization/GeometryDiagram';
import { ImageQualityCard } from '../components/inspection/ImageQualityCard';
import { StructureAndPortsSection } from '../components/inspection/StructureAndPortsSection';
import { SurfaceSection } from '../components/inspection/SurfaceSection';
import { DamageSection } from '../components/inspection/DamageSection';
import { RecommendationPanel } from '../components/inspection/RecommendationPanel';
import { RelatedReferenceCard } from '../components/inspection/RelatedReferenceCard';
import { ReferenceDetailModal } from '../components/reference/ReferenceDetailModal';
import { ErrorBoundary } from '../components/common/ErrorBoundary';
import {
  ArrowLeft,
  ScanEye,
  AlertCircle,
  BookOpen
} from 'lucide-react';

export function ReportPage() {
  const { currentReport, setActiveTab, inspectionScope } = useApp();
  const [activeModalData, setActiveModalData] = useState(null); // { category, defect }

  console.log('[BurnerVision] ReportPage rendering with currentReport:', currentReport ? currentReport.id : null);

  if (!currentReport) {
    return (
      <div className="glass-card rounded-2xl p-12 text-center border border-slate-800 space-y-4 max-w-lg mx-auto shadow-2xl">
        <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto">
          <AlertCircle className="w-6 h-6 animate-pulse" />
        </div>
        <h3 className="text-lg font-bold text-slate-100">No inspection result found</h3>
        <p className="text-xs text-slate-400 leading-relaxed">
          No active inspection report is loaded in memory. Please select an image on the New Inspection page and run the analysis pipeline.
        </p>
        <button
          onClick={() => setActiveTab('new-inspection')}
          className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg inline-flex items-center gap-2 transition-all transform hover:scale-[1.02]"
        >
          <ScanEye className="w-4 h-4" />
          <span>Return to New Inspection</span>
        </button>
      </div>
    );
  }

  const handleOpenCategory = (category, defect = null) => {
    setActiveModalData({
      category,
      defect: defect || category.subItems?.[0]
    });
  };

  return (
    <ErrorBoundary onReset={() => setActiveTab('new-inspection')}>
      <div className="space-y-6 max-w-6xl mx-auto">
        {/* Top Action & Navigation Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/60 p-3 rounded-2xl border border-slate-800">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('dashboard')}
              className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl border border-slate-700 flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => setActiveTab('new-inspection')}
              className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl border border-slate-700 flex items-center gap-1.5 transition-colors"
            >
              <ScanEye className="w-3.5 h-3.5" />
              <span>New Inspection</span>
            </button>

            <button
              onClick={() => setActiveTab('reference-library')}
              className="px-3.5 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-xs font-semibold rounded-xl border border-amber-500/40 flex items-center gap-1.5 transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
              <span>Reference Library</span>
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="text-slate-400">
              Scope: <strong className="text-amber-400 uppercase">{inspectionScope || 'Full'}</strong>
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400">
              Pipeline: <strong className="text-cyan-400">V0.4.1 Frozen</strong>
            </span>
          </div>
        </div>

        {/* SECTION 6: OVERALL ASSESSMENT (Shown prominently at top with print/export controls) */}
        <div id="section-6-overall">
          <OverallStatusCard report={currentReport} />
        </div>

        {/* INTERACTIVE VISUAL OVERLAYS & CONCENTRIC GEOMETRY */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <BurnerImageViewer report={currentReport} />
          <GeometryDiagram geometry={currentReport.geometry} ports={currentReport.ports} />
        </div>

        {/* SECTION 1: IMAGE QUALITY */}
        <div id="section-1-quality">
          <ImageQualityCard
            imageQuality={currentReport.image_quality}
            imageMeta={currentReport.image_meta}
          />
        </div>

        {/* SECTIONS 2 & 3: BURNER STRUCTURE AND BURNER PORTS */}
        <div id="sections-2-3-structure-ports">
          <StructureAndPortsSection
            report={currentReport}
            onOpenCategory={handleOpenCategory}
          />
        </div>

        {/* SECTIONS 4 & 5: SURFACE CONDITION AND DAMAGE & DEFORMATION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" id="sections-4-5-surface-damage">
          <SurfaceSection
            report={currentReport}
            onOpenCategory={handleOpenCategory}
          />
          <DamageSection
            report={currentReport}
            onOpenCategory={handleOpenCategory}
          />
        </div>

        {/* SECTION 7: RECOMMENDED ACTION */}
        <div id="section-7-recommendations">
          <RecommendationPanel report={currentReport} />
        </div>

        {/* SECTION 8: RELATED REFERENCE EXAMPLES */}
        <div id="section-8-references">
          <RelatedReferenceCard
            report={currentReport}
            onOpenCategory={handleOpenCategory}
          />
        </div>

        {/* Active Reference Detail Modal */}
        {activeModalData && (
          <ReferenceDetailModal
            category={activeModalData.category}
            defect={activeModalData.defect}
            onClose={() => setActiveModalData(null)}
            onSelectOtherCategory={(cat, def) => setActiveModalData({ category: cat, defect: def })}
          />
        )}
      </div>
    </ErrorBoundary>
  );
}
