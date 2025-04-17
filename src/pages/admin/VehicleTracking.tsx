
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Search, 
  Upload, 
  FileText, 
  Bell, 
  Filter, 
  Car, 
  Tool, 
  Clock,
  AlertTriangle
} from "lucide-react";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";

// Données de démonstration pour les maintenances
const maintenanceData = [
  {
    id: "M1001",
    vehicle: "Toyota Corolla (ABC-123)",
    type: "Vidange",
    lastDate: "15/03/2025",
    nextDate: "15/09/2025",
    kmInterval: 10000,
    currentKm: 25300,
    nextKm: 30000,
    status: "planifié"
  },
  {
    id: "M1002",
    vehicle: "Honda CR-V (DEF-456)",
    type: "Contrôle technique",
    lastDate: "05/01/2025",
    nextDate: "05/01/2026",
    kmInterval: null,
    currentKm: 45200,
    nextKm: null,
    status: "à planifier"
  },
  {
    id: "M1003",
    vehicle: "Mercedes-Benz E-Class (GHI-789)",
    type: "Révision complète",
    lastDate: "10/02/2025",
    nextDate: "10/08/2025",
    kmInterval: 20000,
    currentKm: 68300,
    nextKm: 80000,
    status: "à planifier"
  },
  {
    id: "M1004",
    vehicle: "Tesla Model 3 (JKL-012)",
    type: "Vérification batterie",
    lastDate: "22/03/2025",
    nextDate: "22/09/2025",
    kmInterval: 15000,
    currentKm: 32100,
    nextKm: 45000,
    status: "planifié"
  }
];

// Données de démonstration pour les assurances
const insuranceData = [
  {
    id: "A1001",
    vehicle: "Toyota Corolla (ABC-123)",
    company: "Wafa Assurance",
    policyNumber: "WA-12345678",
    startDate: "01/01/2025",
    endDate: "31/12/2025",
    type: "Tous risques",
    status: "actif"
  },
  {
    id: "A1002",
    vehicle: "Honda CR-V (DEF-456)",
    company: "RMA Assurance",
    policyNumber: "RMA-87654321",
    startDate: "15/02/2025",
    endDate: "14/02/2026",
    type: "Tiers",
    status: "actif"
  },
  {
    id: "A1003",
    vehicle: "Mercedes-Benz E-Class (GHI-789)",
    company: "AXA Assurance",
    policyNumber: "AXA-45678901",
    startDate: "10/11/2024",
    endDate: "09/11/2025",
    type: "Tous risques",
    status: "à renouveler"
  },
  {
    id: "A1004",
    vehicle: "Tesla Model 3 (JKL-012)",
    company: "Allianz",
    policyNumber: "AL-78901234",
    startDate: "05/05/2025",
    endDate: "04/05/2026",
    type: "Tous risques",
    status: "actif"
  }
];

// Données de démonstration pour les alertes
const alertsData = [
  {
    id: "AL1001",
    vehicle: "Toyota Corolla (ABC-123)",
    type: "Vidange",
    deadline: "15/09/2025",
    kmRemaining: 4700,
    priority: "moyenne"
  },
  {
    id: "AL1002",
    vehicle: "Honda CR-V (DEF-456)",
    type: "Contrôle technique",
    deadline: "05/01/2026",
    kmRemaining: null,
    priority: "basse"
  },
  {
    id: "AL1003",
    vehicle: "Mercedes-Benz E-Class (GHI-789)",
    type: "Assurance",
    deadline: "09/11/2025",
    kmRemaining: null,
    priority: "haute"
  },
  {
    id: "AL1004",
    vehicle: "Tesla Model 3 (JKL-012)",
    type: "Révision batterie",
    deadline: "22/09/2025",
    kmRemaining: 12900,
    priority: "moyenne"
  }
];

// Fonction pour rendre la classe CSS selon la priorité
const getPriorityClass = (priority: string) => {
  switch (priority) {
    case "haute":
      return "bg-red-100 text-red-800";
    case "moyenne":
      return "bg-amber-100 text-amber-800";
    case "basse":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

// Fonction pour rendre la classe CSS selon le statut
const getStatusClass = (status: string) => {
  switch (status) {
    case "actif":
      return "bg-green-100 text-green-800";
    case "à renouveler":
      return "bg-amber-100 text-amber-800";
    case "expiré":
      return "bg-red-100 text-red-800";
    case "planifié":
      return "bg-blue-100 text-blue-800";
    case "à planifier":
      return "bg-purple-100 text-purple-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const VehicleTracking = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Suivi Technique des Véhicules</h1>
        <div className="space-x-2">
          <Button variant="outline">
            <Bell className="mr-2 h-4 w-4" /> Alertes
          </Button>
          <Button>
            <Calendar className="mr-2 h-4 w-4" /> Planifier
          </Button>
        </div>
      </div>

      <Tabs defaultValue="maintenance" className="mb-6">
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-3">
          <TabsTrigger value="maintenance" className="flex items-center">
            <Tool className="mr-2 h-4 w-4" /> Entretiens & Vidanges
          </TabsTrigger>
          <TabsTrigger value="insurance" className="flex items-center">
            <FileText className="mr-2 h-4 w-4" /> Assurances
          </TabsTrigger>
          <TabsTrigger value="alerts" className="flex items-center">
            <AlertTriangle className="mr-2 h-4 w-4" /> Alertes & Rappels
          </TabsTrigger>
        </TabsList>

        <TabsContent value="maintenance" className="space-y-4 mt-6">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-4">
              <div className="relative w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher un véhicule..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center">
                <span className="mr-2">Statut:</span>
                <Select
                  defaultValue="all"
                  onValueChange={(value) => setStatusFilter(value)}
                >
                  <SelectTrigger className="w-36">
                    <SelectValue placeholder="Tous" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous</SelectItem>
                    <SelectItem value="planifié">Planifiés</SelectItem>
                    <SelectItem value="à planifier">À planifier</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" /> Filtres avancés
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Suivi des entretiens</CardTitle>
              <CardDescription>
                Gérez les maintenances régulières et vidanges de tous les véhicules
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Véhicule</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Dernier entretien</TableHead>
                      <TableHead>Prochain entretien</TableHead>
                      <TableHead>Kilométrage actuel</TableHead>
                      <TableHead>Prochain km</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {maintenanceData
                      .filter(
                        (item) =>
                          (statusFilter === "all" ||
                            item.status === statusFilter) &&
                          item.vehicle
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase())
                      )
                      .map((maintenance) => (
                        <TableRow key={maintenance.id}>
                          <TableCell className="font-medium">
                            {maintenance.id}
                          </TableCell>
                          <TableCell>{maintenance.vehicle}</TableCell>
                          <TableCell>{maintenance.type}</TableCell>
                          <TableCell>{maintenance.lastDate}</TableCell>
                          <TableCell>{maintenance.nextDate}</TableCell>
                          <TableCell>{maintenance.currentKm} km</TableCell>
                          <TableCell>
                            {maintenance.nextKm ? `${maintenance.nextKm} km` : "N/A"}
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={getStatusClass(maintenance.status)}
                              variant="outline"
                            >
                              {maintenance.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">
                                <Clock className="h-4 w-4 mr-1" /> Planifier
                              </Button>
                              <Button variant="outline" size="sm">
                                <Tool className="h-4 w-4 mr-1" /> Détails
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

        <TabsContent value="insurance" className="space-y-4 mt-6">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-4">
              <div className="relative w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher par véhicule ou police..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center">
                <span className="mr-2">Statut:</span>
                <Select
                  defaultValue="all"
                  onValueChange={(value) => setStatusFilter(value)}
                >
                  <SelectTrigger className="w-36">
                    <SelectValue placeholder="Tous" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous</SelectItem>
                    <SelectItem value="actif">Actifs</SelectItem>
                    <SelectItem value="à renouveler">À renouveler</SelectItem>
                    <SelectItem value="expiré">Expirés</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button>
              <Upload className="mr-2 h-4 w-4" /> Ajouter un document
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Gestion des assurances</CardTitle>
              <CardDescription>
                Suivi des contrats d'assurance et des dates d'échéance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Véhicule</TableHead>
                      <TableHead>Assureur</TableHead>
                      <TableHead>N° Police</TableHead>
                      <TableHead>Date début</TableHead>
                      <TableHead>Date fin</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {insuranceData
                      .filter(
                        (item) =>
                          (statusFilter === "all" ||
                            item.status === statusFilter) &&
                          (item.vehicle
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase()) ||
                            item.policyNumber
                              .toLowerCase()
                              .includes(searchTerm.toLowerCase()))
                      )
                      .map((insurance) => (
                        <TableRow key={insurance.id}>
                          <TableCell className="font-medium">
                            {insurance.id}
                          </TableCell>
                          <TableCell>{insurance.vehicle}</TableCell>
                          <TableCell>{insurance.company}</TableCell>
                          <TableCell>{insurance.policyNumber}</TableCell>
                          <TableCell>{insurance.startDate}</TableCell>
                          <TableCell>{insurance.endDate}</TableCell>
                          <TableCell>{insurance.type}</TableCell>
                          <TableCell>
                            <Badge
                              className={getStatusClass(insurance.status)}
                              variant="outline"
                            >
                              {insurance.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">
                                <FileText className="h-4 w-4 mr-1" /> Voir
                              </Button>
                              <Button variant="outline" size="sm">
                                <Upload className="h-4 w-4 mr-1" /> Certificat
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

        <TabsContent value="alerts" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Alertes et rappels</CardTitle>
              <CardDescription>
                Tableau de bord des échéances à venir
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Véhicule</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Échéance</TableHead>
                      <TableHead>Kilométrage restant</TableHead>
                      <TableHead>Priorité</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {alertsData
                      .filter((item) =>
                        item.vehicle
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase())
                      )
                      .map((alert) => (
                        <TableRow key={alert.id}>
                          <TableCell className="font-medium">
                            {alert.id}
                          </TableCell>
                          <TableCell>{alert.vehicle}</TableCell>
                          <TableCell>{alert.type}</TableCell>
                          <TableCell>{alert.deadline}</TableCell>
                          <TableCell>
                            {alert.kmRemaining ? (
                              <div className="space-y-1">
                                <div className="flex items-center justify-between">
                                  <span>{alert.kmRemaining} km</span>
                                  <span className="text-xs text-muted-foreground">
                                    {alert.kmRemaining > 5000
                                      ? "OK"
                                      : alert.kmRemaining > 2000
                                      ? "Bientôt"
                                      : "Urgent"}
                                  </span>
                                </div>
                                <Progress
                                  value={
                                    alert.kmRemaining > 10000
                                      ? 100
                                      : (alert.kmRemaining / 10000) * 100
                                  }
                                  className={
                                    alert.kmRemaining > 5000
                                      ? "bg-green-500"
                                      : alert.kmRemaining > 2000
                                      ? "bg-amber-500"
                                      : "bg-red-500"
                                  }
                                />
                              </div>
                            ) : (
                              "N/A"
                            )}
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={getPriorityClass(alert.priority)}
                              variant="outline"
                            >
                              {alert.priority}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">
                                <Bell className="h-4 w-4 mr-1" /> Notifier
                              </Button>
                              <Button variant="outline" size="sm">
                                <Calendar className="h-4 w-4 mr-1" /> Planifier
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

          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Paramètres des alertes</CardTitle>
              <CardDescription>
                Configurez les délais d'alerte et les notifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Délais d'alerte</h3>
                  <div className="grid gap-2">
                    <div className="flex items-center justify-between">
                      <span>Entretien régulier</span>
                      <div className="flex items-center space-x-2">
                        <Input
                          type="number"
                          defaultValue="30"
                          className="w-20"
                        />
                        <span>jours avant</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Contrôle technique</span>
                      <div className="flex items-center space-x-2">
                        <Input
                          type="number"
                          defaultValue="45"
                          className="w-20"
                        />
                        <span>jours avant</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Renouvellement d'assurance</span>
                      <div className="flex items-center space-x-2">
                        <Input
                          type="number"
                          defaultValue="60"
                          className="w-20"
                        />
                        <span>jours avant</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Vidange (kilométrage)</span>
                      <div className="flex items-center space-x-2">
                        <Input
                          type="number"
                          defaultValue="1000"
                          className="w-20"
                        />
                        <span>km avant</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Notifications</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="email-notifications"
                        defaultChecked
                        className="h-4 w-4 rounded border-gray-300"
                      />
                      <label htmlFor="email-notifications">
                        Notifications par email
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="system-alerts"
                        defaultChecked
                        className="h-4 w-4 rounded border-gray-300"
                      />
                      <label htmlFor="system-alerts">
                        Alertes système (dashboard)
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="reminder-repeat"
                        defaultChecked
                        className="h-4 w-4 rounded border-gray-300"
                      />
                      <label htmlFor="reminder-repeat">
                        Répéter les rappels non traités
                      </label>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <span>Fréquence de rappel</span>
                      <Select defaultValue="weekly">
                        <SelectTrigger className="w-36">
                          <SelectValue placeholder="Choisir" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="daily">Quotidien</SelectItem>
                          <SelectItem value="weekly">Hebdomadaire</SelectItem>
                          <SelectItem value="monthly">Mensuel</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <Button>Enregistrer les paramètres</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

export default VehicleTracking;
