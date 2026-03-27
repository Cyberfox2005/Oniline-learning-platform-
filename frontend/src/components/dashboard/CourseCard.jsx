import React from 'react';
import { Clock, Play, MoreVertical } from 'lucide-react';

export function CourseCard({ course, onClick }) {
  return (
    <div 
      onClick={() => onClick(course)}
      className="group bg-white rounded-3xl border border-border p-5 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 cursor-pointer dark:bg-slate-900 dark:border-slate-800"
    >
      <div className="relative aspect-video rounded-2xl overflow-hidden mb-5">
        <img 
          src={course.thumbnail} 
          alt={course.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 duration-300">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary transform scale-50 group-hover:scale-100 transition-transform duration-500 shadow-xl">
            <Play size={24} fill="currentColor" />
          </div>
        </div>
        <div className="absolute top-3 right-3 py-1 px-3 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-wider text-primary shadow-sm dark:bg-slate-900/90">
          {course.instructor}
        </div>
      </div>

      <div className="flex items-start justify-between mb-2">
        <h3 className="font-bold text-lg dark:text-white line-clamp-1 group-hover:text-primary transition-colors">
          {course.title}
        </h3>
        <button className="text-muted-foreground hover:text-foreground">
          <MoreVertical size={18} />
        </button>
      </div>

      <div className="flex items-center gap-2 text-sm text-secondary mb-4 dark:text-slate-400">
        <Clock size={14} />
        <span>{course.timeRemaining}</span>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs font-semibold">
          <span className="text-secondary dark:text-slate-500 uppercase tracking-tighter">Course Progress</span>
          <span className="text-primary">{course.progress}%</span>
        </div>
        <div className="relative h-2 w-full bg-surface rounded-full overflow-hidden dark:bg-slate-800">
          <div 
            className="absolute top-0 left-0 h-full bg-primary rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${course.progress}%` }}
          />
        </div>
        
        <button className="w-full py-3 bg-surface text-primary font-bold rounded-xl hover:bg-primary hover:text-white transition-all duration-300 dark:bg-slate-800 dark:text-slate-300 group-hover:shadow-lg group-hover:shadow-primary/20">
          Continue Lesson
        </button>
      </div>
    </div>
  );
}
