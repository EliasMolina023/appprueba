import { useState } from "react";
import { LandingPage } from "./LandingPage";
import { AdminDashboard } from "./AdminDashboard";
import { DriverDashboard } from "./DriverDashboard";
import { CustomerDashboard } from "./CustomerDashboard";

const Index = () => {
  const [currentRole, setCurrentRole] = useState<'admin' | 'driver' | 'customer' | null>(null);

  const handleRoleSelect = (role: 'admin' | 'driver' | 'customer') => {
    setCurrentRole(role);
  };

  const handleBackToLanding = () => {
    setCurrentRole(null);
  };

  if (currentRole === 'admin') {
    return <AdminDashboard onBack={handleBackToLanding} />;
  }
  
  if (currentRole === 'driver') {
    return <DriverDashboard onBack={handleBackToLanding} />;
  }
  
  if (currentRole === 'customer') {
    return <CustomerDashboard onBack={handleBackToLanding} />;
  }

  return <LandingPage onRoleSelect={handleRoleSelect} />;
};

export default Index;
