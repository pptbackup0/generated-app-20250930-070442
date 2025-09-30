import { create } from 'zustand';
import { Transaction, UtilityReading } from '@shared/types';
import { usePropertyStore } from './propertyStore';
import { format } from 'date-fns';
interface FinancialsState {
  transactions: Transaction[];
  utilityReadings: UtilityReading[];
  loading: boolean;
  error: string | null;
  getTransactionsByTenantId: (tenantId: number) => Transaction[];
  addTransaction: (txData: Omit<Transaction, 'id' | 'created_at' | 'landlord_id' | 'status'> & { unit_id?: number; tenant_id?: number }) => void;
  addUtilityReading: (reading: Omit<UtilityReading, 'id' | 'created_at'>) => void;
  generateBillForUnit: (unitId: number, electricityReading?: number, waterReading?: number) => void;
}
const mockTransactions: Transaction[] = [
  // Tenant 101 transactions
  { id: 1, unit_id: 1, tenant_id: 101, landlord_id: 1, transaction_type: 'rent', amount: 25000, due_date: '2024-07-01', paid_date: undefined, status: 'pending', created_at: '2024-06-25', notes: 'July Rent' },
  { id: 2, unit_id: 1, tenant_id: 101, landlord_id: 1, transaction_type: 'electricity', amount: 1500, due_date: '2024-07-01', paid_date: undefined, status: 'pending', created_at: '2024-06-25', notes: 'June Electricity Bill' },
  { id: 3, unit_id: 1, tenant_id: 101, landlord_id: 1, transaction_type: 'rent', amount: 25000, due_date: '2024-06-01', paid_date: '2024-06-05', status: 'paid', created_at: '2024-05-25', payment_method: 'UPI', notes: 'June Rent' },
  { id: 4, unit_id: 1, tenant_id: 101, landlord_id: 1, transaction_type: 'rent', amount: 25000, due_date: '2024-05-01', paid_date: '2024-05-04', status: 'paid', created_at: '2024-04-25', payment_method: 'Bank Transfer', notes: 'May Rent' },
  // Landlord transactions
  { id: 10, unit_id: 3, tenant_id: 102, landlord_id: 1, transaction_type: 'rent', amount: 18000, due_date: '2024-06-01', paid_date: '2024-06-03', status: 'paid', created_at: '2024-05-28', payment_method: 'Cash', notes: 'June Rent for Flat 1' },
  { id: 11, unit_id: 1, tenant_id: 101, landlord_id: 1, transaction_type: 'expense', amount: 5000, paid_date: '2024-06-10', status: 'paid', created_at: '2024-06-10', notes: 'Plumbing repairs for A-101' },
  { id: 12, unit_id: 2, tenant_id: 0, landlord_id: 1, transaction_type: 'income', amount: 1200, paid_date: '2024-06-15', status: 'paid', created_at: '2024-06-15', notes: 'Late fee payment' },
];
const mockUtilityReadings: UtilityReading[] = [
    { id: 1, unit_id: 1, reading_type: 'electricity', previous_reading: 1200, current_reading: 1350, reading_date: '2024-05-31', rate: 8.5, calculated_amount: 1275, created_at: '2024-05-31' }
];
export const useFinancialsStore = create<FinancialsState>((set, get) => ({
  transactions: mockTransactions,
  utilityReadings: mockUtilityReadings,
  loading: false,
  error: null,
  getTransactionsByTenantId: (tenantId) => get().transactions.filter(t => t.tenant_id === tenantId),
  addTransaction: (txData) => set((state) => {
    const unit = usePropertyStore.getState().units.find(u => u.id === txData.unit_id);
    const newTx: Transaction = {
      ...txData,
      id: Date.now(),
      created_at: new Date().toISOString(),
      landlord_id: 1, // Mock landlord ID
      tenant_id: txData.tenant_id || unit?.tenant_id || 0,
      status: 'paid',
      paid_date: txData.paid_date,
    };
    return { transactions: [...state.transactions, newTx] };
  }),
  addUtilityReading: (reading) => set((state) => ({
    utilityReadings: [...state.utilityReadings, { ...reading, id: Date.now(), created_at: new Date().toISOString() }]
  })),
  generateBillForUnit: (unitId, electricityReading, waterReading) => set((state) => {
    const unit = usePropertyStore.getState().units.find(u => u.id === unitId);
    if (!unit || !unit.tenant_id) return state;
    const newTransactions: Transaction[] = [];
    const now = new Date();
    const dueDate = new Date(now.getFullYear(), now.getMonth() + 1, 1).toISOString().split('T')[0];
    // Rent
    newTransactions.push({
      id: Date.now() + 1, unit_id: unitId, tenant_id: unit.tenant_id, landlord_id: 1,
      transaction_type: 'rent', amount: unit.base_rent, due_date: dueDate, status: 'pending',
      created_at: now.toISOString(), notes: `${format(now, 'MMMM yyyy')} Rent`
    });
    // Maintenance
    if (unit.maintenance_enabled && unit.maintenance_charge > 0) {
      newTransactions.push({
        id: Date.now() + 2, unit_id: unitId, tenant_id: unit.tenant_id, landlord_id: 1,
        transaction_type: 'maintenance', amount: unit.maintenance_charge, due_date: dueDate, status: 'pending',
        created_at: now.toISOString(), notes: `${format(now, 'MMMM yyyy')} Maintenance`
      });
    }
    // Electricity
    if (unit.electricity_enabled && electricityReading !== undefined) {
        const lastReading = state.utilityReadings.filter(r => r.unit_id === unitId && r.reading_type === 'electricity').sort((a, b) => new Date(b.reading_date).getTime() - new Date(a.reading_date).getTime())[0];
        const prevReadingValue = lastReading?.current_reading || 0;
        const consumption = electricityReading - prevReadingValue;
        if (consumption > 0) {
            const amount = consumption * unit.electricity_rate;
            newTransactions.push({
                id: Date.now() + 3, unit_id: unitId, tenant_id: unit.tenant_id, landlord_id: 1,
                transaction_type: 'electricity', amount: parseFloat(amount.toFixed(2)), due_date: dueDate, status: 'pending',
                created_at: now.toISOString(), notes: `Electricity (${consumption} units)`
            });
        }
    }
    return { transactions: [...state.transactions, ...newTransactions] };
  }),
}));