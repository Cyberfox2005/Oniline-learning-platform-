import React, { useState, useEffect } from 'react';
import { fetchUser } from '../../services/api';
import { PlayCircle, ArrowRight } from 'lucide-react';

export function Hero() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const data = await fetchUser();
        setUser(data);
      } catch (error) {
        console.error('Failed to load user:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  if (loading || !user) {
    return <div className="bg-primary rounded-3xl p-8 lg:p-12 text-white shadow-2xl shadow-primary/20 animate-pulse">
      <div className="h-8 bg-white/20 rounded mb-4 w-64"></div>
      <div className="h-4 bg-white/20 rounded mb-8 w-96"></div>
      <div className="flex gap-4">
        <div className="h-12 bg-white/20 rounded-xl w-40"></div>
        <div className="h-12 bg-white/20 rounded-xl w-32"></div>
      </div>
    </div>;
  }
  return (
    <div className="relative overflow-hidden bg-primary rounded-3xl p-8 lg:p-12 text-white shadow-2xl shadow-primary/20 animate-in fade-in zoom-in duration-1000">
      <div className="relative z-10 max-w-2xl">
        <h1 className="text-3xl lg:text-5xl font-bold mb-4 tracking-tight">
          Welcome back, {user.name}! 👋
        </h1>
        <p className="text-primary-foreground/80 text-lg mb-8 leading-relaxed">
          You've completed <span className="font-bold text-white">{user.progress}%</span> of your weekly goal. 
          Keep up the great work and reach your milestones!
        </p>
        
        <div className="flex flex-wrap gap-4">
          <button className="flex items-center gap-2 bg-white text-primary px-6 py-3 rounded-xl font-bold hover:bg-slate-50 transition-all shadow-lg hover:-translate-y-1">
            <PlayCircle size={20} />
            Continue Learning
          </button>
          <button className="flex items-center gap-2 bg-primary-foreground/10 text-white px-6 py-3 rounded-xl font-bold hover:bg-primary-foreground/20 transition-all backdrop-blur-sm">
            View Schedule
            <ArrowRight size={20} />
          </button>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-64 h-64 bg-indigo-400/20 rounded-full blur-2xl"></div>
      
      {/* Background Graphic (Abstract) */}
      <div className="absolute right-12 bottom-12 hidden lg:block opacity-20 transform rotate-12">
        <div className="w-48 h-48 border-8 border-white rounded-3xl"></div>
        <div className="w-48 h-48 border-8 border-white rounded-3xl absolute -top-12 -left-12 opacity-50"></div>
      </div>
    </div>
  );
}
