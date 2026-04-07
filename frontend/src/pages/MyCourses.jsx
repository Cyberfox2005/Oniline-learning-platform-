import React, { useState, useEffect } from 'react';
import { CourseCard } from '../components/dashboard/CourseCard';
import { fetchCourses } from '../services/api';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';

export function MyCourses({ onCourseClick }) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'Development', 'Design', 'Marketing', 'Business'];

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const data = await fetchCourses();
        setCourses(data);
      } catch (error) {
        console.error('Failed to load courses:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, []);

  const filteredCourses = filter === 'All' 
    ? courses 
    : courses.filter(course => course.category === filter);

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-bold dark:text-white">My Courses</h2>
          <p className="text-muted-foreground mt-1 text-sm">You have {courses.length} active courses in your library</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <input 
              type="text" 
              placeholder="Search courses..."
              className="pl-10 pr-4 py-2 bg-white border border-border rounded-xl focus:ring-2 focus:ring-primary/20 transition-all outline-none text-sm dark:bg-slate-900 dark:border-slate-800 dark:text-white"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-border rounded-xl font-bold text-sm hover:bg-surface transition-all dark:bg-slate-900 dark:border-slate-800 dark:text-white">
            <SlidersHorizontal size={18} />
            Filters
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-6 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap ${
              filter === cat 
                ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                : 'bg-white border border-border text-secondary hover:bg-surface dark:bg-slate-900 dark:border-slate-800 dark:text-slate-400'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCourses.map((course) => (
          <CourseCard 
            key={course.id} 
            course={course} 
            onClick={onCourseClick}
          />
        ))}
        
        {/* Empty State / Recommended Slot */}
        <div className="border-2 border-dashed border-border rounded-3xl p-8 flex flex-col items-center justify-center text-center group cursor-pointer hover:border-primary transition-all dark:border-slate-800">
          <div className="w-16 h-16 bg-surface rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-all dark:bg-slate-800">
            <Filter className="text-muted-foreground group-hover:text-primary transition-all" size={24} />
          </div>
          <h4 className="font-bold dark:text-white">Browse More</h4>
          <p className="text-xs text-muted-foreground mt-2 max-w-[150px]">Discover new topics that match your interests</p>
        </div>
      </div>
    </div>
  );
}
