import React, { useState } from 'react';
import { reEvaluate } from '../utils/auditLogic';

export default function AffectedPeopleView({ results, onNavigate }) {
  if (!results) return null;

  const affected = results.affectedPeople || [];
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const totalPages = Math.max(1, Math.ceil(affected.length / rowsPerPage));
  
  const paginatedData = affected.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const [selectedPerson, setSelectedPerson] = useState(null);
  const [reconsiders, setReconsiders] = useState({});

  const handleReEvaluate = (person) => {
      const reEval = reEvaluate(person);
      setSelectedPerson({
          ...person,
          newScore: reEval.newScore,
          newDecision: reEval.decision
      });
  };

  const handleMarkReconsidered = () => {
      if (selectedPerson) {
          setReconsiders(prev => ({...prev, [selectedPerson.id]: true}));
      }
  };

  return (
    <div className="max-w-6xl mx-auto flex relative overflow-hidden">
      
      {/* Main Table Area */}
      <div className={`w-full transition-all duration-300 ${selectedPerson ? 'pr-[400px]' : ''}`}>
         <header className="mb-8">
            <h2 className="text-3xl font-headline font-extrabold text-[#131b2e] mb-2">{affected.length} individuals were likely harmed by this bias</h2>
            <p className="text-[#464555] mb-6">These applicants were rejected by the biased model but qualify under a fair evaluation</p>
            
            <div className="flex gap-3">
               <button className="bg-[#131b2e] text-white px-4 py-1.5 rounded-full text-sm font-semibold">All</button>
               <button className="bg-white border border-[#c7c4d8] text-[#464555] px-4 py-1.5 rounded-full text-sm font-medium hover:bg-[#f2f3ff] transition-colors">Female</button>
               <button className="bg-white border border-[#c7c4d8] text-[#464555] px-4 py-1.5 rounded-full text-sm font-medium hover:bg-[#f2f3ff] transition-colors">Age 18–30</button>
               <button className="bg-white border border-[#c7c4d8] text-[#464555] px-4 py-1.5 rounded-full text-sm font-medium hover:bg-[#f2f3ff] transition-colors">High Credit Score</button>
            </div>
         </header>

         <div className="bg-white rounded-xl shadow-[0_8px_32px_0_rgba(19,27,46,0.04)] overflow-hidden border border-[#e2e7ff]">
            <table className="w-full text-left border-collapse">
               <thead>
                  <tr className="bg-[#f2f3ff] text-xs font-bold uppercase tracking-wider text-[#464555]">
                     <th className="py-4 px-6">ApplicantID</th>
                     <th className="py-4 px-6">Age</th>
                     <th className="py-4 px-6">Gender</th>
                     <th className="py-4 px-6">Income</th>
                     <th className="py-4 px-6">CreditScore</th>
                     <th className="py-4 px-6">Original Decision</th>
                     <th className="py-4 px-6">Bias Confidence</th>
                     <th className="py-4 px-6 text-right">Action</th>
                  </tr>
               </thead>
               <tbody className="text-sm">
                  {paginatedData.map((row) => (
                    <tr key={row.id} className="border-b border-[#e2e7ff] hover:bg-[#faf8ff] transition-colors group">
                       <td className="py-4 px-6 font-semibold text-[#131b2e]">{row.id}</td>
                       <td className="py-4 px-6 text-[#464555]">{row.age}</td>
                       <td className="py-4 px-6 text-[#464555]">{row.gender}</td>
                       <td className="py-4 px-6 text-[#464555]">${row.income.toLocaleString()}</td>
                       <td className="py-4 px-6 text-[#464555]">{row.creditScore}</td>
                       <td className="py-4 px-6">
                           <span className="bg-[#ffdad6] text-[#ba1a1a] px-2 py-1 rounded text-xs font-bold border border-[#ba1a1a]/20">
                             Rejected ✗
                           </span>
                       </td>
                       <td className="py-4 px-6">
                           <span className="bg-[#c3c0ff] text-[#0f0069] px-2 py-1 rounded text-xs font-bold whitespace-nowrap">
                             {row.confidence}
                           </span>
                       </td>
                       <td className="py-4 px-6 text-right">
                           <button 
                             onClick={() => handleReEvaluate(row)}
                             className="text-[#3525cd] font-semibold hover:underline text-sm whitespace-nowrap"
                           >
                               Re-evaluate &rarr;
                           </button>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
            
            {/* Pagination & Export */}
            <div className="p-4 bg-[#f2f3ff] border-t border-[#e2e7ff] flex items-center justify-between">
               <button className="flex items-center gap-2 text-sm font-semibold text-[#464555] hover:text-[#131b2e] transition-colors">
                  <span className="material-symbols-outlined text-sm">download</span> Download Affected List (CSV)
               </button>
               
               <div className="flex items-center space-x-4 text-sm text-[#464555] font-medium">
                  <span>Page {page} of {totalPages}</span>
                  <div className="flex space-x-1">
                     <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="p-1 rounded hover:bg-[#dae2fd] disabled:opacity-50"><span className="material-symbols-outlined">chevron_left</span></button>
                     <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="p-1 rounded hover:bg-[#dae2fd] disabled:opacity-50"><span className="material-symbols-outlined">chevron_right</span></button>
                  </div>
               </div>
            </div>
         </div>
      </div>

      {/* Slide-in Side Panel (Part B) */}
      <div 
        className={`fixed top-16 right-0 h-[calc(100vh-64px)] w-[380px] bg-white border-l border-[#c7c4d8]/30 shadow-2xl transform transition-transform duration-300 z-40 overflow-y-auto ${selectedPerson ? 'translate-x-0' : 'translate-x-full'}`}
      >
         {selectedPerson && (
             <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                   <h3 className="font-headline font-bold text-xl text-[#131b2e]">Re-evaluation</h3>
                   <button onClick={() => setSelectedPerson(null)} className="text-[#464555] hover:text-[#131b2e] text-2xl leading-none">&times;</button>
                </div>
                
                {/* Profile Card */}
                <div className="bg-[#f2f3ff] p-4 rounded-xl mb-6">
                   <p className="text-sm font-bold text-[#3525cd] mb-3">{selectedPerson.id}</p>
                   <div className="grid grid-cols-2 gap-y-3 text-sm">
                      <div><span className="text-[#464555] text-xs block">Age</span><span className="font-semibold">{selectedPerson.age}</span></div>
                      <div><span className="text-[#464555] text-xs block">Gender</span><span className="font-semibold">{selectedPerson.gender}</span></div>
                      <div><span className="text-[#464555] text-xs block">Income</span><span className="font-semibold">${selectedPerson.income.toLocaleString()}</span></div>
                      <div><span className="text-[#464555] text-xs block">CreditScore</span><span className="font-semibold">{selectedPerson.creditScore}</span></div>
                   </div>
                </div>

                {/* Transitions */}
                <div className="space-y-3 mb-8">
                   <div className="bg-[#ffdad6] text-[#93000a] p-3 rounded-lg border border-[#ba1a1a]/20">
                      <span className="font-bold text-xs uppercase tracking-widest block mb-1">REJECTED</span>
                      <span className="text-sm font-medium">Biased Model Score: {selectedPerson.originalScore.toFixed(2)} / 1.00</span>
                   </div>
                   <div className="flex justify-center text-[#c7c4d8]">&darr;</div>
                   <div className="bg-[#dcfce7] text-[#166534] p-3 rounded-lg border border-[#166534]/20">
                      <span className="font-bold text-xs uppercase tracking-widest block mb-1">{selectedPerson.newDecision.toUpperCase()}</span>
                      <span className="text-sm font-medium">Debiased Model Score: {selectedPerson.newScore} / 1.00</span>
                   </div>
                </div>

                {/* Score Bar */}
                <div className="mb-8">
                   <span className="text-xs font-bold text-[#464555] uppercase tracking-widest block mb-2">Score Delta</span>
                   <div className="w-full h-8 bg-[#f2f3ff] rounded-md relative border border-[#e2e7ff]">
                      {/* Old Score Marker */}
                      <div className="absolute top-0 bottom-0 w-1 bg-[#ba1a1a] z-10" style={{ left: `${selectedPerson.originalScore * 100}%` }}></div>
                      {/* New Score Marker */}
                      <div className="absolute top-0 bottom-0 w-1 bg-[#166534] z-20" style={{ left: `${selectedPerson.newScore * 100}%` }}></div>
                      
                      <div className="absolute top-10 left-0 text-[10px] text-[#ba1a1a] font-bold" style={{ left: `calc(${selectedPerson.originalScore * 100}% - 10px)` }}>{selectedPerson.originalScore.toFixed(2)}</div>
                      <div className="absolute -top-5 left-0 text-[10px] text-[#166534] font-bold" style={{ left: `calc(${selectedPerson.newScore * 100}% - 10px)` }}>{selectedPerson.newScore}</div>
                   </div>
                </div>

                {/* Weight Shift Table */}
                <div className="mb-8 mt-12 bg-white border border-[#e2e7ff] rounded-xl overflow-hidden">
                   <table className="w-full text-left text-xs">
                       <thead>
                           <tr className="bg-[#f2f3ff] text-[#464555]">
                               <th className="py-2 px-3 font-semibold">Feature</th>
                               <th className="py-2 px-3 font-semibold">Before</th>
                               <th className="py-2 px-3 font-semibold">After</th>
                           </tr>
                       </thead>
                       <tbody>
                           <tr className="border-t border-[#e2e7ff]">
                               <td className="py-2 px-3 font-medium text-[#131b2e]">Gender weight</td>
                               <td className="py-2 px-3 text-[#464555]">0.42</td>
                               <td className="py-2 px-3 text-[#166534] font-bold">0.00</td>
                           </tr>
                           <tr className="border-t border-[#e2e7ff]">
                               <td className="py-2 px-3 font-medium text-[#131b2e]">CreditScore weight</td>
                               <td className="py-2 px-3 text-[#464555]">0.18</td>
                               <td className="py-2 px-3 text-[#3525cd] font-bold">0.31</td>
                           </tr>
                           <tr className="border-t border-[#e2e7ff]">
                               <td className="py-2 px-3 font-medium text-[#131b2e]">Income weight</td>
                               <td className="py-2 px-3 text-[#464555]">0.15</td>
                               <td className="py-2 px-3 text-[#3525cd] font-bold">0.28</td>
                           </tr>
                       </tbody>
                   </table>
                </div>

                {/* Recommendation Box */}
                <div className="border border-[#3525cd]/50 bg-[#faf8ff] p-4 rounded-xl mb-6">
                   <p className="text-sm text-[#131b2e] leading-relaxed">
                      <strong>Recommendation:</strong> This applicant should be contacted for reconsideration. Their financial profile meets approval criteria when evaluated without demographic bias.
                   </p>
                </div>

                <button 
                  onClick={handleMarkReconsidered}
                  className={`w-full py-4 rounded-xl font-bold font-headline transition-colors flex items-center justify-center gap-2 ${reconsiders[selectedPerson.id] ? 'bg-[#dcfce7] text-[#166534]' : 'bg-[#3525cd] text-white hover:bg-[#4f46e5]'}`}
                >
                  {reconsiders[selectedPerson.id] ? "Marked as Reconsidered ✓" : "Mark as Reconsidered"}
                </button>
             </div>
         )}
      </div>

    </div>
  );
}
