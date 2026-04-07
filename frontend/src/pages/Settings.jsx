import React, { useState, useEffect } from 'react';
import { User, Bell, Palette, Shield, Globe } from 'lucide-react';
import { fetchUser } from '../services/api';

export function Settings() {
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
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold dark:text-white tracking-tight">Settings</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 space-y-2">
          <nav className="flex flex-col gap-1">
            {[
              { id: 'profile', label: 'Profile', icon: User, active: true },
              { id: 'notifications', label: 'Notifications', icon: Bell, active: false },
              { id: 'appearance', label: 'Appearance', icon: Palette, active: false },
              { id: 'privacy', label: 'Privacy & Security', icon: Shield, active: false },
              { id: 'language', label: 'Language', icon: Globe, active: false },
            ].map(item => (
              <button
                key={item.id}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${item.active ? 'bg-primary text-white shadow-md shadow-primary/20' : 'text-secondary hover:bg-surface dark:text-slate-400 dark:hover:bg-slate-800'}`}
              >
                <item.icon size={18} />
                <span className="font-medium text-sm">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="lg:col-span-3">
          <div className="glassmorphism p-6 sm:p-8 rounded-2xl border border-white/20 dark:border-slate-800 shadow-sm relative overflow-hidden">
            <h2 className="text-xl font-bold dark:text-white mb-6">Profile Information</h2>
            
            <div className="flex flex-col sm:flex-row gap-6 mb-8 items-start sm:items-center">
              <img 
                src={user.avatar || "https://i.pravatar.cc/150?u=abdelouaheb"} 
                alt="Profile" 
                className="w-24 h-24 rounded-2xl object-cover bg-slate-100 border-4 border-white dark:border-slate-800 shadow-md relative z-10"
              />
              <div className="space-y-2 relative z-10">
                <div className="flex gap-3">
                  <button className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm">
                    Upload new photo
                  </button>
                  <button className="px-4 py-2 bg-surface text-secondary dark:bg-slate-800 dark:text-slate-400 rounded-xl text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                    Remove
                  </button>
                </div>
                <p className="text-sm text-muted-foreground">Recommended size: 400x400px.</p>
              </div>
            </div>

            <form className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium dark:text-white">Full Name</label>
                  <input type="text" defaultValue={user.name || "Student"} className="w-full px-4 py-2.5 bg-surface border-none rounded-xl focus:ring-2 focus:ring-primary/20 transition-all outline-none dark:bg-slate-800 dark:text-white shadow-inner" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium dark:text-white">Email Address</label>
                  <input type="email" defaultValue="student@abdelouaheb.dev" className="w-full px-4 py-2.5 bg-surface border-none rounded-xl focus:ring-2 focus:ring-primary/20 transition-all outline-none dark:bg-slate-800 dark:text-white shadow-inner" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium dark:text-white">Role</label>
                  <input type="text" defaultValue="Student" disabled className="w-full px-4 py-2.5 bg-slate-50 border-none rounded-xl opacity-70 cursor-not-allowed dark:bg-slate-900/50 dark:text-slate-500 shadow-inner" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium dark:text-white">Location</label>
                  <input type="text" defaultValue="Algeria" className="w-full px-4 py-2.5 bg-surface border-none rounded-xl focus:ring-2 focus:ring-primary/20 transition-all outline-none dark:bg-slate-800 dark:text-white shadow-inner" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium dark:text-white">Bio</label>
                <textarea rows={4} defaultValue="Computer Science student passionate about web development and UI/UX." className="w-full px-4 py-2.5 bg-surface border-none rounded-xl focus:ring-2 focus:ring-primary/20 transition-all outline-none resize-none dark:bg-slate-800 dark:text-white shadow-inner"></textarea>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-border dark:border-slate-800">
                <button type="button" className="px-5 py-2.5 text-secondary dark:text-slate-400 font-medium text-sm hover:text-primary dark:hover:text-white transition-colors">
                  Cancel
                </button>
                <button type="button" className="px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
                  Save Changes
                </button>
              </div>
            </form>

            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
