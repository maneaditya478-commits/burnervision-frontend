import React, { useState } from 'react';
import { REFERENCE_CATEGORIES, GOOD_VS_DEFECTIVE_PAIRS } from '../data/defectReferenceLibrary';
import { INSPECTION_MODULES } from '../data/inspectionModules';
import { ReferenceDetailModal } from '../components/reference/ReferenceDetailModal';
import { GoodVsDefectiveView } from '../components/reference/GoodVsDefectiveView';
import { ModuleParametersView } from '../components/inspection/ModuleParametersView';
import {
  BookOpen,
  Layers,
  ArrowRight,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  Info,
  Wrench,
  Search,
  Maximize2,
  Sliders,
  Sparkles,
  ExternalLink
} from 'lucide-react';

export function ReferenceLibraryPage() {
  const [activeViewTab, setActiveViewTab] = useState('library'); // 'library' | 'comparison' | 'parameters'
  const [selectedCategoryKey, setSelectedCategoryKey] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalData, setActiveModalData] = useState(null); // { category, defect }

  // Filter categories
  const filteredCategories = REFERENCE_CATEGORIES.filter(cat => {
    if (selectedCategoryKey !== 'all' && cat.key !== selectedCategoryKey) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchCat = cat.name.toLowerCase().includes(q) || cat.summary.toLowerCase().includes(q);
      const matchSub = cat.subItems.some(sub =>
        sub.name.toLowerCase().includes(q) ||
        sub.characteristics.toLowerCase().includes(q) ||
        sub.whyItMatters.toLowerCase().includes(q)
      );
      return matchCat || matchSub;
    }
    return true;
  });

  const handleOpenDetail = (category, defect = null) => {
    setActiveModalData({
      category,
      defect: defect || category.subItems[0]
    });
  };

  const handleOpenPairDetail = (pair) => {
    const matchingCat = REFERENCE_CATEGORIES.find(c => c.name.toLowerCase().includes(pair.category.toLowerCase()) || pair.title.toLowerCase().includes(c.name.toLowerCase()));
    if (matchingCat) {
      handleOpenDetail(matchingCat);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Banner & Mode Selector */}
      <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <BookOpen className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-extrabold text-slate-100 tracking-wide">
                  Burner Defect Reference Library
                </h1>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold">
                  Official References
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
                Comprehensive comparative visual reference standard for circular multi-ring cast-iron gas burners. Illustrates verified defect types, visual characteristics, inspection criticality, and recommended next actions.
              </p>
            </div>
          </div>

          {/* Sub Navigation Tabs */}
          <div className="flex items-center gap-1.5 bg-slate-900/90 p-1.5 rounded-xl border border-slate-800 self-start md:self-auto">
            <button
              onClick={() => setActiveViewTab('library')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeViewTab === 'library'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Reference Cards</span>
            </button>

            <button
              onClick={() => setActiveViewTab('comparison')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeViewTab === 'comparison'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Good vs Defective</span>
            </button>

            <button
              onClick={() => setActiveViewTab('parameters')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeViewTab === 'parameters'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Inspection Parameters</span>
            </button>
          </div>
        </div>

        {/* Scientific Disclaimers Notice */}
        <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 text-[11px] text-slate-400">
          <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong className="text-slate-200">Scientific Inspection Notice:</strong> The Reference Library serves as an educational benchmark and report cross-reference. Display of a defect in this library does not claim that the Computer Vision pipeline automatically identifies that defect in live testing, nor does RGB photography replace certified physical gas-safety testing.
          </div>
        </div>
      </div>

      {/* VIEW TAB 1: REFERENCE CARDS (CATEGORIES A–F) */}
      {activeViewTab === 'library' && (
        <div className="space-y-6">
          {/* Category Filters & Search Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {/* Category Pills A to F */}
            <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1">
              <button
                onClick={() => setSelectedCategoryKey('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                  selectedCategoryKey === 'all'
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow'
                    : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                All (6)
              </button>
              {REFERENCE_CATEGORIES.map(cat => {
                const isSelected = selectedCategoryKey === cat.key;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategoryKey(cat.key)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow'
                        : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:bg-slate-800 hover:text-slate-200'
                    }`}
                  >
                    <span className="font-mono text-[10px] text-slate-500 font-bold">{cat.key}.</span>
                    <span>{cat.shortTitle || cat.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className="relative min-w-[220px]">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search defects or symptoms..."
                className="w-full pl-9 pr-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500/60"
              />
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredCategories.map(category => (
              <div
                key={category.id}
                className="glass-card rounded-2xl border border-slate-800 overflow-hidden flex flex-col shadow-xl hover:border-slate-700 transition-all duration-300"
              >
                {/* Card Header */}
                <div className="p-4 border-b border-slate-800/80 bg-slate-900/80 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className={`w-6 h-6 rounded-lg flex items-center justify-center font-mono font-bold text-xs ${
                      category.id === 'good-reference'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    }`}>
                      {category.key}
                    </span>
                    <div>
                      <h3 className="font-bold text-slate-100 text-sm tracking-wide">
                        {category.name}
                      </h3>
                      <span className="text-[10px] font-mono text-slate-400">
                        Module: {category.module}
                      </span>
                    </div>
                  </div>

                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                    category.severity === 'CRITICAL'
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      : category.severity === 'HIGH'
                      ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30'
                      : category.severity === 'NORMAL'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  }`}>
                    {category.severity} SEVERITY
                  </span>
                </div>

                {/* Card Reference Image */}
                <div className="relative aspect-[16/10] bg-slate-950 flex items-center justify-center border-b border-slate-800/80 group overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-contain group-hover:scale-102 transition-transform duration-300"
                    loading="lazy"
                  />
                  <button
                    onClick={() => handleOpenDetail(category)}
                    className="absolute top-2 right-2 p-1.5 rounded-lg bg-slate-900/90 text-slate-300 hover:text-slate-100 hover:bg-slate-800 border border-slate-700 opacity-90 hover:opacity-100 transition-all flex items-center gap-1 text-[11px] font-semibold"
                  >
                    <Maximize2 className="w-3.5 h-3.5 text-amber-400" />
                    <span>Expand</span>
                  </button>
                  <div className="absolute bottom-2 left-2 bg-slate-950/85 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-mono text-slate-400 border border-slate-800">
                    {category.originalFilename}
                  </div>
                </div>

                {/* Card Content & Conditions List */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {category.summary}
                  </p>

                  {/* Sub-defect Conditions List */}
                  <div className="space-y-2">
                    <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                      Conditions in this category ({category.subItems.length}):
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {category.subItems.map(sub => (
                        <button
                          key={sub.id}
                          onClick={() => handleOpenDetail(category, sub)}
                          className="p-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-left transition-colors flex flex-col gap-1 group"
                        >
                          <div className="flex items-center justify-between w-full">
                            <span className="text-xs font-bold text-slate-200 group-hover:text-amber-300 transition-colors truncate">
                              {sub.name}
                            </span>
                            <ArrowRight className="w-3 h-3 text-slate-500 group-hover:text-amber-400 shrink-0" />
                          </div>
                          <span className="text-[10px] text-slate-400 line-clamp-1">
                            {sub.characteristics}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Action Footer */}
                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500 font-mono">
                      {category.comparison?.goodSide?.features?.length || 3} Reference indicators
                    </span>
                    <button
                      onClick={() => handleOpenDetail(category)}
                      className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1"
                    >
                      <span>View Specifications & Limits</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW TAB 2: GOOD VS DEFECTIVE COMPARISON BENCH */}
      {activeViewTab === 'comparison' && (
        <GoodVsDefectiveView onOpenDetail={handleOpenPairDetail} />
      )}

      {/* VIEW TAB 3: INSPECTION MODULES & PARAMETERS */}
      {activeViewTab === 'parameters' && (
        <ModuleParametersView onOpenCategory={handleOpenDetail} />
      )}

      {/* Reference Detail Modal */}
      {activeModalData && (
        <ReferenceDetailModal
          category={activeModalData.category}
          defect={activeModalData.defect}
          onClose={() => setActiveModalData(null)}
          onSelectOtherCategory={(cat, def) => setActiveModalData({ category: cat, defect: def })}
        />
      )}
    </div>
  );
}
