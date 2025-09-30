import { useAuthStore } from '@/store/authStore';
import { LandlordDashboard } from '@/components/dashboards/LandlordDashboard';
import { TenantDashboard } from '@/components/dashboards/TenantDashboard';
export function DashboardPage() {
  const role = useAuthStore((state) => state.role);
  if (role === 'landlord') {
    return <LandlordDashboard />;
  }
  if (role === 'tenant') {
    return <TenantDashboard />;
  }
  // Fallback or loading state
  return <div>Loading dashboard...</div>;
}