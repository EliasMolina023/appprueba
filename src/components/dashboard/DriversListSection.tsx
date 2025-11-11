import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Truck, Edit, Trash2, Phone, Mail } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "@/hooks/use-toast";

interface Driver {
  id: string;
  name: string;
  email: string;
  phone: string;
  vehicleType: string;
  status: string;
  totalDeliveries: number;
}

interface DriversListSectionProps {
  drivers: Driver[];
  onDeleteDriver: (driverId: string) => void;
  onEditDriver: (driverId: string) => void;
}

const vehicleTypeMap: Record<string, string> = {
  motorcycle: "Motocicleta",
  bicycle: "Bicicleta",
  van: "Camioneta",
  car: "Automóvil"
};

export const DriversListSection = ({ drivers, onDeleteDriver, onEditDriver }: DriversListSectionProps) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedDriverId, setSelectedDriverId] = useState<string | null>(null);

  const handleDelete = () => {
    if (selectedDriverId) {
      onDeleteDriver(selectedDriverId);
      toast({
        title: "Repartidor eliminado",
        description: "El repartidor ha sido eliminado correctamente",
      });
      setDeleteDialogOpen(false);
      setSelectedDriverId(null);
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Truck className="h-5 w-5" />
            Repartidores Registrados ({drivers.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {drivers.map((driver) => (
              <div
                key={driver.id}
                className="flex items-center justify-between p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-lg">{driver.name}</h3>
                    <Badge variant={driver.status === 'active' ? 'delivered' : 'pending'}>
                      {driver.status === 'active' ? 'Activo' : 'Inactivo'}
                    </Badge>
                  </div>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Mail className="h-3 w-3" />
                      {driver.email}
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-3 w-3" />
                      {driver.phone}
                    </div>
                    <div className="flex items-center gap-2">
                      <Truck className="h-3 w-3" />
                      {vehicleTypeMap[driver.vehicleType] || driver.vehicleType}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Total entregas: <span className="font-semibold">{driver.totalDeliveries}</span>
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onEditDriver(driver.id)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => {
                      setSelectedDriverId(driver.id);
                      setDeleteDialogOpen(true);
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            {drivers.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <Truck className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>No hay repartidores registrados</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar repartidor?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. El repartidor será eliminado permanentemente del sistema.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};