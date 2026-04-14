import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { calculateAverages } from '../utils/auditLogic';

export default function MetricsView({ dataset }) {
  const genderData = calculateAverages(dataset, 'gender');
  const ethnicityData = calculateAverages(dataset, 'ethnicity');
  const ageData = calculateAverages(dataset, 'ageGroup');

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-[#f2f3ff]">
          <p className="font-bold text-[#131b2e] mb-2">{label}</p>
          <p className="text-sm text-[#3525cd]">Approval Rate: <span className="font-bold">{payload[0].value.toFixed(1)}%</span></p>
          <p className="text-xs text-[#464555] mt-1">Total Group Size: {payload[0].payload.total}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="max-w-5xl mx-auto">
      <header className="mb-12">
        <p className="text-sm font-bold uppercase tracking-widest text-[#464555] mb-2">Deep Dive</p>
        <h2 className="text-5xl font-display font-extrabold text-[#131b2e]">Metrics Report</h2>
      </header>

      <div className="space-y-12">
        
        {/* Gender Breakdown */}
        <section className="bg-white p-8 rounded-2xl shadow-[0_12px_32px_-4px_rgba(19,27,46,0.04)]">
          <h3 className="text-2xl font-display font-bold mb-8 text-[#131b2e]">Approval Rate by Gender</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={genderData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#c7c4d8" opacity={0.3} />
                <XAxis dataKey="name" tick={{fill: '#464555', fontWeight: 600}} axisLine={false} tickLine={false} />
                <YAxis tick={{fill: '#464555'}} axisLine={false} tickLine={false} tickFormatter={(val) => `${val}%`} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="approvalRate" fill="#4f46e5" radius={[6, 6, 0, 0]} maxBarSize={60} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Ethnicity Breakdown */}
        <section className="bg-white p-8 rounded-2xl shadow-[0_12px_32px_-4px_rgba(19,27,46,0.04)]">
          <h3 className="text-2xl font-display font-bold mb-8 text-[#131b2e]">Approval Rate by Ethnicity</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ethnicityData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#c7c4d8" opacity={0.3} />
                <XAxis dataKey="name" tick={{fill: '#464555', fontWeight: 600}} axisLine={false} tickLine={false} />
                <YAxis tick={{fill: '#464555'}} axisLine={false} tickLine={false} tickFormatter={(val) => `${val}%`} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="approvalRate" fill="#3525cd" radius={[6, 6, 0, 0]} maxBarSize={60} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Age Breakdown */}
        <section className="bg-white p-8 rounded-2xl shadow-[0_12px_32px_-4px_rgba(19,27,46,0.04)]">
          <h3 className="text-2xl font-display font-bold mb-8 text-[#131b2e]">Approval Rate by Age Group</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ageData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#c7c4d8" opacity={0.3} />
                <XAxis dataKey="name" tick={{fill: '#464555', fontWeight: 600}} axisLine={false} tickLine={false} />
                <YAxis tick={{fill: '#464555'}} axisLine={false} tickLine={false} tickFormatter={(val) => `${val}%`} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="approvalRate" fill="#818cf8" radius={[6, 6, 0, 0]} maxBarSize={60} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

      </div>
    </div>
  );
}
