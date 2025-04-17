
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock } from "lucide-react";
import { Vehicle } from "@/types/vehicle";

interface VehicleInspectionCardProps {
  vehicle: Vehicle;
}

const VehicleInspectionCard = ({ vehicle }: VehicleInspectionCardProps) => {
  return (
    <Card key={vehicle.id}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-medium">{vehicle.make} {vehicle.model}</h4>
          <Badge className="bg-amber-500">À planifier</Badge>
        </div>
        <p className="text-sm text-muted-foreground">{vehicle.plate}</p>
        <div className="mt-2 space-y-1 text-sm">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>Prochain contrôle: {vehicle.nextInspection}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>Dernier contrôle: {vehicle.lastInspection}</span>
          </div>
        </div>
        <Button variant="outline" size="sm" className="mt-3 w-full">
          Planifier
        </Button>
      </CardContent>
    </Card>
  );
};

export default VehicleInspectionCard;
