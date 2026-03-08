import React from 'react';
import { motion } from 'motion/react';
import { 
  Target, Send, Loader2, AlertCircle, Sparkles, 
  MessageSquare, UserCheck, Brain, Info, 
  CheckCircle2, Zap, Shield, HandMetal, Flame, Heart
} from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { personalityTypes } from '../data/personalityTypes';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface AnalysisResult {
  primaryType: string;
  confidence: number;
  secondaryType: string | null;
  reasoning: string;
  indicators: string[];
  recommendedNextSteps: string[];
  whatToAvoid: string[];
  relationshipAdvice: {
    vision: string;
    investment: string;
    potential: string;
  };
  freakDynamics: {
    kink: string;
    threesomes: string;
    worship: string;
  };
}

export default function CalibrationPage() {
  const [scenario, setScenario] = React.useState('');
  const [analysis, setAnalysis] = React.useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [mode, setMode] = React.useState<'ai' | 'manual'>('ai');

  const handleAnalyze = async () => {
    if (!scenario.trim()) return;
    setIsLoading(true);
    setError(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Analyze the following social scenario using the Pandora's Box personality profiling system by Yame Coaching.
        
        The system uses 3 axes to define 8 personality types:
        1. Time Line: Tester (T) vs Investor (N). Testers are harder to get, Investors are easier to get but harder to keep.
        2. Sex Line: Denier (D) vs Justifier (J). Deniers need a reason for sex, Justifiers need a reason NOT to have sex.
        3. Relationship Line: Realist (R) vs Idealist (I). Realists are logical and career-focused, Idealists are romantic and imaginative.

        The 8 Types are:
        - TDI: The Playette (Tester, Denier, Idealist)
        - TJI: The Social Butterfly (Tester, Justifier, Idealist)
        - TDR: The Private Dancer (Tester, Denier, Realist)
        - TJR: The Seductress (Tester, Justifier, Realist)
        - NDI: The Hopeful Romantic (Investor, Denier, Idealist)
        - NJI: The Cinderella (Investor, Justifier, Idealist)
        - NDR: The Connoisseur (Investor, Denier, Realist)
        - NJR: The Modern Woman (Investor, Justifier, Realist)

        Scenario: "${scenario}"

        Provide a detailed analysis in JSON format. 
        CRITICAL: The tone must be mysterious, insightful, and professional. Avoid typical AI phrases like "Based on the scenario" or "It appears that". Write as if you are a master profiler. Use natural punctuation.
        
        {
          "primaryType": "3-letter code (e.g., TDI)",
          "confidence": number (0-100),
          "secondaryType": "3-letter code or null",
          "reasoning": "Deep psychological analysis of her behavior across the 3 axes. Explain the 'why' behind her actions. Connect her specific behaviors in the scenario to the axes.",
          "indicators": ["list of specific behavioral clues found in the text and which axis they point to"],
          "recommendedNextSteps": ["tactical advice for the next interaction based on her specific type's strategy"],
          "whatToAvoid": ["critical mistakes to avoid with this specific woman based on her type's profile"],
          "relationshipAdvice": {
            "vision": "How to present your vision to her to build total devotion",
            "investment": "How to get her to invest in the relationship",
            "potential": "How to manage the long-term relationship potential"
          },
          "freakDynamics": {
            "kink": "How to introduce kink and novelty based on her sex line",
            "threesomes": "Her likely attitude towards threesomes",
            "worship": "How she responds to worship and submission"
          }
        }`,
        config: { responseMimeType: 'application/json' }
      });

      const result = JSON.parse(response.text || '{}');
      setAnalysis(result);
    } catch (err) {
      setError('The Oracle is currently unavailable. Please try again later.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const manualClues = [
    {
      axis: 'Time Line',
      options: [
        { label: 'Tester (T)', clues: ['Shorter attention span', 'Multitasking/Texting', 'Unaffected by compliments', 'Surrounded by male friends', 'Changes topics rapidly'] },
        { label: 'Investor (N)', clues: ['Takes compliments seriously', 'Needs focused attention', 'Responds with deep eye contact', 'Asks about your future/goals'] }
      ]
    },
    {
      axis: 'Sex Line',
      options: [
        { label: 'Denier (D)', clues: ['Careful with health/safety', 'Religious/Conservative background', 'Shy about sex talk', 'Consistent with upbringing', 'Avoids aggressive touch'] },
        { label: 'Justifier (J)', clues: ['Has tattoos', 'Takes risks with safety', 'Talks about sex openly', 'Comfortable with aggressive touch', 'Rebels against upbringing'] }
      ]
    },
    {
      axis: 'Relationship Line',
      options: [
        { label: 'Realist (R)', clues: ['Career/Studies priority', 'Believes women are equals', 'Takes care of others', 'Flakes because of work', 'Had weaker male figures'] },
        { label: 'Idealist (I)', clues: ['Affluent/Spoiled upbringing', 'Plans wedding early', 'Expects to be pampered', 'Flakes to hang out with guys', 'Vivid imagination'] }
      ]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-sm font-medium">
          <Sparkles className="w-4 h-4" />
          Calibration Lab
        </div>
        <h1 className="text-4xl md:text-6xl font-bold">The Oracle</h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Advanced personality analysis and type calibration. Use the AI Oracle or the Manual Mind Reading tool.
        </p>
      </div>

      <div className="flex justify-center gap-4">
        <button
          onClick={() => setMode('ai')}
          className={cn(
            "px-6 py-2 rounded-full font-bold transition-all border",
            mode === 'ai' ? "teal-gradient text-white border-transparent" : "bg-white/5 text-slate-400 border-white/10"
          )}
        >
          AI Oracle
        </button>
        <button
          onClick={() => setMode('manual')}
          className={cn(
            "px-6 py-2 rounded-full font-bold transition-all border",
            mode === 'manual' ? "teal-gradient text-white border-transparent" : "bg-white/5 text-slate-400 border-white/10"
          )}
        >
          Manual Mind Reading
        </button>
      </div>

      {mode === 'ai' ? (
        <div className="space-y-8">
          <div className="glass-card p-8 space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-500 uppercase tracking-widest">Describe the Scenario</label>
              <textarea
                value={scenario}
                onChange={(e) => setScenario(e.target.value)}
                placeholder="Describe her behavior, how she responded to your approach, her body language, and any clues you noticed (e.g., tattoos, career focus, texting behavior)..."
                className="w-full h-48 bg-white/5 border border-white/10 rounded-2xl p-6 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-all resize-none"
              />
            </div>

            <button
              onClick={handleAnalyze}
              disabled={isLoading || !scenario.trim()}
              className="w-full py-4 rounded-xl teal-gradient text-white font-bold shadow-xl shadow-teal-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-3"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Consulting The Oracle...
                </>
              ) : (
                <>
                  <Brain className="w-5 h-5" />
                  Analyze Scenario
                </>
              )}
            </button>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center gap-4"
            >
              <AlertCircle className="w-6 h-6 shrink-0" />
              {error}
            </motion.div>
          )}

          {analysis && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-card p-8 text-center space-y-2">
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Primary Type</h4>
                  <div className="text-5xl font-black text-teal-400 italic">{analysis.primaryType}</div>
                </div>
                <div className="glass-card p-8 text-center space-y-2">
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Confidence</h4>
                  <div className="text-5xl font-black text-white italic">{analysis.confidence}%</div>
                </div>
                <div className="glass-card p-8 text-center space-y-2">
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Secondary Type</h4>
                  <div className="text-5xl font-black text-slate-500 italic">{analysis.secondaryType || 'N/A'}</div>
                </div>
              </div>

              <div className="glass-card p-8 space-y-6">
                <h3 className="text-2xl font-bold flex items-center gap-3">
                  <Info className="w-6 h-6 text-teal-400" />
                  Oracle's Reasoning
                </h3>
                <p className="text-slate-300 leading-relaxed text-lg">
                  {analysis.reasoning}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="glass-card p-8 space-y-4">
                  <h4 className="text-xl font-bold flex items-center gap-3">
                    <Target className="w-5 h-5 text-teal-400" />
                    Key Indicators Found
                  </h4>
                  <ul className="space-y-3">
                    {analysis.indicators.map((indicator, i) => (
                      <li key={i} className="flex items-start gap-3 text-slate-400">
                        <CheckCircle2 className="w-5 h-5 text-teal-500 shrink-0 mt-0.5" />
                        {indicator}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="glass-card p-8 space-y-4">
                  <h4 className="text-xl font-bold flex items-center gap-3">
                    <Zap className="w-5 h-5 text-teal-400" />
                    Recommended Next Steps
                  </h4>
                  <ul className="space-y-3">
                    {analysis.recommendedNextSteps.map((step, i) => (
                      <li key={i} className="flex items-start gap-3 text-slate-400">
                        <div className="w-5 h-5 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-400 text-xs font-bold shrink-0 mt-0.5">
                          {i + 1}
                        </div>
                        {step}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="glass-card p-8 space-y-4">
                  <h4 className="text-xl font-bold flex items-center gap-3 text-red-400">
                    <AlertCircle className="w-5 h-5" />
                    What to Avoid
                  </h4>
                  <ul className="space-y-3">
                    {analysis.whatToAvoid.map((avoid, i) => (
                      <li key={i} className="flex items-start gap-3 text-slate-400">
                        <CheckCircle2 className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                        {avoid}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="glass-card p-8 space-y-6">
                <h3 className="text-2xl font-bold flex items-center gap-3 text-teal-400">
                  <Shield className="w-6 h-6" />
                  Relationship Strategy: Total Devotion
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Vision</h4>
                    <p className="text-sm text-slate-300 leading-relaxed">{analysis.relationshipAdvice.vision}</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Investment</h4>
                    <p className="text-sm text-slate-300 leading-relaxed">{analysis.relationshipAdvice.investment}</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Potential</h4>
                    <p className="text-sm text-slate-300 leading-relaxed">{analysis.relationshipAdvice.potential}</p>
                  </div>
                </div>
              </div>

              <div className="glass-card p-8 space-y-6">
                <h3 className="text-2xl font-bold flex items-center gap-3 text-purple-400">
                  <HandMetal className="w-6 h-6" />
                  Freak Dynamics: Bring Out the Freak
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Kink & Novelty</h4>
                    <p className="text-sm text-slate-300 leading-relaxed">{analysis.freakDynamics.kink}</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Threesomes</h4>
                    <p className="text-sm text-slate-300 leading-relaxed">{analysis.freakDynamics.threesomes}</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Worship</h4>
                    <p className="text-sm text-slate-300 leading-relaxed">{analysis.freakDynamics.worship}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      ) : (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {manualClues.map((axis) => (
              <div key={axis.axis} className="space-y-6">
                <h3 className="text-xl font-bold text-teal-400 border-b border-white/10 pb-2">{axis.axis}</h3>
                {axis.options.map((option) => (
                  <div key={option.label} className="glass-card p-6 space-y-4">
                    <h4 className="font-bold text-lg text-white">{option.label}</h4>
                    <ul className="space-y-2">
                      {option.clues.map((clue, i) => (
                        <li key={i} className="flex items-start gap-3 text-slate-400 text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1.5 shrink-0" />
                          {clue}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="glass-card p-8 bg-teal-500/5 border-teal-500/20">
            <h3 className="text-xl font-bold mb-4">How to Mind Read</h3>
            <p className="text-slate-400 leading-relaxed">
              Identify one dominant trait from each axis. Combine the letters to find her 3-letter type. 
              For example, if she is a **Tester**, a **Denier**, and a **Realist**, her type is **TDR (The Private Dancer)**.
              Use the Encyclopedia to look up the specific strategy for that type.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
