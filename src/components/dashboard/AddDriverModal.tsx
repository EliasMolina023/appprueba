import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { UserPlus, Truck } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface AddDriverModalProps {
  onAddDriver: (driverData: any) => void;
}

export const AddDriverModal = ({ onAddDriver }: AddDriverModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    vehicleType: "",
    licenseNumber: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone || !formData.vehicleType) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos obligatorios",
        variant: "destructive"
      });
      return;
    }

    const newDriver = {
      id: Date.now().toString(),
      ...formData,
      status: "active",
      totalDeliveries: 0,
      createdAt: new Date().toISOString()
    };

    onAddDriver(newDriver);
    
    toast({
      title: "Repartidor agregado",
      description: `${formData.name} ha sido registrado correctamente`,
    });

    setFormData({
      name: "",
      email: "",
      phone: "",
      vehicleType: "",
      licenseNumber: ""
    });
    
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="hero" className="sm:w-auto">
          <UserPlus className="h-4 w-4 mr-2" />
          Agregar Repartidor
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Truck className="h-5 w-5 mr-2" />
            Registrar Nuevo Repartidor
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre Completo *</Label>
            <Input
              id="name"
              placeholder="Nombre del repartidor"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Correo Electrónico *</Label>
            <Input
              id="email"
              type="email"
              placeholder="correo@ejemplo.com"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Teléfono *</Label>
            <Input
              id="phone"
              placeholder="555-123-4567"
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="vehicleType">Tipo de Vehículo *</Label>
            <Select value={formData.vehicleType} onValueChange={(value) => setFormData(prev => ({ ...prev, vehicleType: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar vehículo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="motorcycle">Motocicleta</SelectItem>
                <SelectItem value="bicycle">Bicicleta</SelectItem>
                <SelectItem value="van">Camioneta</SelectItem>
                <SelectItem value="car">Automóvil</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="licenseNumber">Número de Licencia</Label>
            <Input
              id="licenseNumber"
              placeholder="LIC-123456"
              value={formData.licenseNumber}
              onChange={(e) => setFormData(prev => ({ ...prev, licenseNumber: e.target.value }))}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" className="flex-1" onClick={() => setIsOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" className="flex-1">
              Registrar Repartidor
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};