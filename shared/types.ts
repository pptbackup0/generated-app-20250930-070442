export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}
export type UserRole = 'landlord' | 'tenant';
export interface User {
  id: number;
  email: string;
  password_hash: string;
  role: UserRole;
  name: string;
  phone?: string;
  country: string;
  currency: string;
  aadhar_number?: string;
  permanent_address?: string;
  occupation?: string;
  profile_photo?: string;
  is_approved: boolean;
  landlord_id?: number;
  created_at: string;
}
// Tenant is a user with the 'tenant' role, plus lease-specific info
export interface Tenant extends User {
  role: 'tenant';
  unit_id?: number;
  property_id?: number;
  unit_number?: string;
  property_name?: string;
  lease_start_date?: string;
  lease_end_date?: string;
  advance_amount?: number;
}
export interface Property {
  id: number;
  landlord_id: number;
  name: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  property_type: string;
  total_units: number;
  created_at: string;
}
export interface Unit {
  id: number;
  property_id: number;
  unit_number: string;
  floor_number: number;
  base_rent: number;
  electricity_enabled: boolean;
  electricity_rate: number;
  water_enabled: boolean;
  water_rate: number;
  maintenance_enabled: boolean;
  maintenance_charge: number;
  is_occupied: boolean;
  tenant_id?: number;
  lease_start_date?: string;
  lease_end_date?: string;
  advance_amount: number;
  created_at: string;
}
export interface UtilityReading {
  id: number;
  unit_id: number;
  reading_type: 'electricity' | 'water';
  previous_reading: number;
  current_reading: number;
  reading_date: string;
  rate: number;
  calculated_amount: number;
  created_at: string;
}
export type TransactionType = 'rent' | 'electricity' | 'water' | 'maintenance' | 'advance' | 'refund' | 'income' | 'expense';
export interface Transaction {
  id: number;
  unit_id?: number;
  tenant_id: number;
  landlord_id: number;
  transaction_type: TransactionType;
  amount: number;
  due_date?: string;
  paid_date?: string;
  status: 'pending' | 'paid' | 'overdue' | 'cancelled';
  payment_method?: string;
  notes?: string;
  created_at: string;
}
export type MaintenanceStatus = 'Open' | 'In Progress' | 'Completed' | 'Cancelled';
export type MaintenancePriority = 'Low' | 'Medium' | 'High' | 'Urgent';
export interface MaintenanceRequest {
  id: number;
  tenant_id: number;
  property_id: number;
  title: string;
  description: string;
  status: MaintenanceStatus;
  priority: MaintenancePriority;
  created_at: string;
  completed_at?: string;
}