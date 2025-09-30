import * as React from 'react';
import { Menu, Search, Bell, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useAuthStore } from '@/store/authStore';
import { useLocation, useNavigate } from 'react-router-dom';
import { landlordNavLinks, tenantNavLinks } from '@/lib/constants';
import { SidebarNav } from './Sidebar';
import { CommandMenu } from '../CommandMenu';
import { cn } from '@/lib/utils';
function getPageTitle(pathname: string): string {
  const allLinks = [...landlordNavLinks, ...tenantNavLinks];
  const matchedLink = allLinks.find(link => pathname.startsWith(link.href) && link.href !== '/app/dashboard');
  if (pathname.match(/\/app\/properties\/\d+/)) return 'Property Details';
  if (pathname.match(/\/app\/tenants\/\d+/)) return 'Tenant Details';
  if (pathname === '/app/bills') return 'My Bills';
  return matchedLink ? matchedLink.label : 'Dashboard';
}
export function Header() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  const location = useLocation();
  const pageTitle = getPageTitle(location.pathname);
  const [openCommandMenu, setOpenCommandMenu] = React.useState(false);
  return (
    <>
      <header className="flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 sticky top-0 z-30">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="shrink-0 md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SidebarNav isMobile={true} />
          </SheetContent>
        </Sheet>
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <h1 className="text-xl font-semibold">{pageTitle}</h1>
          <div className="ml-auto flex-1 sm:flex-initial">
            <Button
              variant="outline"
              className={cn(
                'relative h-9 w-full justify-start rounded-[0.5rem] text-sm text-muted-foreground sm:w-64'
              )}
              onClick={() => setOpenCommandMenu(true)}
            >
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <span className="pl-6">Search...</span>
              <kbd className="pointer-events-none absolute right-1.5 top-2 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                <span className="text-xs">⌘</span>K
              </kbd>
            </Button>
          </div>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <User className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{user?.name || 'My Account'}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={() => navigate('/app/settings')}>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <CommandMenu open={openCommandMenu} setOpen={setOpenCommandMenu} />
    </>
  );
}