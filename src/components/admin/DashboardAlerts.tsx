
import { Bell, AlertTriangle, Clock, Calendar, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Alert {
  id: string;
  type: "warning" | "info" | "reminder" | "success";
  title: string;
  description: string;
  date: string;
}

interface DashboardAlertsProps {
  alerts: Alert[];
}

const DashboardAlerts = ({ alerts }: DashboardAlertsProps) => {
  const getAlertIcon = (type: Alert["type"]) => {
    switch (type) {
      case "warning":
        return <AlertTriangle className="h-4 w-4" />;
      case "info":
        return <Bell className="h-4 w-4" />;
      case "reminder":
        return <Clock className="h-4 w-4" />;
      case "success":
        return <CheckCircle2 className="h-4 w-4" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };
  
  const getAlertBadge = (type: Alert["type"]) => {
    switch (type) {
      case "warning":
        return <Badge variant="destructive">Action Required</Badge>;
      case "info":
        return <Badge variant="secondary">Info</Badge>;
      case "reminder":
        return <Badge variant="outline">Reminder</Badge>;
      case "success":
        return <Badge className="bg-green-500">Completed</Badge>;
      default:
        return <Badge variant="secondary">Info</Badge>;
    }
  };
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold">Alerts & Notifications</CardTitle>
          <Button variant="outline" size="sm" className="h-8">
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {alerts.length > 0 ? (
          <div className="space-y-4">
            {alerts.map((alert) => (
              <div key={alert.id} className="flex gap-3 pb-4 border-b last:border-0 last:pb-0">
                <div className={`p-2 rounded-full h-fit ${
                  alert.type === "warning" ? "bg-red-100 text-red-600" :
                  alert.type === "info" ? "bg-blue-100 text-blue-600" :
                  alert.type === "reminder" ? "bg-amber-100 text-amber-600" :
                  "bg-green-100 text-green-600"
                }`}>
                  {getAlertIcon(alert.type)}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h5 className="font-medium">{alert.title}</h5>
                    {getAlertBadge(alert.type)}
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">{alert.description}</p>
                  <div className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{alert.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6">
            <Bell className="h-8 w-8 mx-auto text-muted-foreground opacity-40" />
            <p className="mt-2 text-muted-foreground">No new alerts</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DashboardAlerts;
