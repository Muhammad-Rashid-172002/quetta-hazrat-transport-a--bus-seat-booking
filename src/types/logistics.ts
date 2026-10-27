/**
 * Core type definitions for Nexora Logistics demo platform and TMS
 */

export type ShipmentStatus = 'confirmed' | 'in_transit' | 'delivered' | 'pending_dispatch';

export interface TrackingMilestone {
  id: string;
  title: string;
  location: string;
  timestamp: string;
  completed: boolean;
  current?: boolean;
  notes?: string;
}

export interface ShipmentRecord {
  id: string;
  trackingId: string;
  customerName: string;
  customerCompany?: string;
  origin: string;
  originHub: string;
  destination: string;
  destinationHub: string;
  goodsCategory: string;
  goodsDescription: string;
  weightLbs: number;
  weightTons: number;
  vehicleType: string;
  vehiclePlate: string;
  driverName: string;
  bookingDate: string;
  pickupDate: string;
  estimatedDelivery: string;
  actualDelivery?: string;
  status: ShipmentStatus;
  progressPercent: number;
  milestones: TrackingMilestone[];
  specialInstructions?: string;
}

export interface VehicleOption {
  id: string;
  name: string;
  capacityLbs: string;
  suitableFor: string;
  baseRatePerMile: number;
}

export interface GoodsCategoryOption {
  id: string;
  name: string;
  description: string;
  iconName: string;
  typicalWeight: string;
}

export interface QuoteFormData {
  fullName: string;
  companyName: string;
  phone: string;
  email: string;
  pickupLocation: string;
  deliveryLocation: string;
  goodsCategory: string;
  estimatedWeight: string;
  vehicleType: string;
  pickupDate: string;
  additionalInstructions: string;
}

export interface QuoteCalculationResult {
  referenceId: string;
  estimatedDistanceMiles: number;
  estimatedRateMin: number;
  estimatedRateMax: number;
  transitDays: string;
  quoteData: QuoteFormData;
  submittedAt: string;
}

export interface ContactFormData {
  fullName: string;
  company: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  inquiryType: 'general' | 'freight_quote' | 'partnership' | 'support';
}

export type PageRoute = 'home' | 'services' | 'about' | 'quote' | 'track' | 'contact' | 'admin-demo';
