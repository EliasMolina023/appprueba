import { useState } from "react";
import { Package, Navigation, CheckCircle2, Camera } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { PackageCard } from "@/components/dashboard/PackageCard";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

export const DriverDashboard = () => {
  const [packages, setPackages] = useState([
    {
      id: "1",
      trackingNumber: "PKG-2024-001",
      recipient: "Ana García",
      address: "Av. Reforma 123, Col. Centro, CDMX",
      status: "in-transit" as const,
      lastUpdate: "2024-01-15T10:30:00",
      notes: "Paquete en ruta, llegada estimada 14:00 hrs"
    },
    {
      id: "2",
      trackingNumber: "PKG-2024-005",
      recipient: "Pedro Ramírez",
      address: "Insurgentes Sur 890, Col. Del Valle, CDMX",
      status: "pending" as const,
      lastUpdate: "2024-01-15T08:00:00"
    },
    {
      id: "3",
      trackingNumber: "PKG-2024-007",
      recipient: "Laura Hernández", 
      address: "Eje Central 234, Col. Doctores, CDMX",
      status: "pending" as const,
      lastUpdate: "2024-01-15T08:00:00"
    }
  ]);

  const stats = {
    assigned: packages.length,
    inTransit: packages.filter(p => p.status === 'in-transit').length,
    delivered: 0, // Would be calculated from delivered packages today
    pending: packages.filter(p => p.status === 'pending').length
  };

  const handleStatusUpdate = (packageId: string, newStatus: string) => {
    setPackages(prev => 
      prev.map(pkg => 
        pkg.id === packageId 
          ? { ...pkg, status: newStatus as any, lastUpdate: new Date().toISOString() }
          : pkg
      )
    );
    
    const statusMessages = {
      'delivered': 'Paquete marcado como entregado',
      'in-transit': 'Paquete en ruta',
      'not-delivered': 'Paquete marcado como no entregado'
    };
    
    toast({
      title: "Estado actualizado",
      description: statusMessages[newStatus as keyof typeof statusMessages],
    });
  };

  const handleTakePhoto = (packageId: string) => {
    toast({
      title: "Cámara activada",
      description: "Función de cámara próximamente disponible",
    });
  };

  const handleAddNote = (packageId: string) => {
    toast({
      title: "Agregar nota",
      description: "Función de notas próximamente disponible",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header userRole="driver" userName="Carlos López" />
      
      <main className="container mx-auto px-4 py-6">
        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatsCard
            title="Asignados"
            value={stats.assigned}
            icon={Package}
            variant="primary"
          />
          <StatsCard
            title="En Ruta"
            value={stats.inTransit}
            icon={Navigation}
            variant="warning"
          />
          <StatsCard
            title="Entregados Hoy"
            value={stats.delivered}
            icon={CheckCircle2}
            variant="success"
          />
          <StatsCard
            title="Pendientes"
            value={stats.pending}
            icon={Package}
            variant="destructive"
          />
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-3 mb-6">
          <Button variant="hero">
            <Navigation className="h-4 w-4 mr-2" />
            Iniciar Ruta
          </Button>
          <Button variant="outline">
            <Camera className="h-4 w-4 mr-2" />
            Cámara Rápida
          </Button>
        </div>

        {/* Package Assignment */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Paquetes Asignados</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {packages.map((pkg) => (
              <PackageCard
                key={pkg.id}
                package={pkg}
                userRole="driver"
                onStatusUpdate={handleStatusUpdate}
                onTakePhoto={handleTakePhoto}
                onAddNote={handleAddNote}
              />
            ))}
          </div>
        </div>

        {packages.length === 0 && (
          <div className="text-center py-12">
            <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No hay paquetes asignados</h3>
            <p className="text-muted-foreground">Contacta al administrador para obtener asignaciones</p>
          </div>
        )}
      </main>
    </div>
  );
};