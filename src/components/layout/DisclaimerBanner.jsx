import React from 'react';
import { ShieldAlert, Info } from 'lucide-react';

export function DisclaimerBanner() {
  return (
    <div className="bg-amber-950/40 border-b border-amber-500/30 px-6 py-2.5 flex items-center justify-between text-xs text-amber-200/90 gap-4">
      <div className="flex items-center gap-2 font-medium">
        <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
        <span>
          <strong className="font-semibold text-amber-300">Visual Inspection Aid Notice:</strong> This software is a visual inspection aid — <strong>NOT</strong> a gas-safety certification system.
        </span>
      </div>
      <div className="hidden md:flex items-center gap-2 text-amber-300/70 text-[11px]">
        <Info className="w-3.5 h-3.5" />
        <span>Does not claim to detect LPG leakage, pressure, temperature, or internal combustion parameters from RGB images.</span>
      </div>
    </div>
  );
}
