import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  Building,
  ArrowRight,
  Info,
} from 'lucide-react';
import { PageRoute, ContactFormData } from '../types/logistics';
import { CORRIDOR_HUBS } from '../data/mockData';

interface ContactPageProps {
  onNavigate: (route: PageRoute) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    company: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    inquiryType: 'freight_quote',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = (): boolean => {
    const errs: Partial<Record<keyof ContactFormData, string>> = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full name is required';
    if (!formData.phone.trim()) errs.phone = 'Phone number is required';
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Valid email format required';
    }
    if (!formData.message.trim()) errs.message = 'Please provide details on your inquiry';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1000);
  };

  const handleWhatsAppClick = () => {
    const msg = encodeURIComponent(
      `Hello Nexora Logistics Dispatch! I'd like to inquire about freight transport availability.`
    );
    // Safe standard WhatsApp web inquiry link
    window.open(`https://wa.me/18005550199?text=${msg}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-[#07111F] text-slate-100 py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-md">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>24/7 Dispatch &amp; Client Coordination</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Connect With Our Freight Coordination Team
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Have questions about specialized equipment, recurring lane capacity, or custom contract
            logistics? Contact our dispatch desk.
          </p>
        </div>

        {/* Demo Notice */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-400 flex items-start gap-3">
          <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-slate-200">Prototype Contact Channel:</strong> This form
            simulates client inquiries in the presentation demo. Contact information and terminal
            addresses shown are customizable placeholders for the final client deployment.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Form */}
          <div className="lg:col-span-7 bg-[#0C1A2E] border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
            {submitted ? (
              <div className="text-center py-12 space-y-4 animate-in fade-in">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-white">Inquiry Received (Demo Mode)</h3>
                <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                  Thank you, <span className="text-white font-semibold">{formData.fullName}</span>.
                  In production, our dispatch team responds to all freight inquiries within 30
                  minutes.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        fullName: '',
                        company: '',
                        email: '',
                        phone: '',
                        subject: '',
                        message: '',
                        inquiryType: 'freight_quote',
                      });
                    }}
                    className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs rounded-xl border border-slate-700 transition-colors"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <h3 className="text-base font-bold text-white border-b border-slate-800 pb-2">
                  Dispatch Message Form
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contactName"
                      className="block text-xs font-semibold text-slate-300 mb-1.5"
                    >
                      Full Name <span className="text-amber-400">*</span>
                    </label>
                    <input
                      id="contactName"
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Thomas Wayne"
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
                      htmlFor="contactCompany"
                      className="block text-xs font-semibold text-slate-300 mb-1.5"
                    >
                      Company Name <span className="text-slate-400">(Optional)</span>
                    </label>
                    <input
                      id="contactCompany"
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="e.g. Mid-States Distribution"
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-400 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contactPhone"
                      className="block text-xs font-semibold text-slate-300 mb-1.5"
                    >
                      Phone Number <span className="text-amber-400">*</span>
                    </label>
                    <input
                      id="contactPhone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. +1 (312) 555-8941"
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
                      htmlFor="contactEmail"
                      className="block text-xs font-semibold text-slate-300 mb-1.5"
                    >
                      Email Address <span className="text-slate-400">(Optional)</span>
                    </label>
                    <input
                      id="contactEmail"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. contact@business.com"
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

                <div>
                  <label
                    htmlFor="inquiryType"
                    className="block text-xs font-semibold text-slate-300 mb-1.5"
                  >
                    Inquiry Classification
                  </label>
                  <select
                    id="inquiryType"
                    value={formData.inquiryType}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        inquiryType: e.target.value as ContactFormData['inquiryType'],
                      })
                    }
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                  >
                    <option value="freight_quote">Freight Quotation / Capacity Inquiry</option>
                    <option value="partnership">Dedicated Fleet Partnership / Contract</option>
                    <option value="support">Active Shipment Support / Consignee Inquiry</option>
                    <option value="general">General Commercial Inquiry</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs font-semibold text-slate-300 mb-1.5"
                  >
                    Cargo / Inquiry Description <span className="text-amber-400">*</span>
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your freight type, origin/destination corridors, or preferred scheduling requirements..."
                    className={`w-full px-3.5 py-2.5 bg-slate-900 border rounded-xl text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-1 ${
                      errors.message
                        ? 'border-rose-500 focus:ring-rose-500'
                        : 'border-slate-700 focus:border-amber-400 focus:ring-amber-400'
                    }`}
                  />
                  {errors.message && (
                    <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.message}</span>
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 bg-amber-400 hover:bg-amber-300 disabled:bg-amber-600 disabled:cursor-not-allowed text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span>Submitting Message...</span>
                  ) : (
                    <>
                      <span>Submit Inquiry to Dispatch</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Direct Channels & Terminal Directory */}
          <div className="lg:col-span-5 space-y-6">
            {/* Quick Action Channels */}
            <div className="bg-[#0C1A2E] border border-slate-800 rounded-2xl p-6 space-y-5">
              <h3 className="text-base font-bold text-white border-b border-slate-800 pb-2">
                Direct Dispatch Channels
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div className="w-10 h-10 rounded-lg bg-amber-400/10 text-amber-400 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block font-mono">24/7 Dispatch Hotline</span>
                    <span className="text-sm font-bold text-white font-mono">+1 (800) 555-DISPATCH</span>
                    <p className="text-[11px] text-slate-400 mt-0.5">Immediate linehaul booking &amp; driver check-in</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div className="w-10 h-10 rounded-lg bg-sky-400/10 text-sky-400 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block font-mono">Central Commercial Email</span>
                    <span className="text-sm font-bold text-white font-mono">operations@nexora-logistics.demo</span>
                    <p className="text-[11px] text-slate-400 mt-0.5">RFQs, contract rates, and compliance docs</p>
                  </div>
                </div>

                {/* WhatsApp Action Button */}
                <button
                  type="button"
                  onClick={handleWhatsAppClick}
                  className="w-full flex items-center justify-center gap-2.5 py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors shadow-md"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Direct WhatsApp Freight Inquiry</span>
                </button>
              </div>
            </div>

            {/* Hub Directory */}
            <div className="bg-[#0C1A2E] border border-slate-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-base font-bold text-white border-b border-slate-800 pb-2">
                Regional Terminal Network
              </h3>
              <div className="space-y-3">
                {CORRIDOR_HUBS.map((hub) => (
                  <div key={hub.name} className="text-xs p-3 rounded-lg bg-slate-900/40 border border-slate-800/80">
                    <span className="font-bold text-white block">{hub.name}</span>
                    <span className="text-slate-400 font-mono mt-0.5 block">{hub.city}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
