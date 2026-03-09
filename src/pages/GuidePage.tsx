import React from 'react';
import { motion } from 'motion/react';
import { Book, ChevronRight, Hash, Star, Zap, Target, Shield, Compass } from 'lucide-react';
import { guideSections } from '../data/guideSections';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function GuidePage() {
  const [activeTab, setActiveTab] = React.useState(guideSections[0].id);
  const activeSection = guideSections.find(s => s.id === activeTab) || guideSections[0];

  return (
    <div className="space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">The Strategy Guide</h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
          Master the core principles of the EPIMETHEUS system. From initial approach to long-term devotion.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Navigation */}
        <div className="lg:col-span-4 space-y-2">
          {guideSections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveTab(section.id)}
              className={cn(
                "w-full flex items-center gap-4 p-4 rounded-xl transition-all group text-left",
                activeTab === section.id
                  ? "bg-teal-500/10 border border-teal-500/20 text-teal-400"
                  : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
              )}
            >
              <div className={cn(
                "w-10 h-10 rounded-lg flex items-center justify-center transition-all",
                activeTab === section.id ? "teal-gradient text-white" : "bg-white/5 text-slate-500 group-hover:text-slate-300"
              )}>
                <Book className="w-5 h-5" />
              </div>
              <span className="font-bold text-lg">{section.title}</span>
              <ChevronRight className={cn(
                "w-5 h-5 ml-auto transition-transform",
                activeTab === section.id ? "translate-x-1" : "opacity-0"
              )} />
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="lg:col-span-8">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card p-8 md:p-12 space-y-8"
          >
            <div className="space-y-2">
              <h2 className="text-3xl md:text-4xl font-bold">{activeSection.title}</h2>
              <div className="h-1 w-20 teal-gradient rounded-full" />
            </div>

            <div className="prose prose-invert prose-teal max-w-none">
              {activeSection.content.split('\n').map((line, i) => {
                if (line.startsWith('# ')) {
                  return <h1 key={i} className="text-3xl font-bold text-white mt-8 mb-4">{line.substring(2)}</h1>;
                }
                if (line.startsWith('## ')) {
                  return <h2 key={i} className="text-2xl font-bold text-teal-400 mt-8 mb-4">{line.substring(3)}</h2>;
                }
                if (line.startsWith('### ')) {
                  return <h3 key={i} className="text-xl font-bold text-slate-200 mt-6 mb-3">{line.substring(4)}</h3>;
                }
                if (line.startsWith('1.') || line.startsWith('2.') || line.startsWith('3.')) {
                  return <p key={i} className="text-lg text-slate-300 leading-relaxed font-bold mt-6">{line}</p>;
                }
                if (line.startsWith('- ')) {
                  return (
                    <div key={i} className="flex gap-3 items-start mt-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-2.5 shrink-0" />
                      <p className="text-slate-400 leading-relaxed">{line.substring(2)}</p>
                    </div>
                  );
                }
                if (line.trim() === '') return <br key={i} />;
                return <p key={i} className="text-lg text-slate-400 leading-relaxed mt-4">{line}</p>;
              })}
            </div>

            {/* Contextual Tips */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-8 border-t border-white/5">
              <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/10 flex gap-4">
                <Zap className="w-5 h-5 text-blue-400 shrink-0" />
                <div className="space-y-1">
                  <h4 className="font-bold text-blue-400 text-sm">Pro Tip</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">Always prioritize calibration over technique. If she seems uncomfortable, back off.</p>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-teal-500/5 border border-teal-500/10 flex gap-4">
                <Star className="w-5 h-5 text-teal-400 shrink-0" />
                <div className="space-y-1">
                  <h4 className="font-bold text-teal-400 text-sm">Key Concept</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">The "Us-Frame" is your most powerful tool for creating long-term devotion.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
