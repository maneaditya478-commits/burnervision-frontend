import React from 'react';
import { REFERENCE_CATEGORIES } from '../../data/defectReferenceLibrary';
import {
  BookOpen,
  ArrowRight,
  ExternalLink,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  Eye,
  Maximize2
} from 'lucide-react';

export function RelatedReferenceCard({ report, onOpenCategory }) {
  if (!report) return null;

  // Determine which reference categories are most relevant to this specific inspection report
  const isNormal = report.overall_damage_status === 'NORMAL';
  const isCleaning = report.overall_damage_status === 'CLEANING REQUIRED';
  const isDamaged = report.overall_damage_status === 'INSPECTION NEEDED';

  // Build relevant category priority list
  let prioritizedCategoryKeys = [];

  if (isDamaged) {
    // High priority: Cracks, Chipping, Deformation
    prioritizedCategoryKeys = ['C', 'A', 'D', 'B', 'E', 'F'];
  } else if (isCleaning) {
    // High priority: Ports, Surface Conditions
    prioritizedCategoryKeys = ['B', 'E', 'A', 'F', 'C', 'D'];
  } else {
    // Normal / Verified Good
    prioritizedCategoryKeys = ['F', 'B', 'A', 'D', 'E', 'C'];
  }

  // Get top 3 or 4 relevant categories
  const relevantCategories = prioritizedCategoryKeys
    .map(key => REFERENCE_CATEGORIES.find(c => c.key === key))
    .filter(Boolean)
    .slice(0, 4);

  return (
    <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-100 text-sm tracking-wide">
              Section 8: Related Defect Reference Examples
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Verified visual comparison references corresponding to the parameters identified in this inspection
            </p>
          </div>
        </div>

        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800 self-start sm:self-auto">
          Visual Cross-Reference Standard
        </span>
      </div>

      {/* Grid of Relevant Category Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {relevantCategories.map(cat => (
          <div
            key={cat.id}
            className="rounded-xl bg-slate-900/90 border border-slate-800 overflow-hidden flex flex-col justify-between hover:border-slate-700 transition-all duration-200 group shadow-md"
          >
            {/* Image Preview */}
            <div className="relative aspect-[16/10] bg-slate-950 flex items-center justify-center border-b border-slate-800/80">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-contain group-hover:scale-102 transition-transform duration-200"
                loading="lazy"
              />
              <span className={`absolute top-2 left-2 text-[9px] font-mono font-bold px-1.5 py-0.2 rounded ${
                cat.id === 'good-reference'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
              }`}>
                Cat {cat.key}
              </span>
            </div>

            {/* Card Content */}
            <div className="p-3.5 flex-1 flex flex-col justify-between space-y-2.5">
              <div>
                <h4 className="font-bold text-xs text-slate-200 group-hover:text-amber-300 transition-colors">
                  {cat.name}
                </h4>
                <p className="text-[11px] text-slate-400 line-clamp-2 mt-1 leading-snug">
                  {cat.summary}
                </p>
              </div>

              <div className="space-y-1.5 pt-1 border-t border-slate-800/60">
                <div className="text-[10px] font-mono text-slate-500">
                  Defect types: {cat.subItems.length} examples
                </div>
                {onOpenCategory && (
                  <button
                    type="button"
                    onClick={() => onOpenCategory(cat)}
                    className="w-full py-1.5 px-2 bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-300 font-semibold text-xs rounded-lg transition-all flex items-center justify-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Reference Card</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Educational Note */}
      <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-[11px] text-slate-400 leading-relaxed flex items-center justify-between">
        <span>
          Cross-reference standard based on verified circular burner defect samples. Use to compare live image features against documented physical defect indications.
        </span>
      </div>
    </div>
  );
}
