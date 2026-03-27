import React, { useState } from 'react';
import { LessonAccordion } from './LessonAccordion';
import { ChevronLeft, Maximize, Settings, Volume2, Share2, Heart } from 'lucide-react';

export function VideoPlayer({ course, onBack }) {
  const [currentLesson, setCurrentLesson] = useState(course.lessons[0]);

  return (
    <div className="flex flex-col lg:flex-row h-full gap-8 animate-in fade-in slide-in-from-right-4 duration-500">
      {/* Video Side (70%) */}
      <div className="flex-1 space-y-6">
        <div className="flex items-center gap-4 mb-2">
          <button 
            onClick={onBack}
            className="p-2 rounded-xl bg-white border border-border hover:bg-surface transition-all dark:bg-slate-900 dark:border-slate-800 dark:text-white"
          >
            <ChevronLeft size={20} />
          </button>
          <div>
            <h2 className="text-xl font-bold dark:text-white">{course.title}</h2>
            <p className="text-xs text-muted-foreground">Instructed by {course.instructor}</p>
          </div>
        </div>

        <div className="relative aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl group">
          {/* Mock Video UI */}
          <div className="absolute inset-0 flex items-center justify-center">
            <img 
              src={course.thumbnail} 
              alt="Video Overlay" 
              className="w-full h-full object-cover opacity-40 blur-sm"
            />
            <div className="w-20 h-20 bg-primary/90 text-white rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform shadow-2xl">
              <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
            </div>
          </div>

          {/* Controls Overlay */}
          <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-black/80 to-transparent p-6 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="flex items-center gap-4 text-white">
              <Volume2 size={20} />
              <div className="text-xs font-medium">12:45 / 25:00</div>
            </div>
            <div className="flex-1 mx-6 h-1 w-full bg-white/30 rounded-full relative overflow-hidden">
               <div className="absolute top-0 left-0 h-full w-1/2 bg-primary"></div>
            </div>
            <div className="flex items-center gap-4 text-white">
              <Settings size={20} />
              <Maximize size={20} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-border dark:bg-slate-900 dark:border-slate-800">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold dark:text-white">{currentLesson.title}</h3>
            <div className="flex items-center gap-2">
              <button className="p-2.5 rounded-xl border border-border hover:bg-surface dark:border-slate-700 dark:text-white transition-colors">
                <Share2 size={20} />
              </button>
              <button className="p-2.5 rounded-xl border border-border hover:bg-surface dark:border-slate-700 dark:text-white transition-colors">
                <Heart size={20} />
              </button>
            </div>
          </div>
          <p className="text-secondary leading-relaxed dark:text-slate-400">
            In this lesson, we will explore the advanced concepts of {currentLesson.title.toLowerCase()} and how they apply to modern web development. 
            We'll look at real-world examples and best practices for creating scalable and maintainable applications.
          </p>
        </div>
      </div>

      {/* Sidebar Side (30%) */}
      <div className="lg:w-96 flex flex-col h-full gap-6">
        <div className="bg-white rounded-3xl border border-border p-6 dark:bg-slate-900 dark:border-slate-800 flex flex-col h-full">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3 text-sm font-bold">
              <span className="dark:text-white uppercase tracking-wider text-xs">Overall Progress</span>
              <span className="text-primary">{course.progress}%</span>
            </div>
            <div className="h-1.5 w-full bg-surface dark:bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary" 
                style={{ width: `${course.progress}%` }}
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto pr-1 custom-scrollbar">
            <h4 className="font-bold text-sm mb-4 dark:text-white uppercase tracking-tighter">Course Content</h4>
            <LessonAccordion 
              lessons={course.lessons} 
              currentLessonId={currentLesson.id}
              onLessonClick={(l) => setCurrentLesson(l)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
