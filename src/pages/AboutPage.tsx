import React from 'react';
import {
  ShieldCheck,
  Target,
  Users,
  Compass,
  ArrowRight,
  Truck,
  CheckCircle2,
  Lock,
  Layers,
  Clock,
} from 'lucide-react';
import { PageRoute } from '../types/logistics';

interface AboutPageProps {
  onNavigate: (route: PageRoute) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-[#07111F] text-slate-100">
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          PAGE HERO
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative py-20 sm:py-28 bg-[#0A1629] border-b border-slate-800 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-semibold text-amber-400 tracking-wider uppercase">
              Operational Identity &amp; Capabilities
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Delivering Commercial Reliability Across Every Mile
            </h1>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Nexora Logistics provides structured freight transportation designed to maintain the
              velocity and integrity of supply chains through dependable equipment and clear
              accountability.
            </p>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          MISSION & VISION
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-[#0C1A2E] border border-slate-800 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-amber-400/10 text-amber-400 flex items-center justify-center">
                <Target className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-white">Our Mission</h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                To simplify commercial freight transportation by pairing modern fleet operations
                with transparent communication, ensuring every cargo consignment reaches its
                destination securely and predictably.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#0C1A2E] border border-slate-800 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-sky-400/10 text-sky-400 flex items-center justify-center">
                <Compass className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-white">Our Vision</h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                To build an adaptable logistics ecosystem where enterprise shippers enjoy seamless
                dock-to-dock visibility, flexible equipment capacity, and straightforward commercial
                agreements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          BUSINESS APPROACH & EDITORIAL PRESENTATION
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 bg-[#091526] border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Visual */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-slate-700 shadow-2xl">
                <img
                  src="/src/assets/images/warehouse_operations_1793128052009.jpg"
                  alt="Modern logistics facility operations"
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-cover max-h-[460px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#091526] via-transparent to-transparent opacity-70" />
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-slate-900/90 border border-slate-700/80 text-xs">
                  <span className="font-bold text-white block">Standard Operating Protocol</span>
                  <span className="text-slate-400 text-[11px]">
                    Rigorous cargo securement &amp; safety inspections at origin hubs
                  </span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs font-semibold text-amber-400 tracking-wider uppercase">
                  Business Approach
                </span>
                <h2 className="text-3xl font-extrabold text-white mt-2 tracking-tight">
                  Disciplined Operations, Measurable Care
                </h2>
                <p className="text-slate-300 text-sm leading-relaxed mt-3">
                  Every freight load carries customer trust and business commitments. Our approach
                  focuses on eliminating operational ambiguity through proactive status updates,
                  well-maintained equipment, and courteous dispatch coordination.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3.5">
                  <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-white">Direct Linehaul Coordination</h4>
                    <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                      We minimize secondary cross-dock handling whenever possible, reducing cargo
                      handling points and risk of transit distortion.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-white">Fleet Readiness Standards</h4>
                    <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                      All partner tractors and trailers undergo thorough pre-trip inspections, brake
                      calibrations, and securement equipment checks.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-white">Milestone-Based Visibility</h4>
                    <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                      Clear checkpoints from pickup through terminal handoffs, weigh stations, and
                      consignee dock delivery.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          OPERATIONAL VALUES
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-semibold text-amber-400 tracking-wider uppercase">
              Core Principles
            </span>
            <h2 className="text-3xl font-extrabold text-white mt-2 tracking-tight">
              Values That Guide Our Fleet
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-[#0C1A2E] border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-amber-400/10 text-amber-400 flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Punctuality</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Respecting loading dock appointments and consignee arrival windows with strict route
                planning.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0C1A2E] border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-sky-400/10 text-sky-400 flex items-center justify-center">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Cargo Security</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                High-security bolt seals, weatherized tarping, and verified chain lashings on all
                loads.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0C1A2E] border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-400/10 text-emerald-400 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Integrity</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Transparent rate structures without surprise surcharges, and immediate notice if
                corridor weather causes detours.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0C1A2E] border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-purple-400/10 text-purple-400 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Client Focus</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Responsive support tailored to your unique logistics requirements and schedule
                parameters.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          DEMO BRAND TRANSPARENCY NOTICE
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-12 bg-[#091526] border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="text-xs font-mono text-amber-400 uppercase tracking-wider">
            Prototype Customization Notice
          </span>
          <p className="text-xs text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Nexora Logistics is a demonstration brand created for commercial client review. In
            production, this presentation framework effortlessly incorporates your company’s legal
            name, actual fleet certifications, verified operating history, and regional facility
            locations.
          </p>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          CTA STRIP
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-16 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Ready to Plan Your Next Commercial Load?
          </h2>
          <p className="text-slate-400 text-sm">
            Request an instant rate calculation or contact our dispatch team for contract volume
            lanes.
          </p>
          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => onNavigate('quote')}
              className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-colors shadow-md"
            >
              Get a Quote
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs uppercase tracking-wider rounded-xl border border-slate-700 transition-colors"
            >
              Speak to Dispatch
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
