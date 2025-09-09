import { Package, Shield, Truck, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface LandingPageProps {
  onRoleSelect: (role: 'admin' | 'driver' | 'customer') => void;
}

export const LandingPage = ({ onRoleSelect }: LandingPageProps) => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center justify-center w-16 h-16 bg-card rounded-2xl shadow-elegant">
              <Package className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-4">
            PackageTracker
          </h1>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Sistema completo de seguimiento de paquetes en tiempo real. 
            Gestiona entregas, actualiza estados y mantén a tus clientes informados.
          </p>
        </div>

        {/* Role Selection Cards */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-primary-foreground mb-8">
            Selecciona tu rol para continuar
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* Admin Card */}
            <Card className="hover:shadow-elegant transition-all duration-300 cursor-pointer"
                  onClick={() => onRoleSelect('admin')}>
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-xl">
                    <Shield className="h-6 w-6 text-primary-foreground" />
                  </div>
                </div>
                <CardTitle className="text-xl">Administrador</CardTitle>
                <CardDescription>Gestión completa del sistema</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Crear cuentas de usuarios</li>
                  <li>• Registrar y asignar paquetes</li>
                  <li>• Ver reportes completos</li>
                  <li>• Gestionar conductores</li>
                </ul>
                <Button className="w-full" variant="hero">
                  Acceder como Admin
                </Button>
              </CardContent>
            </Card>

            {/* Driver Card */}
            <Card className="hover:shadow-elegant transition-all duration-300 cursor-pointer"
                  onClick={() => onRoleSelect('driver')}>
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-secondary rounded-xl">
                    <Truck className="h-6 w-6 text-secondary-foreground" />
                  </div>
                </div>
                <CardTitle className="text-xl">Conductor</CardTitle>
                <CardDescription>Gestión de entregas</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Ver paquetes asignados</li>
                  <li>• Actualizar estados de entrega</li>
                  <li>• Tomar fotos de evidencia</li>
                  <li>• Agregar notas de entrega</li>
                </ul>
                <Button className="w-full" variant="secondary">
                  Acceder como Conductor
                </Button>
              </CardContent>
            </Card>

            {/* Customer Card */}
            <Card className="hover:shadow-elegant transition-all duration-300 cursor-pointer"
                  onClick={() => onRoleSelect('customer')}>
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-accent rounded-xl">
                    <Users className="h-6 w-6 text-accent-foreground" />
                  </div>
                </div>
                <CardTitle className="text-xl">Cliente</CardTitle>
                <CardDescription>Seguimiento de paquetes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Consultar estatus de paquetes</li>
                  <li>• Ver actualizaciones en tiempo real</li>
                  <li>• Acceder a fotos de entrega</li>
                  <li>• Historial de paquetes</li>
                </ul>
                <Button className="w-full border-accent text-accent hover:bg-accent hover:text-accent-foreground" variant="outline">
                  Rastrear Paquete
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-primary-foreground mb-8">
            Características del Sistema
          </h3>
          <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-card rounded-xl mx-auto mb-3">
                <Package className="h-6 w-6 text-primary" />
              </div>
              <h4 className="font-semibold text-primary-foreground mb-2">Seguimiento en Tiempo Real</h4>
              <p className="text-sm text-primary-foreground/80">Actualizaciones instantáneas del estado de cada paquete</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-card rounded-xl mx-auto mb-3">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h4 className="font-semibold text-primary-foreground mb-2">Sistema Seguro</h4>
              <p className="text-sm text-primary-foreground/80">Roles diferenciados y acceso controlado</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-card rounded-xl mx-auto mb-3">
                <Truck className="h-6 w-6 text-primary" />
              </div>
              <h4 className="font-semibold text-primary-foreground mb-2">Gestión de Entregas</h4>
              <p className="text-sm text-primary-foreground/80">Control completo del proceso de entrega</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-card rounded-xl mx-auto mb-3">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h4 className="font-semibold text-primary-foreground mb-2">Multi-Usuario</h4>
              <p className="text-sm text-primary-foreground/80">Interfaz adaptada para cada tipo de usuario</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};