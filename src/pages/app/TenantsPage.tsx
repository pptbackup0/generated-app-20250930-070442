import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { MoreHorizontal, PlusCircle, UserCheck, UserX } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useTenantStore } from '@/store/tenantStore';
import { TenantForm, TenantFormValues } from '@/components/tenants/TenantForm';
import { toast } from 'sonner';
import { Tenant } from '@shared/types';
export function TenantsPage() {
  const tenants = useTenantStore((state) => state.tenants);
  const addTenant = useTenantStore((state) => state.addTenant);
  const updateTenant = useTenantStore((state) => state.updateTenant);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const handleAddTenant = (data: TenantFormValues) => {
    const tenantData = {
      ...data,
      lease_start_date: data.lease_start_date.toISOString(),
      lease_end_date: data.lease_end_date.toISOString(),
    };
    addTenant(tenantData as any); // Type assertion to match store
    toast.success('Tenant added successfully! Awaiting approval.');
    setIsDialogOpen(false);
  };
  const toggleApproval = (tenant: Tenant) => {
    updateTenant({ ...tenant, is_approved: !tenant.is_approved });
    toast.success(`Tenant ${tenant.is_approved ? 'approval revoked' : 'approved'}.`);
  };
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Tenants</CardTitle>
          <CardDescription>Manage your tenants and their lease details.</CardDescription>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="gap-1">
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Add Tenant</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[725px]">
            <DialogHeader><DialogTitle>Onboard New Tenant</DialogTitle></DialogHeader>
            <TenantForm onSubmit={handleAddTenant} onCancel={() => setIsDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className="hidden md:table-cell">Property</TableHead>
              <TableHead>Status</TableHead>
              <TableHead><span className="sr-only">Actions</span></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tenants.map((tenant) => (
              <TableRow key={tenant.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={tenant.profile_photo} alt={tenant.name} />
                      <AvatarFallback>{tenant.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{tenant.name}</div>
                      <div className="text-sm text-muted-foreground">{tenant.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <div>{tenant.property_name}</div>
                  <div className="text-sm text-muted-foreground">Unit {tenant.unit_number}</div>
                </TableCell>
                <TableCell>
                  <Badge variant={tenant.is_approved ? 'default' : 'secondary'}>
                    {tenant.is_approved ? 'Approved' : 'Pending Approval'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild><Link to={`/app/tenants/${tenant.id}`}>View Details</Link></DropdownMenuItem>
                      <DropdownMenuItem onClick={() => toggleApproval(tenant)}>
                        {tenant.is_approved ? <UserX className="mr-2 h-4 w-4" /> : <UserCheck className="mr-2 h-4 w-4" />}
                        {tenant.is_approved ? 'Revoke Approval' : 'Approve'}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}