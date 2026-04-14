import React from 'react';
import { LayoutDashboard, FileUp, Activity, Users, ShieldAlert } from 'lucide-react';
import { cn } from '../utils/cn';

const NavItem = ({ icon: Icon, label, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center w-full px-4 py-3 mb-2 rounded-xl transition-all duration-200",
        active 
          ? "bg-surface-lowest shadow-sm text-primary" 
          : "text-on-surface-variant hover:bg-surface-lowest/50 hover:text-on-surface"
      )}
    >
      <Icon className={cn("w-5 h-5 mr-3", active ? "text-primary" : "text-on-surface-variant")} />
      <span className={cn("font-medium text-sm", active ? "font-semibold" : "font-medium")}>
        {label}
      </span>
    </button>
  );
};

export const Sidebar = ({ currentView, setCurrentView }) => {
  const views = [
    { id: 'upload', label: 'Upload & Configure', icon: FileUp },
    { id: 'overview', label: 'Overview & Detection', icon: LayoutDashboard },
    { id: 'metrics', label: 'Bias Audit Report', icon: Activity },
    { id: 'affected', label: 'Affected People', icon: Users },
    { id: 'mitigation', label: 'Remediation', icon: ShieldAlert },
  ];

  return (
    <nav className="w-72 bg-[#f2f3ff] flex flex-col h-screen fixed top-0 left-0">
      <div className="p-8 pb-4">
        <h1 className="font-display font-bold text-2xl text-[#131b2e] flex items-center">
          <span className="w-8 h-8 rounded-lg bg-[#3525cd] text-white flex items-center justify-center mr-3 text-lg">F</span>
          FairLens
        </h1>
        <p className="text-xs text-[#464555] uppercase tracking-wider font-semibold mt-2">
          AI Bias Auditor
        </p>
      </div>

      <div className="flex-1 px-4 pt-4">
        {views.map((view) => (
          <NavItem 
            key={view.id}
            icon={view.icon}
            label={view.label}
            active={currentView === view.id}
            onClick={() => setCurrentView(view.id)}
          />
        ))}
      </div>
      
      <div className="p-6">
        <div className="p-4 bg-white rounded-xl shadow-sm">
          <p className="text-xs text-[#464555] mb-1">Current Dataset</p>
          <p className="text-sm font-semibold text-[#131b2e] truncate">Q2_Lending_Data.csv</p>
          <div className="mt-3 flex items-center">
             <div className="w-2 h-2 rounded-full bg-[#166534] mr-2"></div>
             <span className="text-xs font-medium text-[#166534]">System Ready</span>
          </div>
        </div>
      </div>
    </nav>
  );
};
