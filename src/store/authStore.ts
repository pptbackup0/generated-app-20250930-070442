import { create } from 'zustand';
import { User, UserRole, Tenant } from '@shared/types';
interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  role: UserRole | null;
  login: (role: UserRole) => void;
  logout: () => void;
}
const mockLandlord: User = {
  id: 1,
  email: 'landlord@leaseflow.com',
  password_hash: '',
  role: 'landlord',
  name: 'Rajesh Kumar',
  phone: '9876543210',
  country: 'IN',
  currency: 'INR',
  is_approved: true,
  created_at: new Date().toISOString(),
};
const mockTenant: Tenant = {
  id: 101,
  email: 'tenant1@example.com',
  password_hash: '',
  role: 'tenant',
  name: 'Arjun Sharma',
  phone: '9123456789',
  country: 'IN',
  currency: 'INR',
  aadhar_number: '1234 5678 9012',
  permanent_address: '42, Richmond Road, Bengaluru',
  occupation: 'Software Engineer',
  profile_photo: 'https://i.pravatar.cc/150?u=arjun',
  is_approved: true,
  landlord_id: 1,
  created_at: new Date('2023-01-15').toISOString(),
  unit_id: 1,
  property_id: 1,
  unit_number: 'A-101',
  property_name: 'Sunrise Apartments',
  lease_start_date: '2023-02-01',
  lease_end_date: '2024-01-31',
  advance_amount: 50000,
};
export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  role: null,
  login: (role) => {
    const user = role === 'landlord' ? mockLandlord : mockTenant;
    set({ isAuthenticated: true, user, role });
  },
  logout: () => set({ isAuthenticated: false, user: null, role: null }),
}));