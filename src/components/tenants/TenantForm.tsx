import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Tenant } from '@shared/types';
import { CalendarIcon, Upload } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns/format';
import { Calendar } from '@/components/ui/calendar';
const tenantSchema = z.object({
  name: z.string().min(2, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^\d{10}$/, 'Invalid phone number (10 digits)'),
  aadhar_number: z.string().regex(/^\d{4}\s\d{4}\s\d{4}$/, 'Invalid Aadhar format (e.g., 1234 5678 9012)').optional().or(z.literal('')),
  permanent_address: z.string().min(5, 'Permanent address is required'),
  occupation: z.string().optional().or(z.literal('')),
  lease_start_date: z.date({ invalid_type_error: "Lease start date is required." }),
  lease_end_date: z.date({ invalid_type_error: "Lease end date is required." }),
  advance_amount: z.coerce.number().min(0, 'Advance must be a positive number').optional().default(0),
});
export type TenantFormValues = z.infer<typeof tenantSchema>;
interface TenantFormProps {
  tenant?: Tenant;
  onSubmit: (data: TenantFormValues) => void;
  onCancel: () => void;
}
export function TenantForm({ tenant, onSubmit, onCancel }: TenantFormProps) {
  const defaultValues = tenant ? {
      ...tenant,
      lease_start_date: tenant.lease_start_date ? new Date(tenant.lease_start_date) : undefined,
      lease_end_date: tenant.lease_end_date ? new Date(tenant.lease_end_date) : undefined,
  } : {
      name: '',
      email: '',
      phone: '',
      aadhar_number: '',
      permanent_address: '',
      occupation: '',
      advance_amount: 0,
      lease_start_date: undefined,
      lease_end_date: undefined,
  };
  const form = useForm<TenantFormValues>({
    resolver: zodResolver(tenantSchema),
    defaultValues,
  });
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center">
            <Upload className="w-8 h-8 text-muted-foreground" />
          </div>
          <Button type="button" variant="outline">Upload Photo</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField control={form.control} name="name" render={({ field }) => (
            <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
          )} />
          <FormField control={form.control} name="email" render={({ field }) => (
            <FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem>
          )} />
          <FormField control={form.control} name="phone" render={({ field }) => (
            <FormItem><FormLabel>Phone Number</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
          )} />
          <FormField control={form.control} name="aadhar_number" render={({ field }) => (
            <FormItem><FormLabel>Aadhar Number</FormLabel><FormControl><Input placeholder="XXXX XXXX XXXX" {...field} /></FormControl><FormMessage /></FormItem>
          )} />
        </div>
        <FormField control={form.control} name="permanent_address" render={({ field }) => (
          <FormItem><FormLabel>Permanent Address</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField control={form.control} name="occupation" render={({ field }) => (
            <FormItem><FormLabel>Occupation</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
          )} />
          <FormField control={form.control} name="advance_amount" render={({ field }) => (
            <FormItem><FormLabel>Advance Payment (INR)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
          )} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField control={form.control} name="lease_start_date" render={({ field }) => (
            <FormItem className="flex flex-col"><FormLabel>Lease Start Date</FormLabel><Popover><PopoverTrigger asChild>
              <FormControl>
                <Button variant={"outline"} className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
                  {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger><PopoverContent className="w-auto p-0" align="start">
              <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
            </PopoverContent></Popover><FormMessage /></FormItem>
          )} />
          <FormField control={form.control} name="lease_end_date" render={({ field }) => (
            <FormItem className="flex flex-col"><FormLabel>Lease End Date</FormLabel><Popover><PopoverTrigger asChild>
              <FormControl>
                <Button variant={"outline"} className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
                  {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger><PopoverContent className="w-auto p-0" align="start">
              <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
            </PopoverContent></Popover><FormMessage /></FormItem>
          )} />
        </div>
        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
          <Button type="submit">{tenant ? 'Save Changes' : 'Add Tenant'}</Button>
        </div>
      </form>
    </Form>
  );
}