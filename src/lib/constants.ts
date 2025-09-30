import { LayoutDashboard, Building, Users, CreditCard, Wrench, Settings } from 'lucide-react';
export const landlordNavLinks = [
  { href: '/app/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/app/properties', label: 'Properties', icon: Building },
  { href: '/app/tenants', label: 'Tenants', icon: Users },
  { href: '/app/financials', label: 'Financials', icon: CreditCard },
  { href: '/app/maintenance', label: 'Maintenance', icon: Wrench },
  { href: '/app/settings', label: 'Settings', icon: Settings },
];
export const tenantNavLinks = [
    { href: '/app/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/app/bills', label: 'My Bills', icon: CreditCard },
    { href: '/app/maintenance', label: 'Maintenance', icon: Wrench },
    { href: '/app/settings', label: 'Settings', icon: Settings },
];