import { Package, MapPin, Clock, Camera, FileText } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface PackageCardProps {
  package: {
    id: string;
    trackingNumber: string;
    recipient: string;
    address: string;
    status: 'pending' | 'in-transit' | 'delivered' | 'not-delivered';
    lastUpdate: string;
    notes?: string;
    driverName?: string;
  };
  userRole: 'admin' | 'driver' | 'customer';
  onStatusUpdate?: (packageId: string, status: string) => void;
  onTakePhoto?: (packageId: string) => void;
  onAddNote?: (packageId: string) => void;
}

const statusMap = {
  'pending': { label: 'Pendiente', variant: 'pending' as const },
  'in-transit': { label: 'En Tránsito', variant: 'in-transit' as const },
  'delivered': { label: 'Entregado', variant: 'delivered' as const },
  'not-delivered': { label: 'No Entregado', variant: 'not-delivered' as const },
};

export const PackageCard = ({ 
  package: pkg, 
  userRole, 
  onStatusUpdate, 
  onTakePhoto, 
  onAddNote 
}: PackageCardProps) => {
  const statusInfo = statusMap[pkg.status];

  return (
    <Card className="hover:shadow-elegant transition-all duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-primary rounded-lg">
              <Package className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">{pkg.trackingNumber}</h3>
              <p className="text-sm text-muted-foreground">{pkg.recipient}</p>
            </div>
          </div>
          <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex items-start space-x-2">
          <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
          <p className="text-sm text-foreground">{pkg.address}</p>
        </div>

        <div className="flex items-center space-x-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            Actualizado: {new Date(pkg.lastUpdate).toLocaleString('es-MX')}
          </p>
        </div>

        {pkg.driverName && (
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-accent rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-accent-foreground rounded-full"></div>
            </div>
            <p className="text-sm text-foreground">Conductor: {pkg.driverName}</p>
          </div>
        )}

        {pkg.notes && (
          <div className="bg-muted p-3 rounded-lg">
            <p className="text-sm text-foreground">{pkg.notes}</p>
          </div>
        )}
      </CardContent>

      {userRole === 'driver' && (
        <CardFooter className="pt-3 border-t">
          <div className="flex flex-wrap gap-2 w-full">
            <Button
              size="sm"
              variant="success"
              onClick={() => onStatusUpdate?.(pkg.id, 'delivered')}
              className="flex-1"
            >
              Entregar
            </Button>
            <Button
              size="sm"
              variant="warning"
              onClick={() => onStatusUpdate?.(pkg.id, 'in-transit')}
              className="flex-1"
            >
              En Ruta
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onTakePhoto?.(pkg.id)}
            >
              <Camera className="h-4 w-4 mr-1" />
              Foto
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onAddNote?.(pkg.id)}
            >
              <FileText className="h-4 w-4 mr-1" />
              Nota
            </Button>
          </div>
        </CardFooter>
      )}
    </Card>
  );
};