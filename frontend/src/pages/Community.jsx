import React from 'react';
import { communityPosts } from '../data/mockData';
import { MessageSquare, Heart, Share2, Users, Flame, Hash } from 'lucide-react';

export function Community() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-bold dark:text-white flex items-center gap-3">
            <Users className="text-primary" size={32} />
            Community Feed
          </h2>
          <p className="text-muted-foreground mt-1 text-sm">Connect with over 1,200 students worldwide</p>
        </div>
        <button className="px-6 py-3 bg-primary text-white font-bold rounded-2xl shadow-lg shadow-primary/25 hover:-translate-y-1 transition-all">
          Create New Post
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1 space-y-6 hidden lg:block">
          <div className="bg-white rounded-3xl border border-border p-6 dark:bg-slate-900 dark:border-slate-800">
            <h4 className="font-bold text-sm mb-4 dark:text-white uppercase tracking-tighter">Popular Topics</h4>
            <div className="space-y-2">
              {['#ReactTips', '#FigmaUI', '#JobSearch', '#Showcase'].map(tag => (
                <button key={tag} className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-secondary hover:bg-surface hover:text-primary transition-all dark:text-slate-400 dark:hover:bg-slate-800">
                  <Hash size={16} />
                  {tag}
                </button>
              ))}
            </div>
          </div>
          
          <div className="bg-primary p-6 rounded-3xl text-white shadow-xl shadow-primary/20">
            <Flame size={32} className="mb-4" />
            <h4 className="font-bold mb-2">Trending Challenge</h4>
            <p className="text-xs opacity-80 leading-relaxed mb-4">Build a custom React hook for authentication in under 30 minutes.</p>
            <button className="w-full py-2 bg-white text-primary rounded-xl text-xs font-bold">Join Now</button>
          </div>
        </div>

        <div className="lg:col-span-3 space-y-6">
          {communityPosts.map((post) => (
            <div key={post.id} className="bg-white rounded-3xl border border-border p-6 dark:bg-slate-900 dark:border-slate-800 hover:border-primary/30 transition-colors">
              <div className="flex items-center gap-4 mb-6">
                <img src={post.avatar} alt={post.user} className="w-12 h-12 rounded-2xl object-cover bg-slate-100" />
                <div>
                  <h4 className="font-bold dark:text-white">{post.user}</h4>
                  <p className="text-xs text-muted-foreground">{post.time}</p>
                </div>
              </div>
              
              <p className="text-secondary leading-relaxed mb-6 dark:text-slate-300">
                {post.content}
              </p>
              
              <div className="flex items-center justify-between pt-6 border-t border-border dark:border-slate-800">
                <div className="flex items-center gap-6">
                  <button className="flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors group">
                    <Heart size={18} className="group-hover:fill-primary" />
                    {post.likes}
                  </button>
                  <button className="flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors">
                    <MessageSquare size={18} />
                    {post.comments}
                  </button>
                </div>
                <button className="p-2 text-muted-foreground hover:bg-surface rounded-xl transition-all dark:hover:bg-slate-800">
                  <Share2 size={18} />
                </button>
              </div>
            </div>
          ))}
          
          <button className="w-full py-4 border-2 border-dashed border-border rounded-3xl text-sm font-bold text-muted-foreground hover:border-primary hover:text-primary transition-all dark:border-slate-800">
            Load More Posts
          </button>
        </div>
      </div>
    </div>
  );
}
