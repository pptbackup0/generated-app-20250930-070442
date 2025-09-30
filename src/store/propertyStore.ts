import { create } from 'zustand';
import { Property, Unit } from '@shared/types';
interface PropertyState {
  properties: Property[];
  units: Unit[];
  loading: boolean;
  error: string | null;
  fetchProperties: () => void;
  getPropertyById: (id: number) => Property | undefined;
  addProperty: (property: Omit<Property, 'id' | 'created_at' | 'landlord_id'>) => void;
  updateProperty: (property: Property) => void;
  deleteProperty: (id: number) => void;
  getUnitsByPropertyId: (propertyId: number) => Unit[];
  addUnit: (unit: Omit<Unit, 'id' | 'created_at'>) => void;
  updateUnit: (unit: Unit) => void;
  deleteUnit: (id: number) => void;
}
// Mock data for development
const mockProperties: Property[] = [
  { id: 1, landlord_id: 1, name: 'Sunrise Apartments', address: '123 MG Road', city: 'Bengaluru', state: 'Karnataka', pincode: '560001', property_type: 'residential', total_units: 5, created_at: new Date().toISOString() },
  { id: 2, landlord_id: 1, name: 'Green Valley Homes', address: '456 Park Street', city: 'Pune', state: 'Maharashtra', pincode: '411001', property_type: 'residential', total_units: 3, created_at: new Date().toISOString() },
];
const mockUnits: Unit[] = [
  { id: 1, property_id: 1, unit_number: 'A-101', floor_number: 1, base_rent: 25000, electricity_enabled: true, electricity_rate: 8.5, water_enabled: true, water_rate: 50, maintenance_enabled: true, maintenance_charge: 1500, is_occupied: true, tenant_id: 101, advance_amount: 50000, created_at: new Date().toISOString() },
  { id: 2, property_id: 1, unit_number: 'A-102', floor_number: 1, base_rent: 26000, electricity_enabled: true, electricity_rate: 8.5, water_enabled: false, water_rate: 0, maintenance_enabled: true, maintenance_charge: 1500, is_occupied: false, advance_amount: 0, created_at: new Date().toISOString() },
  { id: 3, property_id: 2, unit_number: 'Flat 1', floor_number: 1, base_rent: 18000, electricity_enabled: true, electricity_rate: 7.0, water_enabled: true, water_rate: 45, maintenance_enabled: false, maintenance_charge: 0, is_occupied: true, tenant_id: 102, advance_amount: 36000, created_at: new Date().toISOString() },
];
export const usePropertyStore = create<PropertyState>((set, get) => ({
  properties: mockProperties,
  units: mockUnits,
  loading: false,
  error: null,
  fetchProperties: () => {
    // In a real app, this would be an API call
    set({ loading: false });
  },
  getPropertyById: (id) => get().properties.find(p => p.id === id),
  addProperty: (property) => set((state) => ({
    properties: [...state.properties, { ...property, id: Date.now(), created_at: new Date().toISOString(), landlord_id: 1 }],
  })),
  updateProperty: (updatedProperty) => set((state) => ({
    properties: state.properties.map(p => p.id === updatedProperty.id ? updatedProperty : p),
  })),
  deleteProperty: (id) => set((state) => ({
    properties: state.properties.filter(p => p.id !== id),
    units: state.units.filter(u => u.property_id !== id),
  })),
  getUnitsByPropertyId: (propertyId) => get().units.filter(u => u.property_id === propertyId),
  addUnit: (unit) => set((state) => ({
    units: [...state.units, { ...unit, id: Date.now(), created_at: new Date().toISOString() }],
  })),
  updateUnit: (updatedUnit) => set((state) => ({
    units: state.units.map(u => u.id === updatedUnit.id ? updatedUnit : u),
  })),
  deleteUnit: (id) => set((state) => ({
    units: state.units.filter(u => u.id !== id),
  })),
}));