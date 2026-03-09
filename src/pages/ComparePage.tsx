import React from 'react';
import { motion } from 'motion/react';
import { 
  GitCompare, Shield, Flame, Target, BookOpen, 
  Zap, AlertCircle, Heart, HandMetal
} from 'lucide-react';
import { personalityTypes } from '../data/personalityTypes';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function ComparePage() {
  const [type1, setType1] = React.useState(personalityTypes[0].id);
  const [type2, setType2] = React.useState(personalityTypes[1].id);

  const p1 = personalityTypes.find(p => p.id === type1)!;
  const p2 = personalityTypes.find(p => p.id === type2)!;

  return (
    <div className="max-w-7xl mx-auto space-y-12">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-sm font-medium">
          <GitCompare className="w-4 h-4" />
          Side-by-Side Analysis
        </div>
        <h1 className="text-4xl md:text-6xl font-bold">Compare Types</h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Understand the subtle differences between personality types to refine your calibration skills.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Selector 1 */}
        <div className="space-y-4">
          <label className="text-sm font-bold text-slate-500 uppercase tracking-widest">Profile 1</label>
          <select 
            value={type1}
            onChange={(e) => setType1(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-teal-500/50 appearance-none text-xl font-bold"
          >
            {personalityTypes.map(pt => (
              <option key={pt.id} value={pt.id} className="bg-slate-900">
                {pt.id} - {pt.name}
              </option>
            ))}
          </select>
        </div>

        {/* Selector 2 */}
        <div className="space-y-4">
          <label className="text-sm font-bold text-slate-500 uppercase tracking-widest">Profile 2</label>
          <select 
            value={type2}
            onChange={(e) => setType2(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-teal-500/50 appearance-none text-xl font-bold"
          >
            {personalityTypes.map(pt => (
              <option key={pt.id} value={pt.id} className="bg-slate-900">
                {pt.id} - {pt.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Column 1 */}
        <motion.div 
          key={p1.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-8"
        >
          <div className="glass-card p-8 space-y-4 text-center border-t-4 border-t-teal-500">
            <div className="inline-block px-3 py-1 rounded-lg bg-teal-500/10 text-teal-400 text-xs font-mono font-bold tracking-widest uppercase">
              {p1.combination}
            </div>
            <h2 className="text-4xl font-bold">{p1.name}</h2>
            <p className="text-teal-500/80 italic">{p1.tagline}</p>
          </div>

          <div className="glass-card p-8 space-y-4">
            <h3 className="text-xl font-bold flex items-center gap-2 text-teal-400">
              <BookOpen className="w-5 h-5" /> Overview
            </h3>
            <p className="text-slate-300 leading-relaxed">{p1.overview}</p>
          </div>

          <div className="glass-card p-8 space-y-4">
            <h3 className="text-xl font-bold flex items-center gap-2 text-red-400">
              <AlertCircle className="w-5 h-5" /> What to Avoid
            </h3>
            <ul className="space-y-2">
              {p1.whatToAvoid.slice(0, 3).map((item, i) => (
                <li key={i} className="flex gap-3 items-start text-slate-400 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="glass-card p-8 space-y-4">
            <h3 className="text-xl font-bold flex items-center gap-2 text-orange-400">
              <Flame className="w-5 h-5" /> Core Desires
            </h3>
            <p className="text-slate-300 leading-relaxed">{p1.desires}</p>
          </div>
        </motion.div>

        {/* Column 2 */}
        <motion.div 
          key={p2.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-8"
        >
          <div className="glass-card p-8 space-y-4 text-center border-t-4 border-t-purple-500">
            <div className="inline-block px-3 py-1 rounded-lg bg-purple-500/10 text-purple-400 text-xs font-mono font-bold tracking-widest uppercase">
              {p2.combination}
            </div>
            <h2 className="text-4xl font-bold">{p2.name}</h2>
            <p className="text-purple-500/80 italic">{p2.tagline}</p>
          </div>

          <div className="glass-card p-8 space-y-4">
            <h3 className="text-xl font-bold flex items-center gap-2 text-purple-400">
              <BookOpen className="w-5 h-5" /> Overview
            </h3>
            <p className="text-slate-300 leading-relaxed">{p2.overview}</p>
          </div>

          <div className="glass-card p-8 space-y-4">
            <h3 className="text-xl font-bold flex items-center gap-2 text-red-400">
              <AlertCircle className="w-5 h-5" /> What to Avoid
            </h3>
            <ul className="space-y-2">
              {p2.whatToAvoid.slice(0, 3).map((item, i) => (
                <li key={i} className="flex gap-3 items-start text-slate-400 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="glass-card p-8 space-y-4">
            <h3 className="text-xl font-bold flex items-center gap-2 text-orange-400">
              <Flame className="w-5 h-5" /> Core Desires
            </h3>
            <p className="text-slate-300 leading-relaxed">{p2.desires}</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
