
import React from "react";
import { Badge } from "@/components/ui/badge";

interface VehicleStatusBadgeProps {
  status: string;
}

// Function to determine the status badge style
export const getStatusClass = (status: string) => {
  switch (status) {
    case "disponible":
      return "bg-green-100 text-green-800";
    case "réservé":
      return "bg-blue-100 text-blue-800";
    case "en entretien":
      return "bg-amber-100 text-amber-800";
    case "hors service":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const VehicleStatusBadge = ({ status }: VehicleStatusBadgeProps) => {
  return (
    <Badge className={getStatusClass(status)}>
      {status}
    </Badge>
  );
};

export default VehicleStatusBadge;
