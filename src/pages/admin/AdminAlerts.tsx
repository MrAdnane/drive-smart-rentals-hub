
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, AlertTriangle, CheckCircle, Info, Bell, X } from "lucide-react";

// Données d'alertes d'exemple
const sampleAlerts = [
  {
    id: "A1001",
    title: "Entretien Véhicule",
    description: "Toyota Corolla (123 ABC 78) nécessite une vidange d'huile",
    severity: "warning",
    date: "16/04/2025",
    status: "active"
  },
  {
    id: "A1002",
    title: "Problème Signalé",
    description: "Honda CR-V (456 DEF 78) - Client a signalé un bruit au niveau de la suspension",
    severity: "high",
    date: "15/04/2025",
    status: "active"
  },
  {
    id: "A1003",
    title: "Assurance Expirée",
    description: "Mercedes-Benz Classe E (789 GHI 78) - Assurance expire dans 5 jours",
    severity: "high",
    date: "14/04/2025",
    status: "active"
  },
  {
    id: "A1004",
    title: "Visite Technique",
    description: "4 véhicules doivent passer la visite technique le mois prochain",
    severity: "info",
    date: "13/04/2025",
    status: "active"
  },
  {
    id: "A1005",
    title: "Réservation Expirée",
    description: "Toyota Corolla - Retour de véhicule en retard de 1 jour (Client: Mohammed Alami)",
    severity: "critical",
    date: "12/04/2025",
    status: "resolved"
  }
];

// Fonction pour obtenir l'icône selon la sévérité
const getAlertIcon = (severity: string) => {
  switch (severity) {
    case "info":
      return <Info className="h-5 w-5 text-blue-500" />;
    case "warning":
      return <AlertTriangle className="h-5 w-5 text-amber-500" />;
    case "high":
      return <AlertCircle className="h-5 w-5 text-orange-500" />;
    case "critical":
      return <AlertCircle className="h-5 w-5 text-red-500" />;
    default:
      return <Bell className="h-5 w-5 text-gray-500" />;
  }
};

// Fonction pour obtenir la classe de badge selon la sévérité
const getSeverityClass = (severity: string) => {
  switch (severity) {
    case "info":
      return "bg-blue-100 text-blue-800";
    case "warning":
      return "bg-amber-100 text-amber-800";
    case "high":
      return "bg-orange-100 text-orange-800";
    case "critical":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

// Fonction pour traduire la sévérité
const translateSeverity = (severity: string) => {
  switch (severity) {
    case "info":
      return "Information";
    case "warning":
      return "Avertissement";
    case "high":
      return "Élevée";
    case "critical":
      return "Critique";
    default:
      return severity;
  }
};

// Fonction pour traduire le statut
const translateStatus = (status: string) => {
  switch (status) {
    case "active":
      return "Active";
    case "resolved":
      return "Résolue";
    default:
      return status;
  }
};

const AdminAlerts = () => {
  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Alertes du Système</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <CheckCircle className="mr-2 h-4 w-4" /> Marquer tout comme lu
          </Button>
          <Button>
            <Bell className="mr-2 h-4 w-4" /> Configurer les Alertes
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 mr-2 text-red-500" />
              <div>
                <p className="text-sm font-medium">Alertes Critiques</p>
                <p className="text-2xl font-bold">1</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 mr-2 text-orange-500" />
              <div>
                <p className="text-sm font-medium">Alertes Élevées</p>
                <p className="text-2xl font-bold">2</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2 text-amber-500" />
              <div>
                <p className="text-sm font-medium">Avertissements</p>
                <p className="text-2xl font-bold">1</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center">
              <Info className="h-5 w-5 mr-2 text-blue-500" />
              <div>
                <p className="text-sm font-medium">Informations</p>
                <p className="text-2xl font-bold">1</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Toutes les Alertes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12"></TableHead>
                  <TableHead>ID</TableHead>
                  <TableHead>Titre</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Sévérité</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sampleAlerts.map((alert) => (
                  <TableRow key={alert.id} className={alert.status === "resolved" ? "opacity-60" : ""}>
                    <TableCell>{getAlertIcon(alert.severity)}</TableCell>
                    <TableCell className="font-medium">{alert.id}</TableCell>
                    <TableCell>{alert.title}</TableCell>
                    <TableCell className="max-w-xs truncate">{alert.description}</TableCell>
                    <TableCell>
                      <Badge className={getSeverityClass(alert.severity)}>
                        {translateSeverity(alert.severity)}
                      </Badge>
                    </TableCell>
                    <TableCell>{alert.date}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={alert.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                        {translateStatus(alert.status)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">Détails</Button>
                        <Button variant="ghost" size="sm" className="text-red-500">
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default AdminAlerts;
