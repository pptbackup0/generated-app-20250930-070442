import { useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useMaintenanceStore, MaintenanceRequest, MaintenanceStatus, MaintenancePriority } from '@/store/maintenanceStore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { PlusCircle, Filter } from 'lucide-react';
import { MaintenanceRequestForm, MaintenanceRequestFormValues } from '@/components/maintenance/MaintenanceRequestForm';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTenantStore } from '@/store/tenantStore';
const statusColors: Record<MaintenanceStatus, string> = {
  Open: 'bg-blue-500',
  'In Progress': 'bg-yellow-500',
  Completed: 'bg-green-500',
  Cancelled: 'bg-gray-500',
};
const priorityColors: Record<MaintenancePriority, string> = {
    Low: 'bg-gray-400',
    Medium: 'bg-blue-400',
    High: 'bg-yellow-400',
    Urgent: 'bg-red-500',
};
const LandlordMaintenanceView = () => {
  const { requests, updateRequestStatus } = useMaintenanceStore();
  const handleStatusChange = (id: number, status: MaintenanceStatus, priority: MaintenancePriority) => {
    updateRequestStatus(id, status, priority);
    toast.success('Request status updated.');
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Maintenance Hub</CardTitle>
        <CardDescription>Track and manage all maintenance requests.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {requests.map((req) => (
          <Card key={req.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{req.title}</CardTitle>
                  <CardDescription>
                    From: {req.tenant_name} ({req.property_name} - {req.unit_number})
                  </CardDescription>
                </div>
                <Badge className={priorityColors[req.priority]}>{req.priority}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{req.description}</p>
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">
                  Reported on {format(new Date(req.created_at), 'PPP')}
                </p>
                <div className="flex items-center gap-2">
                    <Select defaultValue={req.status} onValueChange={(value) => handleStatusChange(req.id, value as MaintenanceStatus, req.priority)}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Update status" />
                        </SelectTrigger>
                        <SelectContent>
                            {(['Open', 'In Progress', 'Completed', 'Cancelled'] as MaintenanceStatus[]).map(s => (
                                <SelectItem key={s} value={s}>{s}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
};
const TenantMaintenanceView = () => {
  const user = useAuthStore((state) => state.user);
  const { getRequestsByTenantId, addRequest } = useMaintenanceStore();
  const { getTenantById } = useTenantStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  // Using mock tenant for now as user object is generic
  const tenant = getTenantById(101); 
  const tenantRequests = getRequestsByTenantId(tenant?.id || 0);
  const handleSubmitRequest = (data: MaintenanceRequestFormValues) => {
    if (!tenant) {
        toast.error("Could not identify tenant.");
        return;
    }
    addRequest({
      ...data,
      tenant_id: tenant.id,
      tenant_name: tenant.name,
      property_id: tenant.property_id!,
      property_name: tenant.property_name!,
      unit_number: tenant.unit_number!,
    });
    toast.success('Maintenance request submitted successfully!');
    setIsDialogOpen(false);
  };
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>My Maintenance Requests</CardTitle>
          <CardDescription>Submit and track your requests.</CardDescription>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="gap-1">
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">New Request</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader><DialogTitle>Submit a New Request</DialogTitle></DialogHeader>
            <MaintenanceRequestForm onSubmit={handleSubmitRequest} onCancel={() => setIsDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent className="space-y-4">
        {tenantRequests.map((req) => (
          <div key={req.id} className="p-4 border rounded-md">
            <div className="flex justify-between items-center">
              <p className="font-medium">{req.title}</p>
              <Badge className={statusColors[req.status]}>{req.status}</Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-2">{req.description}</p>
            <p className="text-xs text-muted-foreground mt-4">
              Submitted on {format(new Date(req.created_at), 'PPP')}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
export function MaintenancePage() {
  const role = useAuthStore((state) => state.role);
  if (role === 'landlord') {
    return <LandlordMaintenanceView />;
  }
  if (role === 'tenant') {
    return <TenantMaintenanceView />;
  }
  return <div>Loading...</div>;
}