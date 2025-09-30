import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { usePropertyStore } from '@/store/propertyStore';
import { useTenantStore } from '@/store/tenantStore';
const transactionSchema = z.object({
  transaction_type: z.enum(['rent', 'electricity', 'water', 'maintenance', 'advance', 'refund', 'income', 'expense']),
  amount: z.coerce.number().positive('Amount must be positive'),
  paid_date: z.date(),
  unit_id: z.coerce.number().optional(),
  tenant_id: z.coerce.number().optional(),
  notes: z.string().optional(),
});
export type TransactionFormValues = z.infer<typeof transactionSchema>;
interface TransactionFormProps {
  onSubmit: (data: TransactionFormValues) => void;
  onCancel: () => void;
}
export function TransactionForm({ onSubmit, onCancel }: TransactionFormProps) {
  const { properties, getUnitsByPropertyId } = usePropertyStore();
  const { tenants } = useTenantStore();
  const form = useForm<TransactionFormValues>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      transaction_type: 'income',
      amount: 0,
      paid_date: new Date(),
      notes: '',
    },
  });

  const selectedUnitId = form.watch('unit_id');

  useEffect(() => {
    const selectedUnit = usePropertyStore.getState().units.find(u => u.id === selectedUnitId);
    if (selectedUnit && selectedUnit.tenant_id) {
      form.setValue('tenant_id', selectedUnit.tenant_id, { shouldValidate: true });
    }
  }, [selectedUnitId, form.setValue]);
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="transaction_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="income">Income</SelectItem>
                    <SelectItem value="expense">Expense</SelectItem>
                    <SelectItem value="rent">Rent Payment</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount (INR)</FormLabel>
                <FormControl><Input type="number" placeholder="e.g., 5000" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="unit_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Property / Unit (Optional)</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value ? String(field.value) : undefined}>
                <FormControl>
                  <SelectTrigger><SelectValue placeholder="Link to a unit" /></SelectTrigger>
                </FormControl>
                <SelectContent>
                  {properties.map(property => (
                    getUnitsByPropertyId(property.id).map(unit => (
                      <SelectItem key={unit.id} value={unit.id.toString()}>
                        {property.name} - {unit.unit_number}
                      </SelectItem>
                    ))
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="paid_date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button variant={"outline"} className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
                      {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl><Textarea placeholder="e.g., Monthly maintenance fee" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
          <Button type="submit">Add Transaction</Button>
        </div>
      </form>
    </Form>
  );
}