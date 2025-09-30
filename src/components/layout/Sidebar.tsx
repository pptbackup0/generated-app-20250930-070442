import { NavLink } from 'react-router-dom';
import { Home } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store/authStore';
import { landlordNavLinks, tenantNavLinks } from '@/lib/constants';
interface SidebarNavProps {
  isMobile?: boolean;
}
export function SidebarNav({ isMobile = false }: SidebarNavProps) {
  const role = useAuthStore((state) => state.role);
  const navLinks = role === 'landlord' ? landlordNavLinks : tenantNavLinks;
  return (
    <nav className={cn("grid items-start text-sm font-medium", isMobile ? "px-4 gap-2" : "px-2 lg:px-4 gap-1")}>
      {navLinks.map(({ href, label, icon: Icon }) => (
        <NavLink
          key={href}
          to={href}
          className={({ isActive }) =>
            cn(
              'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
              isActive && 'bg-muted text-primary'
            )
          }
        >
          <Icon className="h-4 w-4" />
          {label}
        </NavLink>
      ))}
    </nav>
  );
}
export function Sidebar() {
  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-16 items-center border-b px-4 lg:px-6">
          <NavLink to="/app/dashboard" className="flex items-center gap-2 font-semibold">
            <Home className="h-6 w-6 text-blue-600" />
            <span className="">LeaseFlow</span>
          </NavLink>
        </div>
        <div className="flex-1">
          <SidebarNav />
        </div>
      </div>
    </div>
  );
}