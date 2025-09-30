import { useParams, Link } from 'react-router-dom';
import { useTenantStore } from '@/store/tenantStore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowLeft, Mail, Phone, Briefcase, Home, FileText, IndianRupee } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
export function TenantDetailPage() {
  const { tenantId } = useParams();
  const id = Number(tenantId);
  const { getTenantById } = useTenantStore();
  const tenant = getTenantById(id);
  if (!tenant) {
    return <div>Tenant not found.</div>;
  }
  const InfoField = ({ icon: Icon, label, value }: { icon: React.ElementType, label: string, value?: string | number }) => (
    <div className="flex items-start gap-3">
      <Icon className="h-5 w-5 text-muted-foreground mt-1" />
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="font-medium">{value || 'N/A'}</p>
      </div>
    </div>
  );
  return (
    <div className="space-y-6">
      <Link to="/app/tenants" className="flex items-center gap-2 text-sm text-muted-foreground hover:underline">
        <ArrowLeft className="h-4 w-4" />
        Back to Tenants
      </Link>
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardHeader className="items-center text-center">
              <Avatar className="w-24 h-24 mb-4">
                <AvatarImage src={tenant.profile_photo} alt={tenant.name} />
                <AvatarFallback className="text-3xl">{tenant.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <CardTitle className="text-2xl">{tenant.name}</CardTitle>
              <CardDescription>{tenant.occupation}</CardDescription>
              <Badge variant={tenant.is_approved ? 'default' : 'secondary'} className="mt-2">
                {tenant.is_approved ? 'Approved' : 'Pending Approval'}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <InfoField icon={Mail} label="Email" value={tenant.email} />
              <InfoField icon={Phone} label="Phone" value={tenant.phone} />
              <InfoField icon={Home} label="Permanent Address" value={tenant.permanent_address} />
            </CardContent>
          </Card>
        </div>
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Lease Information</CardTitle>
            </CardHeader>
            <CardContent className="grid sm:grid-cols-2 gap-6">
              <InfoField icon={Home} label="Property" value={`${tenant.property_name} - Unit ${tenant.unit_number}`} />
              <InfoField icon={FileText} label="Aadhar Number" value={tenant.aadhar_number} />
              <InfoField icon={FileText} label="Lease Start" value={tenant.lease_start_date ? format(new Date(tenant.lease_start_date), 'PPP') : 'N/A'} />
              <InfoField icon={FileText} label="Lease End" value={tenant.lease_end_date ? format(new Date(tenant.lease_end_date), 'PPP') : 'N/A'} />
              <InfoField icon={IndianRupee} label="Advance Paid" value={tenant.advance_amount?.toLocaleString('en-IN')} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Payment History</CardTitle>
              <CardDescription>Coming soon...</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center py-8">No payment history yet.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}