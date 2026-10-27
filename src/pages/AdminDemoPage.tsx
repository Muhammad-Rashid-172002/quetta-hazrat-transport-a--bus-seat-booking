import React, { useState, useMemo } from 'react';
import {
  LayoutDashboard,
  Truck,
  Package,
  Users,
  FileText,
  DollarSign,
  TrendingUp,
  Settings,
  Shield,
  Search,
  Filter,
  Eye,
  Plus,
  RefreshCw,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  MapPin,
  Calendar,
  AlertCircle,
  CheckCircle2,
  Clock,
  Layers,
  Fuel,
  Info,
} from 'lucide-react';
import { PageRoute, ShipmentRecord, ShipmentStatus } from '../types/logistics';
import { INITIAL_SHIPMENTS, TMS_SUMMARY_STATS, VEHICLE_OPTIONS } from '../data/mockData';

interface AdminDemoPageProps {
  onNavigate: (route: PageRoute) => void;
}

type SidebarTab =
  | 'overview'
  | 'shipments'
  | 'bookings'
  | 'customers'
  | 'vehicles'
  | 'drivers'
  | 'invoices'
  | 'expenses'
  | 'reports'
  | 'settings';

export const AdminDemoPage: React.FC<AdminDemoPageProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<SidebarTab>('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Shipments state (allows testing dynamic addition, status toggle, and reset)
  const [shipments, setShipments] = useState<ShipmentRecord[]>(INITIAL_SHIPMENTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | ShipmentStatus>('all');
  const [selectedShipment, setSelectedShipment] = useState<ShipmentRecord | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // New Shipment form state for the Add Modal
  const [newShipmentData, setNewShipmentData] = useState({
    customerName: '',
    customerCompany: '',
    origin: '',
    destination: '',
    goodsDescription: '',
    vehicleType: '53ft Dry Van Semi-Trailer',
    driverName: 'Carrier Dispatch Pool',
    status: 'pending_dispatch' as ShipmentStatus,
  });

  // Filtered shipments
  const filteredShipments = useMemo(() => {
    return shipments.filter((item) => {
      const matchesSearch =
        searchQuery === '' ||
        item.trackingId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.destination.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === 'all' || item.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [shipments, searchQuery, statusFilter]);

  const handleResetData = () => {
    setShipments(INITIAL_SHIPMENTS);
    setSearchQuery('');
    setStatusFilter('all');
  };

  const handleCreateShipment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newShipmentData.customerName || !newShipmentData.origin || !newShipmentData.destination) {
      return;
    }

    const nextId = shipments.length + 1;
    const formattedId = `TRK-2026-${String(nextId).padStart(3, '0')}`;
    const newRecord: ShipmentRecord = {
      id: `shp-${nextId}`,
      trackingId: formattedId,
      customerName: newShipmentData.customerName,
      customerCompany: newShipmentData.customerCompany || 'Commercial Shipper',
      origin: newShipmentData.origin,
      originHub: 'Origin Linehaul Hub',
      destination: newShipmentData.destination,
      destinationHub: 'Destination Terminal',
      goodsCategory: 'Commercial Merchandise',
      goodsDescription: newShipmentData.goodsDescription || 'Standard palletized freight',
      weightLbs: 24000,
      weightTons: 12,
      vehicleType: newShipmentData.vehicleType,
      vehiclePlate: 'US-DEMO-9912',
      driverName: newShipmentData.driverName,
      bookingDate: '2026-10-27',
      pickupDate: '2026-10-28 08:00',
      estimatedDelivery: '2026-10-30 16:00',
      status: newShipmentData.status,
      progressPercent: newShipmentData.status === 'in_transit' ? 45 : 10,
      milestones: [
        {
          id: 'm1',
          title: 'Order Created in TMS Console',
          location: newShipmentData.origin,
          timestamp: 'Oct 27, 2026 · Dispatch Desk',
          completed: true,
          notes: 'Dispatched manually via TMS administration console demonstration.',
        },
      ],
    };

    setShipments([newRecord, ...shipments]);
    setShowAddModal(false);
    setNewShipmentData({
      customerName: '',
      customerCompany: '',
      origin: '',
      destination: '',
      goodsDescription: '',
      vehicleType: '53ft Dry Van Semi-Trailer',
      driverName: 'Carrier Dispatch Pool',
      status: 'pending_dispatch',
    });
  };

  const getStatusBadge = (status: ShipmentStatus) => {
    switch (status) {
      case 'in_transit':
        return 'bg-amber-400/15 text-amber-400 border border-amber-400/30';
      case 'delivered':
        return 'bg-emerald-400/15 text-emerald-400 border border-emerald-400/30';
      case 'confirmed':
        return 'bg-sky-400/15 text-sky-400 border border-sky-400/30';
      case 'pending_dispatch':
      default:
        return 'bg-slate-400/15 text-slate-300 border border-slate-700';
    }
  };

  const sidebarItems: { id: SidebarTab; label: string; icon: React.ReactNode }[] = [
    { id: 'overview', label: 'Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'shipments', label: 'Shipments', icon: <Package className="w-4 h-4" /> },
    { id: 'bookings', label: 'Bookings', icon: <Calendar className="w-4 h-4" /> },
    { id: 'customers', label: 'Customers', icon: <Users className="w-4 h-4" /> },
    { id: 'vehicles', label: 'Vehicles & Fleet', icon: <Truck className="w-4 h-4" /> },
    { id: 'drivers', label: 'Drivers', icon: <Shield className="w-4 h-4" /> },
    { id: 'invoices', label: 'Invoices', icon: <FileText className="w-4 h-4" /> },
    { id: 'expenses', label: 'Expenses & Fuel', icon: <Fuel className="w-4 h-4" /> },
    { id: 'reports', label: 'Analytics Reports', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'settings', label: 'TMS Settings', icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-[#07111F] text-slate-100 flex flex-col font-sans">
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          TOP SYSTEM BAR
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <header className="h-16 bg-[#081424] border-b border-slate-800 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 shadow-md">
        <div className="flex items-center gap-3">
          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800"
            aria-label="Toggle Sidebar Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Brand & Breadcrumb */}
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
              <Truck className="w-4 h-4" />
            </div>
            <span className="font-extrabold text-sm sm:text-base tracking-tight text-white">
              NEXORA <span className="text-amber-400 font-semibold">TMS</span>
            </span>
            <span className="text-slate-400">/</span>
            <span className="text-xs sm:text-sm text-slate-300 font-medium capitalize">
              {activeTab === 'overview' ? 'Operational Command' : activeTab}
            </span>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              onNavigate('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800/80 border border-slate-700 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Exit to Main Site</span>
            <span className="sm:hidden">Exit</span>
          </button>

          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 transition-colors shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">New Shipment</span>
          </button>
        </div>
      </header>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          MAIN WORKSPACE LAYOUT (SIDEBAR + CONTENT)
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Sidebar */}
        <aside
          className={`hidden md:flex flex-col justify-between bg-[#081424] border-r border-slate-800 transition-all duration-200 ${
            sidebarCollapsed ? 'w-16' : 'w-60'
          }`}
        >
          {/* Navigation Links */}
          <div className="p-3 space-y-1">
            {sidebarItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  title={sidebarCollapsed ? item.label : undefined}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-amber-400/15 text-amber-400 border border-amber-400/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  <div className="shrink-0">{item.icon}</div>
                  {!sidebarCollapsed && <span className="truncate">{item.label}</span>}
                </button>
              );
            })}
          </div>

          {/* Bottom collapse button */}
          <div className="p-3 border-t border-slate-800/80">
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="w-full flex items-center justify-center p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title={sidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
            >
              {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          </div>
        </aside>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-40 bg-[#07111F]/90 backdrop-blur-md flex flex-col p-4 animate-in fade-in">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <span className="text-sm font-bold text-white">TMS Modules</span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 py-4 space-y-1 overflow-y-auto">
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                    activeTab === item.id
                      ? 'bg-amber-400/20 text-amber-400 border border-amber-400/30'
                      : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
            <div className="pt-4 border-t border-slate-800">
              <button
                onClick={() => onNavigate('home')}
                className="w-full py-2.5 bg-slate-800 text-white rounded-xl text-xs font-semibold"
              >
                Exit to Client Website
              </button>
            </div>
          </div>
        )}

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            MAIN CONTENT AREA
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
          {/* Demo Indicator Notice */}
          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-amber-500/30 text-xs text-slate-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                <strong>Transport Management System Preview:</strong> Demonstration interface showing
                sample fleet dispatches, consignment tables, and live state updates.
              </span>
            </div>
            <button
              onClick={handleResetData}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-amber-400 shrink-0"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Demo Records</span>
            </button>
          </div>

          {/* Conditional View by Active Tab */}
          {activeTab === 'overview' || activeTab === 'shipments' ? (
            <>
              {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                  KPI SUMMARY CARDS (4 Essential Metrics)
              ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl bg-[#0C1A2E] border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-medium uppercase tracking-wider">Total Shipments</span>
                    <Package className="w-4 h-4 text-sky-400" />
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl font-black text-white font-mono">
                      {TMS_SUMMARY_STATS.totalShipments.toLocaleString()}
                    </span>
                    <span className="text-[11px] font-mono text-emerald-400 font-semibold">+8.4% MoM</span>
                  </div>
                  <p className="text-[11px] text-slate-400">Total freight loads coordinated to date</p>
                </div>

                <div className="p-5 rounded-2xl bg-[#0C1A2E] border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-medium uppercase tracking-wider">Active Deliveries</span>
                    <Truck className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl font-black text-white font-mono">
                      {TMS_SUMMARY_STATS.activeDeliveries}
                    </span>
                    <span className="text-[11px] font-mono text-amber-400 font-semibold">12 En Route</span>
                  </div>
                  <p className="text-[11px] text-slate-400">Consignments presently moving on highway</p>
                </div>

                <div className="p-5 rounded-2xl bg-[#0C1A2E] border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-medium uppercase tracking-wider">Available Fleet</span>
                    <Layers className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl font-black text-white font-mono">
                      {TMS_SUMMARY_STATS.availableVehicles}
                    </span>
                    <span className="text-[11px] font-mono text-emerald-400 font-semibold">91.8% Utilized</span>
                  </div>
                  <p className="text-[11px] text-slate-400">Units ready for immediate dispatch assignment</p>
                </div>

                <div className="p-5 rounded-2xl bg-[#0C1A2E] border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-medium uppercase tracking-wider">On-Time Transit</span>
                    <CheckCircle2 className="w-4 h-4 text-purple-400" />
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl font-black text-white font-mono">
                      {TMS_SUMMARY_STATS.onTimeTransitRate}
                    </span>
                    <span className="text-[11px] font-mono text-emerald-400 font-semibold">Corridor High</span>
                  </div>
                  <p className="text-[11px] text-slate-400">Dock arrival punctuality rating</p>
                </div>
              </div>

              {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                  ILLUSTRATIVE WEEKLY FREIGHT ACTIVITY CHART (SVG)
              ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
              {activeTab === 'overview' && (
                <div className="p-5 sm:p-6 rounded-2xl bg-[#0C1A2E] border border-slate-800 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h3 className="text-sm font-bold text-white">Corridor Freight Volume (Last 7 Days)</h3>
                      <p className="text-xs text-slate-400">Daily dispatched tonnage across active hub lanes</p>
                    </div>
                    <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
                      <span className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-sm bg-amber-400 inline-block" />
                        <span>FTL Van Loads</span>
                      </span>
                      <span className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-sm bg-sky-400 inline-block" />
                        <span>Heavy Flatbed</span>
                      </span>
                    </div>
                  </div>

                  {/* Responsive Chart Bars */}
                  <div className="h-44 flex items-end justify-between gap-2 sm:gap-6 pt-6 pb-2 border-b border-slate-800">
                    {[
                      { day: 'Mon', van: 65, flatbed: 40, tons: '142T' },
                      { day: 'Tue', van: 80, flatbed: 55, tons: '185T' },
                      { day: 'Wed', van: 92, flatbed: 70, tons: '210T' },
                      { day: 'Thu', van: 85, flatbed: 60, tons: '194T' },
                      { day: 'Fri', van: 100, flatbed: 75, tons: '240T' },
                      { day: 'Sat', van: 50, flatbed: 35, tons: '115T' },
                      { day: 'Sun', van: 35, flatbed: 20, tons: '82T' },
                    ].map((bar) => (
                      <div key={bar.day} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                        <span className="text-[10px] font-mono text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity">
                          {bar.tons}
                        </span>
                        <div className="w-full max-w-[36px] flex gap-1 items-end h-full justify-center">
                          <div
                            className="w-1/2 bg-amber-400 hover:bg-amber-300 rounded-t transition-all"
                            style={{ height: `${bar.van}%` }}
                            title={`${bar.day} FTL: ${bar.van}% peak`}
                          />
                          <div
                            className="w-1/2 bg-sky-400 hover:bg-sky-300 rounded-t transition-all"
                            style={{ height: `${bar.flatbed}%` }}
                            title={`${bar.day} Heavy: ${bar.flatbed}% peak`}
                          />
                        </div>
                        <span className="text-[11px] font-mono text-slate-400">{bar.day}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                  RECENT SHIPMENTS DATA TABLE
              ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
              <div className="bg-[#0C1A2E] border border-slate-800 rounded-2xl shadow-xl overflow-hidden space-y-4 p-5 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-base font-bold text-white">Active Freight Manifests</h3>
                    <p className="text-xs text-slate-400">
                      Showing {filteredShipments.length} of {shipments.length} total demo consignments
                    </p>
                  </div>

                  {/* Filter tabs */}
                  <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-900 rounded-xl border border-slate-800 text-xs">
                    {(['all', 'in_transit', 'confirmed', 'delivered', 'pending_dispatch'] as const).map(
                      (status) => (
                        <button
                          key={status}
                          onClick={() => setStatusFilter(status)}
                          className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                            statusFilter === status
                              ? 'bg-amber-400 text-slate-950 font-bold'
                              : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          {status === 'all'
                            ? 'All'
                            : status === 'in_transit'
                            ? 'In Transit'
                            : status === 'pending_dispatch'
                            ? 'Pending'
                            : status.charAt(0).toUpperCase() + status.slice(1)}
                        </button>
                      )
                    )}
                  </div>
                </div>

                {/* Search Bar */}
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by ID, customer, pickup city, or delivery destination..."
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-amber-400 font-sans"
                  />
                </div>

                {/* Table Container (Responsive) */}
                <div className="overflow-x-auto -mx-5 sm:-mx-6 px-5 sm:px-6">
                  <table className="w-full text-left text-xs text-slate-300 min-w-[760px]">
                    <thead className="bg-slate-900/80 text-slate-400 uppercase font-mono tracking-wider border-y border-slate-800">
                      <tr>
                        <th className="py-3 px-4">Shipment ID</th>
                        <th className="py-3 px-4">Customer</th>
                        <th className="py-3 px-4">Origin / Hub</th>
                        <th className="py-3 px-4">Destination</th>
                        <th className="py-3 px-4">Vehicle Unit</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4">Est. Delivery</th>
                        <th className="py-3 px-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {filteredShipments.length > 0 ? (
                        filteredShipments.map((shp) => (
                          <tr
                            key={shp.id}
                            className="hover:bg-slate-900/40 transition-colors group"
                          >
                            <td className="py-3.5 px-4 font-mono font-bold text-amber-400">
                              {shp.trackingId}
                            </td>
                            <td className="py-3.5 px-4">
                              <span className="font-semibold text-white block">{shp.customerName}</span>
                              <span className="text-[11px] text-slate-400 truncate max-w-[140px] block">
                                {shp.goodsDescription}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 font-medium text-slate-200">
                              {shp.origin.split(' (')[0]}
                            </td>
                            <td className="py-3.5 px-4 font-medium text-slate-200">
                              {shp.destination.split(' (')[0]}
                            </td>
                            <td className="py-3.5 px-4">
                              <span className="text-slate-300 block">{shp.vehicleType.split(' ')[0]}</span>
                              <span className="text-[10px] text-slate-400 font-mono">
                                {shp.driverName.split(' (')[0]}
                              </span>
                            </td>
                            <td className="py-3.5 px-4">
                              <span
                                className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${getStatusBadge(
                                  shp.status
                                )}`}
                              >
                                {shp.status.replace('_', ' ')}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 font-mono text-slate-300">
                              {shp.actualDelivery || shp.estimatedDelivery.split(' ')[0]}
                            </td>
                            <td className="py-3.5 px-4 text-right">
                              <button
                                onClick={() => setSelectedShipment(shp)}
                                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium transition-colors text-[11px]"
                              >
                                <Eye className="w-3.5 h-3.5 text-amber-400" />
                                <span>Inspect</span>
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={8} className="py-12 text-center text-slate-400">
                            No shipments matched search &quot;{searchQuery}&quot;. Try resetting filters.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          ) : (
            /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                ROADMAP PLACEHOLDER FOR UPCOMING MODULES (Bookings, Vehicles, Invoices etc)
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
            <div className="bg-[#0C1A2E] border border-slate-800 rounded-2xl p-8 sm:p-12 text-center space-y-5">
              <div className="w-14 h-14 rounded-2xl bg-sky-500/10 text-sky-400 border border-sky-500/20 flex items-center justify-center mx-auto">
                <Settings className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white capitalize">
                TMS Module Preview: {activeTab}
              </h3>
              <p className="text-slate-400 text-sm max-w-lg mx-auto leading-relaxed">
                This enterprise TMS component is part of Phase 2 system deployment. In production, this
                module integrates directly with your telematics hardware, automated invoicing, or
                payroll accounting system.
              </p>

              <div className="max-w-md mx-auto p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-left text-slate-300 space-y-2">
                <span className="font-semibold text-amber-400 block uppercase tracking-wider text-[11px]">
                  Planned System Capabilities
                </span>
                <p>· Automated electronic data interchange (EDI 204/214) feeds</p>
                <p>· Driver hours of service (HOS) &amp; ELD compliance sync</p>
                <p>· Multi-currency freight invoicing and factoring integration</p>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setActiveTab('overview')}
                  className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-colors"
                >
                  Return to Active Manifests
                </button>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          MODAL: INSPECT SHIPMENT DETAILS
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {selectedShipment && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
          <div className="bg-[#0C1A2E] border border-slate-700 rounded-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative my-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs font-mono text-slate-400">Consignment Manifest</span>
                <h3 className="text-xl font-bold text-white font-mono">{selectedShipment.trackingId}</h3>
              </div>
              <button
                onClick={() => setSelectedShipment(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-slate-400">Client Shipper</span>
                <p className="font-bold text-white">{selectedShipment.customerName}</p>
                <p className="text-slate-400">{selectedShipment.customerCompany}</p>
              </div>

              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-slate-400">Equipment &amp; Driver</span>
                <p className="font-bold text-white">{selectedShipment.vehicleType}</p>
                <p className="text-slate-400 font-mono">
                  {selectedShipment.vehiclePlate} · {selectedShipment.driverName}
                </p>
              </div>

              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-slate-400">Origin Loading Hub</span>
                <p className="font-bold text-white">{selectedShipment.origin}</p>
                <p className="text-slate-400 font-mono">{selectedShipment.originHub}</p>
              </div>

              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-slate-400">Destination Facility</span>
                <p className="font-bold text-white">{selectedShipment.destination}</p>
                <p className="text-slate-400 font-mono">{selectedShipment.destinationHub}</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 text-xs space-y-1.5">
              <span className="font-semibold text-slate-300 block">Cargo Manifest Description:</span>
              <p className="text-slate-200">{selectedShipment.goodsDescription}</p>
              <div className="flex gap-4 pt-1 font-mono text-slate-400">
                <span>Weight: {selectedShipment.weightLbs.toLocaleString()} lbs</span>
                <span>·</span>
                <span>Tonnage: {selectedShipment.weightTons} Tons</span>
              </div>
            </div>

            <div className="space-y-3">
              <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                Recorded Milestones
              </span>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {selectedShipment.milestones.map((m) => (
                  <div key={m.id} className="p-3 rounded-lg bg-slate-900/40 border border-slate-800 text-xs space-y-0.5">
                    <div className="flex justify-between font-bold text-white">
                      <span>{m.title}</span>
                      <span className="font-mono text-amber-400 text-[11px]">{m.timestamp}</span>
                    </div>
                    <p className="text-slate-400">{m.location}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <button
                onClick={() => {
                  // Toggle status for demo interaction
                  const nextStatus: ShipmentStatus =
                    selectedShipment.status === 'confirmed'
                      ? 'in_transit'
                      : selectedShipment.status === 'in_transit'
                      ? 'delivered'
                      : 'confirmed';

                  setShipments(
                    shipments.map((s) =>
                      s.id === selectedShipment.id ? { ...s, status: nextStatus } : s
                    )
                  );
                  setSelectedShipment({ ...selectedShipment, status: nextStatus });
                }}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-amber-400 text-xs font-bold rounded-xl border border-slate-700 transition-colors"
              >
                Simulate Status Update
              </button>

              <button
                onClick={() => setSelectedShipment(null)}
                className="px-5 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl transition-colors"
              >
                Close Manifest
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          MODAL: ADD NEW TEST SHIPMENT (DISPATCH ENTRY DEMO)
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
          <div className="bg-[#0C1A2E] border border-slate-700 rounded-2xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl relative my-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="text-base font-bold text-white">Dispatch New Test Consignment</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateShipment} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Customer / Shipper Name *
                </label>
                <input
                  type="text"
                  required
                  value={newShipmentData.customerName}
                  onChange={(e) =>
                    setNewShipmentData({ ...newShipmentData, customerName: e.target.value })
                  }
                  placeholder="e.g. Midwest Steel Works"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Origin City, State *</label>
                  <input
                    type="text"
                    required
                    value={newShipmentData.origin}
                    onChange={(e) =>
                      setNewShipmentData({ ...newShipmentData, origin: e.target.value })
                    }
                    placeholder="e.g. Cleveland, OH"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Destination City, State *
                  </label>
                  <input
                    type="text"
                    required
                    value={newShipmentData.destination}
                    onChange={(e) =>
                      setNewShipmentData({ ...newShipmentData, destination: e.target.value })
                    }
                    placeholder="e.g. Nashville, TN"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Cargo Description</label>
                <input
                  type="text"
                  value={newShipmentData.goodsDescription}
                  onChange={(e) =>
                    setNewShipmentData({ ...newShipmentData, goodsDescription: e.target.value })
                  }
                  placeholder="e.g. 14 Pallets Structural Steel Connectors"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Equipment Unit</label>
                  <select
                    value={newShipmentData.vehicleType}
                    onChange={(e) =>
                      setNewShipmentData({ ...newShipmentData, vehicleType: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-400"
                  >
                    {VEHICLE_OPTIONS.map((v) => (
                      <option key={v.id} value={v.name}>
                        {v.name.split(' (')[0]}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Initial Status</label>
                  <select
                    value={newShipmentData.status}
                    onChange={(e) =>
                      setNewShipmentData({
                        ...newShipmentData,
                        status: e.target.value as ShipmentStatus,
                      })
                    }
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="pending_dispatch">Pending Dispatch</option>
                    <option value="confirmed">Confirmed / Loading</option>
                    <option value="in_transit">In Transit</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl"
                >
                  Dispatch Load
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
