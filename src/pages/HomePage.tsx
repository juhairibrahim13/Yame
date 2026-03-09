import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight, RotateCcw, CheckCircle2, AlertCircle, Target, Compass, Brain, Map, BookOpen } from 'lucide-react';
import { quizQuestions } from '../data/quizQuestions';
import { personalityTypes } from '../data/personalityTypes';
import { Link } from 'react-router-dom';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export default function HomePage() {
  const [currentStep, setCurrentStep] = React.useState<'hero' | 'quiz' | 'result'>('hero');
  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
  const [answers, setAnswers] = React.useState<Record<number, string>>({});
  const [result, setResult] = React.useState<string | null>(null);

  const handleStartQuiz = () => {
    setCurrentStep('quiz');
    setCurrentQuestionIndex(0);
    setAnswers({});
  };

  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers, [quizQuestions[currentQuestionIndex].id]: value };
    setAnswers(newAnswers);

    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      calculateResult(newAnswers);
    }
  };

  const calculateResult = (finalAnswers: Record<number, string>) => {
    // Count occurrences of each factor
    const counts: Record<string, number> = { T: 0, N: 0, D: 0, J: 0, R: 0, I: 0 };
    Object.values(finalAnswers).forEach(val => {
      counts[val] = (counts[val] || 0) + 1;
    });

    // Determine the 3-letter code
    const time = counts.T >= counts.N ? 'T' : 'N';
    const sex = counts.D >= counts.J ? 'D' : 'J';
    const relationship = counts.R >= counts.I ? 'R' : 'I';

    setResult(`${time}${sex}${relationship}`);
    setCurrentStep('result');
  };

  const resetQuiz = () => {
    setCurrentStep('hero');
    setCurrentQuestionIndex(0);
    setAnswers({});
    setResult(null);
  };

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const matchedProfile = personalityTypes.find(p => p.id === result);

  return (
    <div className="space-y-12">
      {currentStep === 'hero' && (
        <div className="text-center space-y-12 py-12">
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-block px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-sm font-medium mb-4"
            >
              Where Hope Meets Connection
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight">
              EPIMETHEUS
            </h1>
            <p className="text-slate-400 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed font-medium italic">
              "Open the box. Find the hope."
            </p>
          </div>

          <div className="max-w-3xl mx-auto text-left space-y-8 glass-card p-8 md:p-12">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-teal-400 flex items-center gap-2">
                <BookOpen className="w-6 h-6" /> The Story
              </h2>
              <p className="text-slate-300 leading-relaxed text-lg">
                In Greek mythology, Epimetheus was the one who opened his heart to Pandora—not despite the warnings, but because he understood something others didn't: <strong>Some things are worth the risk.</strong>
              </p>
              <p className="text-slate-300 leading-relaxed text-lg">
                When Pandora opened the box, the world was flooded with chaos, doubt, and tests. But at the very bottom, something remained: <strong>Hope.</strong>
              </p>
              <p className="text-slate-300 leading-relaxed text-lg italic">
                Epimetheus saw past the trials. He saw her. And he held onto what mattered most.
              </p>
            </div>

            <div className="space-y-4 pt-6 border-t border-white/5">
              <h2 className="text-2xl font-bold text-teal-400 flex items-center gap-2">
                <Target className="w-6 h-6" /> The Connection
              </h2>
              <p className="text-slate-300 leading-relaxed text-lg">
                She's not simple. Love isn't either. Epimetheus is the first dating app built on the EPIMETHEUS philosophy:
              </p>
              <ul className="space-y-4 mt-4">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-teal-500 mt-2 shrink-0" />
                  <p className="text-slate-300"><strong className="text-white">Meet the Testers</strong> – Women who guard their hearts because they're worth guarding. Profiles reveal her "tests" upfront—so you know what you're walking into.</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-teal-500 mt-2 shrink-0" />
                  <p className="text-slate-300"><strong className="text-white">Attract the Investors</strong> – Once trust is built, she gives back tenfold. Matches deepen only when mutual effort is shown.</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-teal-500 mt-2 shrink-0" />
                  <p className="text-slate-300"><strong className="text-white">Find the Hope</strong> – Real connection is the reward for those who persist.</p>
                </li>
              </ul>
            </div>

            <div className="space-y-4 pt-6 border-t border-white/5">
              <h2 className="text-2xl font-bold text-teal-400 flex items-center gap-2">
                <Compass className="w-6 h-6" /> Why Epimetheus?
              </h2>
              <p className="text-slate-300 leading-relaxed text-lg">
                Because modern dating is a box. Some people open it and run. Some get stuck in the chaos. But the ones who stay? They find what's real.
              </p>
              <p className="text-teal-400 font-bold text-xl text-center pt-4">
                Epimetheus is for the ones who stay.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <button
              onClick={handleStartQuiz}
              className="w-full sm:w-auto px-8 py-4 rounded-xl teal-gradient text-white font-bold shadow-xl shadow-teal-500/20 hover:scale-105 transition-all flex items-center justify-center gap-2 group"
            >
              Start Personality Profiler
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <Link
              to="/guide"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-all text-center"
            >
              Read the Guide
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-24 text-left">
            {[
              { title: '8 Personality Types', desc: 'Detailed blueprints for every major female character type.', icon: CheckCircle2, link: '/encyclopedia' },
              { title: 'AI Advisor', desc: 'Consult the Oracle for real-time strategic intelligence.', icon: Brain, link: '/advisor' },
              { title: 'Field Guide', desc: 'Quick-reference scenarios and tactical lines for any situation.', icon: Map, link: '/field-guide' },
              { title: 'Calibration', desc: 'Master the art of reading her type in 30 seconds or less.', icon: Target, link: '/calibration' },
            ].map((feature, i) => (
              <Link key={i} to={feature.link} className="glass-card p-6 space-y-4 mystic-border group overflow-hidden shimmer">
                <div className="w-12 h-12 rounded-lg bg-teal-500/10 flex items-center justify-center text-teal-400 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold group-hover:text-teal-400 transition-colors">{feature.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {currentStep === 'quiz' && (
        <div className="max-w-2xl mx-auto">
          <div className="mb-8 flex items-center justify-between">
            <span className="text-sm font-medium text-slate-500 uppercase tracking-widest">
              Question {currentQuestionIndex + 1} of {quizQuestions.length}
            </span>
            <div className="flex gap-1">
              {quizQuestions.map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "h-1 w-6 rounded-full transition-all duration-300",
                    i === currentQuestionIndex ? "bg-teal-400" : i < currentQuestionIndex ? "bg-teal-900" : "bg-slate-800"
                  )}
                />
              ))}
            </div>
          </div>

          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="glass-card p-8 md:p-12 space-y-8"
          >
            <h2 className="text-2xl md:text-3xl font-bold leading-tight">
              {currentQuestion.text}
            </h2>
            <div className="space-y-4">
              {currentQuestion.options.map((option, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(option.value)}
                  className="w-full p-6 text-left rounded-xl bg-white/5 border border-white/10 hover:bg-teal-500/10 hover:border-teal-500/30 transition-all group flex items-center justify-between"
                >
                  <span className="text-lg font-medium text-slate-300 group-hover:text-white">
                    {option.text}
                  </span>
                  <ChevronRight className="w-5 h-5 text-slate-600 group-hover:text-teal-400 group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      )}

      {currentStep === 'result' && (
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-12 space-y-8"
          >
            <div className="w-20 h-20 rounded-full teal-gradient mx-auto flex items-center justify-center shadow-2xl shadow-teal-500/40">
              <CheckCircle2 className="w-10 h-10 text-white" />
            </div>
            <div className="space-y-2">
              <h2 className="text-sm font-medium text-teal-400 uppercase tracking-[0.2em]">Profiling Complete</h2>
              <h1 className="text-4xl md:text-6xl font-bold">
                {matchedProfile?.name}
              </h1>
              <div className="text-2xl font-mono text-slate-500 tracking-widest mt-2">
                CODE: {result}
              </div>
            </div>
            
            <p className="text-slate-400 text-lg leading-relaxed max-w-xl mx-auto">
              {matchedProfile?.overview}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                to={`/encyclopedia?type=${result}`}
                className="w-full sm:w-auto px-8 py-4 rounded-xl teal-gradient text-white font-bold shadow-xl shadow-teal-500/20 hover:scale-105 transition-all"
              >
                View Full Profile
              </Link>
              <button
                onClick={resetQuiz}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-5 h-5" />
                Retake Profiler
              </button>
            </div>
          </motion.div>

          <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-6 flex gap-4 text-left max-w-2xl mx-auto">
            <AlertCircle className="w-6 h-6 text-amber-500 shrink-0" />
            <div className="space-y-1">
              <h4 className="font-bold text-amber-500">Important Note</h4>
              <p className="text-sm text-slate-400 leading-relaxed">
                Personality types can shift over time based on age and experience. This result reflects her current dominant strategy.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
