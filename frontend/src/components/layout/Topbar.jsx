import React, { useState, useEffect } from 'react';
import { Search, Bell, Moon, Sun, ChevronDown, Menu } from 'lucide-react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { mockUser } from '../../data/mockData';
import { cn } from '../../utils/utils';

export function Topbar({ onMenuClick }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <header className="h-20 bg-white/80 backdrop-blur-md border-b border-border px-6 flex items-center justify-between sticky top-0 z-30 dark:bg-slate-900/80 dark:border-slate-800">
      <div className="flex items-center gap-4 flex-1">
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg hover:bg-surface dark:hover:bg-slate-800"
        >
          <Menu size={20} />
        </button>
        
        <div className="relative max-w-md w-full hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <input 
            type="text" 
            placeholder="Search for courses, lessons..."
            className="w-full pl-10 pr-4 py-2.5 bg-surface border-none rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all outline-none text-sm dark:bg-slate-800 dark:text-white"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button 
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="p-2.5 rounded-xl bg-surface hover:bg-slate-100 transition-colors text-secondary dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button className="relative p-2.5 rounded-xl bg-surface hover:bg-slate-100 transition-colors text-secondary dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700 outline-none">
              <Bell size={20} />
              <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full dark:border-slate-800"></span>
            </button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content 
              className="w-80 bg-white rounded-2xl p-4 shadow-2xl border border-border animate-in fade-in zoom-in duration-200 z-50 dark:bg-slate-900 dark:border-slate-800"
              sideOffset={5}
              align="end"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-sm dark:text-white">Notifications</h3>
                <button className="text-xs text-primary font-medium hover:underline">Mark all as read</button>
              </div>
              <div className="space-y-1 max-h-80 overflow-y-auto pr-1">
                {[
                  { title: "New Assignment Posted", desc: "Advanced UI Design - Module 3", time: "2 min ago", unread: true },
                  { title: "Grade Updated", desc: "Your final project has been graded. Great job!", time: "1 hr ago", unread: true },
                  { title: "Course Announcement", desc: "Class rescheduled to Thursday.", time: "Yesterday", unread: false },
                ].map((notif, idx) => (
                  <div key={idx} className={cn(
                    "p-3 rounded-xl transition-colors cursor-pointer flex gap-3",
                    notif.unread ? "bg-primary/5 dark:bg-primary/10 hover:bg-primary/10 dark:hover:bg-primary/20" : "hover:bg-surface dark:hover:bg-slate-800"
                  )}>
                    <div className={cn("w-2 h-2 mt-1.5 rounded-full shrink-0", notif.unread ? "bg-primary" : "bg-transparent")} />
                    <div>
                      <p className={cn("text-sm font-medium", notif.unread ? "dark:text-white text-slate-900" : "text-secondary dark:text-slate-400")}>{notif.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{notif.desc}</p>
                      <p className="text-xs font-semibold text-primary/70 mt-1">{notif.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>

        <div className="h-8 w-[1px] bg-border dark:bg-slate-800 mx-2 hidden sm:block"></div>

        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button className="flex items-center gap-3 p-1 rounded-xl hover:bg-surface transition-colors dark:hover:bg-slate-800 outline-none">
              <img 
                src={mockUser.avatar} 
                alt="Profile" 
                className="w-10 h-10 rounded-xl object-cover bg-slate-100"
              />
              <div className="hidden sm:block text-left">
                <p className="text-sm font-semibold dark:text-white truncate max-w-[100px]">{mockUser.name}</p>
                <p className="text-xs text-muted-foreground">Student</p>
              </div>
              <ChevronDown size={16} className="text-muted-foreground" />
            </button>
          </DropdownMenu.Trigger>

          <DropdownMenu.Portal>
            <DropdownMenu.Content 
              className="min-w-[200px] bg-white rounded-2xl p-2 shadow-2xl border border-border animate-in fade-in zoom-in duration-200 z-50 dark:bg-slate-900 dark:border-slate-800"
              sideOffset={5}
            >
              <DropdownMenu.Label className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                My Account
              </DropdownMenu.Label>
              <DropdownMenu.Item className="flex items-center gap-2 px-3 py-2.5 text-sm rounded-lg hover:bg-surface dark:hover:bg-slate-800 outline-none cursor-pointer transition-colors dark:text-white">
                Profile
              </DropdownMenu.Item>
              <DropdownMenu.Item className="flex items-center gap-2 px-3 py-2.5 text-sm rounded-lg hover:bg-surface dark:hover:bg-slate-800 outline-none cursor-pointer transition-colors dark:text-white">
                Billing
              </DropdownMenu.Item>
              <DropdownMenu.Separator className="h-[1px] bg-border my-1 dark:bg-slate-800" />
              <DropdownMenu.Item className="flex items-center gap-2 px-3 py-2.5 text-sm rounded-lg hover:bg-red-50 text-red-600 outline-none cursor-pointer transition-colors dark:hover:bg-red-900/20">
                Logout
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>
    </header>
  );
}
