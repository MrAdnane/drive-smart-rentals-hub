
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Données de maintenance d'exemple
const sampleMaintenanceData = [
  {
    id: "M001",
    vehicle: "Toyota Corolla (123 ABC 78)",
    type: "Vidange d'huile",
    status: "planifié",
    dateScheduled: "20/04/2025",
    lastMaintenance: "20/01/2025",
    cost: 350,
    notes: "Rendez-vous à l'atelier AutoTech"
  },
  {
    id: "M002",
    vehicle: "Honda CR-V (456 DEF 78)",
    type: "Changement des freins",
    status: "en cours",
    dateScheduled: "17/04/2025",
    lastMaintenance: "17/10/2024",
    cost: 1200,
    notes: "Également vérifier les plaquettes arrière"
  },
  {
    id: "M003",
    vehicle: "Mercedes-Benz Classe E (789 GHI 78)",
    type: "Révision complète",
    status: "terminé",
    dateScheduled: "10/04/2025",
    lastMaintenance: "10/10/2024",
    cost: 3500,
    notes: "Service chez le concessionnaire Mercedes"
  },
  {
    id: "M004",
    vehicle: "Tesla Model 3 (101 JKL 78)",
    type: "Mise à jour logiciel",
    status: "terminé",
    dateScheduled: "12/04/2025",
    lastMaintenance: "12/03/2025",
    cost: 0,
    notes: "Mise à jour v12.3 des systèmes embarqués"
  },
  {
    id: "M005",
    vehicle: "Toyota Corolla (123 ABC 78)",
    type: "Changement des pneus",
    status: "planifié",
    dateScheduled: "25/04/2025",
    lastMaintenance: "25/10/2024",
    cost: 2200,
    notes: "Remplacer les 4 pneus"
  }
];

// Fonction pour déterminer la classe de statut
const getStatusClass = (status: string) => {
  switch (status) {
    case "planifié":
      return "bg-blue-100 text-blue-800";
    case "en cours":
      return "bg-amber-100 text-amber-800";
    case "terminé":
      return "bg-green-100 text-green-800";
    case "annulé":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const AdminMaintenance = () => {
  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Maintenance des Véhicules</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Planifier une Maintenance
        </Button>
      </div>

      <Card className="mb-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Maintenances Planifiées</CardTitle>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" /> Filtrer
          </Button>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Véhicule</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Dernière Maintenance</TableHead>
                  <TableHead>Coût</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sampleMaintenanceData.map((maintenance) => (
                  <TableRow key={maintenance.id}>
                    <TableCell className="font-medium">{maintenance.id}</TableCell>
                    <TableCell>{maintenance.vehicle}</TableCell>
                    <TableCell>{maintenance.type}</TableCell>
                    <TableCell>{maintenance.dateScheduled}</TableCell>
                    <TableCell>{maintenance.lastMaintenance}</TableCell>
                    <TableCell>{maintenance.cost} MAD</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getStatusClass(maintenance.status)}>
                        {maintenance.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">Détails</Button>
                        <Button variant="ghost" size="sm">Modifier</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Véhicules Nécessitant une Maintenance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Toyota Corolla (123 ABC 78)</h3>
                    <p className="text-sm text-muted-foreground">Vidange d'huile nécessaire</p>
                  </div>
                  <Badge className="bg-amber-500">Bientôt</Badge>
                </div>
                <div className="mt-2 text-sm">
                  <p>Dernière: 20/01/2025 (- de 3 mois)</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Honda CR-V (456 DEF 78)</h3>
                    <p className="text-sm text-muted-foreground">Révision des 30 000 km</p>
                  </div>
                  <Badge className="bg-red-500">Urgent</Badge>
                </div>
                <div className="mt-2 text-sm">
                  <p>Kilométrage actuel: 31,245 km</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default AdminMaintenance;
