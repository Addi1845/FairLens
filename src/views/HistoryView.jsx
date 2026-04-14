import React from 'react';

export default function HistoryView({ onNavigate }) {
  const mockHistory = [
    {
      id: 'SCAN-001',
      date: '2024-12-14 — 14:32',
      dataset: 'Loan Applicants (500 records)',
      attribute: 'Gender',
      biasScore: 73,
      status: 'Critical',
    },
    {
      id: 'SCAN-002',
      date: '2024-12-12 — 09:10',
      dataset: 'Hiring Pipeline (1,200 records)',
      attribute: 'Age',
      biasScore: 41,
      status: 'Moderate',
    },
    {
      id: 'SCAN-003',
      date: '2024-12-08 — 16:55',
      dataset: 'Insurance Claims (800 records)',
      attribute: 'Race',
      biasScore: 12,
      status: 'Safe',
    },
    {
      id: 'SCAN-004',
      date: '2024-11-30 — 11:22',
      dataset: 'Credit Scoring Model v2 (2,000 records)',
      attribute: 'Gender',
      biasScore: 67,
      status: 'Critical',
    },
    {
      id: 'SCAN-005',
      date: '2024-11-25 — 08:45',
      dataset: 'Student Admissions (350 records)',
      attribute: 'Disability',
      biasScore: 28,
      status: 'Safe',
    },
  ];

  const statusColor = (status) => {
    switch (status) {
      case 'Critical': return 'bg-tertiary-fixed text-on-tertiary-fixed-variant border-tertiary/20';
      case 'Moderate': return 'bg-amber-100 text-amber-800 border-amber-300/30';
      case 'Safe': return 'bg-emerald-100 text-emerald-800 border-emerald-300/30';
      default: return 'bg-slate-100 text-slate-600';
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-baseline gap-3">
        <h2 className="text-3xl font-headline font-extrabold tracking-tight text-on-surface">Scan History</h2>
        <span className="text-xs uppercase tracking-widest text-secondary font-semibold">{mockHistory.length} Records</span>
      </div>

      <div className="bg-surface-container-lowest rounded-xl overflow-hidden border border-outline-variant/10 shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-surface-container-low/30 border-b border-outline-variant/10">
            <tr>
              <th className="px-6 py-4 font-semibold text-secondary uppercase tracking-tighter text-[10px]">Scan ID</th>
              <th className="px-6 py-4 font-semibold text-secondary uppercase tracking-tighter text-[10px]">Date</th>
              <th className="px-6 py-4 font-semibold text-secondary uppercase tracking-tighter text-[10px]">Dataset</th>
              <th className="px-6 py-4 font-semibold text-secondary uppercase tracking-tighter text-[10px]">Protected Attr</th>
              <th className="px-6 py-4 font-semibold text-secondary uppercase tracking-tighter text-[10px]">Bias Score</th>
              <th className="px-6 py-4 font-semibold text-secondary uppercase tracking-tighter text-[10px]">Status</th>
              <th className="px-6 py-4 font-semibold text-secondary uppercase tracking-tighter text-[10px] text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/5">
            {mockHistory.map(scan => (
              <tr key={scan.id} className="hover:bg-surface-container-low transition-colors">
                <td className="px-6 py-4 text-on-surface font-semibold font-inter text-sm">{scan.id}</td>
                <td className="px-6 py-4 text-on-surface-variant text-sm font-inter">{scan.date}</td>
                <td className="px-6 py-4 text-on-surface text-sm font-inter">{scan.dataset}</td>
                <td className="px-6 py-4 text-on-surface text-sm font-inter">{scan.attribute}</td>
                <td className="px-6 py-4">
                  <span className="text-xl font-black font-headline text-on-surface">{scan.biasScore}</span>
                  <span className="text-xs text-on-surface-variant/50 ml-1">/100</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider border ${statusColor(scan.status)}`}>
                    {scan.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => onNavigate('overview')}
                    className="text-primary font-semibold text-sm hover:underline font-inter"
                  >
                    View Report →
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Info card */}
      <div className="bg-primary rounded-xl p-6 text-on-primary relative overflow-hidden">
        <div className="relative z-10 space-y-2">
          <p className="text-xs font-bold uppercase tracking-widest opacity-80 font-inter">Compliance Note</p>
          <p className="text-sm leading-relaxed font-inter">All bias scans are permanently logged for regulatory compliance. Records are retained for 7 years per EU AI Act Article 12 requirements.</p>
        </div>
        <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
      </div>
    </div>
  );
}
