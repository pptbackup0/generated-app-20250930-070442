import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { PlusCircle, MapPin, Home } from 'lucide-react';
import { usePropertyStore } from '@/store/propertyStore';
import { PropertyForm } from '@/components/properties/PropertyForm';
import { toast } from 'sonner';
export function PropertiesPage() {
  const properties = usePropertyStore((state) => state.properties);
  const addProperty = usePropertyStore((state) => state.addProperty);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const handleAddProperty = (data: any) => {
    addProperty({ ...data, property_type: 'residential' });
    toast.success('Property added successfully!');
    setIsDialogOpen(false);
  };
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Properties</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" /> Add Property
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
              <DialogTitle>Add New Property</DialogTitle>
            </DialogHeader>
            <PropertyForm onSubmit={handleAddProperty} onCancel={() => setIsDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
        {properties.map((property) => (
          <Card key={property.id} className="flex flex-col hover:shadow-lg transition-shadow duration-200">
            <CardHeader>
              <CardTitle className="text-xl">{property.name}</CardTitle>
              <CardDescription className="flex items-center gap-1 pt-1">
                <MapPin className="h-4 w-4" /> {property.address}, {property.city}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Home className="h-4 w-4" />
                <span>{property.total_units} Units</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link to={`/app/properties/${property.id}`}>Manage Property</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}