import React, { useState, useRef } from 'react';
import Papa from 'papaparse';
import { generateLoanDataset } from '../data/syntheticData';

export default function UploadView({ onAuditStart }) {
  const [dataset, setDataset] = useState(null);
  const [fileName, setFileName] = useState(null);
  const fileInputRef = useRef(null);

  const handleUseDemo = () => {
    setDataset(generateLoanDataset(500));
    setFileName('Demo: Loan Applicants (500 records)');
  };

  /**
   * Parse a real CSV file using PapaParse.
   */
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
      complete: (result) => {
        if (result.data && result.data.length > 0) {
          const finalData = result.data.map((row, idx) => {
            const r = {};
            Object.keys(row).forEach(k => {
              r[k.toLowerCase().replace(/[\s_-]/g, '')] = row[k];
            });

            const id = r.applicantid || r.id || r.appid || `APP-${String(idx + 1).padStart(4, '0')}`;
            const age = Number(r.age) || 30;
            const rawGender = String(r.gender || r.sex || r.genderidentity || 'Unknown').trim();
            const gender = rawGender.charAt(0).toUpperCase() + rawGender.slice(1).toLowerCase();
            const income = Number(r.income || r.salary || r.annualincome || r.monthlyincome) || 50000;
            const creditScore = Number(r.creditscore || r.credit_score || r.score || r.cibil || r.ficoscore) || 650;

            const empRaw = r.employed ?? r.employment ?? r.employmentstatus ?? r.iemployed ?? '';
            const employed = empRaw === true || empRaw === 1 ||
              ['yes', 'employed', 'true', '1', 'y'].includes(String(empRaw).toLowerCase().trim());

            const decRaw = String(r.decision || r.approved || r.outcome || r.result || r.status || r.label || 'Rejected').trim();
            const decLower = decRaw.toLowerCase();
            const decision = ['approved', 'yes', '1', 'true', 'accept', 'accepted', 'granted', 'y'].includes(decLower)
              ? 'Approved'
              : 'Rejected';

            return { id, age, gender, income, creditScore, employed, decision };
          });

          if (finalData.length > 0) {
            console.log('[FairLens] CSV parsed:', finalData.length, 'rows. Sample:', finalData[0]);
            console.log('[FairLens] Unique genders:', [...new Set(finalData.map(r => r.gender))]);
            console.log('[FairLens] Unique decisions:', [...new Set(finalData.map(r => r.decision))]);
            setDataset(finalData);
            setFileName(`${file.name} (${finalData.length} records)`);
          } else {
            setDataset(generateLoanDataset(500));
            setFileName('Empty CSV — using demo dataset');
          }
        }
      },
      error: (err) => {
        console.error('[FairLens] CSV parse error:', err);
        setDataset(generateLoanDataset(500));
        setFileName('Parse error — using demo dataset');
      }
    });
  };

  const handleCardClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleDragOver = (e) => { e.preventDefault(); };
  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.name.endsWith('.csv')) {
      const fakeEvent = { target: { files: [file] } };
      handleFileUpload(fakeEvent);
    }
  };

  const handleRunAudit = () => {
    if (!dataset) return;
    onAuditStart(dataset);
  };

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Left Section: Data Ingestion */}
        <section className="lg:col-span-7 space-y-6">
          <div className="flex items-baseline gap-3">
            <h2 className="text-3xl font-headline font-extrabold tracking-tight text-on-surface">Data Ingestion</h2>
            <span className="text-xs uppercase tracking-widest text-secondary font-semibold font-inter">Step 01</span>
          </div>

          <div className="bg-surface-container-low rounded-xl p-8 space-y-6">

            {/* Upload Area */}
            <input
              type="file"
              accept=".csv"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileUpload}
            />
            <div
              onClick={handleCardClick}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              className="border-2 border-dashed border-outline-variant rounded-xl p-12 flex flex-col items-center justify-center text-center space-y-4 hover:bg-surface-container-highest/50 transition-colors cursor-pointer group"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined !text-4xl" style={{fontVariationSettings: "'FILL' 0"}}>cloud_upload</span>
              </div>
              <div>
                <p className="text-lg font-semibold text-on-surface font-headline">Drag and drop your dataset (CSV) here</p>
                <p className="text-sm text-secondary font-inter">Supported format: .csv (Max 50MB)</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="h-px flex-1 bg-outline-variant/30"></div>
              <span className="text-xs font-bold text-outline uppercase tracking-tighter font-inter">Or</span>
              <div className="h-px flex-1 bg-outline-variant/30"></div>
            </div>

            <div className="flex flex-col items-center gap-4">
              <button
                onClick={handleUseDemo}
                className="px-6 py-3 bg-secondary-fixed text-on-secondary-fixed rounded-lg font-semibold hover:bg-secondary-container transition-colors flex items-center gap-2"
              >
                <span className="material-symbols-outlined">database</span>
                Or use our built-in demo dataset
              </button>

              {dataset && (
                <div className="flex items-center gap-3 px-4 py-2 bg-surface-container-highest text-primary rounded-full border border-primary/10">
                  <span className="material-symbols-outlined !text-sm" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
                  <span className="text-xs font-bold uppercase tracking-wide">{fileName}</span>
                </div>
              )}
            </div>

          </div>

          {/* Data Preview */}
          {dataset && (
            <div className="bg-surface-container-lowest rounded-xl overflow-hidden border border-outline-variant/15">
              <div className="px-6 py-4 bg-surface-container-low/50 flex justify-between items-center">
                <h3 className="font-bold text-sm text-on-surface font-headline">Dataset Preview</h3>
                <span className="text-xs text-secondary font-inter">Showing first 5 of {dataset.length} rows</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-surface-container-low/30 border-b border-outline-variant/10">
                    <tr>
                      <th className="px-6 py-3 font-semibold text-secondary uppercase tracking-tighter text-[10px] font-inter">ApplicantID</th>
                      <th className="px-6 py-3 font-semibold text-secondary uppercase tracking-tighter text-[10px] font-inter">Age</th>
                      <th className="px-6 py-3 font-semibold text-secondary uppercase tracking-tighter text-[10px] font-inter">Gender</th>
                      <th className="px-6 py-3 font-semibold text-secondary uppercase tracking-tighter text-[10px] font-inter">Income</th>
                      <th className="px-6 py-3 font-semibold text-secondary uppercase tracking-tighter text-[10px] font-inter">CreditScore</th>
                      <th className="px-6 py-3 font-semibold text-secondary uppercase tracking-tighter text-[10px] font-inter">Employed</th>
                      <th className="px-6 py-3 font-semibold text-secondary uppercase tracking-tighter text-[10px] font-inter">Decision</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/5">
                    {dataset.slice(0, 5).map((row, idx) => (
                      <tr key={row.id || idx} className="hover:bg-surface-container-low transition-colors">
                        <td className="px-6 py-4 text-on-surface font-medium">{row.id}</td>
                        <td className="px-6 py-4 text-on-surface">{row.age}</td>
                        <td className="px-6 py-4 text-on-surface">{row.gender}</td>
                        <td className="px-6 py-4 text-on-surface">${Number(row.income).toLocaleString()}</td>
                        <td className="px-6 py-4 text-on-surface">{row.creditScore}</td>
                        <td className="px-6 py-4 text-on-surface">{row.employed ? 'Yes' : 'No'}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${row.decision === 'Approved' ? 'bg-secondary-container text-on-secondary-container' : 'bg-tertiary-container/10 text-tertiary'}`}>
                            {row.decision}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </section>

        {/* Right Section: Configure Audit */}
        <aside className="lg:col-span-5 space-y-6">
          <div className="flex items-baseline gap-3">
            <h2 className="text-3xl font-headline font-extrabold tracking-tight text-on-surface">Audit Parameters</h2>
            <span className="text-xs uppercase tracking-widest text-secondary font-semibold font-inter">Step 02</span>
          </div>

          <div className="bg-surface-container-highest/30 rounded-xl p-8 border border-outline-variant/10 space-y-8">
            <div className="space-y-6">

              <div className="space-y-2">
                <label className="text-sm font-bold text-on-surface flex items-center gap-2 font-inter">Protected Attribute</label>
                <div className="relative">
                  <select className="w-full appearance-none bg-surface-container-lowest border border-outline-variant/30 rounded-lg px-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium font-inter">
                    <option>Gender</option>
                    <option>Age</option>
                    <option>Race</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-outline">expand_more</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-on-surface flex items-center gap-2 font-inter">Decision Column</label>
                <div className="relative">
                  <select className="w-full appearance-none bg-surface-container-lowest border border-outline-variant/30 rounded-lg px-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium font-inter">
                    <option>Decision</option>
                    <option>Approved</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-outline">expand_more</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-on-surface flex items-center gap-2 font-inter">Fairness Metric</label>
                <div className="relative">
                  <select className="w-full appearance-none bg-surface-container-lowest border border-outline-variant/30 rounded-lg px-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium font-inter">
                    <option>Demographic Parity</option>
                    <option>Equalized Odds</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-outline">expand_more</span>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-surface-container-lowest rounded-lg border border-outline-variant/20 shadow-sm">
                <div className="space-y-1">
                  <p className="text-sm font-bold text-on-surface font-inter">Include model re-evaluation</p>
                  <p className="text-xs text-secondary font-inter">Automatically simulate fairness interventions</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input defaultChecked type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>

            </div>

            <div className="pt-6">
              <button
                onClick={handleRunAudit}
                disabled={!dataset}
                className="w-full py-4 bg-primary text-on-primary rounded-xl font-bold text-lg shadow-[0_8px_24px_rgba(53,37,205,0.25)] hover:shadow-[0_12px_32px_rgba(53,37,205,0.4)] disabled:opacity-50 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-3 font-headline"
              >
                Run Bias Audit
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
          </div>
        </aside>

      </div>
    </>
  );
}
