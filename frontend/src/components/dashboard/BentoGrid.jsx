import React, { useState, useEffect } from 'react';
import { Flame, Award, Clock, Calendar } from 'lucide-react';
import { fetchUser, fetchUpcomingDeadlines } from '../../services/api';
import { cn } from '../../utils/utils';

export function BentoGrid() {
  const [user, setUser] = useState(null);
  const [upcomingDeadlines, setUpcomingDeadlines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [userData, deadlinesData] = await Promise.all([
          fetchUser(),
          fetchUpcomingDeadlines()
        ]);
        setUser(userData);
        setUpcomingDeadlines(deadlinesData);
      } catch (error) {
        console.error('Failed to load bento data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading || !user) {
    return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
      <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-border dark:bg-slate-900 dark:border-slate-800 animate-pulse">
            <div className="w-12 h-12 bg-gray-200 rounded-2xl mb-4"></div>
            <div className="h-4 bg-gray-200 rounded mb-1"></div>
            <div className="h-6 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
      <div className="bg-white p-6 rounded-3xl border border-border dark:bg-slate-900 dark:border-slate-800 animate-pulse">
        <div className="h-6 bg-gray-200 rounded mb-6"></div>
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-16 bg-gray-200 rounded-2xl"></div>
          ))}
        </div>
      </div>
    </div>;
  }

  const stats = [
    { label: "Hours Studied", value: user.stats.hoursStudied, icon: Clock, color: "bg-blue-50 text-blue-600 dark:bg-blue-900/20" },
    { label: "Certificates", value: user.stats.certificates, icon: Award, color: "bg-amber-50 text-amber-600 dark:bg-amber-900/20" },
    { label: "Day Streak", value: user.stats.streak, icon: Flame, color: "bg-orange-50 text-orange-600 dark:bg-orange-900/20" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
      {/* Right side widgets or stats */}
      <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-border dark:bg-slate-900 dark:border-slate-800 hover:shadow-xl transition-all">
            <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-4", stat.color)}>
              <stat.icon size={24} />
            </div>
            <p className="text-sm font-medium text-muted-foreground mb-1">{stat.label}</p>
            <h4 className="text-2xl font-bold dark:text-white">{stat.value}</h4>
          </div>
        ))}
        
        {/* Calendar/Schedule Widget (Simulated) */}
        <div className="sm:col-span-3 bg-white p-6 rounded-3xl border border-border dark:bg-slate-900 dark:border-slate-800 h-64 relative overflow-hidden group">
          <div className="flex items-center justify-between mb-6">
            <h4 className="font-bold text-lg dark:text-white flex items-center gap-2">
              <Calendar size={20} className="text-primary" />
               Weekly Schedule
            </h4>
            <button className="text-xs text-primary font-bold hover:underline">View All</button>
          </div>
          
          <div className="grid grid-cols-7 gap-2 overflow-hidden">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
              <div key={day} className="flex flex-col items-center gap-3">
                <span className="text-[10px] font-bold text-muted-foreground uppercase">{day}</span>
                <div className={cn(
                  "w-full aspect-square rounded-xl flex items-center justify-center transition-all duration-500",
                  i === 3 ? "bg-primary text-white shadow-lg" : "bg-surface dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700"
                )}>
                  <span className="text-sm font-bold">{24 + i}</span>
                </div>
                {i % 2 === 0 && <div className="w-1.5 h-1.5 bg-primary rounded-full" />}
              </div>
            ))}
          </div>

          <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
        </div>
      </div>

      {/* Upcoming Deadlines Widget */}
      <div className="bg-white p-6 rounded-3xl border border-border dark:bg-slate-900 dark:border-slate-800 lg:col-span-1">
        <h4 className="font-bold text-lg mb-6 dark:text-white">Upcoming Deadlines</h4>
        <div className="space-y-4">
          {upcomingDeadlines.map((deadline) => (
            <div key={deadline.id} className="flex items-start gap-4 p-4 rounded-2xl bg-surface dark:bg-slate-800 group hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
              <div className={cn(
                "min-w-[10px] h-10 w-1 bg-primary rounded-full mt-1 transition-all group-hover:h-12",
                deadline.urgent ? "bg-red-500 animate-pulse" : "bg-primary"
              )} />
              <div>
                <p className="font-bold text-sm dark:text-white line-clamp-1">{deadline.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{deadline.date}</p>
                <div className="inline-block mt-2 px-2 py-0.5 bg-white dark:bg-slate-900 rounded text-[10px] font-bold text-secondary dark:text-slate-400">
                  {deadline.type}
                </div>
              </div>
            </div>
          ))}
          <button className="w-full py-4 mt-2 border-2 border-dashed border-border dark:border-slate-800 rounded-2xl text-sm font-bold text-muted-foreground hover:border-primary hover:text-primary transition-all">
            + Add Reminder
          </button>
        </div>
      </div>
    </div>
  );
}
