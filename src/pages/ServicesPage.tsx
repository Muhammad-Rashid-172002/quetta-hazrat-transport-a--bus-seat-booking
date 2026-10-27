import React from 'react';
import {
  Package,
  Truck,
  Cpu,
  Navigation,
  Layers,
  Briefcase,
  ArrowRight,
  Shield,
  CheckCircle,
  Clock,
  Scale,
  Gauge,
} from 'lucide-react';
import { PageRoute } from '../types/logistics';
import { SERVICES_CATALOG, VEHICLE_OPTIONS } from '../data/mockData';

interface ServicesPageProps {
  onNavigate: (route: PageRoute) => void;
  onSelectServiceForQuote?: (serviceId: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  onNavigate,
  onSelectServiceForQuote,
}) => {
  const iconMap: Record<string, React.ReactNode> = {
    Package: <Package className="w-7 h-7 text-amber-400" />,
    Truck: <Truck className="w-7 h-7 text-amber-400" />,
    Cpu: <Cpu className="w-7 h-7 text-amber-400" />,
    Navigation: <Navigation className="w-7 h-7 text-amber-400" />,
    Layers: <Layers className="w-7 h-7 text-amber-400" />,
    Briefcase: <Briefcase className="w-7 h-7 text-amber-400" />,
  };

  const handleQuoteClick = (serviceId: string) => {
    if (onSelectServiceForQuote) {
      onSelectServiceForQuote(serviceId);
    }
    onNavigate('quote');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#07111F] text-slate-100">
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          PAGE HERO
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative py-20 sm:py-28 bg-[#0A1629] border-b border-slate-800 overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#F59E0B_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-semibold text-amber-400 tracking-wider uppercase">
              Freight Solutions &amp; Fleet Operations
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Specialized Transportation Engineered for Industry
            </h1>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Tailored linehaul, heavy-haul, and full-capacity commercial transport services
              supported by certified carrier equipment and transparent transit accountability.
            </p>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          FEATURED VISUAL SPOTLIGHT: HEAVY & FLEET CAPACITIES
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-16 sm:py-20 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* Spotlight 1: Heavy Haul */}
            <div className="group rounded-2xl bg-[#0D1C30] border border-slate-800 overflow-hidden flex flex-col justify-between">
              <div className="relative h-64 sm:h-72 overflow-hidden">
                <img
                  src="/src/assets/images/service_heavy_transport_1793128051350.jpg"
                  alt="Nexora specialized heavy flatbed transport with industrial apparatus"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D1C30] via-[#0D1C30]/40 to-transparent" />
                <span className="absolute top-4 left-4 text-xs font-bold px-3 py-1 bg-amber-400 text-slate-950 rounded-md uppercase tracking-wider">
                  Heavy &amp; Industrial Haul
                </span>
              </div>
              <div className="p-6 sm:p-8 space-y-4">
                <h3 className="text-xl font-bold text-white">
                  Permitted Heavy &amp; Oversize Freight
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Equipped with multi-axle lowboys, step-decks, and heavy flatbeds capable of
                  accommodating single loads up to 80,000+ lbs. We manage state line permits, route
                  surveys, and pilot escorts.
                </p>
                <div className="pt-2 flex flex-wrap gap-4 text-xs text-slate-400 font-mono">
                  <span>· Certified DOT Rigging</span>
                  <span>· 4-Point Chain Lashings</span>
                  <span>· Engineered Axle Loading</span>
                </div>
              </div>
            </div>

            {/* Spotlight 2: Fleet Terminal */}
            <div className="group rounded-2xl bg-[#0D1C30] border border-slate-800 overflow-hidden flex flex-col justify-between">
              <div className="relative h-64 sm:h-72 overflow-hidden">
                <img
                  src="/src/assets/images/service_fleet_logistics_1793128051407.jpg"
                  alt="Nexora modern commercial transport fleet lined at distribution terminal"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D1C30] via-[#0D1C30]/40 to-transparent" />
                <span className="absolute top-4 left-4 text-xs font-bold px-3 py-1 bg-sky-400 text-slate-950 rounded-md uppercase tracking-wider">
                  Full Truckload &amp; Linehaul
                </span>
              </div>
              <div className="p-6 sm:p-8 space-y-4">
                <h3 className="text-xl font-bold text-white">
                  Scheduled Linehaul &amp; Dedicated Fleet
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  High-velocity scheduled trailer runs between major manufacturing hubs. Clean,
                  air-ride 53ft trailers dedicated exclusively to your goods for zero-transshipment
                  security.
                </p>
                <div className="pt-2 flex flex-wrap gap-4 text-xs text-slate-400 font-mono">
                  <span>· Point-to-Point Express</span>
                  <span>· GPS Sealed Containers</span>
                  <span>· Guaranteed Dock Windows</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          DETAILED SERVICE SECTIONS
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 bg-[#091526] border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-14">
            <span className="text-xs font-semibold text-amber-400 tracking-wider uppercase">
              Service Directory
            </span>
            <h2 className="text-3xl font-extrabold text-white mt-2 tracking-tight">
              Comprehensive Cargo Capabilities
            </h2>
            <p className="text-slate-400 text-sm mt-3">
              Review detailed specifications, equipment allocations, and transit expectations for
              each transport category.
            </p>
          </div>

          <div className="space-y-8">
            {SERVICES_CATALOG.map((service, index) => (
              <div
                key={service.id}
                className="bg-[#0C1A2E] border border-slate-800 rounded-2xl p-6 sm:p-8 hover:border-slate-700 transition-colors"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Left Column: Info & Description */}
                  <div className="lg:col-span-7 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-center">
                        {iconMap[service.icon]}
                      </div>
                      <div>
                        <span className="text-xs font-mono text-amber-400">0{index + 1} //</span>
                        <h3 className="text-xl font-bold text-white">{service.title}</h3>
                      </div>
                    </div>

                    <p className="text-slate-300 text-sm leading-relaxed">{service.fullDesc}</p>

                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                        <span className="block text-[11px] text-slate-400 uppercase tracking-wider">
                          Max Payload Limit
                        </span>
                        <span className="text-sm font-bold text-white font-mono mt-0.5 block">
                          {service.payload}
                        </span>
                      </div>
                      <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                        <span className="block text-[11px] text-slate-400 uppercase tracking-wider">
                          Standard Transit Time
                        </span>
                        <span className="text-sm font-bold text-white font-mono mt-0.5 block">
                          {service.transitTime}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Features & Action */}
                  <div className="lg:col-span-5 bg-slate-900/40 p-5 rounded-xl border border-slate-800 flex flex-col justify-between h-full space-y-4">
                    <div>
                      <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">
                        Operational Inclusions
                      </h4>
                      <ul className="space-y-2 text-xs text-slate-300">
                        {service.features.map((feat) => (
                          <li key={feat} className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4 border-t border-slate-800/80">
                      <button
                        onClick={() => handleQuoteClick(service.id)}
                        className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 transition-colors flex items-center justify-center gap-2"
                      >
                        <span>Inquire {service.title}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          FLEET EQUIPMENT SPECIFICATIONS
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 bg-[#07111F] border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-semibold text-amber-400 tracking-wider uppercase">
              Fleet Standards
            </span>
            <h2 className="text-3xl font-extrabold text-white mt-2 tracking-tight">
              Modern Transport Equipment Specs
            </h2>
            <p className="text-slate-400 text-sm mt-3">
              Our fleet configurations meet strict DOT compliance and interstate cargo safety
              guidelines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {VEHICLE_OPTIONS.map((veh) => (
              <div
                key={veh.id}
                className="bg-[#0C1A2E] border border-slate-800 rounded-xl p-6 space-y-4 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-lg bg-amber-400/10 text-amber-400 flex items-center justify-center">
                    <Truck className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono text-slate-400">{veh.capacityLbs}</span>
                </div>

                <h3 className="text-base font-bold text-white">{veh.name}</h3>

                <p className="text-xs text-slate-400 leading-relaxed">{veh.suitableFor}</p>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>Baseline Rate Index:</span>
                  <span className="text-amber-400 font-bold">${veh.baseRatePerMile.toFixed(2)} / mi</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          BOTTOM CALL TO ACTION
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 bg-[#0A1629] text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
          <h2 className="text-3xl font-extrabold text-white">
            Need a Specialized Transportation Agreement?
          </h2>
          <p className="text-slate-300 text-sm max-w-xl mx-auto">
            Discuss customized volume commitments, recurring lane schedules, or multi-stop
            distribution with our freight engineering group.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => onNavigate('quote')}
              className="w-full sm:w-auto px-7 py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm rounded-xl shadow-lg transition-colors"
            >
              Get Instant Rate Estimate
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="w-full sm:w-auto px-7 py-3.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm rounded-xl border border-slate-700 transition-colors"
            >
              Contact Dispatch Office
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
