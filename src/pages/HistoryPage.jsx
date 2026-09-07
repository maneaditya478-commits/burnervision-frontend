import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { History, Search, Filter, Trash2, Eye, RotateCcw, Sparkles, Download } from 'lucide-react';

export function HistoryPage() {
  const { history, setCurrentReport, setActiveTab, deleteInspection, resetHistoryToDefault } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const filteredHistory = history.filter(item => {
    const matchesSearch = item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (item.burnerName && item.burnerName.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'ALL' || item.overall_damage_status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleSelectReport = (report) => {
    setCurrentReport(report);
    setActiveTab('report');
  };

  return (
    <div className="space-y-6">
      {/* Search & Filter Header Bar */}
      <div className="glass-card rounded-2xl p-5 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        {/* Search Bar */}
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by Inspection ID or Burner model..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500/50"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {['ALL', 'NORMAL', 'CLEANING REQUIRED', 'INSPECTION NEEDED'].map(status => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                statusFilter === status
                  ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold shadow-md shadow-amber-500/20'
                  : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        <button
          onClick={resetHistoryToDefault}
          className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 text-xs font-medium rounded-xl border border-slate-800 flex items-center gap-1.5 transition-colors"
          title="Reset to default demo dataset"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset History</span>
        </button>
      </div>

      {/* History Table Container */}
      <div className="glass-card rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-slate-100 text-sm">Inspection Log Records</h3>
          </div>
          <span className="text-xs font-mono text-slate-400">
            Showing <strong className="text-slate-200">{filteredHistory.length}</strong> of {history.length} records
          </span>
        </div>

        {filteredHistory.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-400 space-y-2">
            <p>No inspection records found matching your filters.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-900/90 text-slate-400 font-mono text-[11px] uppercase border-b border-slate-800">
                <tr>
                  <th className="p-3.5">ID / Date</th>
                  <th className="p-3.5">Overall Status</th>
                  <th className="p-3.5">Condition Index</th>
                  <th className="p-3.5">Dirt / Carbon</th>
                  <th className="p-3.5">Visual Corrosion</th>
                  <th className="p-3.5">Damage Indications</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredHistory.map(item => (
                  <tr key={item.id} className="hover:bg-slate-900/60 transition-colors">
                    <td className="p-3.5 space-y-0.5">
                      <div className="font-mono font-bold text-slate-100 flex items-center gap-1.5">
                        <span>{item.id}</span>
                        {item.isDemoResult && (
                          <span className="text-[10px] text-amber-400" title="Demo / Simulated CV Results">
                            <Sparkles className="w-3 h-3" />
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-400">{item.date}</div>
                    </td>

                    <td className="p-3.5">
                      <span className={`px-2.5 py-0.5 rounded text-[10px] font-mono font-bold border ${
                        item.overall_damage_status === 'NORMAL'
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                          : item.overall_damage_status === 'CLEANING REQUIRED'
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                          : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                      }`}>
                        {item.overall_damage_status}
                      </span>
                    </td>

                    <td className="p-3.5 font-mono font-bold text-amber-400 text-sm">
                      {item.overall_score || 85}/100
                    </td>

                    <td className="p-3.5 font-mono text-slate-300">
                      {item.dirt?.coverage_percent ? `${item.dirt.coverage_percent}%` : 'Low'}
                    </td>

                    <td className="p-3.5 font-mono text-slate-300">
                      {item.corrosion?.score ? `${item.corrosion.score}/100` : 'None'}
                    </td>

                    <td className="p-3.5 font-mono text-slate-300">
                      {item.crack_evidence?.candidate_count || 0} candidates
                    </td>

                    <td className="p-3.5 text-right space-x-2">
                      <button
                        onClick={() => handleSelectReport(item)}
                        className="px-3 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-bold rounded-lg border border-amber-500/40 transition-colors inline-flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View</span>
                      </button>

                      <button
                        onClick={() => deleteInspection(item.id)}
                        className="p-1.5 bg-slate-800 hover:bg-rose-600 text-slate-400 hover:text-slate-100 rounded-lg border border-slate-700 transition-colors inline-flex items-center"
                        title="Delete entry"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
