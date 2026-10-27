import React, { useState, useEffect } from 'react';
import { Truck, Menu, X, ArrowUpRight } from 'lucide-react';
import { PageRoute } from '../types/logistics';

interface NavbarProps {
  currentRoute: PageRoute;
  onNavigate: (route: PageRoute) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentRoute, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  const handleNavClick = (route: PageRoute) => {
    onNavigate(route);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks: { label: string; route: PageRoute }[] = [
    { label: 'Home', route: 'home' },
    { label: 'Services', route: 'services' },
    { label: 'About', route: 'about' },
    { label: 'Track Shipment', route: 'track' },
    { label: 'Contact', route: 'contact' },
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 ${
        scrolled
          ? 'bg-[#07111F]/95 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/20'
          : 'bg-[#07111F] border-b border-slate-800/50'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-20">
          {/* Zone 1: Brand Wordmark */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 text-left group shrink-0 focus-visible:outline-2 focus-visible:outline-amber-400 focus-visible:outline-offset-2 rounded"
          >
            <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:bg-amber-500/20 group-hover:border-amber-400 transition-colors">
              <Truck className="w-5 h-5" />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-white whitespace-nowrap">
              NEXORA <span className="text-amber-400 font-semibold text-lg">LOGISTICS</span>
            </span>
          </button>

          {/* Zone 2: Navigation Links (Desktop) */}
          <nav
            aria-label="Main Navigation"
            className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300"
          >
            {navLinks.map((link) => {
              const isActive = currentRoute === link.route;
              return (
                <button
                  key={link.route}
                  onClick={() => handleNavClick(link.route)}
                  className={`relative py-1.5 transition-colors whitespace-nowrap shrink-0 hover:text-white focus-visible:outline-2 focus-visible:outline-amber-400 rounded ${
                    isActive ? 'text-amber-400 font-semibold' : 'text-slate-300'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Primary Action & Mobile Hamburger */}
          <div className="flex items-center gap-4 shrink-0">
            <button
              onClick={() => handleNavClick('quote')}
              className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 rounded-lg transition-all shadow-sm hover:shadow-amber-500/20 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-amber-400"
            >
              Get a Quote
            </button>

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={mobileMenuOpen}
              className="md:hidden p-2.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/60 focus-visible:outline-2 focus-visible:outline-amber-400"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-20 bottom-0 bg-[#07111F]/98 backdrop-blur-lg border-t border-slate-800 z-50 flex flex-col justify-between p-6 overflow-y-auto animate-in fade-in duration-200">
          <nav className="flex flex-col gap-2 pt-2" aria-label="Mobile Navigation">
            {navLinks.map((link) => {
              const isActive = currentRoute === link.route;
              return (
                <button
                  key={link.route}
                  onClick={() => handleNavClick(link.route)}
                  className={`flex items-center justify-between text-left px-4 py-3.5 rounded-xl text-base font-semibold transition-colors ${
                    isActive
                      ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                      : 'text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  <span>{link.label}</span>
                  <span className="text-xs text-slate-500 font-mono">0{navLinks.indexOf(link) + 1}</span>
                </button>
              );
            })}

            <div className="pt-4 border-t border-slate-800 mt-2">
              <button
                onClick={() => handleNavClick('admin-demo')}
                className="w-full flex items-center justify-between px-4 py-3 text-sm text-sky-400 hover:bg-sky-500/10 rounded-xl transition-colors border border-sky-500/20"
              >
                <span>TMS Admin Preview</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </nav>

          <div className="pt-6 border-t border-slate-800/80 flex flex-col gap-3">
            <button
              onClick={() => handleNavClick('quote')}
              className="w-full py-3.5 px-4 text-center font-bold text-sm text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-md transition-colors"
            >
              Request a Freight Quote
            </button>
            <p className="text-center text-xs text-slate-400">
              Demo Platform · 24/7 Logistics Coordination Support
            </p>
          </div>
        </div>
      )}
    </header>
  );
};
