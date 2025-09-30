import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Unit } from '@shared/types';
const numberPreprocess = (val: any) => (val === '' ? undefined : Number(val));
const unitSchema = z.object({
  unit_number: z.string().min(1, 'Unit number is required'),
  floor_number: z.preprocess(numberPreprocess, z.number().int('Floor must be an integer')),
  base_rent: z.preprocess(numberPreprocess, z.number().min(0, 'Rent must be a positive number')),
  electricity_enabled: z.boolean(),
  electricity_rate: z.preprocess(numberPreprocess, z.number().min(0).optional()),
  water_enabled: z.boolean(),
  water_rate: z.preprocess(numberPreprocess, z.number().min(0).optional()),
  maintenance_enabled: z.boolean(),
  maintenance_charge: z.preprocess(numberPreprocess, z.number().min(0).optional()),
});
export type UnitFormValues = z.infer<typeof unitSchema>;
interface UnitFormProps {
  unit?: Unit;
  onSubmit: (data: UnitFormValues) => void;
  onCancel: () => void;
}
export function UnitForm({ unit, onSubmit, onCancel }: UnitFormProps) {
  const form = useForm<UnitFormValues>({
    resolver: zodResolver(unitSchema),
    defaultValues: unit || {
      unit_number: '',
      floor_number: 0,
      base_rent: 0,
      electricity_enabled: false,
      electricity_rate: 0,
      water_enabled: false,
      water_rate: 0,
      maintenance_enabled: false,
      maintenance_charge: 0,
    },
  });
  const watchElectricity = form.watch('electricity_enabled');
  const watchWater = form.watch('water_enabled');
  const watchMaintenance = form.watch('maintenance_enabled');
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="unit_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Unit/Flat Number</FormLabel>
                <FormControl><Input placeholder="e.g., A-101" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="floor_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Floor Number</FormLabel>
                <FormControl><Input type="number" placeholder="e.g., 1" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="base_rent"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Base Rent (INR)</FormLabel>
                <FormControl><Input type="number" placeholder="e.g., 25000" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="space-y-4 rounded-md border p-4">
          <h3 className="text-lg font-medium">Utility Services</h3>
          <FormField
            control={form.control}
            name="electricity_enabled"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between">
                <div className="space-y-0.5">
                  <FormLabel>Electricity</FormLabel>
                </div>
                <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
              </FormItem>
            )}
          />
          {watchElectricity && (
            <FormField
              control={form.control}
              name="electricity_rate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Electricity Rate (per unit)</FormLabel>
                  <FormControl><Input type="number" placeholder="e.g., 8.5" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>
        <div className="space-y-4 rounded-md border p-4">
          <FormField
            control={form.control}
            name="water_enabled"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between">
                <div className="space-y-0.5">
                  <FormLabel>Water</FormLabel>
                </div>
                <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
              </FormItem>
            )}
          />
          {watchWater && (
            <FormField
              control={form.control}
              name="water_rate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Water Rate (per liter/fixed)</FormLabel>
                  <FormControl><Input type="number" placeholder="e.g., 50" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>
        <div className="space-y-4 rounded-md border p-4">
          <FormField
            control={form.control}
            name="maintenance_enabled"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between">
                <div className="space-y-0.5">
                  <FormLabel>Maintenance</FormLabel>
                </div>
                <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
              </FormItem>
            )}
          />
          {watchMaintenance && (
            <FormField
              control={form.control}
              name="maintenance_charge"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Maintenance Charge (fixed monthly)</FormLabel>
                  <FormControl><Input type="number" placeholder="e.g., 1500" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>
        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
          <Button type="submit">{unit ? 'Save Changes' : 'Add Unit'}</Button>
        </div>
      </form>
    </Form>
  );
}