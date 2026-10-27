import React, { useState } from 'react';
import {
  ArrowRight,
  ShieldCheck,
  Search,
  CheckCircle2,
  Clock,
  MapPin,
  ChevronRight,
  Package,
  Layers,
  Cpu,
  Truck,
  Navigation,
  Briefcase,
  Compass,
  FileCheck2,
} from 'lucide-react';
import { PageRoute } from '../types/logistics';
import { SERVICES_CATALOG, CORRIDOR_HUBS, INITIAL_SHIPMENTS } from '../data/mockData';

interface HomePageProps {
  onNavigate: (route: PageRoute) => void;
  onSelectTrackingId?: (trackingId: string) => void;
  onSelectServiceForQuote?: (serviceId: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onSelectTrackingId,
  onSelectServiceForQuote,
}) => {
  const [quickTrackInput, setQuickTrackInput] = useState('');
  const [trackError, setTrackError] = useState('');

  const handleQuickTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanId = quickTrackInput.trim().toUpperCase();
    if (!cleanId) {
      setTrackError('Please enter a tracking ID (e.g. TRK-2026-001)');
      return;
    }
    setTrackError('');
    if (onSelectTrackingId) {
      onSelectTrackingId(cleanId);
    }
    onNavigate('track');
  };

  const handleSampleTrackClick = (sampleId: string) => {
    if (onSelectTrackingId) {
      onSelectTrackingId(sampleId);
    }
    onNavigate('track');
  };

  const handleServiceInquire = (serviceId: string) => {
    if (onSelectServiceForQuote) {
      onSelectServiceForQuote(serviceId);
    }
    onNavigate('quote');
  };

  const iconMap: Record<string, React.ReactNode> = {
    Package: <Package className="w-6 h-6" />,
    Truck: <Truck className="w-6 h-6" />,
    Cpu: <Cpu className="w-6 h-6" />,
    Navigation: <Navigation className="w-6 h-6" />,
    Layers: <Layers className="w-6 h-6" />,
    Briefcase: <Briefcase className="w-6 h-6" />,
  };

  return (
    <div className="min-h-screen text-slate-100 selection:bg-amber-400 selection:text-slate-950">
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          B. HERO SECTION
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative min-h-[88vh] flex items-center justify-center overflow-hidden border-b border-slate-800">
        {/* Background Image with Cinematic Scrim */}
        <div className="absolute inset-0 z-0">
          <img
            src="/src/assets/images/hero_cargo_freight_1793128050585.jpg"
            alt="Nexora Logistics heavy cargo commercial transport truck on highway at dusk"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center scale-105 transform motion-safe:transition-transform motion-safe:duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#07111F] via-[#07111F]/85 to-[#07111F]/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07111F] via-transparent to-[#07111F]/40" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-28 w-full">
          <div className="max-w-3xl space-y-8">
            {/* Context Notice / Tag */}
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-md">
              <Compass className="w-3.5 h-3.5" />
              <span>Commercial Freight &amp; Fleet Transportation</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] text-balance">
              Moving Goods.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500">
                Connecting Businesses.
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-lg sm:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl text-balance">
              Dependable goods transportation and logistics solutions designed to keep your business
              moving, from pickup to final delivery.
            </p>

            {/* Two Main CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={() => onNavigate('quote')}
                className="inline-flex items-center justify-center gap-2 px-7 py-4 text-sm font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 rounded-xl transition-all shadow-lg shadow-amber-500/20 group"
              >
                <span>Get a Quote</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => onNavigate('track')}
                className="inline-flex items-center justify-center gap-2 px-7 py-4 text-sm font-semibold text-white bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 rounded-xl backdrop-blur-sm transition-all hover:border-slate-500"
              >
                <Search className="w-4 h-4 text-slate-300" />
                <span>Track Shipment</span>
              </button>
            </div>

            {/* Hero Quick Track Bar */}
            <div className="pt-6">
              <div className="p-4 rounded-2xl bg-[#0B1728]/90 border border-slate-700/80 backdrop-blur-md shadow-2xl max-w-xl">
                <form onSubmit={handleQuickTrackSubmit} className="flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={quickTrackInput}
                      onChange={(e) => {
                        setQuickTrackInput(e.target.value);
                        if (trackError) setTrackError('');
                      }}
                      placeholder="Enter Tracking ID (e.g. TRK-2026-001)"
                      className="w-full pl-10 pr-3 py-2.5 bg-slate-900/90 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-400 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-lg transition-colors shrink-0"
                  >
                    Track Now
                  </button>
                </form>

                {trackError && <p className="text-xs text-rose-400 mt-2 font-medium">{trackError}</p>}

                {/* Sample Tracking Quick Buttons */}
                <div className="mt-3 pt-3 border-t border-slate-800/80 flex flex-wrap items-center gap-2 text-xs">
                  <span className="text-slate-400">Sample Demo Shipments:</span>
                  {['TRK-2026-001', 'TRK-2026-002', 'TRK-2026-003'].map((sampleId) => (
                    <button
                      key={sampleId}
                      type="button"
                      onClick={() => handleSampleTrackClick(sampleId)}
                      className="font-mono text-amber-300/90 hover:text-amber-200 hover:underline px-1.5 py-0.5 rounded bg-slate-800/80 border border-slate-700/60"
                    >
                      {sampleId}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Trust Indicator Row (Labeled Illustrative Benchmark Metrics) */}
            <div className="pt-4 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-slate-300 text-xs">
              <div>
                <span className="block text-lg font-bold text-white font-mono">99.4%</span>
                <span className="text-slate-400">On-Schedule Transit</span>
              </div>
              <div>
                <span className="block text-lg font-bold text-white font-mono">53ft FTL</span>
                <span className="text-slate-400">Standard Fleet Units</span>
              </div>
              <div>
                <span className="block text-lg font-bold text-white font-mono">24 / 7</span>
                <span className="text-slate-400">Dispatch Coordination</span>
              </div>
              <div>
                <span className="block text-lg font-bold text-white font-mono">100%</span>
                <span className="text-slate-400">Full Cargo In Transit Care</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          C. TRUST / CAPABILITIES STRIP
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="bg-[#0A1626] border-b border-slate-800 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-start gap-3.5 p-4 rounded-xl bg-slate-900/40 border border-slate-800/80">
              <div className="w-10 h-10 rounded-lg bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Reliable Transportation</h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Dedicated linehaul routes and scheduled departure times engineered to prevent
                  transit delays.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-4 rounded-xl bg-slate-900/40 border border-slate-800/80">
              <div className="w-10 h-10 rounded-lg bg-sky-400/10 border border-sky-400/20 flex items-center justify-center text-sky-400 shrink-0">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Flexible Fleet Options</h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  53ft dry vans, heavy-duty flatbeds, reefers, and tautliners tailored to your cargo
                  specifications.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-4 rounded-xl bg-slate-900/40 border border-slate-800/80">
              <div className="w-10 h-10 rounded-lg bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center text-emerald-400 shrink-0">
                <Navigation className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Shipment Visibility</h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Milestone checkpoint updates and verified electronic delivery confirmation on
                  every load.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-4 rounded-xl bg-slate-900/40 border border-slate-800/80">
              <div className="w-10 h-10 rounded-lg bg-purple-400/10 border border-purple-400/20 flex items-center justify-center text-purple-400 shrink-0">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Business-Focused Logistics</h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Dedicated account dispatchers, clear invoicing, and contracts built for commercial
                  volume.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          D. SERVICES SECTION
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 sm:py-28 bg-[#07111F] border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="max-w-2xl mb-14">
            <span className="text-xs font-semibold text-amber-400 tracking-wider uppercase">
              Core Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 tracking-tight">
              Transportation Built Around Your Business
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-3 leading-relaxed">
              From heavy project machinery to high-velocity full truckloads, our transportation
              network provides the capacity and security required for commercial enterprise cargo.
            </p>
          </div>

          {/* Service Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES_CATALOG.map((service) => (
              <div
                key={service.id}
                className="group relative bg-[#0C1A2E] hover:bg-[#10223D] border border-slate-800 hover:border-slate-700 rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-200 hover:shadow-xl hover:shadow-black/30"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-center text-amber-400 group-hover:bg-amber-400/10 group-hover:border-amber-400/30 transition-colors">
                      {iconMap[service.icon] || <Truck className="w-6 h-6" />}
                    </div>
                    <span className="text-xs font-medium text-slate-400 bg-slate-800/60 px-2.5 py-1 rounded-md">
                      {service.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-slate-400 text-sm mt-3 leading-relaxed">
                    {service.shortDesc}
                  </p>

                  <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 font-mono">
                    <span>Capacity: {service.payload}</span>
                    <span>{service.transitTime}</span>
                  </div>
                </div>

                <div className="mt-6 pt-4">
                  <button
                    onClick={() => handleServiceInquire(service.id)}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold text-slate-200 bg-slate-800/70 hover:bg-amber-400 hover:text-slate-950 transition-colors"
                  >
                    <span>Request Quotation</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => onNavigate('services')}
              className="inline-flex items-center gap-2 text-sm font-semibold text-amber-400 hover:text-amber-300 group"
            >
              <span>Explore All Specifications &amp; Fleet Equipment Details</span>
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          E. HOW IT WORKS
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 sm:py-28 bg-[#091526] border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold text-amber-400 tracking-wider uppercase">
              Operational Process
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 tracking-tight">
              Simple, Reliable Transport Execution
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-3">
              A transparent four-step workflow ensuring predictable scheduling and complete cargo
              accountability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            {/* Desktop connecting hairline */}
            <div className="hidden md:block absolute top-14 left-[12%] right-[12%] h-[2px] bg-slate-800 z-0" />

            {[
              {
                step: '01',
                title: 'Request a Quote',
                desc: 'Submit your cargo dimensions, pickup/drop locations, and schedule via our instant quotation portal.',
                icon: <FileCheck2 className="w-5 h-5" />,
              },
              {
                step: '02',
                title: 'Confirm Shipment',
                desc: 'Review rates, lock down capacity, and receive your assigned trailer unit and dedicated dispatch coordinator.',
                icon: <CheckCircle2 className="w-5 h-5" />,
              },
              {
                step: '03',
                title: 'Pickup & Transport',
                desc: 'Inspected vehicle arrives at your loading bay. Cargo is secured with verified seals and departs on designated lane.',
                icon: <Truck className="w-5 h-5" />,
              },
              {
                step: '04',
                title: 'Delivery Confirmation',
                desc: 'Safe unload at consignee dock, electronic Bill of Lading sign-off, and instantaneous receipt generation.',
                icon: <ShieldCheck className="w-5 h-5" />,
              },
            ].map((item, idx) => (
              <div
                key={item.step}
                className="relative z-10 bg-[#0E1E33] border border-slate-800 rounded-2xl p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black text-amber-400 font-mono">
                      {item.step}
                    </span>
                    <div className="w-9 h-9 rounded-lg bg-slate-800/80 flex items-center justify-center text-slate-300">
                      {item.icon}
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-800/60 text-[11px] text-slate-400 font-mono">
                  Phase 0{idx + 1} Execution
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          F. TRANSPORTATION COVERAGE
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 sm:py-28 bg-[#07111F] border-b border-slate-800 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs font-semibold text-amber-400 tracking-wider uppercase">
                  Service Corridors
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 tracking-tight">
                  High-Frequency Freight Lanes
                </h2>
                <p className="text-slate-400 text-sm mt-3 leading-relaxed">
                  Our network operates across major commercial arteries, linking key manufacturing
                  centers, distribution clusters, and inland intermodal terminals.
                </p>
              </div>

              {/* Hub Cards */}
              <div className="space-y-3.5">
                {CORRIDOR_HUBS.map((hub) => (
                  <div
                    key={hub.name}
                    className="p-4 rounded-xl bg-[#0C1A2E] border border-slate-800 hover:border-slate-700 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-white">{hub.name}</h4>
                      <span className="text-xs font-mono text-amber-400">{hub.city}</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1 font-mono">{hub.activeLanes}</p>
                    <p className="text-xs text-slate-400 mt-2">{hub.description}</p>
                  </div>
                ))}
              </div>

              <p className="text-xs text-slate-400 italic">
                *Demo representation of regional service lanes. Routes can be tailored to client’s
                custom delivery footprint.
              </p>
            </div>

            {/* Right Map Visual */}
            <div className="lg:col-span-7">
              <div className="relative rounded-2xl overflow-hidden border border-slate-700/80 shadow-2xl bg-[#091526]">
                <img
                  src="/src/assets/images/tracking_route_network_1793128051731.jpg"
                  alt="Nexora Logistics global and interstate transit corridor visualization"
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-cover max-h-[500px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07111F] via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#07111F]/90 backdrop-blur-md border border-slate-700/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                  <div>
                    <span className="font-semibold text-white block">
                      Active Interstate Freight Network
                    </span>
                    <span className="text-slate-400 text-[11px]">
                      Coordinated via Central Dispatch Systems
                    </span>
                  </div>
                  <button
                    onClick={() => onNavigate('contact')}
                    className="px-3.5 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-lg transition-colors shrink-0"
                  >
                    Inquire Custom Lane
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          G. WHY CHOOSE US (High-contrast editorial section)
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 sm:py-28 bg-[#F5F7FA] text-slate-900 border-b border-slate-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Image Asset */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200">
                <img
                  src="/src/assets/images/warehouse_operations_1793128052009.jpg"
                  alt="Nexora warehouse logistics and organized cargo handling facility"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover max-h-[460px]"
                />
                <div className="absolute bottom-4 left-4 right-4 p-4 bg-white/95 backdrop-blur-md rounded-xl border border-slate-200 text-xs shadow-md">
                  <p className="font-bold text-slate-900">Standardized Handling Procedures</p>
                  <p className="text-slate-600 mt-0.5 text-[11px]">
                    Inspected cross-docks, dedicated pallet lashing, and load stabilization.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Editorial Copy */}
            <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
              <div>
                <span className="text-xs font-bold text-amber-600 tracking-wider uppercase">
                  Operational Standards
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2 tracking-tight">
                  Logistics Grounded in Rigor &amp; Accountability
                </h2>
                <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
                  Transportation is more than moving trailers—it is preserving commitments to your
                  customers. Our operational model prioritizes clear communication, equipment
                  readiness, and meticulous handling.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                <div className="space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-600">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">Clear Communication</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Direct access to dispatch coordinators. You always know the status and expected
                    arrival time of your freight.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-600">
                    <Layers className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">Flexible Transport Solutions</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Adaptable equipment matching your freight requirements, from standard pallets to
                    heavy industrial machinery.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-600">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">Organized Shipment Handling</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Verified tie-down procedures, pre-trip vehicle checks, and weatherproofing
                    protocols on every run.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-600">
                    <Clock className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">Customer-Focused Service</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Flexible appointment windows, responsive quotations, and rapid turnaround for
                    urgent business needs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          H. SHIPMENT TRACKING PREVIEW
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 sm:py-28 bg-[#07111F] border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#0B182B] to-[#0E203B] rounded-3xl border border-slate-800 p-8 sm:p-12 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 space-y-4">
                <span className="text-xs font-semibold text-amber-400 tracking-wider uppercase">
                  Real-Time Visibility
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Track Your Consignment Instantly
                </h2>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Enter your tracking number to inspect origin, transit milestones, carrier unit,
                  and estimated dock delivery time.
                </p>

                {/* Tracking Preview Snippet of TRK-2026-001 */}
                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-amber-400 font-bold">TRK-2026-001</span>
                    <span className="text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded text-[11px] font-medium">
                      In Transit (68%)
                    </span>
                  </div>
                  <p className="text-slate-300 font-medium">
                    Apex Precision Engineering · CNC Vertical Machining Center
                  </p>
                  <p className="text-slate-400 text-[11px]">
                    Current Checkpoint: Little Rock Transit Waypoint, AR en route to Dallas, TX
                  </p>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="bg-[#07111F] p-6 rounded-2xl border border-slate-700/80 space-y-4">
                  <label htmlFor="hp-tracking-input" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Shipment Tracking ID
                  </label>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      id="hp-tracking-input"
                      type="text"
                      value={quickTrackInput}
                      onChange={(e) => setQuickTrackInput(e.target.value)}
                      placeholder="e.g. TRK-2026-001"
                      className="flex-1 px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-400 focus:outline-none focus:border-amber-400"
                    />
                    <button
                      onClick={handleQuickTrackSubmit}
                      className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-colors shrink-0"
                    >
                      Track Now
                    </button>
                  </div>

                  <div className="flex items-center justify-between pt-2 text-xs text-slate-400">
                    <span>Try demo records:</span>
                    <div className="flex gap-2">
                      {INITIAL_SHIPMENTS.slice(0, 3).map((s) => (
                        <button
                          key={s.trackingId}
                          onClick={() => handleSampleTrackClick(s.trackingId)}
                          className="font-mono text-amber-400 hover:underline"
                        >
                          {s.trackingId}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          I. FINAL CTA SECTION
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 sm:py-24 bg-[#050D1A] border-b border-slate-800 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 relative z-10">
          <span className="text-xs font-semibold text-amber-400 tracking-wider uppercase">
            Start Your Shipment
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Ready to Move Your Next Shipment?
          </h2>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Get an instant commercial freight rate estimate or speak directly with our logistics
            dispatch team to configure scheduled linehaul capacity.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => onNavigate('quote')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-lg shadow-amber-500/20 transition-all"
            >
              <span>Get a Freight Quote</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('contact')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-semibold text-white bg-slate-800/80 hover:bg-slate-700 border border-slate-700 rounded-xl transition-all"
            >
              <span>Contact Dispatch</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
