import { create } from 'zustand';
export type MaintenanceStatus = 'Open' | 'In Progress' | 'Completed' | 'Cancelled';
export type MaintenancePriority = 'Low' | 'Medium' | 'High' | 'Urgent';
export interface MaintenanceRequest {
  id: number;
  tenant_id: number;
  tenant_name: string;
  property_id: number;
  property_name: string;
  unit_number: string;
  title: string;
  description: string;
  status: MaintenanceStatus;
  priority: MaintenancePriority;
  created_at: string;
  completed_at?: string;
}
interface MaintenanceState {
  requests: MaintenanceRequest[];
  addRequest: (request: Omit<MaintenanceRequest, 'id' | 'created_at' | 'status'>) => void;
  updateRequestStatus: (id: number, status: MaintenanceStatus, priority: MaintenancePriority) => void;
  getRequestsByTenantId: (tenantId: number) => MaintenanceRequest[];
}
const mockRequests: MaintenanceRequest[] = [
  {
    id: 1,
    tenant_id: 101,
    tenant_name: 'Arjun Sharma',
    property_id: 1,
    property_name: 'Sunrise Apartments',
    unit_number: 'A-101',
    title: 'Leaky Kitchen Faucet',
    description: 'The faucet in the kitchen sink has been dripping constantly for the past two days.',
    status: 'Completed',
    priority: 'Medium',
    created_at: new Date('2024-06-15T10:00:00Z').toISOString(),
    completed_at: new Date('2024-06-16T14:30:00Z').toISOString(),
  },
  {
    id: 2,
    tenant_id: 101,
    tenant_name: 'Arjun Sharma',
    property_id: 1,
    property_name: 'Sunrise Apartments',
    unit_number: 'A-101',
    title: 'AC Not Cooling',
    description: 'The air conditioner in the main bedroom is running but not cooling the room effectively.',
    status: 'In Progress',
    priority: 'High',
    created_at: new Date('2024-06-28T18:45:00Z').toISOString(),
  },
  {
    id: 3,
    tenant_id: 102,
    tenant_name: 'Priya Patel',
    property_id: 2,
    property_name: 'Green Valley Homes',
    unit_number: 'Flat 1',
    title: 'Broken window latch',
    description: 'The latch on the living room window is broken and it does not close properly.',
    status: 'Open',
    priority: 'Low',
    created_at: new Date('2024-06-29T09:12:00Z').toISOString(),
  },
];
export const useMaintenanceStore = create<MaintenanceState>((set, get) => ({
  requests: mockRequests,
  addRequest: (request) =>
    set((state) => ({
      requests: [
        ...state.requests,
        {
          ...request,
          id: Date.now(),
          created_at: new Date().toISOString(),
          status: 'Open',
        },
      ],
    })),
  updateRequestStatus: (id, status, priority) =>
    set((state) => ({
      requests: state.requests.map((req) =>
        req.id === id ? { ...req, status, priority, completed_at: status === 'Completed' ? new Date().toISOString() : req.completed_at } : req
      ),
    })),
  getRequestsByTenantId: (tenantId) => get().requests.filter((req) => req.tenant_id === tenantId),
}));