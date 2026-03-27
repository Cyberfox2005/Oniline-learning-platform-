import React from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDown, PlayCircle, CheckCircle2, Lock } from 'lucide-react';
import { cn } from '../../utils/utils';

export function LessonAccordion({ lessons, currentLessonId, onLessonClick }) {
  return (
    <Accordion.Root 
      className="w-full space-y-2" 
      type="single" 
      defaultValue="item-1" 
      collapsible
    >
      <Accordion.Item value="item-1" className="border border-border rounded-2xl overflow-hidden dark:border-slate-800">
        <Accordion.Header>
          <Accordion.Trigger className="flex items-center justify-between w-full p-4 bg-surface hover:bg-slate-100 transition-all dark:bg-slate-900 dark:hover:bg-slate-800 outline-none group">
            <div className="flex flex-col text-left">
              <span className="text-sm font-bold dark:text-white">Module 1: Fundamentals</span>
              <span className="text-xs text-muted-foreground">4 Lessons • 45m</span>
            </div>
            <ChevronDown size={18} className="text-muted-foreground group-data-[state=open]:rotate-180 transition-transform" />
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content className="animate-in slide-in-from-top-2 duration-300">
          <div className="p-2 space-y-1 bg-white dark:bg-slate-950">
            {lessons.map((lesson) => (
              <button
                key={lesson.id}
                onClick={() => onLessonClick(lesson)}
                className={cn(
                  "w-full flex items-center justify-between p-3 rounded-xl transition-all group",
                  currentLessonId === lesson.id 
                    ? "bg-primary/10 text-primary border border-primary/20" 
                    : "hover:bg-surface dark:hover:bg-slate-900"
                )}
              >
                <div className="flex items-center gap-3">
                  {lesson.completed ? (
                    <CheckCircle2 size={18} className="text-green-500" />
                  ) : (
                    <PlayCircle size={18} className={cn(
                      currentLessonId === lesson.id ? "text-primary" : "text-muted-foreground group-hover:text-primary"
                    )} />
                  )}
                  <div className="flex flex-col text-left">
                    <span className={cn(
                      "text-sm font-medium transition-colors",
                      currentLessonId === lesson.id ? "text-primary" : "text-foreground dark:text-slate-300"
                    )}>
                      {lesson.title}
                    </span>
                    <span className="text-[10px] text-muted-foreground">{lesson.duration}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </Accordion.Content>
      </Accordion.Item>

      <Accordion.Item value="item-2" className="border border-border rounded-2xl overflow-hidden dark:border-slate-800 opacity-60">
        <Accordion.Header>
          <Accordion.Trigger className="flex items-center justify-between w-full p-4 bg-surface dark:bg-slate-900 outline-none">
            <div className="flex flex-col text-left">
              <span className="text-sm font-bold dark:text-white flex items-center gap-2">
                Module 2: Advanced Techniques
                <Lock size={14} className="text-muted-foreground" />
              </span>
              <span className="text-xs text-muted-foreground">6 Lessons • 1h 20m</span>
            </div>
            <ChevronDown size={18} className="text-muted-foreground" />
          </Accordion.Trigger>
        </Accordion.Header>
      </Accordion.Item>
    </Accordion.Root>
  );
}
