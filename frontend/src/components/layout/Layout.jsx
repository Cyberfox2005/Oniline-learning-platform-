import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';

export function Layout({ children, activeTab, setActiveTab }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-surface dark:bg-slate-950 transition-colors duration-300 font-sans">
      {/* Sidebar for Desktop */}
      <div className="hidden lg:block sticky top-0 h-screen">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 lg:hidden backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div className="w-64 h-full bg-white dark:bg-slate-900" onClick={e => e.stopPropagation()}>
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <Topbar onMenuClick={() => setIsMobileMenuOpen(true)} />
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-6 lg:p-10">
          <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
            {children}
          </div>
        </main>
      </div>
      
      {/* Mobile Bottom Navigation (Optional but recommended in requirements) */}
      <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] glassmorphism p-2 rounded-2xl flex items-center justify-around z-40 shadow-2xl border border-white/20">
        <div className="flex items-center justify-around w-full">
          {/* We could add simplified nav items here */}
        </div>
      </div>
    </div>
  );
}
