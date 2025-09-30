import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { usePropertyStore } from '@/store/propertyStore';
const numberPreprocess = (val: any) => (val === '' ? undefined : Number(val));
const utilityReadingSchema = z.object({
  unit_id: z.preprocess(numberPreprocess, z.number().min(1, "Please select a unit.")),
  electricity_reading: z.preprocess(numberPreprocess, z.number().min(0).optional()),
  water_reading: z.preprocess(numberPreprocess, z.number().min(0).optional()),
});
export type UtilityReadingFormValues = z.infer<typeof utilityReadingSchema>;
interface UtilityReadingFormProps {
  onSubmit: (data: UtilityReadingFormValues) => void;
  onCancel: () => void;
}
export function UtilityReadingForm({ onSubmit, onCancel }: UtilityReadingFormProps) {
  const { properties, units, getUnitsByPropertyId } = usePropertyStore();
  const form = useForm<UtilityReadingFormValues>({
    resolver: zodResolver(utilityReadingSchema),
  });
  const selectedUnitId = form.watch('unit_id');
  const selectedUnit = units.find(u => u.id === selectedUnitId);
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="unit_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select Unit</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value?.toString()}>
                <FormControl>
                  <SelectTrigger><SelectValue placeholder="Select a unit to enter readings" /></SelectTrigger>
                </FormControl>
                <SelectContent>
                  {properties.map(property => (
                    getUnitsByPropertyId(property.id).filter(u => u.is_occupied).map(unit => (
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
        {selectedUnit?.electricity_enabled && (
          <FormField
            control={form.control}
            name="electricity_reading"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Electricity Meter Reading</FormLabel>
                <FormControl><Input type="number" placeholder="Enter reading in kWh" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        {selectedUnit?.water_enabled && (
          <FormField
            control={form.control}
            name="water_reading"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Water Meter Reading</FormLabel>
                <FormControl><Input type="number" placeholder="Enter reading in Liters" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        {selectedUnit && (
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
            <Button type="submit">Generate Bill</Button>
          </div>
        )}
      </form>
    </Form>
  );
}