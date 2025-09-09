import { useState } from "react";
import { Package, Truck, CheckCircle, AlertCircle, Filter } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { PackageCard } from "@/components/dashboard/PackageCard";
import { AssignPackageModal } from "@/components/dashboard/AssignPackageModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface AdminDashboardProps {
  onBack?: () => void;
}

export const AdminDashboard = ({ onBack }: AdminDashboardProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [packages, setPackages] = useState([
    {
      id: "1",
      trackingNumber: "PKG-2024-001",
      recipient: "Ana García",
      address: "Av. Reforma 123, Col. Centro, CDMX",
      status: "in-transit" as const,
      lastUpdate: "2024-01-15T10:30:00",
      notes: "Paquete en ruta, llegada estimada 14:00 hrs",
      driverName: "Carlos López"
    },
    {
      id: "2",
      trackingNumber: "PKG-2024-002", 
      recipient: "Juan Pérez",
      address: "Calle 5 de Mayo 456, Col. Roma Norte, CDMX",
      status: "delivered" as const,
      lastUpdate: "2024-01-15T09:45:00",
      notes: "Entregado en recepción del edificio",
      driverName: "María González"
    },
    {
      id: "3",
      trackingNumber: "PKG-2024-003",
      recipient: "Sofia Martínez",
      address: "Boulevard Manuel Ávila Camacho 789, Naucalpan",
      status: "pending" as const,
      lastUpdate: "2024-01-15T08:00:00",
      driverName: "Roberto Silva"
    }
  ]);

  // Calculate stats from current packages
  const stats = {
    total: packages.length,
    inTransit: packages.filter(p => p.status === 'in-transit').length,
    delivered: packages.filter(p => p.status === 'delivered').length,
    pending: packages.filter(p => p.status === 'pending').length
  };

  const handleAssignPackage = (newPackage: any) => {
    setPackages(prev => [newPackage, ...prev]);
  };

  const filteredPackages = packages.filter(pkg => {
    const matchesSearch = pkg.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pkg.recipient.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || pkg.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header userRole="admin" userName="Administrador" onBack={onBack} showBackButton={!!onBack} />
      
      <main className="container mx-auto px-4 py-6">
        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatsCard
            title="Total de Paquetes"
            value={stats.total}
            icon={Package}
            variant="primary"
            trend={{ value: 12, isPositive: true }}
          />
          <StatsCard
            title="En Tránsito"
            value={stats.inTransit}
            icon={Truck}
            variant="warning"
            trend={{ value: 5, isPositive: true }}
          />
          <StatsCard
            title="Entregados"
            value={stats.delivered}
            icon={CheckCircle}
            variant="success"
            trend={{ value: 8, isPositive: true }}
          />
          <StatsCard
            title="Pendientes"
            value={stats.pending}
            icon={AlertCircle}
            variant="destructive"
            trend={{ value: 3, isPositive: false }}
          />
        </div>

        {/* Actions and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <Input
              placeholder="Buscar por número de guía o cliente..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filtrar por estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los estados</SelectItem>
              <SelectItem value="pending">Pendientes</SelectItem>
              <SelectItem value="in-transit">En Tránsito</SelectItem>
              <SelectItem value="delivered">Entregados</SelectItem>
              <SelectItem value="not-delivered">No Entregados</SelectItem>
            </SelectContent>
          </Select>
          <AssignPackageModal onAssignPackage={handleAssignPackage} />
        </div>

        {/* Packages Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredPackages.map((pkg) => (
            <PackageCard
              key={pkg.id}
              package={pkg}
              userRole="admin"
            />
          ))}
        </div>

        {filteredPackages.length === 0 && (
          <div className="text-center py-12">
            <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No se encontraron paquetes</h3>
            <p className="text-muted-foreground">Intenta ajustar tus filtros de búsqueda</p>
          </div>
        )}
      </main>
    </div>
  );
};