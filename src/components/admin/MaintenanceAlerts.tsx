
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Car, Wrench, AlertCircle } from "lucide-react";

// Sample alerts data
const maintenanceAlerts = [
  {
    id: "a1",
    vehicle: "Toyota Corolla (123 ABC 78)",
    type: "Vidange d'huile",
    dueDate: "15/05/2025",
    urgency: "normal",
    message: "Vidange d'huile à planifier"
  },
  {
    id: "a2",
    vehicle: "Honda CR-V (456 DEF 78)",
    type: "Remplacement des plaquettes de frein",
    dueDate: "17/04/2025",
    urgency: "urgent",
    message: "Usure avancée des plaquettes de frein"
  },
  {
    id: "a3",
    vehicle: "Mercedes-Benz Classe E (789 GHI 78)",
    type: "Révision des 40 000 km",
    dueDate: "30/05/2025",
    urgency: "normal",
    message: "Révision à planifier"
  }
];

// Function to get the urgency badge style
const getUrgencyClass = (urgency: string) => {
  switch (urgency) {
    case "urgent":
      return "bg-red-100 text-red-800";
    case "normal":
      return "bg-amber-100 text-amber-800";
    case "info":
      return "bg-blue-100 text-blue-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const MaintenanceAlerts = () => {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-3">Alertes de Maintenance</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {maintenanceAlerts.map((alert) => (
          <Card key={alert.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Badge className={getUrgencyClass(alert.urgency)}>
                  {alert.urgency === "urgent" ? "Urgent" : "À planifier"}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  Échéance: {alert.dueDate}
                </span>
              </div>
              <h3 className="font-medium">{alert.vehicle}</h3>
              <div className="flex items-center mt-1 text-sm text-muted-foreground">
                <Wrench className="h-4 w-4 mr-2" />
                <span>{alert.type}</span>
              </div>
              <p className="mt-2 text-sm">{alert.message}</p>
              <div className="flex justify-end mt-3 space-x-2">
                <Button variant="outline" size="sm">
                  <Calendar className="h-4 w-4 mr-2" />
                  Planifier
                </Button>
                <Button variant="ghost" size="sm">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  Détails
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MaintenanceAlerts;
