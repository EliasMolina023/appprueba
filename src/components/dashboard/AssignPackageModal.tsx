import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Package, Plus } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface AssignPackageModalProps {
  onAssignPackage: (packageData: any) => void;
}

export const AssignPackageModal = ({ onAssignPackage }: AssignPackageModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    trackingNumber: "",
    recipient: "",
    address: "",
    driverId: "",
    notes: ""
  });

  // Mock drivers data - would come from API
  const drivers = [
    { id: "1", name: "Carlos López", vehicleType: "Motocicleta" },
    { id: "2", name: "María González", vehicleType: "Camioneta" },
    { id: "3", name: "Roberto Silva", vehicleType: "Motocicleta" },
    { id: "4", name: "Ana Martínez", vehicleType: "Bicicleta" }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.trackingNumber || !formData.recipient || !formData.address || !formData.driverId) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos obligatorios",
        variant: "destructive"
      });
      return;
    }

    const newPackage = {
      id: Date.now().toString(),
      trackingNumber: formData.trackingNumber.toUpperCase(),
      recipient: formData.recipient,
      address: formData.address,
      status: "pending" as const,
      lastUpdate: new Date().toISOString(),
      notes: formData.notes || "Paquete recién asignado",
      driverName: drivers.find(d => d.id === formData.driverId)?.name || "Sin asignar"
    };

    onAssignPackage(newPackage);
    
    toast({
      title: "Paquete asignado",
      description: `Paquete ${formData.trackingNumber} asignado correctamente`,
    });

    // Reset form
    setFormData({
      trackingNumber: "",
      recipient: "",
      address: "",
      driverId: "",
      notes: ""
    });
    
    setIsOpen(false);
  };

  const generateTrackingNumber = () => {
    const date = new Date();
    const year = date.getFullYear();
    const random = Math.floor(Math.random() * 9999).toString().padStart(4, '0');
    setFormData(prev => ({
      ...prev,
      trackingNumber: `PKG-${year}-${random}`
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="hero" className="sm:w-auto">
          <Plus className="h-4 w-4 mr-2" />
          Asignar Entrega
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Package className="h-5 w-5 mr-2" />
            Asignar Nueva Entrega
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="trackingNumber">Número de Guía *</Label>
            <div className="flex gap-2">
              <Input
                id="trackingNumber"
                placeholder="PKG-2024-0001"
                value={formData.trackingNumber}
                onChange={(e) => setFormData(prev => ({ ...prev, trackingNumber: e.target.value }))}
                className="flex-1"
              />
              <Button type="button" variant="outline" onClick={generateTrackingNumber}>
                Generar
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="recipient">Destinatario *</Label>
            <Input
              id="recipient"
              placeholder="Nombre del destinatario"
              value={formData.recipient}
              onChange={(e) => setFormData(prev => ({ ...prev, recipient: e.target.value }))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Dirección de Entrega *</Label>
            <Textarea
              id="address"
              placeholder="Dirección completa de entrega..."
              value={formData.address}
              onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="driver">Asignar a Conductor *</Label>
            <Select value={formData.driverId} onValueChange={(value) => setFormData(prev => ({ ...prev, driverId: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar conductor" />
              </SelectTrigger>
              <SelectContent>
                {drivers.map(driver => (
                  <SelectItem key={driver.id} value={driver.id}>
                    {driver.name} - {driver.vehicleType}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notas Iniciales</Label>
            <Textarea
              id="notes"
              placeholder="Instrucciones especiales o notas adicionales..."
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              rows={2}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" className="flex-1" onClick={() => setIsOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" className="flex-1">
              Asignar Paquete
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};