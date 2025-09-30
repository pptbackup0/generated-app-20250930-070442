import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { usePropertyStore } from '@/store/propertyStore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { MoreHorizontal, PlusCircle, ArrowLeft, Edit, Trash2, IndianRupee } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { UnitForm } from '@/components/units/UnitForm';
import { PropertyForm } from '@/components/properties/PropertyForm';
import { toast } from 'sonner';
import { Unit } from '@shared/types';
export function PropertyDetailPage() {
  const { propertyId } = useParams();
  const navigate = useNavigate();
  const id = Number(propertyId);
  const { getPropertyById, getUnitsByPropertyId, addUnit, updateUnit, deleteUnit, updateProperty, deleteProperty } = usePropertyStore();
  const property = getPropertyById(id);
  const units = getUnitsByPropertyId(id);
  const [isUnitDialogOpen, setIsUnitDialogOpen] = useState(false);
  const [isEditPropertyDialogOpen, setIsEditPropertyDialogOpen] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState<Unit | undefined>(undefined);
  if (!property) {
    return <div>Property not found.</div>;
  }
  const handleAddUnit = (data: any) => {
    addUnit({ ...data, property_id: id, is_occupied: false, advance_amount: 0 });
    toast.success('Unit added successfully!');
    setIsUnitDialogOpen(false);
  };
  const handleUpdateUnit = (data: any) => {
    if (selectedUnit) {
      updateUnit({ ...selectedUnit, ...data });
      toast.success('Unit updated successfully!');
      setIsUnitDialogOpen(false);
      setSelectedUnit(undefined);
    }
  };
  const handleEditUnitClick = (unit: Unit) => {
    setSelectedUnit(unit);
    setIsUnitDialogOpen(true);
  };
  const handleUpdateProperty = (data: any) => {
    updateProperty({ ...property, ...data });
    toast.success('Property updated successfully!');
    setIsEditPropertyDialogOpen(false);
  };
  const handleDeleteProperty = () => {
    deleteProperty(id);
    toast.success('Property deleted successfully!');
    navigate('/app/properties');
  };
  return (
    <div className="space-y-6">
      <Link to="/app/properties" className="flex items-center gap-2 text-sm text-muted-foreground hover:underline">
        <ArrowLeft className="h-4 w-4" />
        Back to Properties
      </Link>
      <Card>
        <CardHeader className="flex flex-row items-start justify-between">
          <div>
            <CardTitle className="text-2xl">{property.name}</CardTitle>
            <CardDescription>{property.address}, {property.city}, {property.state} - {property.pincode}</CardDescription>
          </div>
          <div className="flex gap-2">
            <Dialog open={isEditPropertyDialogOpen} onOpenChange={setIsEditPropertyDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">Edit Property</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[625px]">
                <DialogHeader><DialogTitle>Edit Property</DialogTitle></DialogHeader>
                <PropertyForm property={property} onSubmit={handleUpdateProperty} onCancel={() => setIsEditPropertyDialogOpen(false)} />
              </DialogContent>
            </Dialog>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">Delete Property</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the property and all its associated units and data.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeleteProperty}>Delete</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Units / Flats</CardTitle>
          <Dialog open={isUnitDialogOpen} onOpenChange={(open) => { setIsUnitDialogOpen(open); if (!open) setSelectedUnit(undefined); }}>
            <DialogTrigger asChild>
              <Button size="sm" className="gap-1">
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Add Unit</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[625px]">
              <DialogHeader><DialogTitle>{selectedUnit ? 'Edit Unit' : 'Add New Unit'}</DialogTitle></DialogHeader>
              <UnitForm unit={selectedUnit} onSubmit={selectedUnit ? handleUpdateUnit : handleAddUnit} onCancel={() => setIsUnitDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Unit No.</TableHead>
                <TableHead>Floor</TableHead>
                <TableHead>Rent</TableHead>
                <TableHead>Status</TableHead>
                <TableHead><span className="sr-only">Actions</span></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {units.map((unit) => (
                <TableRow key={unit.id}>
                  <TableCell className="font-medium">{unit.unit_number}</TableCell>
                  <TableCell>{unit.floor_number}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <IndianRupee className="h-3.5 w-3.5 mr-1" />
                      {unit.base_rent.toLocaleString('en-IN')}
                    </div>
                  </TableCell>
                  <TableCell>{unit.is_occupied ? 'Occupied' : 'Vacant'}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEditUnitClick(unit)}><Edit className="mr-2 h-4 w-4" /> Edit</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600" onClick={() => deleteUnit(unit.id)}><Trash2 className="mr-2 h-4 w-4" /> Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}