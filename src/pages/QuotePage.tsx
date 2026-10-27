import React, { useState, useEffect } from 'react';
import {
  FileText,
  Truck,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Calculator,
  Calendar,
  MapPin,
  Scale,
  RefreshCw,
  Info,
} from 'lucide-react';
import { PageRoute, QuoteFormData, QuoteCalculationResult } from '../types/logistics';
import { GOODS_CATEGORIES, VEHICLE_OPTIONS } from '../data/mockData';

interface QuotePageProps {
  onNavigate: (route: PageRoute) => void;
  preselectedServiceId?: string;
}

export const QuotePage: React.FC<QuotePageProps> = ({ onNavigate, preselectedServiceId }) => {
  // Map preselected service to category or vehicle if provided
  const initialCategory = preselectedServiceId === 'heavy-cargo'
    ? 'heavy-cargo'
    : preselectedServiceId === 'industrial-equipment'
    ? 'industrial-machinery'
    : preselectedServiceId === 'custom-logistics'
    ? 'consumer-goods'
    : 'consumer-goods';

  const [formData, setFormData] = useState<QuoteFormData>({
    fullName: '',
    companyName: '',
    phone: '',
    email: '',
    pickupLocation: '',
    deliveryLocation: '',
    goodsCategory: initialCategory,
    estimatedWeight: '18500',
    vehicleType: 'dry-van-53',
    pickupDate: '',
    additionalInstructions: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof QuoteFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<QuoteCalculationResult | null>(null);

  // Set minimum pickup date to today
  const todayStr = new Date().toISOString().split('T')[0];

  useEffect(() => {
    if (preselectedServiceId === 'heavy-cargo') {
      setFormData((prev) => ({
        ...prev,
        goodsCategory: 'heavy-cargo',
        vehicleType: 'flatbed-heavy',
        estimatedWeight: '38000',
      }));
    } else if (preselectedServiceId === 'industrial-equipment') {
      setFormData((prev) => ({
        ...prev,
        goodsCategory: 'industrial-machinery',
        vehicleType: 'flatbed-heavy',
        estimatedWeight: '32000',
      }));
    }
  }, [preselectedServiceId]);

  // Live Rate Estimation Math
  const selectedVehicle = VEHICLE_OPTIONS.find((v) => v.id === formData.vehicleType) || VEHICLE_OPTIONS[0];
  const weightNum = parseFloat(formData.estimatedWeight) || 10000;
  // Synthetic realistic mileage calculation based on origin/destination text lengths or baseline
  const estimatedMiles = Math.max(
    320,
    (formData.pickupLocation.length + formData.deliveryLocation.length) * 18 + 250
  );
  const baseRate = estimatedMiles * selectedVehicle.baseRatePerMile;
  const weightAdjustment = Math.max(1, weightNum / 30000);
  const minEstimate = Math.round(baseRate * weightAdjustment * 0.95);
  const maxEstimate = Math.round(baseRate * weightAdjustment * 1.15);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof QuoteFormData, string>> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Contact phone number is required';
    } else if (formData.phone.replace(/[^0-9]/g, '').length < 7) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email format';
    }

    if (!formData.pickupLocation.trim()) {
      newErrors.pickupLocation = 'Pickup city, state or facility is required';
    }

    if (!formData.deliveryLocation.trim()) {
      newErrors.deliveryLocation = 'Delivery destination is required';
    }

    if (!formData.estimatedWeight.trim() || isNaN(Number(formData.estimatedWeight))) {
      newErrors.estimatedWeight = 'Please enter a numeric cargo weight (in lbs)';
    } else if (Number(formData.estimatedWeight) <= 0) {
      newErrors.estimatedWeight = 'Weight must be greater than 0';
    }

    if (!formData.pickupDate) {
      newErrors.pickupDate = 'Scheduled pickup date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate API network submission delay
    setTimeout(() => {
      const randomSuffix = Math.floor(1000 + Math.random() * 9000);
      const generatedRef = `RFQ-2026-${randomSuffix}`;

      setSubmissionResult({
        referenceId: generatedRef,
        estimatedDistanceMiles: estimatedMiles,
        estimatedRateMin: minEstimate,
        estimatedRateMax: maxEstimate,
        transitDays: estimatedMiles > 800 ? '2 - 3 Days' : '1 - 2 Days',
        quoteData: { ...formData },
        submittedAt: new Date().toLocaleString(),
      });

      setIsSubmitting(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1200);
  };

  const handleReset = () => {
    setSubmissionResult(null);
    setFormData({
      fullName: '',
      companyName: '',
      phone: '',
      email: '',
      pickupLocation: '',
      deliveryLocation: '',
      goodsCategory: 'consumer-goods',
      estimatedWeight: '18500',
      vehicleType: 'dry-van-53',
      pickupDate: '',
      additionalInstructions: '',
    });
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-[#07111F] text-slate-100 py-12 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-md">
            <Calculator className="w-3.5 h-3.5" />
            <span>Commercial Freight Quotation Engine</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Request an Accurate Freight Rate
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Provide cargo details to generate an instant baseline quotation and connect with our
            dedicated carrier dispatch team.
          </p>
        </div>

        {/* Demo Notice Banner */}
        <div className="mb-8 p-4 rounded-xl bg-slate-900/80 border border-amber-500/30 text-xs text-slate-300 flex items-start gap-3">
          <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-amber-400 font-semibold">Demo Presentation Notice:</strong>{' '}
            Submissions in this frontend prototype calculate instant illustrative rates and
            generate reference codes locally. No live carrier bookings or credit card transactions
            are processed.
          </p>
        </div>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            SUCCESS CONFIRMATION STATE
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {submissionResult ? (
          <div className="bg-[#0C1A2E] border border-emerald-500/40 rounded-2xl p-6 sm:p-10 shadow-2xl space-y-8 animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Quotation Generated Successfully</h2>
                  <p className="text-xs text-slate-400">
                    Generated on {submissionResult.submittedAt} · Reference ID:{' '}
                    <span className="font-mono font-bold text-amber-400">
                      {submissionResult.referenceId}
                    </span>
                  </p>
                </div>
              </div>

              <div className="text-right sm:text-right">
                <span className="text-xs text-slate-400 block">Baseline Estimate</span>
                <span className="text-2xl font-extrabold text-emerald-400 font-mono">
                  ${submissionResult.estimatedRateMin.toLocaleString()} - $
                  {submissionResult.estimatedRateMax.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Breakdown Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                <span className="text-xs text-slate-400 font-medium">Lane Route</span>
                <p className="font-semibold text-white">
                  {submissionResult.quoteData.pickupLocation} →{' '}
                  {submissionResult.quoteData.deliveryLocation}
                </p>
                <p className="text-xs text-slate-400 font-mono">
                  Approx. {submissionResult.estimatedDistanceMiles} transit miles (Est.{' '}
                  {submissionResult.transitDays})
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                <span className="text-xs text-slate-400 font-medium">Assigned Equipment</span>
                <p className="font-semibold text-white">
                  {VEHICLE_OPTIONS.find((v) => v.id === submissionResult.quoteData.vehicleType)
                    ?.name || 'Commercial Semi'}
                </p>
                <p className="text-xs text-slate-400 font-mono">
                  Cargo Weight:{' '}
                  {Number(submissionResult.quoteData.estimatedWeight).toLocaleString()} lbs
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                <span className="text-xs text-slate-400 font-medium">Customer Contact</span>
                <p className="font-semibold text-white">{submissionResult.quoteData.fullName}</p>
                <p className="text-xs text-slate-400 font-mono">
                  {submissionResult.quoteData.phone} ·{' '}
                  {submissionResult.quoteData.email || 'No email provided'}
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200 leading-relaxed">
              <strong>Next Steps in Live Dispatch:</strong> In a production deployment, this quote is
              routed directly to the logistics coordinator for slot verification and dispatch lock.
              A formal Bill of Lading and rate confirmation contract would be dispatched to your
              email.
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800">
              <button
                onClick={handleReset}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Calculate Another Quotation</span>
              </button>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() => onNavigate('track')}
                  className="w-full sm:w-auto px-6 py-3 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-colors shadow-md text-center"
                >
                  Go to Tracking Demo
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
              FUNCTIONAL QUOTE FORM
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Form Column */}
            <form
              onSubmit={handleSubmit}
              noValidate
              className="lg:col-span-8 bg-[#0C1A2E] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl"
            >
              {/* Contact Information */}
              <div>
                <h3 className="text-base font-bold text-white border-b border-slate-800 pb-2 mb-4">
                  01. Shipper &amp; Contact Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block text-xs font-semibold text-slate-300 mb-1.5"
                    >
                      Full Name <span className="text-amber-400">*</span>
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. John Henderson"
                      className={`w-full px-3.5 py-2.5 bg-slate-900 border rounded-xl text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-1 ${
                        errors.fullName
                          ? 'border-rose-500 focus:ring-rose-500'
                          : 'border-slate-700 focus:border-amber-400 focus:ring-amber-400'
                      }`}
                    />
                    {errors.fullName && (
                      <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.fullName}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="companyName"
                      className="block text-xs font-semibold text-slate-300 mb-1.5"
                    >
                      Company Name <span className="text-slate-400">(Optional)</span>
                    </label>
                    <input
                      id="companyName"
                      type="text"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      placeholder="e.g. Continental Manufacturing Corp"
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-400 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-xs font-semibold text-slate-300 mb-1.5"
                    >
                      Phone Number <span className="text-amber-400">*</span>
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. +1 (312) 555-0194"
                      className={`w-full px-3.5 py-2.5 bg-slate-900 border rounded-xl text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-1 ${
                        errors.phone
                          ? 'border-rose-500 focus:ring-rose-500'
                          : 'border-slate-700 focus:border-amber-400 focus:ring-amber-400'
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.phone}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs font-semibold text-slate-300 mb-1.5"
                    >
                      Email Address <span className="text-slate-400">(Optional)</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. dispatch@company.com"
                      className={`w-full px-3.5 py-2.5 bg-slate-900 border rounded-xl text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-1 ${
                        errors.email
                          ? 'border-rose-500 focus:ring-rose-500'
                          : 'border-slate-700 focus:border-amber-400 focus:ring-amber-400'
                      }`}
                    />
                    {errors.email && (
                      <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Transit Locations */}
              <div>
                <h3 className="text-base font-bold text-white border-b border-slate-800 pb-2 mb-4">
                  02. Transit Routing
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="pickupLocation"
                      className="block text-xs font-semibold text-slate-300 mb-1.5"
                    >
                      Pickup Location (City, State / ZIP) <span className="text-amber-400">*</span>
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                      <input
                        id="pickupLocation"
                        type="text"
                        value={formData.pickupLocation}
                        onChange={(e) =>
                          setFormData({ ...formData, pickupLocation: e.target.value })
                        }
                        placeholder="e.g. Chicago, IL 60607"
                        className={`w-full pl-9 pr-3.5 py-2.5 bg-slate-900 border rounded-xl text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-1 ${
                          errors.pickupLocation
                            ? 'border-rose-500 focus:ring-rose-500'
                            : 'border-slate-700 focus:border-amber-400 focus:ring-amber-400'
                        }`}
                      />
                    </div>
                    {errors.pickupLocation && (
                      <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.pickupLocation}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="deliveryLocation"
                      className="block text-xs font-semibold text-slate-300 mb-1.5"
                    >
                      Delivery Destination (City, State / ZIP){' '}
                      <span className="text-amber-400">*</span>
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                      <input
                        id="deliveryLocation"
                        type="text"
                        value={formData.deliveryLocation}
                        onChange={(e) =>
                          setFormData({ ...formData, deliveryLocation: e.target.value })
                        }
                        placeholder="e.g. Dallas, TX 75201"
                        className={`w-full pl-9 pr-3.5 py-2.5 bg-slate-900 border rounded-xl text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-1 ${
                          errors.deliveryLocation
                            ? 'border-rose-500 focus:ring-rose-500'
                            : 'border-slate-700 focus:border-amber-400 focus:ring-amber-400'
                        }`}
                      />
                    </div>
                    {errors.deliveryLocation && (
                      <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.deliveryLocation}</span>
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Cargo & Equipment */}
              <div>
                <h3 className="text-base font-bold text-white border-b border-slate-800 pb-2 mb-4">
                  03. Cargo &amp; Vehicle Requirements
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="goodsCategory"
                      className="block text-xs font-semibold text-slate-300 mb-1.5"
                    >
                      Goods Category <span className="text-amber-400">*</span>
                    </label>
                    <select
                      id="goodsCategory"
                      value={formData.goodsCategory}
                      onChange={(e) =>
                        setFormData({ ...formData, goodsCategory: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                    >
                      {GOODS_CATEGORIES.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name} ({cat.typicalWeight})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="vehicleType"
                      className="block text-xs font-semibold text-slate-300 mb-1.5"
                    >
                      Vehicle Type <span className="text-amber-400">*</span>
                    </label>
                    <select
                      id="vehicleType"
                      value={formData.vehicleType}
                      onChange={(e) =>
                        setFormData({ ...formData, vehicleType: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                    >
                      {VEHICLE_OPTIONS.map((veh) => (
                        <option key={veh.id} value={veh.id}>
                          {veh.name} — {veh.capacityLbs}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="estimatedWeight"
                      className="block text-xs font-semibold text-slate-300 mb-1.5"
                    >
                      Estimated Cargo Weight (lbs) <span className="text-amber-400">*</span>
                    </label>
                    <div className="relative">
                      <Scale className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                      <input
                        id="estimatedWeight"
                        type="number"
                        value={formData.estimatedWeight}
                        onChange={(e) =>
                          setFormData({ ...formData, estimatedWeight: e.target.value })
                        }
                        placeholder="e.g. 24000"
                        className={`w-full pl-9 pr-3.5 py-2.5 bg-slate-900 border rounded-xl text-sm text-white focus:outline-none focus:ring-1 ${
                          errors.estimatedWeight
                            ? 'border-rose-500 focus:ring-rose-500'
                            : 'border-slate-700 focus:border-amber-400 focus:ring-amber-400'
                        }`}
                      />
                    </div>
                    {errors.estimatedWeight && (
                      <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.estimatedWeight}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="pickupDate"
                      className="block text-xs font-semibold text-slate-300 mb-1.5"
                    >
                      Target Pickup Date <span className="text-amber-400">*</span>
                    </label>
                    <div className="relative">
                      <Calendar className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                      <input
                        id="pickupDate"
                        type="date"
                        min={todayStr}
                        value={formData.pickupDate}
                        onChange={(e) => setFormData({ ...formData, pickupDate: e.target.value })}
                        className={`w-full pl-9 pr-3.5 py-2.5 bg-slate-900 border rounded-xl text-sm text-white focus:outline-none focus:ring-1 ${
                          errors.pickupDate
                            ? 'border-rose-500 focus:ring-rose-500'
                            : 'border-slate-700 focus:border-amber-400 focus:ring-amber-400'
                        }`}
                      />
                    </div>
                    {errors.pickupDate && (
                      <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.pickupDate}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-4">
                  <label
                    htmlFor="additionalInstructions"
                    className="block text-xs font-semibold text-slate-300 mb-1.5"
                  >
                    Special Handling &amp; Loading Instructions{' '}
                    <span className="text-slate-400">(Optional)</span>
                  </label>
                  <textarea
                    id="additionalInstructions"
                    rows={3}
                    value={formData.additionalInstructions}
                    onChange={(e) =>
                      setFormData({ ...formData, additionalInstructions: e.target.value })
                    }
                    placeholder="e.g. Liftgate required at delivery site, tarps required, loading dock appointment required."
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-400 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4 border-t border-slate-800">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 bg-amber-400 hover:bg-amber-300 disabled:bg-amber-600 disabled:cursor-not-allowed text-slate-950 font-bold text-sm uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Processing Quotation Parameters...</span>
                    </>
                  ) : (
                    <>
                      <span>Generate Instant Rate Estimate</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Live Estimation Preview Column (Desktop / Sticky) */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-[#0C1A2E] border border-slate-800 rounded-2xl p-6 space-y-5">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                    Live Rate Calculator
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">Automated Index</span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs text-slate-400">Estimated Range:</span>
                    <span className="text-xl font-extrabold text-white font-mono">
                      ${minEstimate.toLocaleString()} - ${maxEstimate.toLocaleString()}
                    </span>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 text-xs space-y-1.5 font-mono">
                    <div className="flex justify-between text-slate-400">
                      <span>Vehicle Unit:</span>
                      <span className="text-slate-200">{selectedVehicle.name.split(' ')[0]}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Est. Transit:</span>
                      <span className="text-slate-200">
                        {estimatedMiles > 800 ? '2 - 3 Days' : '1 - 2 Days'}
                      </span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Base Mileage Index:</span>
                      <span className="text-slate-200">~{estimatedMiles} mi</span>
                    </div>
                  </div>
                </div>

                <div className="text-[11px] text-slate-400 leading-relaxed pt-2 border-t border-slate-800">
                  *Rates reflect standard commercial market rates for fuel surcharge, vehicle
                  allocation, and standard insurance. Oversize permits or specialized rigging may
                  incur ancillary fees.
                </div>
              </div>

              {/* Assistance Box */}
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-2 text-xs">
                <h4 className="font-bold text-white">Need an Immediate Dispatcher?</h4>
                <p className="text-slate-400 leading-relaxed">
                  For time-critical freight, urgent hot-shots, or heavy industrial machinery
                  requiring same-day permits, call our direct line:
                </p>
                <p className="font-mono text-amber-400 font-bold text-sm pt-1">
                  +1 (800) 555-DISPATCH
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
