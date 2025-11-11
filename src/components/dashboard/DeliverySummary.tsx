import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Package, TrendingUp, Calendar, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface DeliverySummaryProps {
  packages: any[];
  userRole: 'admin' | 'driver';
}

export const DeliverySummary = ({ packages, userRole }: DeliverySummaryProps) => {
  const [filterType, setFilterType] = useState("all");
  const [dateFilter, setDateFilter] = useState("");
  const [clientFilter, setClientFilter] = useState("");

  const filteredPackages = packages.filter((pkg) => {
    let matches = true;

    // Filter by status
    if (filterType !== "all") {
      matches = matches && pkg.status === filterType;
    }

    // Filter by date
    if (dateFilter) {
      const pkgDate = new Date(pkg.lastUpdate).toISOString().split('T')[0];
      matches = matches && pkgDate === dateFilter;
    }

    // Filter by client
    if (clientFilter) {
      matches = matches && pkg.recipient.toLowerCase().includes(clientFilter.toLowerCase());
    }

    return matches;
  });

  const summary = {
    total: filteredPackages.length,
    delivered: filteredPackages.filter(p => p.status === 'delivered').length,
    inTransit: filteredPackages.filter(p => p.status === 'in-transit').length,
    pending: filteredPackages.filter(p => p.status === 'pending').length,
    notDelivered: filteredPackages.filter(p => p.status === 'not-delivered').length,
  };

  const deliveryRate = summary.total > 0 
    ? ((summary.delivered / summary.total) * 100).toFixed(1) 
    : '0';

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Resumen de Entregas
          </span>
          <Badge variant="delivered" className="text-sm">
            <TrendingUp className="h-3 w-3 mr-1" />
            {deliveryRate}% Tasa de entrega
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Estado</label>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger>
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filtrar por estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="delivered">Entregados</SelectItem>
                <SelectItem value="in-transit">En Tránsito</SelectItem>
                <SelectItem value="pending">Pendientes</SelectItem>
                <SelectItem value="not-delivered">No Entregados</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Fecha</label>
            <Input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full"
            />
          </div>

          {userRole === 'driver' && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Cliente</label>
              <Input
                placeholder="Buscar cliente..."
                value={clientFilter}
                onChange={(e) => setClientFilter(e.target.value)}
              />
            </div>
          )}
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-gradient-primary text-primary-foreground p-4 rounded-lg">
            <p className="text-sm opacity-90">Total</p>
            <p className="text-2xl font-bold">{summary.total}</p>
          </div>
          <div className="bg-success text-success-foreground p-4 rounded-lg">
            <p className="text-sm opacity-90">Entregados</p>
            <p className="text-2xl font-bold">{summary.delivered}</p>
          </div>
          <div className="bg-warning text-warning-foreground p-4 rounded-lg">
            <p className="text-sm opacity-90">En Tránsito</p>
            <p className="text-2xl font-bold">{summary.inTransit}</p>
          </div>
          <div className="bg-muted text-foreground p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Pendientes</p>
            <p className="text-2xl font-bold">{summary.pending}</p>
          </div>
          <div className="bg-destructive text-destructive-foreground p-4 rounded-lg">
            <p className="text-sm opacity-90">No Entregados</p>
            <p className="text-2xl font-bold">{summary.notDelivered}</p>
          </div>
        </div>

        {/* Package Details */}
        <div className="space-y-2 max-h-96 overflow-y-auto">
          <h3 className="font-semibold text-sm mb-3">Detalle de Paquetes ({filteredPackages.length})</h3>
          {filteredPackages.map((pkg) => (
            <div key={pkg.id} className="flex items-center justify-between p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-sm">{pkg.trackingNumber}</span>
                  <Badge variant={
                    pkg.status === 'delivered' ? 'delivered' :
                    pkg.status === 'in-transit' ? 'in-transit' :
                    pkg.status === 'not-delivered' ? 'not-delivered' : 'pending'
                  } className="text-xs">
                    {pkg.status === 'delivered' ? 'Entregado' :
                     pkg.status === 'in-transit' ? 'En Tránsito' :
                     pkg.status === 'not-delivered' ? 'No Entregado' : 'Pendiente'}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">{pkg.recipient}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(pkg.lastUpdate).toLocaleDateString('es-MX')}
                </p>
              </div>
              {userRole === 'admin' && pkg.driverName && (
                <p className="text-xs text-muted-foreground">{pkg.driverName}</p>
              )}
            </div>
          ))}
          {filteredPackages.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Package className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No hay paquetes que coincidan con los filtros</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};