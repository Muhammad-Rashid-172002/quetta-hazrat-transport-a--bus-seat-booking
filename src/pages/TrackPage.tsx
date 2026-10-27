import React, { useState, useEffect } from 'react';
import {
  Search,
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  AlertCircle,
  FileText,
  Calendar,
  Scale,
  ShieldCheck,
  User,
  ArrowRight,
  Info,
} from 'lucide-react';
import { PageRoute, ShipmentRecord, ShipmentStatus } from '../types/logistics';
import { INITIAL_SHIPMENTS } from '../data/mockData';

interface TrackPageProps {
  onNavigate: (route: PageRoute) => void;
  initialTrackingId?: string;
}

export const TrackPage: React.FC<TrackPageProps> = ({ onNavigate, initialTrackingId }) => {
  const [searchInput, setSearchInput] = useState(initialTrackingId || 'TRK-2026-001');
  const [activeTrackingId, setActiveTrackingId] = useState(initialTrackingId || 'TRK-2026-001');
  const [activeShipment, setActiveShipment] = useState<ShipmentRecord | null>(null);
  const [hasSearched, setHasSearched] = useState(true);

  // Sync with initialTrackingId prop if it changes
  useEffect(() => {
    if (initialTrackingId) {
      setSearchInput(initialTrackingId);
      setActiveTrackingId(initialTrackingId);
    }
  }, [initialTrackingId]);

  useEffect(() => {
    const query = activeTrackingId.trim().toUpperCase();
    const found = INITIAL_SHIPMENTS.find((s) => s.trackingId.toUpperCase() === query);
    setActiveShipment(found || null);
    setHasSearched(true);
  }, [activeTrackingId]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    setActiveTrackingId(searchInput.trim().toUpperCase());
  };

  const handleSelectSample = (id: string) => {
    setSearchInput(id);
    setActiveTrackingId(id);
  };

  const getStatusBadge = (status: ShipmentStatus) => {
    switch (status) {
      case 'in_transit':
        return {
          label: 'In Transit',
          bg: 'bg-amber-400/10 text-amber-400 border-amber-400/30',
          dot: 'bg-amber-400',
        };
      case 'delivered':
        return {
          label: 'Delivered in Full',
          bg: 'bg-emerald-400/10 text-emerald-400 border-emerald-400/30',
          dot: 'bg-emerald-400',
        };
      case 'confirmed':
        return {
          label: 'Confirmed / Loading',
          bg: 'bg-sky-400/10 text-sky-400 border-sky-400/30',
          dot: 'bg-sky-400',
        };
      case 'pending_dispatch':
      default:
        return {
          label: 'Pending Dispatch',
          bg: 'bg-slate-400/10 text-slate-300 border-slate-700',
          dot: 'bg-slate-400',
        };
    }
  };

  return (
    <div className="min-h-screen bg-[#07111F] text-slate-100 py-12 sm:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-md">
            <Clock className="w-3.5 h-3.5" />
            <span>Interactive Consignment Tracking</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Track Your Consignment
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Enter your shipment tracking ID to monitor departure status, carrier unit assignments,
            and waypoint milestones.
          </p>
        </div>

        {/* Demo Notice Banner */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-400 flex items-start gap-3">
          <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-slate-200">Demonstration Tracking System:</strong> Records
            displayed here represent simulated freight movements to illustrate milestone-based
            reporting. In production, milestone events sync via driver telematics and terminal gate
            scanners.
          </p>
        </div>

        {/* Search Bar & Sample ID Picker */}
        <div className="bg-[#0C1A2E] border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Enter Tracking ID (e.g. TRK-2026-001)"
                className="w-full pl-11 pr-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-400 focus:outline-none focus:border-amber-400 font-mono"
              />
            </div>
            <button
              type="submit"
              className="px-7 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-colors shrink-0"
            >
              Track Shipment
            </button>
          </form>

          {/* Quick Select Buttons */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800/80 text-xs">
            <span className="text-slate-400">Available Demo Consignments:</span>
            {INITIAL_SHIPMENTS.slice(0, 4).map((s) => (
              <button
                key={s.trackingId}
                onClick={() => handleSelectSample(s.trackingId)}
                className={`font-mono px-2.5 py-1 rounded-lg border transition-all ${
                  activeTrackingId === s.trackingId
                    ? 'bg-amber-400/20 text-amber-300 border-amber-400/50 font-bold'
                    : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-600'
                }`}
              >
                {s.trackingId} ({s.status.replace('_', ' ')})
              </button>
            ))}
          </div>
        </div>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            SHIPMENT RESULT DISPLAY
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {activeShipment ? (
          <div className="bg-[#0C1A2E] border border-slate-800 rounded-2xl p-6 sm:p-10 shadow-2xl space-y-8 animate-in fade-in duration-200">
            {/* Top Bar with ID & Status */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div>
                <span className="text-xs font-mono text-slate-400 block">Consignment Reference</span>
                <h2 className="text-2xl font-black text-white font-mono tracking-tight mt-0.5">
                  {activeShipment.trackingId}
                </h2>
                <p className="text-xs text-slate-400 mt-1 font-medium">
                  Client: <span className="text-slate-200">{activeShipment.customerName}</span> (
                  {activeShipment.customerCompany})
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold border ${
                    getStatusBadge(activeShipment.status).bg
                  }`}
                >
                  {getStatusBadge(activeShipment.status).label}
                </span>
              </div>
            </div>

            {/* Key Transit Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                <span className="text-xs text-slate-400 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>Origin Terminal</span>
                </span>
                <p className="text-sm font-bold text-white">{activeShipment.origin}</p>
                <p className="text-[11px] text-slate-400 font-mono">{activeShipment.originHub}</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                <span className="text-xs text-slate-400 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Destination Dock</span>
                </span>
                <p className="text-sm font-bold text-white">{activeShipment.destination}</p>
                <p className="text-[11px] text-slate-400 font-mono">
                  {activeShipment.destinationHub}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                <span className="text-xs text-slate-400 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-sky-400" />
                  <span>
                    {activeShipment.status === 'delivered' ? 'Delivered At' : 'Estimated Delivery'}
                  </span>
                </span>
                <p className="text-sm font-bold text-white font-mono">
                  {activeShipment.actualDelivery || activeShipment.estimatedDelivery}
                </p>
                <p className="text-[11px] text-slate-400">
                  Booked: {activeShipment.bookingDate}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                <span className="text-xs text-slate-400 flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-purple-400" />
                  <span>Assigned Unit</span>
                </span>
                <p className="text-sm font-bold text-white">{activeShipment.vehicleType}</p>
                <p className="text-[11px] text-slate-400 font-mono">
                  Plate: {activeShipment.vehiclePlate} · {activeShipment.driverName}
                </p>
              </div>
            </div>

            {/* Cargo Manifest Card */}
            <div className="p-5 rounded-xl bg-[#091526] border border-slate-800/80 space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Cargo Manifest Specifications
              </span>
              <p className="text-sm font-medium text-white">{activeShipment.goodsDescription}</p>
              <div className="flex flex-wrap gap-4 pt-1 text-xs text-slate-400 font-mono">
                <span>Category: {activeShipment.goodsCategory}</span>
                <span>·</span>
                <span>Weight: {activeShipment.weightLbs.toLocaleString()} lbs ({activeShipment.weightTons} Tons)</span>
                {activeShipment.specialInstructions && (
                  <>
                    <span>·</span>
                    <span className="text-amber-300">Instructions: {activeShipment.specialInstructions}</span>
                  </>
                )}
              </div>
            </div>

            {/* Overall Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-slate-400">Transit Completion Progress</span>
                <span className="font-mono text-amber-400">{activeShipment.progressPercent}%</span>
              </div>
              <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    activeShipment.status === 'delivered' ? 'bg-emerald-400' : 'bg-amber-400'
                  }`}
                  style={{ width: `${activeShipment.progressPercent}%` }}
                />
              </div>
            </div>

            {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                VISUAL PROGRESS TIMELINE
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
            <div className="space-y-6 pt-2">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>Transit Milestone Log</span>
              </h3>

              <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-3 sm:before:left-4 before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-800">
                {activeShipment.milestones.map((milestone, idx) => {
                  return (
                    <div key={milestone.id} className="relative group">
                      {/* Milestone Icon Node */}
                      <div
                        className={`absolute -left-6 sm:-left-8 top-0.5 w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 flex items-center justify-center transition-colors ${
                          milestone.completed
                            ? 'bg-emerald-500/20 border-emerald-400 text-emerald-400'
                            : milestone.current
                            ? 'bg-amber-500/20 border-amber-400 text-amber-400'
                            : 'bg-slate-900 border-slate-700 text-slate-400'
                        }`}
                      >
                        {milestone.completed ? (
                          <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        ) : milestone.current ? (
                          <Truck className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        ) : (
                          <span className="w-2 h-2 rounded-full bg-slate-600" />
                        )}
                      </div>

                      {/* Milestone Content */}
                      <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 hover:border-slate-700 transition-colors space-y-1">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                          <h4 className="text-sm font-bold text-white flex items-center gap-2">
                            <span>{milestone.title}</span>
                            {milestone.current && (
                              <span className="text-[10px] font-mono font-bold bg-amber-400 text-slate-950 px-2 py-0.5 rounded-full uppercase">
                                Current Active Leg
                              </span>
                            )}
                          </h4>
                          <span className="text-xs font-mono text-slate-400">
                            {milestone.timestamp}
                          </span>
                        </div>

                        <p className="text-xs text-slate-300 font-medium">{milestone.location}</p>

                        {milestone.notes && (
                          <p className="text-xs text-slate-400 pt-1 leading-relaxed border-t border-slate-800/60 mt-2">
                            {milestone.notes}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-slate-400">
                Have questions regarding delivery appointment?
              </span>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() => onNavigate('contact')}
                  className="w-full sm:w-auto px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs rounded-xl border border-slate-700 transition-colors"
                >
                  Contact Dispatch Desk
                </button>
                <button
                  onClick={() => onNavigate('quote')}
                  className="w-full sm:w-auto px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl transition-colors"
                >
                  Book Next Consignment
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
              NOT FOUND STATE
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
          <div className="bg-[#0C1A2E] border border-slate-800 rounded-2xl p-8 sm:p-12 text-center space-y-5">
            <div className="w-14 h-14 rounded-2xl bg-rose-500/10 text-rose-400 border border-rose-500/20 flex items-center justify-center mx-auto">
              <AlertCircle className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-white">Consignment Reference Not Found</h3>
            <p className="text-slate-400 text-sm max-w-md mx-auto leading-relaxed">
              No shipment record matched tracking ID &quot;
              <span className="font-mono text-white font-bold">{searchInput}</span>&quot;. Please
              verify your Bill of Lading reference or test one of the active demo records below.
            </p>

            <div className="flex flex-wrap justify-center gap-3 pt-2">
              {INITIAL_SHIPMENTS.slice(0, 3).map((sample) => (
                <button
                  key={sample.trackingId}
                  onClick={() => handleSelectSample(sample.trackingId)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-xs font-mono text-amber-400 transition-colors"
                >
                  Load {sample.trackingId} ({sample.status})
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
