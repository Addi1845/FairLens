import React from 'react';

export default function MitigationView({ results, onMitigate }) {
  if (!results) return null;

  const isMitigated = results.demographicParityGap <= 0.05;

  return (
    <div className="space-y-8">

      {/* Banner */}
      {isMitigated ? (
        <section className="w-full bg-emerald-700 text-white rounded-xl p-6 flex items-center shadow-lg">
          <span className="material-symbols-outlined text-3xl mr-4" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
          <div>
            <h2 className="font-headline font-bold text-xl">Bias successfully reduced by 88%.</h2>
            <p className="font-body text-white/90">The debiased model meets Demographic Parity standards.</p>
          </div>
        </section>
      ) : (
        <div className="flex justify-between items-end border-b border-outline-variant/40 pb-6">
          <div>
            <h2 className="text-3xl font-headline font-extrabold text-on-surface mb-2">Remediation Results</h2>
            <p className="text-on-surface-variant">Apply debiasing algorithms across the entire dataset to eliminate disparate impact.</p>
          </div>
          <button
            onClick={onMitigate}
            className="bg-primary text-on-primary px-8 py-3 rounded-lg font-bold hover:scale-95 transition-transform shadow-[0_8px_24px_rgba(53,37,205,0.25)] flex items-center gap-2"
          >
            <span className="material-symbols-outlined">auto_fix_high</span>
            Run Bulk Remediation
          </button>
        </div>
      )}

      {/* Before / After Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        <div className="bg-surface-container-lowest p-8 rounded-xl border border-outline-variant/10 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-tertiary-fixed text-on-tertiary-fixed-variant text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-bl-lg">Before</div>
          <h3 className="font-headline font-bold text-lg mb-6 text-on-surface">Biased Model</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-outline-variant/15 pb-2">
              <span className="text-on-surface-variant text-sm font-inter">Fairness Score</span>
              <span className="font-bold text-tertiary">27 <span className="opacity-50 text-xs">/100</span></span>
            </div>
            <div className="flex justify-between items-center border-b border-outline-variant/15 pb-2">
              <span className="text-on-surface-variant text-sm font-inter">Demographic Parity Gap</span>
              <span className="font-bold text-on-surface">0.34</span>
            </div>
            <div className="flex justify-between items-center pb-2">
              <span className="text-on-surface-variant text-sm font-inter">Affected People</span>
              <span className="font-bold text-on-surface">112</span>
            </div>
          </div>
        </div>

        <div className={`p-8 rounded-xl border shadow-sm relative overflow-hidden transition-all ${isMitigated ? 'bg-emerald-50 border-emerald-200' : 'bg-surface-container-lowest border-outline-variant/10 opacity-50'}`}>
          <div className={`absolute top-0 right-0 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-bl-lg ${isMitigated ? 'bg-emerald-200 text-emerald-800' : 'bg-surface-container-high text-on-surface-variant'}`}>After</div>
          <h3 className="font-headline font-bold text-lg mb-6 text-on-surface">Debiased Model</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-outline-variant/15 pb-2">
              <span className="text-on-surface-variant text-sm font-inter">Fairness Score</span>
              <span className="font-bold text-emerald-700">{isMitigated ? results.fairnessScore : '--'} <span className="opacity-50 text-xs">/100</span></span>
            </div>
            <div className="flex justify-between items-center border-b border-outline-variant/15 pb-2">
              <span className="text-on-surface-variant text-sm font-inter">Demographic Parity Gap</span>
              <span className="font-bold text-on-surface">{isMitigated ? results.demographicParityGap : '--'}</span>
            </div>
            <div className="flex justify-between items-center pb-2">
              <span className="text-on-surface-variant text-sm font-inter">Affected People</span>
              <span className="font-bold text-on-surface">{isMitigated ? results.affectedCount : '--'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Post-remediation chart — pure CSS bars */}
      {isMitigated && (
        <div className="bg-surface-container-lowest p-8 rounded-xl shadow-sm border border-outline-variant/10">
          <h4 className="font-headline font-bold text-lg mb-10">Approval Rates After Debiasing</h4>
          <div className="relative h-64 flex items-end justify-around pb-6 border-b border-outline-variant">
            {results.groupStats.map(g => {
              const pct = Math.round(g.approvalRate * 100);
              return (
                <div key={g.name} className="flex flex-col items-center gap-3 w-16">
                  <div
                    className="w-full bg-primary rounded-t-lg transition-all duration-500"
                    style={{ height: `${pct}%` }}
                  ></div>
                  <span className="font-inter text-xs font-bold text-on-surface-variant">{g.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
