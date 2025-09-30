import * as React from 'react';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import { usePropertyStore } from '@/store/propertyStore';
import { useTenantStore } from '@/store/tenantStore';
import { landlordNavLinks, tenantNavLinks } from '@/lib/constants';
import { useAuthStore } from '@/store/authStore';
import { useNavigate } from 'react-router-dom';
import { Building, Users, CreditCard, Wrench, Settings, LayoutDashboard } from 'lucide-react';
export function CommandMenu({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) {
  const navigate = useNavigate();
  const { properties } = usePropertyStore();
  const { tenants } = useTenantStore();
  const { role } = useAuthStore();
  const navLinks = role === 'landlord' ? landlordNavLinks : tenantNavLinks;
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(!open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [open, setOpen]);
  const runCommand = (command: () => unknown) => {
    setOpen(false);
    command();
  };
  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Navigation">
          {navLinks.map((link) => (
            <CommandItem key={link.href} onSelect={() => runCommand(() => navigate(link.href))}>
              <link.icon className="mr-2 h-4 w-4" />
              <span>{link.label}</span>
            </CommandItem>
          ))}
        </CommandGroup>
        {role === 'landlord' && (
          <>
            <CommandSeparator />
            <CommandGroup heading="Properties">
              {properties.map((property) => (
                <CommandItem key={property.id} onSelect={() => runCommand(() => navigate(`/app/properties/${property.id}`))}>
                  <Building className="mr-2 h-4 w-4" />
                  <span>{property.name}</span>
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Tenants">
              {tenants.map((tenant) => (
                <CommandItem key={tenant.id} onSelect={() => runCommand(() => navigate(`/app/tenants/${tenant.id}`))}>
                  <Users className="mr-2 h-4 w-4" />
                  <span>{tenant.name}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </>
        )}
      </CommandList>
    </CommandDialog>
  );
}