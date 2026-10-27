import React from 'react';
import { Truck, ArrowUpRight, Phone, Mail, MapPin, ShieldCheck } from 'lucide-react';
import { PageRoute } from '../types/logistics';

interface FooterProps {
  onNavigate: (route: PageRoute) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#050C17] border-t border-slate-800 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <button
              onClick={() => {
                onNavigate('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-2.5 text-left group"
            >
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:bg-amber-500/20 transition-colors">
                <Truck className="w-4 h-4" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white">
                NEXORA <span className="text-amber-400 font-semibold text-lg">LOGISTICS</span>
              </span>
            </button>

            <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
              Dependable commercial goods transportation and fleet logistics solutions engineered
              to connect manufacturers, distributors, and supply chains nationwide.
            </p>

            <div className="pt-2 text-xs text-slate-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Full Cargo Insurance &amp; Verified DOT Compliance Standards</span>
            </div>

            <div className="pt-4">
              <button
                onClick={() => {
                  onNavigate('admin-demo');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 text-xs font-medium text-sky-400 hover:text-sky-300 py-2 px-3 rounded-lg bg-sky-950/30 border border-sky-800/40 hover:border-sky-700 transition-colors"
              >
                <span>Launch TMS Admin Demo (Future System)</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Home', route: 'home' as PageRoute },
                { label: 'Transportation Services', route: 'services' as PageRoute },
                { label: 'About Company', route: 'about' as PageRoute },
                { label: 'Track Shipment', route: 'track' as PageRoute },
                { label: 'Request a Quote', route: 'quote' as PageRoute },
                { label: 'Contact Dispatch', route: 'contact' as PageRoute },
              ].map((item) => (
                <li key={item.label}>
                  <button
                    onClick={() => {
                      onNavigate(item.route);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-amber-400 transition-colors text-left text-sm"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Core Services */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">
              Key Capabilities
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => {
                    onNavigate('services');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  General Goods Freight
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('services');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Heavy &amp; Oversized Haul
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('services');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Industrial Equipment
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('services');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Full Truckload (FTL)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('services');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  City-to-City Express
                </button>
              </li>
            </ul>
          </div>

          {/* Demonstration Notice & Contact Placeholders */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">
              Demo Terminal
            </h4>
            <div className="space-y-3 text-xs text-slate-400 leading-relaxed">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  Logistics Terminal Hub 04
                  <br />
                  Chicago / DFW / Intermodal Ports
                  <br />
                  <span className="text-slate-400 italic">(Configurable Client Address)</span>
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>+1 (800) 555-DISPATCH</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>operations@nexora-logistics.demo</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Disclaimers */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            © {currentYear} NEXORA LOGISTICS DEMO. All rights reserved. Built as a commercial client
            presentation prototype.
          </p>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Client Evaluation Build</span>
            <span>·</span>
            <span>Mock Fleet &amp; TMS Data</span>
            <span>·</span>
            <button
              onClick={() => {
                onNavigate('admin-demo');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-amber-400 transition-colors"
            >
              TMS Admin Portal
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
