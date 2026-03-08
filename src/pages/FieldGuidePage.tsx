import React from 'react';
import { motion } from 'motion/react';
import { 
  Map, Target, Zap, AlertCircle, 
  CheckCircle2, Flame, MessageSquare, 
  ChevronRight, Search, Filter,
  BookOpen, Compass, Shield
} from 'lucide-react';
import { personalityTypes } from '../data/personalityTypes';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function FieldGuidePage() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedType, setSelectedType] = React.useState<string | null>(null);

  const filteredScenarios = personalityTypes
    .filter(type => !selectedType || type.id === selectedType)
    .flatMap(type => [
      { type: type.id, typeName: type.name, stage: 'Ignition', scenario: type.strategy.ignitionScenario, example: type.strategy.ignitionExample },
      { type: type.id, typeName: type.name, stage: 'Momentum', scenario: type.strategy.momentumScenario, example: type.strategy.momentumExample },
      { type: type.id, typeName: type.name, stage: 'Connection', scenario: type.strategy.connectionScenario, example: type.strategy.connectionExample },
      { type: type.id, typeName: type.name, stage: 'Bonding', scenario: type.strategy.bondingScenario, example: type.strategy.bondingExample },
      { type: type.id, typeName: type.name, stage: 'Physicality', scenario: type.physicality.bodyLanguageScenario, example: type.physicality.bodyLanguageExample },
      { type: type.id, typeName: type.name, stage: 'Touch', scenario: type.physicality.touchScenario, example: type.physicality.touchExample },
      { type: type.id, typeName: type.name, stage: 'Sex', scenario: type.physicality.sexScenario, example: type.physicality.sexExample },
    ])
    .filter(s => 
      s.scenario.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.stage.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.typeName.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="space-y-12">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl teal-gradient shadow-lg shadow-teal-500/20 mb-4 glow-teal">
          <Map className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold">The Field Guide</h1>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Quick-reference scenarios and tactical lines for every stage of interaction. 
          Master the art of situational calibration.
        </p>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
          <input
            type="text"
            placeholder="Search scenarios, stages, or types..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-slate-200 focus:outline-none focus:border-teal-500/50 transition-colors"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <button
            onClick={() => setSelectedType(null)}
            className={cn(
              "px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all",
              !selectedType ? "bg-teal-500 text-white" : "bg-white/5 text-slate-400 hover:bg-white/10"
            )}
          >
            All Types
          </button>
          {personalityTypes.map(type => (
            <button
              key={type.id}
              onClick={() => setSelectedType(type.id)}
              className={cn(
                "px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all",
                selectedType === type.id ? "bg-teal-500 text-white" : "bg-white/5 text-slate-400 hover:bg-white/10"
              )}
            >
              {type.id}
            </button>
          ))}
        </div>
      </div>

      {/* Vital Information - The 5 Keys */}
      <section className="glass-card p-8 space-y-6">
        <h2 className="text-2xl font-bold flex items-center gap-3 text-teal-400">
          <BookOpen className="w-6 h-6" />
          The 5 Vital Keys to Calibration
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {[
            { title: "Dominant Male", desc: "Women seek the one dominant male in any social group." },
            { title: "Slut Defense", desc: "Fear of social judgment is the primary reason for rejection." },
            { title: "Trauma Factor", desc: "95% of women have sexual trauma; safety is paramount." },
            { title: "Social Pressure", desc: "Balancing biological urges with modern career expectations." },
            { title: "Pleasure Gap", desc: "Women love sex more but have much higher selection criteria." }
          ].map((key, i) => (
            <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
              <span className="text-teal-500 font-bold text-lg">0{i + 1}</span>
              <h4 className="font-bold text-sm text-slate-200">{key.title}</h4>
              <p className="text-xs text-slate-500 leading-relaxed">{key.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Scenarios Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredScenarios.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass-card p-6 space-y-4 group hover:border-teal-500/30 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-teal-500/10 text-teal-400 text-[10px] font-bold uppercase tracking-widest">
                  {s.type}
                </span>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                  {s.stage}
                </span>
              </div>
              <span className="text-xs text-slate-600 font-medium">{s.typeName}</span>
            </div>
            
            <div className="space-y-3">
              <p className="text-slate-300 text-sm leading-relaxed">
                {s.scenario}
              </p>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 italic text-teal-400/80 text-sm">
                "{s.example}"
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Tips Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-white/5">
        <section className="space-y-4">
          <h3 className="text-xl font-bold flex items-center gap-2 text-teal-400">
            <Zap className="w-5 h-5" />
            Quick Wins
          </h3>
          <div className="space-y-2">
            {personalityTypes.slice(0, 4).map(type => (
              <div key={type.id} className="p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="text-[10px] font-bold text-teal-500 uppercase block mb-1">{type.name}</span>
                <p className="text-xs text-slate-400">{type.quickWins[0]}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-xl font-bold flex items-center gap-2 text-red-400">
            <AlertCircle className="w-5 h-5" />
            Critical Avoids
          </h3>
          <div className="space-y-2">
            {personalityTypes.slice(4, 8).map(type => (
              <div key={type.id} className="p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="text-[10px] font-bold text-red-500 uppercase block mb-1">{type.name}</span>
                <p className="text-xs text-slate-400">{type.whatToAvoid[0]}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-xl font-bold flex items-center gap-2 text-blue-400">
            <Shield className="w-5 h-5" />
            Cold Reads
          </h3>
          <div className="space-y-2">
            {personalityTypes.slice(2, 6).map(type => (
              <div key={type.id} className="p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="text-[10px] font-bold text-blue-500 uppercase block mb-1">{type.name}</span>
                <p className="text-xs text-slate-400 italic">"{type.coldReads[0]}"</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Tactical Lines Section */}
      <section className="glass-card p-8 space-y-6">
        <h2 className="text-2xl font-bold flex items-center gap-3 text-teal-400">
          <MessageSquare className="w-6 h-6" />
          Tactical Lines & Openers
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-300">The Approach</h3>
            <div className="space-y-3">
              {[
                { label: "Direct", line: "I saw you from across the room and I knew I had to come say hi. I'm [Name].", note: "Best for Justifiers/Idealists" },
                { label: "Situational", line: "I can't believe how crowded this place is. Do you know if the music is always this loud?", note: "Best for Deniers/Realists" },
                { label: "Opinion", line: "My friend and I are having a debate. Do you think it's possible to be 'just friends' with an ex?", note: "Best for Testers" }
              ].map((item, i) => (
                <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-teal-500 uppercase">{item.label}</span>
                    <span className="text-[10px] text-slate-500 italic">{item.note}</span>
                  </div>
                  <p className="text-sm text-slate-300">"{item.line}"</p>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-300">The Hook (Intrigue)</h3>
            <div className="space-y-3">
              {[
                { label: "Cold Read", line: "You look like the kind of girl who's always the 'responsible' one in her group of friends.", note: "Builds instant rapport" },
                { label: "Neg", line: "That's a really interesting necklace. It's almost too much, but you somehow pull it off.", note: "Disarms high-status women" },
                { label: "Challenge", line: "I bet you have a secret talent that no one would ever guess just by looking at you.", note: "Encourages investment" }
              ].map((item, i) => (
                <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-teal-500 uppercase">{item.label}</span>
                    <span className="text-[10px] text-slate-500 italic">{item.note}</span>
                  </div>
                  <p className="text-sm text-slate-300">"{item.line}"</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Terminology Section */}
      <section className="glass-card p-8 space-y-6">
        <h2 className="text-2xl font-bold flex items-center gap-3 text-teal-400">
          <Filter className="w-6 h-6" />
          Key Terminology
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { term: "ETS", def: "Emotional Trigger Sequence - the order of emotions she responds to." },
            { term: "Inner Process", def: "Talking about thoughts/feelings rather than just facts." },
            { term: "Us-Frame", def: "Using 'we' and 'us' to create a sense of shared destiny." },
            { term: "Cold Read", def: "A statement that makes her feel understood on a deep level." },
            { term: "Neg", def: "A playful way to lower her social value and show confidence." },
            { term: "Compliance", def: "Getting her to do small things to build investment." },
            { term: "Vision", def: "Your long-term goals and the path you are on in life." },
            { term: "The Hook", def: "The point where she becomes genuinely interested." },
            { term: "Calibration", def: "Adjusting behavior based on her reactions and type." }
          ].map((item, i) => (
            <div key={i} className="space-y-1">
              <h4 className="font-bold text-teal-500 text-sm uppercase tracking-widest">{item.term}</h4>
              <p className="text-xs text-slate-400 leading-relaxed">{item.def}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
