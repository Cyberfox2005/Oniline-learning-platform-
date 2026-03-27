import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  FileText, 
  GraduationCap, 
  Users, 
  ChevronLeft, 
  ChevronRight,
  LogOut,
  Settings,
  Hexagon
} from 'lucide-react';
import { cn } from '../../utils/utils';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard' },
  { icon: BookOpen, label: 'My Courses', id: 'courses' },
  { icon: FileText, label: 'Assignments', id: 'assignments' },
  { icon: GraduationCap, label: 'Exams', id: 'exams' },
  { icon: Users, label: 'Community', id: 'community' },
];

export function Sidebar({ activeTab, setActiveTab }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside 
      className={cn(
        "h-screen bg-white border-r border-border transition-all duration-300 flex flex-col sticky top-0 z-40 dark:bg-slate-900 dark:border-slate-800",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      <div className="p-6 flex items-center justify-between">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-primary/20">
              <Hexagon className="text-white w-5 h-5 fill-white/20" />
            </div>
            <span className="font-bold text-xl tracking-tight dark:text-white">Abdelouaheb<span className="text-primary">Dev</span></span>
          </div>
        )}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 rounded-lg bg-surface hover:bg-slate-100 transition-colors dark:bg-slate-800 dark:hover:bg-slate-700"
        >
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group relative",
              activeTab === item.id 
                ? "bg-primary text-white shadow-lg shadow-primary/20" 
                : "text-secondary hover:bg-surface hover:text-primary dark:text-slate-400 dark:hover:bg-slate-800"
            )}
          >
            <item.icon size={20} className={cn(
              "min-w-[20px]",
              activeTab === item.id ? "text-white" : "group-hover:text-primary transition-colors"
            )} />
            {!isCollapsed && <span className="font-medium">{item.label}</span>}
            
            {isCollapsed && (
              <div className="absolute left-14 bg-slate-900 text-white px-2 py-1 rounded text-xs invisible group-hover:visible whitespace-nowrap z-50">
                {item.label}
              </div>
            )}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-border dark:border-slate-800 space-y-2">
        <button 
          onClick={() => setActiveTab('settings')}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group relative",
            activeTab === 'settings' 
              ? "bg-primary text-white shadow-lg shadow-primary/20" 
              : "text-secondary hover:bg-surface hover:text-primary dark:text-slate-400 dark:hover:bg-slate-800"
          )}
        >
          <Settings size={20} className={cn(
            "min-w-[20px]",
            activeTab === 'settings' ? "text-white" : "group-hover:text-primary transition-colors"
          )} />
          {!isCollapsed && <span className="font-medium">Settings</span>}
          
          {isCollapsed && (
            <div className="absolute left-14 bg-slate-900 text-white px-2 py-1 rounded text-xs invisible group-hover:visible whitespace-nowrap z-50">
              Settings
            </div>
          )}
        </button>
        <button className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-all dark:hover:bg-red-900/20">
          <LogOut size={20} />
          {!isCollapsed && <span className="font-medium">Logout</span>}
        </button>
      </div>
    </aside>
  );
}
