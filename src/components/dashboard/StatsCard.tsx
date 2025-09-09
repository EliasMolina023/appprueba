import { LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatsCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  variant: 'primary' | 'success' | 'warning' | 'destructive';
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

const variantClasses = {
  primary: 'bg-gradient-primary text-primary-foreground',
  success: 'bg-success text-success-foreground',
  warning: 'bg-warning text-warning-foreground',
  destructive: 'bg-destructive text-destructive-foreground',
};

export const StatsCard = ({ title, value, icon: Icon, variant, trend }: StatsCardProps) => {
  return (
    <Card className="hover:shadow-card transition-all duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className={`p-2 rounded-lg ${variantClasses[variant]}`}>
          <Icon className="h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">{value}</div>
        {trend && (
          <p className={`text-xs mt-1 ${trend.isPositive ? 'text-success' : 'text-destructive'}`}>
            {trend.isPositive ? '+' : '-'}{Math.abs(trend.value)}% desde ayer
          </p>
        )}
      </CardContent>
    </Card>
  );
};