
import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  description?: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  className?: string;
}

const StatCard = ({
  title,
  value,
  icon,
  description,
  trend,
  trendValue,
  className,
}: StatCardProps) => {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <h4 className="text-2xl font-bold mt-1">{value}</h4>
            
            {(trend || description) && (
              <div className="mt-1">
                {trend && (
                  <span className={cn(
                    "inline-flex items-center text-xs font-medium mr-2",
                    trend === "up" && "text-green-600",
                    trend === "down" && "text-red-600",
                    trend === "neutral" && "text-gray-500"
                  )}>
                    {trend === "up" && "↑"}
                    {trend === "down" && "↓"}
                    {trendValue}
                  </span>
                )}
                
                {description && (
                  <span className="text-xs text-muted-foreground">
                    {description}
                  </span>
                )}
              </div>
            )}
          </div>
          
          <div className="p-2 rounded-full bg-primary/10 text-primary">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
