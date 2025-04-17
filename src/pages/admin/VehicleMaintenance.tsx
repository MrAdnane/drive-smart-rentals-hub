
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Car, FileText, Wrench, Clock, BarChart, AlertTriangle } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import MaintenanceAlerts from "@/components/admin/MaintenanceAlerts";

// Sample maintenance history data
const maintenanceHistory = [
  {
    id: "m001",
    vehicle: "Toyota Corolla (123 ABC 78)",
    type: "Vidange d'huile",
    date: "20/01/2025",
    mileage: 25300,
    provider: "Garage Central",
    cost: 350,
    notes: "Huile synthétique + remplacement filtre à huile"
  },
  {
    id: "m002",
    vehicle: "Honda CR-V (456 DEF 78)",
    type: "Remplacement des plaquettes de frein",
    date: "17/12/2024",
    mileage: 12800,
    provider: "Honda Service",
    cost: 750,
    notes: "Remplacement des plaquettes avant"
  },
  {
    id: "m003",
    vehicle: "Mercedes-Benz Classe E (789 GHI 78)",
    type: "Révision complète",
    date: "10/02/2025",
    mileage: 30500,
    provider: "Concession Mercedes",
    cost: 1200,
    notes: "Révision des 30 000 km"
  },
  {
    id: "m004",
    vehicle: "Tesla Model 3 (101 JKL 78)",
    type: "Mise à jour logiciel",
    date: "05/03/2025",
    mileage: 12400,
    provider: "Tesla Service Center",
    cost: 0,
    notes: "Mise à jour OTA v12.3"
  }
];

// Sample scheduled maintenance data
const scheduledMaintenance = [
  {
    id: "sm001",
    vehicle: "Toyota Corolla (123 ABC 78)",
    type: "Vidange d'huile",
    scheduledDate: "20/07/2025",
    estimatedMileage: 35000,
    status: "planifié"
  },
  {
    id: "sm002",
    vehicle: "Honda CR-V (456 DEF 78)",
    type: "Contrôle des freins",
    scheduledDate: "17/04/2025",
    estimatedMileage: 16000,
    status: "en cours"
  },
  {
    id: "sm003",
    vehicle: "Mercedes-Benz Classe E (789 GHI 78)",
    type: "Révision complète",
    scheduledDate: "15/05/2025",
    estimatedMileage: 40000,
    status: "planifié"
  },
  {
    id: "sm004",
    vehicle: "Tesla Model 3 (101 JKL 78)",
    type: "Contrôle batterie",
    scheduledDate: "05/09/2025",
    estimatedMileage: 20000,
    status: "planifié"
  }
];

// Sample maintenance templates
const maintenanceTemplates = [
  {
    id: "mt001",
    name: "Entretien standard - Véhicule essence",
    interval: "10000 km ou 6 mois",
    tasks: ["Vidange d'huile", "Remplacement filtre à huile", "Vérification des niveaux", "Vérification pression pneus"]
  },
  {
    id: "mt002",
    name: "Entretien standard - Véhicule diesel",
    interval: "15000 km ou 6 mois",
    tasks: ["Vidange d'huile", "Remplacement filtre à huile", "Remplacement filtre à gazole", "Vérification des niveaux"]
  },
  {
    id: "mt003",
    name: "Entretien annuel véhicule électrique",
    interval: "20000 km ou 12 mois",
    tasks: ["Vérification batterie", "Vérification système de refroidissement", "Mise à jour logiciel"]
  },
  {
    id: "mt004",
    name: "Révision complète",
    interval: "30000 km ou 24 mois",
    tasks: ["Vidange d'huile", "Remplacement filtres", "Vérification freins", "Vérification suspension", "Diagnostic électronique"]
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

const VehicleMaintenance = () => {
  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gestion de la Maintenance</h1>
        <div className="flex gap-2">
          <Button>
            <Wrench className="mr-2 h-4 w-4" /> Planifier Maintenance
          </Button>
        </div>
      </div>
      
      <MaintenanceAlerts />
      
      <Tabs defaultValue="scheduled" className="mt-6">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="scheduled">Planifiée</TabsTrigger>
          <TabsTrigger value="history">Historique</TabsTrigger>
          <TabsTrigger value="templates">Modèles</TabsTrigger>
          <TabsTrigger value="stats">Statistiques</TabsTrigger>
        </TabsList>
        
        <TabsContent value="scheduled">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Maintenances Planifiées</CardTitle>
              <div className="flex items-center space-x-2">
                <Select defaultValue="all">
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous</SelectItem>
                    <SelectItem value="planifié">Planifié</SelectItem>
                    <SelectItem value="en cours">En cours</SelectItem>
                    <SelectItem value="terminé">Terminé</SelectItem>
                    <SelectItem value="annulé">Annulé</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Véhicule</TableHead>
                      <TableHead>Type d'entretien</TableHead>
                      <TableHead>Date prévue</TableHead>
                      <TableHead>Kilométrage estimé</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {scheduledMaintenance.map((maintenance) => (
                      <TableRow key={maintenance.id}>
                        <TableCell className="font-medium">
                          {maintenance.vehicle}
                        </TableCell>
                        <TableCell>{maintenance.type}</TableCell>
                        <TableCell>{maintenance.scheduledDate}</TableCell>
                        <TableCell>{maintenance.estimatedMileage} km</TableCell>
                        <TableCell>
                          <Badge className={getStatusClass(maintenance.status)}>
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
        </TabsContent>
        
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Historique des Entretiens</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Véhicule</TableHead>
                      <TableHead>Type d'entretien</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Kilométrage</TableHead>
                      <TableHead>Prestataire</TableHead>
                      <TableHead>Coût</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {maintenanceHistory.map((maintenance) => (
                      <TableRow key={maintenance.id}>
                        <TableCell className="font-medium">
                          {maintenance.vehicle}
                        </TableCell>
                        <TableCell>{maintenance.type}</TableCell>
                        <TableCell>{maintenance.date}</TableCell>
                        <TableCell>{maintenance.mileage} km</TableCell>
                        <TableCell>{maintenance.provider}</TableCell>
                        <TableCell>{maintenance.cost} MAD</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm">
                              <FileText className="h-4 w-4 mr-2" />
                              Rapport
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
        </TabsContent>
        
        <TabsContent value="templates">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Modèles d'Entretien</CardTitle>
              <Button size="sm">
                <Wrench className="mr-2 h-4 w-4" /> Nouveau Modèle
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {maintenanceTemplates.map((template) => (
                  <Card key={template.id}>
                    <CardContent className="p-4">
                      <h3 className="font-medium text-lg mb-2">{template.name}</h3>
                      <div className="flex items-center mb-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 mr-2" />
                        <span>Intervalle: {template.interval}</span>
                      </div>
                      <div className="space-y-1 mt-3">
                        <h4 className="text-sm font-medium">Tâches:</h4>
                        <ul className="list-disc pl-5 text-sm">
                          {template.tasks.map((task, index) => (
                            <li key={index}>{task}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex justify-end mt-4 space-x-2">
                        <Button variant="outline" size="sm">Modifier</Button>
                        <Button variant="outline" size="sm">Appliquer</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="stats">
          <Card>
            <CardHeader>
              <CardTitle>Statistiques de Maintenance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <Card>
                  <CardContent className="p-4 flex flex-col items-center">
                    <BarChart className="h-12 w-12 text-primary mb-2" />
                    <h3 className="text-xl font-bold">35 000 MAD</h3>
                    <p className="text-sm text-muted-foreground">Coût total d'entretien (2025)</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 flex flex-col items-center">
                    <Wrench className="h-12 w-12 text-primary mb-2" />
                    <h3 className="text-xl font-bold">24</h3>
                    <p className="text-sm text-muted-foreground">Entretiens réalisés</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 flex flex-col items-center">
                    <Car className="h-12 w-12 text-primary mb-2" />
                    <h3 className="text-xl font-bold">4.2%</h3>
                    <p className="text-sm text-muted-foreground">Taux d'immobilisation</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 flex flex-col items-center">
                    <AlertTriangle className="h-12 w-12 text-primary mb-2" />
                    <h3 className="text-xl font-bold">3</h3>
                    <p className="text-sm text-muted-foreground">Entretiens à planifier</p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-3">Coûts d'entretien par véhicule (2025)</h3>
                <div className="h-64 w-full bg-gray-100 rounded-md flex items-center justify-center">
                  <p className="text-muted-foreground">Graphique des coûts d'entretien</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

export default VehicleMaintenance;
