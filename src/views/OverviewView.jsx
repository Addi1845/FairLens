import React from 'react';

export default function OverviewView({ results, onNavigate }) {
  if (!results) return null;

  const gapPct = Math.round(results.demographicParityGap * 100);
  const eodPct = Math.round(results.equalizedOddsViolation * 100);

  // Segmented gauge
  const filledSegments = Math.floor(results.biasScore / 10);
  const partialFill = (results.biasScore % 10) * 10;

  // Get confusion matrix group names
  const cmGroups = Object.keys(results.confusionMatrices || {});

  return (
    <div className="space-y-8">

      {/* ═══ Verdict Banner ═══ */}
      <section className="w-full bg-tertiary-container text-on-tertiary rounded-xl p-6 flex items-center justify-between shadow-lg overflow-hidden relative">
        <div className="relative z-10 flex items-center gap-4">
          <span className="material-symbols-outlined text-4xl" style={{fontVariationSettings: "'FILL' 1"}}>warning</span>
          <div>
            <h2 className="font-headline font-extrabold text-2xl tracking-tight">Significant Bias Detected</h2>
            <p className="font-body text-on-tertiary/90">This model shows discriminatory patterns against <span className="font-bold underline decoration-2">{results.disadvantagedGroup}</span> applicants.</p>
          </div>
        </div>
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-tertiary/20 to-transparent pointer-events-none"></div>
      </section>

      {/* ═══ Score + 4 Metrics ═══ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* Bias Severity Score */}
        <div className="lg:col-span-4 bg-surface-container-lowest rounded-xl p-8 flex flex-col items-center justify-center shadow-[0_8px_32px_0_rgba(19,27,46,0.04)] aspect-square border border-outline-variant/10">
          <span className="font-inter text-xs uppercase tracking-[0.2em] text-on-surface-variant mb-8 font-semibold">Bias Severity Score</span>
          <div className="w-full flex flex-col items-center gap-10">
            <div className="w-full space-y-4">
              <div className="flex justify-between items-end mb-2">
                <div className="flex flex-col">
                  <span className="text-5xl font-black font-headline text-on-surface leading-none">{results.biasScore}</span>
                  <span className="text-sm font-bold text-on-surface-variant/60 font-inter mt-1">SCORE / 100</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold text-tertiary uppercase tracking-tighter">High Risk Threshold</span>
                </div>
              </div>
              <div className="relative">
                <div className="flex gap-1.5 h-12 w-full">
                  {Array.from({ length: 10 }).map((_, i) => {
                    if (i < filledSegments) {
                      return <div key={i} className="flex-1 bg-tertiary rounded-sm shadow-[0_0_15px_rgba(186,26,26,0.3)]"></div>;
                    } else if (i === filledSegments) {
                      return (
                        <div key={i} className="flex-1 relative bg-surface-container-highest rounded-sm overflow-hidden">
                          <div className="absolute inset-0 bg-tertiary" style={{ width: `${partialFill}%` }}></div>
                        </div>
                      );
                    } else {
                      return <div key={i} className="flex-1 bg-surface-container-highest rounded-sm"></div>;
                    }
                  })}
                </div>
                <div className="absolute -bottom-2 flex flex-col items-center" style={{ left: `${results.biasScore}%`, transform: 'translateX(-50%)' }}>
                  <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] border-b-on-surface"></div>
                </div>
              </div>
              <div className="flex justify-between text-[10px] font-bold text-on-surface-variant/40 font-inter uppercase tracking-widest pt-2">
                <span>Safe</span>
                <span>Moderate</span>
                <span>Critical</span>
              </div>
            </div>
            <div className="px-6 py-2.5 bg-tertiary-fixed border border-tertiary/20 rounded-lg text-on-tertiary-fixed-variant text-xs font-black uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
              {results.biasScore >= 60 ? 'Critical Priority' : results.biasScore >= 30 ? 'Moderate Priority' : 'Low Priority'}
            </div>
          </div>
        </div>

        {/* 4 Metrics */}
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
          <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/10 flex flex-col justify-between hover:translate-y-[-4px] transition-transform">
            <div>
              <p className="font-inter text-xs uppercase tracking-widest text-on-surface-variant mb-1">Demographic Parity Gap</p>
              <h3 className="text-4xl font-headline font-extrabold text-tertiary">{results.demographicParityGap}</h3>
            </div>
            <p className="text-sm text-on-surface-variant font-medium mt-4">Approval rate differs by {gapPct}% between groups</p>
          </div>
          <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/10 flex flex-col justify-between hover:translate-y-[-4px] transition-transform">
            <div>
              <p className="font-inter text-xs uppercase tracking-widest text-on-surface-variant mb-1">Equalized Odds Violation</p>
              <h3 className="text-4xl font-headline font-extrabold text-tertiary">{results.equalizedOddsViolation}</h3>
            </div>
            <p className="text-sm text-on-surface-variant font-medium mt-4">{eodPct}% gap in true positive rates</p>
          </div>
          <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/10 flex flex-col justify-between hover:translate-y-[-4px] transition-transform">
            <div>
              <p className="font-inter text-xs uppercase tracking-widest text-on-surface-variant mb-1">Affected Records</p>
              <h3 className="text-4xl font-headline font-extrabold text-on-surface">{results.affectedCount}</h3>
            </div>
            <p className="text-sm text-on-surface-variant font-medium mt-4">of {results.totalRecords} total records analysed</p>
          </div>
          <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/10 flex flex-col justify-between hover:translate-y-[-4px] transition-transform">
            <div>
              <p className="font-inter text-xs uppercase tracking-widest text-on-surface-variant mb-1">Fairness Score</p>
              <div className="flex items-baseline gap-2">
                <h3 className="text-4xl font-headline font-extrabold text-tertiary">{results.fairnessScore}</h3>
                <span className="text-lg font-bold text-on-surface-variant/40">/ 100</span>
              </div>
            </div>
            <p className="text-sm text-on-surface-variant font-medium mt-4">Before remediation measures</p>
          </div>
        </div>
      </div>

      {/* ═══ Visualizations ═══ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Bar Chart: Approval Rate */}
        <div className="lg:col-span-6 bg-surface-container-lowest p-8 rounded-xl shadow-sm border border-outline-variant/10">
          <div className="flex justify-between items-center mb-10">
            <h4 className="font-headline font-bold text-lg">Approval Rate by Group</h4>
            <span className="text-xs font-bold text-tertiary bg-tertiary-fixed px-2 py-1 rounded">{gapPct}% Gap</span>
          </div>
          <div className="relative h-64 flex items-end justify-around pb-6 border-b border-outline-variant">
            <div className="absolute w-full border-t-2 border-dashed border-on-surface/10 top-1/4">
              <span className="absolute right-0 -top-6 text-[10px] font-bold text-on-surface-variant/40 tracking-widest uppercase">Fair Threshold</span>
            </div>
            {results.groupStats.map(g => {
              const pct = Math.round(g.approvalRate * 100);
              const isDisadvantaged = g.name === results.disadvantagedGroup;
              return (
                <div key={g.name} className="flex flex-col items-center gap-3 w-20">
                  <span className="text-xs font-bold font-inter text-on-surface-variant">{pct}%</span>
                  <div
                    className={`w-full rounded-t-lg transition-all duration-500 ${isDisadvantaged ? 'bg-tertiary' : 'bg-primary'}`}
                    style={{ height: `${pct}%` }}
                  ></div>
                  <span className="font-inter text-xs font-bold text-on-surface-variant">{g.name}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Feature Importance — computed from data */}
        <div className="lg:col-span-6 bg-surface-container-lowest p-8 rounded-xl shadow-sm border border-outline-variant/10">
          <h4 className="font-headline font-bold text-lg mb-8">Feature Importance (Correlation)</h4>
          <div className="space-y-6">
            {(results.featureImportance || []).map(f => (
              <div key={f.name} className="space-y-1">
                <div className={`flex justify-between text-xs font-bold font-inter uppercase tracking-wider ${f.protected ? 'text-tertiary' : 'text-on-surface-variant'}`}>
                  <span>{f.name}</span>
                  <span>{f.value}</span>
                </div>
                <div className="w-full bg-surface-container-highest rounded-full h-2">
                  <div className={`h-full rounded-full transition-all duration-700 ${f.protected ? 'bg-tertiary' : 'bg-primary-container'}`} style={{ width: `${Math.min(100, f.pct)}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Confusion Matrix Disparity — computed from data */}
        <div className="lg:col-span-12 bg-surface-container-lowest p-8 rounded-xl shadow-sm border border-outline-variant/10">
          <h4 className="font-headline font-bold text-lg mb-8">Confusion Matrix Disparity</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {cmGroups.map(groupName => {
              const cm = results.confusionMatrices[groupName];
              const isDisadvantaged = groupName === results.disadvantagedGroup;
              return (
                <div key={groupName}>
                  <span className={`font-inter text-xs font-bold uppercase tracking-widest mb-4 block ${isDisadvantaged ? 'text-tertiary' : 'text-primary'}`}>Group: {groupName}</span>
                  <div className="grid grid-cols-2 gap-2 max-w-xs">
                    <div className="aspect-square bg-emerald-100 rounded flex flex-col items-center justify-center border-b-2 border-emerald-500">
                      <span className="text-2xl font-black text-emerald-800">{cm.tp}</span>
                      <span className="text-[10px] font-bold text-emerald-600 uppercase">True Pos</span>
                    </div>
                    <div className="aspect-square bg-slate-100 rounded flex flex-col items-center justify-center">
                      <span className="text-2xl font-black text-slate-800">{cm.fp}</span>
                      <span className="text-[10px] font-bold text-slate-600 uppercase">False Pos</span>
                    </div>
                    <div className={`aspect-square rounded flex flex-col items-center justify-center ${isDisadvantaged && cm.fn > 50 ? 'bg-tertiary-fixed border-2 border-tertiary animate-pulse' : 'bg-slate-100'}`}>
                      <span className={`text-2xl font-black ${isDisadvantaged && cm.fn > 50 ? 'text-on-tertiary-fixed-variant' : 'text-slate-800'}`}>{cm.fn}</span>
                      <span className={`text-[10px] font-bold uppercase ${isDisadvantaged && cm.fn > 50 ? 'text-tertiary' : 'text-slate-600'}`}>False Neg</span>
                    </div>
                    <div className="aspect-square bg-emerald-100 rounded flex flex-col items-center justify-center border-b-2 border-emerald-500">
                      <span className="text-2xl font-black text-emerald-800">{cm.tn}</span>
                      <span className="text-[10px] font-bold text-emerald-600 uppercase">True Neg</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ═══ Narrative Box ═══ */}
      <section className="bg-white border-l-8 border-primary rounded-r-xl p-10 shadow-sm">
        <div className="max-w-4xl">
          <h3 className="font-headline font-extrabold text-2xl text-on-surface mb-6">What this means in plain English</h3>
          <p className="font-body text-lg leading-relaxed text-on-surface-variant">
            The model approves {results.groupStats[0]?.name} applicants {gapPct}% more often than {results.disadvantagedGroup} applicants
            with identical financial profiles. The primary driver of this disparity is the{' '}
            <span className="font-bold text-primary">{results.featureImportance?.find(f => f.protected)?.name || 'protected attribute'}</span>{' '}
            feature having an outsized influence (correlation: {results.featureImportance?.find(f => f.protected)?.value}).
            This constitutes a violation of regulatory fairness standards.
          </p>
          <div className="mt-8 flex gap-4">
            <button onClick={() => onNavigate('mitigation')} className="px-6 py-3 bg-primary text-on-primary rounded-lg font-bold hover:scale-95 transition-transform">Initiate Remediation</button>
            <button className="px-6 py-3 border border-outline-variant text-on-surface-variant rounded-lg font-bold hover:bg-surface-container-low transition-colors">Export Technical Report</button>
          </div>
        </div>
      </section>
    </div>
  );
}
