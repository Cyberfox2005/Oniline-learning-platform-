import React, { useState, useEffect } from 'react';
import { Hero } from '../components/dashboard/Hero';
import { CourseCard } from '../components/dashboard/CourseCard';
import { BentoGrid } from '../components/dashboard/BentoGrid';
import { fetchCourses, fetchRecentActivity } from '../services/api';
import { Activity, ArrowRight } from 'lucide-react';

export function Dashboard({ onCourseClick }) {
  const [courses, setCourses] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [coursesData, activityData] = await Promise.all([
          fetchCourses(),
          fetchRecentActivity()
        ]);
        setCourses(coursesData);
        setRecentActivity(activityData);
      } catch (error) {
        console.error('Failed to load dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }
  return (
    <div className="space-y-10">
      <Hero />
      
      <BentoGrid />

      <div>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold dark:text-white">Active Courses</h2>
            <p className="text-muted-foreground text-sm">Pick up where you left off</p>
          </div>
          <button className="flex items-center gap-2 text-primary font-bold hover:underline group">
            Browse All Courses
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <CourseCard 
              key={course.id} 
              course={course} 
              onClick={onCourseClick}
            />
          ))}
        </div>
      </div>

      {/* Recent Activity Feed */}
      <div className="bg-white rounded-3xl border border-border p-8 dark:bg-slate-900 dark:border-slate-800">
        <h4 className="font-bold text-lg mb-8 dark:text-white flex items-center gap-2">
          <Activity size={20} className="text-primary" />
          Recent Activity
        </h4>
        <div className="space-y-6">
          {recentActivity.map((activity, i) => (
            <div key={activity.id} className="relative pl-8 before:absolute before:left-0 before:top-2 before:w-3 before:h-3 before:bg-primary/20 before:rounded-full before:border-2 before:border-primary">
              {i !== recentActivity.length - 1 && (
                <div className="absolute left-[5px] top-6 w-[2px] h-8 bg-border dark:bg-slate-800" />
              )}
              <p className="text-sm font-medium dark:text-white">{activity.text}</p>
              <p className="text-xs text-muted-foreground">{activity.time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
