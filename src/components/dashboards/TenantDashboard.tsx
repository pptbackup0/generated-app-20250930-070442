import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { IndianRupee, Home, Wrench, FileText } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useTenantStore } from '@/store/tenantStore';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
export function TenantDashboard() {
  const user = useAuthStore((state) => state.user);
  const { getTenantById } = useTenantStore();
  // In a real app, the user object would be a Tenant. Here we fetch the first mock tenant.
  const tenant = getTenantById(101);
  if (!user || user.role !== 'tenant' || !tenant) {
    return <div>Loading tenant information...</div>;
  }
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Welcome back, {user.name.split(' ')[0]}!</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>My Residence</CardTitle>
            <CardDescription>Details about your current lease.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-start gap-3">
              <Home className="h-6 w-6 text-muted-foreground mt-1" />
              <div>
                <p className="text-sm text-muted-foreground">Property</p>
                <p className="font-semibold">{tenant.property_name}</p>
                <p className="text-sm text-muted-foreground">Unit {tenant.unit_number}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <FileText className="h-6 w-6 text-muted-foreground mt-1" />
              <div>
                <p className="text-sm text-muted-foreground">Lease End Date</p>
                <p className="font-semibold">{tenant.lease_end_date ? format(new Date(tenant.lease_end_date), 'PPP') : 'N/A'}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Next Payment Due</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold flex items-center">
              <IndianRupee className="h-7 w-7 mr-1" />
              26,500
            </p>
            <p className="text-sm text-muted-foreground">Due on July 1, 2024</p>
            <Button className="w-full mt-4">Pay Now</Button>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Bills</CardTitle>
            <Button variant="outline" size="sm" asChild>
              <Link to="/app/bills">View All</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex justify-between items-center">
                <div>
                  <p className="font-medium">June Rent & Utilities</p>
                  <p className="text-sm text-muted-foreground">Paid on June 5, 2024</p>
                </div>
                <p className="font-mono">₹26,500</p>
              </li>
              <li className="flex justify-between items-center">
                <div>
                  <p className="font-medium">May Rent & Utilities</p>
                  <p className="text-sm text-muted-foreground">Paid on May 4, 2024</p>
                </div>
                <p className="font-mono">₹26,200</p>
              </li>
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Maintenance Requests</CardTitle>
            <Button variant="outline" size="sm" asChild>
              <Link to="/app/maintenance">New Request</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Leaky Kitchen Faucet</p>
                  <p className="text-sm text-green-600">Completed</p>
                </div>
                <p className="text-sm text-muted-foreground">June 15, 2024</p>
              </li>
              <li className="flex justify-between items-center">
                <div>
                  <p className="font-medium">AC Not Cooling</p>
                  <p className="text-sm text-yellow-600">In Progress</p>
                </div>
                <p className="text-sm text-muted-foreground">June 28, 2024</p>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}