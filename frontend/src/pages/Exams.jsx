import React from 'react';
import { exams } from '../data/mockData';
import { Calendar, Clock, Award, ChevronRight, AlertCircle, FileText } from 'lucide-react';
import { cn } from '../utils/utils';

export function Exams() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold dark:text-white">Examination Schedule</h2>
          <p className="text-muted-foreground mt-1 text-sm">Prepare for your upcoming assessments</p>
        </div>
        <div className="bg-amber-50 border border-amber-200 p-3 rounded-2xl flex items-center gap-3 dark:bg-amber-900/20 dark:border-amber-900/50">
          <AlertCircle className="text-amber-600" size={20} />
          <p className="text-xs font-bold text-amber-700 dark:text-amber-400">1 Upcoming Exam this week</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-xl font-bold dark:text-white flex items-center gap-2">
            <Calendar size={20} className="text-primary" />
            Upcoming Exams
          </h3>
          
          <div className="space-y-4">
            {exams.filter(e => e.status !== 'Completed').map(exam => (
              <div key={exam.id} className="bg-white rounded-3xl border border-border p-6 hover:shadow-xl transition-all dark:bg-slate-900 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6 group">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-surface rounded-2xl flex flex-col items-center justify-center dark:bg-slate-800">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase">{new Date(exam.date).toLocaleString('default', { month: 'short' })}</span>
                    <span className="text-xl font-bold dark:text-white">{new Date(exam.date).getDate()}</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg dark:text-white group-hover:text-primary transition-colors">{exam.title}</h4>
                    <div className="flex items-center gap-4 mt-1">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Clock size={14} />
                        {exam.duration}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <FileText size={14} />
                        {exam.type}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "px-4 py-1.5 rounded-xl text-xs font-bold",
                    exam.status === 'Upcoming' ? "bg-primary/10 text-primary" : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                  )}>
                    {exam.status}
                  </div>
                  <button className="p-3 bg-surface rounded-xl hover:bg-primary hover:text-white transition-all dark:bg-slate-800">
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-bold dark:text-white flex items-center gap-2">
            <Award size={20} className="text-primary" />
            Recent Results
          </h3>
          
          <div className="space-y-4">
            {exams.filter(e => e.status === 'Completed').map(exam => (
              <div key={exam.id} className="bg-white rounded-3xl border border-border p-6 dark:bg-slate-900 dark:border-slate-800">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="font-bold text-sm dark:text-white">{exam.title}</h4>
                  <span className="text-xl font-bold text-primary">{exam.score}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                  <Calendar size={14} />
                  Completed on {exam.date}
                </div>
                <button className="w-full py-2.5 bg-surface text-secondary text-xs font-bold rounded-xl hover:bg-slate-100 transition-all dark:bg-slate-800 dark:text-slate-300">
                  Review Paper
                </button>
              </div>
            ))}
            
            <div className="bg-primary/5 border border-primary/20 rounded-3xl p-6 text-center">
              <p className="text-sm font-medium text-primary mb-2">Academic Standing</p>
              <h4 className="text-3xl font-bold text-primary">GPA 3.8</h4>
              <p className="text-[10px] text-primary/70 uppercase tracking-widest mt-2 font-bold">Top 5% of Class</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
