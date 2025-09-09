import { useState } from "react";
import { Package, Search, Clock, MapPin, Camera } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";

export const CustomerDashboard = () => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [searchResult, setSearchResult] = useState<any>(null);
  const [isSearching, setIsSearching] = useState(false);

  // Mock package data
  const mockPackage = {
    trackingNumber: "PKG-2024-001",
    recipient: "Ana García",
    status: "in-transit",
    address: "Av. Reforma 123, Col. Centro, CDMX",
    timeline: [
      {
        date: "2024-01-15T08:00:00",
        status: "Paquete registrado",
        description: "Tu paquete ha sido registrado en nuestro sistema",
        location: "Centro de Distribución CDMX"
      },
      {
        date: "2024-01-15T09:30:00", 
        status: "Salió del CEDIS",
        description: "El paquete salió del centro de distribución",
        location: "CEDIS CDMX Norte"
      },
      {
        date: "2024-01-15T10:30:00",
        status: "En tránsito",
        description: "Paquete en ruta, llegada estimada 14:00 hrs",
        location: "En ruta hacia destino"
      }
    ],
    estimatedDelivery: "2024-01-15T14:00:00",
    driverName: "Carlos López",
    hasPhoto: false
  };

  const statusMap = {
    'pending': { label: 'Pendiente', variant: 'pending' as const },
    'in-transit': { label: 'En Tránsito', variant: 'in-transit' as const },
    'delivered': { label: 'Entregado', variant: 'delivered' as const },
    'not-delivered': { label: 'No Entregado', variant: 'not-delivered' as const },
  };

  const handleSearch = () => {
    if (!trackingNumber.trim()) {
      toast({
        title: "Error",
        description: "Por favor ingresa un número de guía válido",
        variant: "destructive"
      });
      return;
    }

    setIsSearching(true);
    
    // Simulate API call
    setTimeout(() => {
      if (trackingNumber.toLowerCase().includes('pkg-2024-001')) {
        setSearchResult(mockPackage);
        toast({
          title: "Paquete encontrado",
          description: "Se encontró información de tu paquete",
        });
      } else {
        setSearchResult(null);
        toast({
          title: "Paquete no encontrado",
          description: "No se encontró un paquete con ese número de guía",
          variant: "destructive"
        });
      }
      setIsSearching(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header userRole="customer" userName="Cliente" />
      
      <main className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Search Section */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-2xl">
              <Package className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-4">Rastrea tu Paquete</h1>
          <p className="text-muted-foreground mb-6">
            Ingresa tu número de guía para ver el estado de tu envío
          </p>
          
          <div className="flex gap-3 max-w-md mx-auto">
            <Input
              placeholder="Ej: PKG-2024-001"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <Button 
              onClick={handleSearch} 
              disabled={isSearching}
              variant="hero"
            >
              <Search className="h-4 w-4 mr-2" />
              {isSearching ? 'Buscando...' : 'Buscar'}
            </Button>
          </div>
        </div>

        {/* Search Results */}
        {searchResult && (
          <div className="space-y-6">
            {/* Package Info */}
            <Card className="shadow-card">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl">{searchResult.trackingNumber}</CardTitle>
                    <p className="text-muted-foreground">Destinatario: {searchResult.recipient}</p>
                  </div>
                  <Badge variant={statusMap[searchResult.status as keyof typeof statusMap].variant}>
                    {statusMap[searchResult.status as keyof typeof statusMap].label}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-2">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <p className="text-sm">{searchResult.address}</p>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <p className="text-sm">
                    Entrega estimada: {new Date(searchResult.estimatedDelivery).toLocaleString('es-MX')}
                  </p>
                </div>

                {searchResult.driverName && (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-accent rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-accent-foreground rounded-full"></div>
                    </div>
                    <p className="text-sm">Conductor asignado: {searchResult.driverName}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Historial de Seguimiento</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {searchResult.timeline.map((event: any, index: number) => (
                    <div key={index} className="flex space-x-4">
                      <div className="flex flex-col items-center">
                        <div className={`w-3 h-3 rounded-full ${
                          index === 0 ? 'bg-primary' : 'bg-muted'
                        }`}></div>
                        {index < searchResult.timeline.length - 1 && (
                          <div className="w-0.5 h-8 bg-border mt-2"></div>
                        )}
                      </div>
                      <div className="flex-1 pb-4">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium">{event.status}</h4>
                          <span className="text-sm text-muted-foreground">
                            {new Date(event.date).toLocaleString('es-MX')}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">{event.description}</p>
                        <p className="text-xs text-muted-foreground">{event.location}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Delivery Photo */}
            {searchResult.status === 'delivered' && searchResult.hasPhoto && (
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Camera className="h-5 w-5 mr-2" />
                    Foto de Entrega
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted rounded-lg p-8 text-center">
                    <Camera className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Foto de confirmación de entrega</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Help Section */}
        <div className="mt-12 text-center">
          <h3 className="text-lg font-semibold mb-4">¿Necesitas ayuda?</h3>
          <p className="text-muted-foreground mb-4">
            Si tienes algún problema con tu envío, no dudes en contactarnos
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button variant="outline">Soporte Técnico</Button>
            <Button variant="outline">Centro de Ayuda</Button>
          </div>
        </div>
      </main>
    </div>
  );
};