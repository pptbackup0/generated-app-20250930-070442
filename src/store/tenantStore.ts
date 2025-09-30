import { create } from 'zustand';
import { Tenant } from '@shared/types';
interface TenantState {
  tenants: Tenant[];
  loading: boolean;
  error: string | null;
  fetchTenants: () => void;
  getTenantById: (id: number) => Tenant | undefined;
  addTenant: (tenant: Omit<Tenant, 'id' | 'created_at' | 'role' | 'is_approved' | 'landlord_id'>) => void;
  updateTenant: (tenant: Tenant) => void;
  deleteTenant: (id: number) => void;
}
const mockTenants: Tenant[] = [
  {
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
  },
  {
    id: 102,
    email: 'tenant2@example.com',
    password_hash: '',
    role: 'tenant',
    name: 'Priya Patel',
    phone: '9988776655',
    country: 'IN',
    currency: 'INR',
    aadhar_number: '9876 5432 1098',
    permanent_address: '7, Koregaon Park, Pune',
    occupation: 'Graphic Designer',
    profile_photo: 'https://i.pravatar.cc/150?u=priya',
    is_approved: false,
    landlord_id: 1,
    created_at: new Date('2023-05-20').toISOString(),
    unit_id: 3,
    property_id: 2,
    unit_number: 'Flat 1',
    property_name: 'Green Valley Homes',
    lease_start_date: '2023-06-01',
    lease_end_date: '2024-05-31',
    advance_amount: 36000,
  },
];
export const useTenantStore = create<TenantState>((set, get) => ({
  tenants: mockTenants,
  loading: false,
  error: null,
  fetchTenants: () => {
    // API call simulation
    set({ loading: false });
  },
  getTenantById: (id) => get().tenants.find(t => t.id === id),
  addTenant: (tenant) => set((state) => ({
    tenants: [
      ...state.tenants,
      {
        ...tenant,
        id: Date.now(),
        created_at: new Date().toISOString(),
        role: 'tenant',
        is_approved: false, // New tenants need approval
        landlord_id: 1,
      },
    ],
  })),
  updateTenant: (updatedTenant) => set((state) => ({
    tenants: state.tenants.map(t => t.id === updatedTenant.id ? updatedTenant : t),
  })),
  deleteTenant: (id) => set((state) => ({
    tenants: state.tenants.filter(t => t.id !== id),
  })),
}));