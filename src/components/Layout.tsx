import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, Compass, Target, Menu, X, Shield, Map } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Encyclopedia', path: '/encyclopedia', icon: BookOpen },
    { name: 'Guide', path: '/guide', icon: Compass },
    { name: 'Calibration', path: '/calibration', icon: Target },
    { name: 'Field Guide', path: '/field-guide', icon: Map },
    { name: 'Advisor', path: '/advisor', icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-mystic-950 text-slate-300 selection:bg-teal-500/30 selection:text-teal-200 relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-teal-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 blur-[120px] rounded-full" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] mix-blend-overlay" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-mystic-950/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center gap-2 group">
                <div className="w-8 h-8 rounded-lg teal-gradient flex items-center justify-center shadow-lg shadow-teal-500/20 group-hover:scale-110 transition-transform glow-teal">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold tracking-tight text-gradient">PANDORA'S BOX</span>
              </Link>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-1">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={cn(
                      "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 relative group",
                      location.pathname === item.path
                        ? "text-teal-400 bg-teal-400/5"
                        : "text-slate-400 hover:text-white hover:bg-white/5"
                    )}
                  >
                    {item.name}
                    {location.pathname === item.path && (
                      <motion.div
                        layoutId="nav-underline"
                        className="absolute bottom-0 left-4 right-4 h-0.5 bg-teal-500 rounded-full"
                      />
                    )}
                  </Link>
                ))}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 focus:outline-none transition-colors"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-mystic-900 border-b border-white/5 overflow-hidden"
            >
              <div className="px-4 pt-2 pb-6 space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-4 px-4 py-4 rounded-2xl text-base font-medium transition-all",
                      location.pathname === item.path
                        ? "text-teal-400 bg-teal-400/10"
                        : "text-slate-400 hover:text-white hover:bg-white/5"
                    )}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content */}
      <main className="pt-16 min-h-screen">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-mystic-950 border-t border-white/5 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg teal-gradient flex items-center justify-center glow-teal">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold tracking-tight text-gradient">PANDORA'S BOX</span>
              </div>
              <p className="text-slate-500 text-sm max-w-md">
                The ultimate system for understanding female psychology and personality dynamics. 
                Based on the research of Vin DiCarlo & Brian Burke.
              </p>
              <div className="flex flex-wrap gap-x-6 gap-y-2 pt-2">
                {navItems.map(item => (
                  <Link key={item.name} to={item.path} className="text-xs text-slate-600 hover:text-teal-500 transition-colors">
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
            <div className="text-right space-y-2">
              <p className="text-slate-400 text-sm font-medium">
                © 2026 Yame Coaching.
              </p>
              <p className="text-slate-600 text-xs">
                Crafted for mastery and understanding.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
