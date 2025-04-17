
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BarChart, Bell, Calendar, Car, Clock, FilterX, Tool, Wrench } from "lucide-react";
import { Progress } from "@/components/ui/progress";

type MaintenanceAlert = {
  id: string;
  vehicleId: string;
  vehicleName: string;
  type: string;
  dueDate: string;
  daysLeft: number;
  priority: 'high' | 'medium' | 'low';
  status: 'scheduled' | 'pending' | 'overdue';
};

type MaintenanceAlertsProps = {
  alerts: MaintenanceAlert[];
};

const getPriorityClass = (priority: string) => {
  switch (priority) {
    case 'high':
      return "bg-red-100 text-red-800";
    case 'medium':
      return "bg-amber-100 text-amber-800";
    case 'low':
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getStatusClass = (status: string) => {
  switch (status) {
    case 'scheduled':
      return "bg-blue-100 text-blue-800";
    case 'pending':
      return "bg-amber-100 text-amber-800";
    case 'overdue':
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const statusLabel = {
  scheduled: 'Planifié',
  pending: 'En attente',
  overdue: 'En retard'
};

const priorityLabel = {
  high: 'Haute',
  medium: 'Moyenne',
  low: 'Basse'
};

const MaintenanceAlerts = ({ alerts }: MaintenanceAlertsProps) => {
  // Trier les alertes par priorité (haute, moyenne, basse)
  const sortedAlerts = [...alerts].sort((a, b) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-lg font-semibold">
          <Bell className="mr-2 h-5 w-5" />
          Alertes d'entretien
        </CardTitle>
        <CardDescription>
          Entretiens et contrôles à venir ou en retard
        </CardDescription>
      </CardHeader>
      <CardContent>
        {sortedAlerts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <FilterX className="h-10 w-10 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">Aucune alerte</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Tous les véhicules sont à jour dans leurs entretiens
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {sortedAlerts.map((alert) => (
              <div
                key={alert.id}
                className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-2 md:space-y-0 p-3 rounded-lg border"
              >
                <div className="space-y-1">
                  <div className="flex items-center">
                    <Car className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="font-medium">{alert.vehicleName}</span>
                    <Badge
                      variant="outline"
                      className={`ml-2 ${getPriorityClass(alert.priority)}`}
                    >
                      {priorityLabel[alert.priority]}
                    </Badge>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Tool className="h-4 w-4 mr-2" />
                    <span>{alert.type}</span>
                  </div>
                </div>

                <div className="flex flex-col md:items-end space-y-1 w-full md:w-auto">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 md:hidden" />
                    <Badge
                      variant="outline"
                      className={getStatusClass(alert.status)}
                    >
                      {statusLabel[alert.status]}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-1 text-sm">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>Échéance: {alert.dueDate}</span>
                    <span>
                      ({alert.daysLeft < 0
                        ? `Retard de ${Math.abs(alert.daysLeft)} jours`
                        : alert.daysLeft === 0
                        ? "Aujourd'hui"
                        : `Dans ${alert.daysLeft} jours`})
                    </span>
                  </div>
                </div>

                <div className="flex space-x-2 w-full md:w-auto mt-2 md:mt-0">
                  <Button variant="outline" size="sm" className="w-full md:w-auto">
                    <Calendar className="h-4 w-4 mr-2" />
                    Planifier
                  </Button>
                  <Button size="sm" className="w-full md:w-auto">
                    <Wrench className="h-4 w-4 mr-2" />
                    Détails
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {alerts.length > 0 && (
          <div className="mt-4 pt-4 border-t">
            <div className="flex justify-between items-center">
              <div>
                <span className="text-sm font-medium">Résumé</span>
                <div className="flex items-center space-x-4 mt-2">
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <span className="text-xs">
                      {alerts.filter((a) => a.priority === "high").length} urgentes
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                    <span className="text-xs">
                      {alerts.filter((a) => a.priority === "medium").length} moyennes
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-xs">
                      {alerts.filter((a) => a.priority === "low").length} faibles
                    </span>
                  </div>
                </div>
              </div>
              <Button variant="outline" size="sm">
                <BarChart className="h-4 w-4 mr-2" />
                Rapport complet
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MaintenanceAlerts;
