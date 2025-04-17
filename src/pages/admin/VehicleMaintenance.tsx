import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, FileText, Filter, Plus, Search, Wrench } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import MaintenanceAlerts from "@/components/admin/MaintenanceAlerts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const maintenanceRecords = [
  {
    id: "M1001",
    vehicleId: "V001",
    vehicleName: "Toyota Corolla (ABC-123)",
    type: "Vidange",
    date: "15/03/2025",
    mileage: 25300,
    cost: 850,
    provider: "Garage Central",
    notes: "Changement huile et filtre",
    documents: ["facture-m1001.pdf", "rapport-m1001.pdf"],
  },
  {
    id: "M1002",
    vehicleId: "V002",
    vehicleName: "Honda CR-V (DEF-456)",
    type: "Contrôle technique",
    date: "05/01/2025",
    mileage: 45200,
    cost: 450,
    provider: "Contrôle Auto",
    notes: "RAS",
    documents: ["certificat-m1002.pdf"],
  },
  {
    id: "M1003",
    vehicleId: "V003",
    vehicleName: "Mercedes-Benz E-Class (GHI-789)",
    type: "Révision complète",
    date: "10/02/2025",
    mileage: 68300,
    cost: 3500,
    provider: "Concessionnaire Mercedes",
    notes: "Remplacement plaquettes de frein et vidange",
    documents: ["facture-m1003.pdf", "rapport-m1003.pdf"],
  },
  {
    id: "M1004",
    vehicleId: "V001",
    vehicleName: "Toyota Corolla (ABC-123)",
    type: "Changement pneus",
    date: "05/11/2024",
    mileage: 22800,
    cost: 2200,
    provider: "PneuExpress",
    notes: "4 pneus Michelin",
    documents: ["facture-m1004.pdf"],
  },
  {
    id: "M1005",
    vehicleId: "V004",
    vehicleName: "Tesla Model 3 (JKL-012)",
    type: "Mise à jour logiciel",
    date: "22/03/2025",
    mileage: 32100,
    cost: 0,
    provider: "Tesla Service",
    notes: "Mise à jour OTA v12.4",
    documents: [],
  },
];

const maintenancePlanned = [
  {
    id: "P1001",
    vehicleId: "V001",
    vehicleName: "Toyota Corolla (ABC-123)",
    type: "Vidange",
    plannedDate: "15/09/2025",
    estimatedCost: 850,
    provider: "Garage Central",
    notes: "Prévoir filtres",
    status: "scheduled",
  },
  {
    id: "P1002",
    vehicleId: "V002",
    vehicleName: "Honda CR-V (DEF-456)",
    type: "Révision 50 000 km",
    plannedDate: "10/07/2025",
    estimatedCost: 1500,
    provider: "Honda Concessionnaire",
    notes: "Révision complète",
    status: "pending",
  },
  {
    id: "P1003",
    vehicleId: "V003",
    vehicleName: "Mercedes-Benz E-Class (GHI-789)",
    type: "Contrôle technique",
    plannedDate: "09/11/2025",
    estimatedCost: 450,
    provider: "Contrôle Auto",
    notes: "",
    status: "pending",
  },
];

const maintenanceAlerts = [
  {
    id: "A1001",
    vehicleId: "V001",
    vehicleName: "Toyota Corolla (ABC-123)",
    type: "Vidange",
    dueDate: "15/09/2025",
    daysLeft: 45,
    priority: "medium" as const,
    status: "scheduled" as const,
  },
  {
    id: "A1002",
    vehicleId: "V002",
    vehicleName: "Honda CR-V (DEF-456)",
    type: "Contrôle technique",
    dueDate: "05/01/2026",
    daysLeft: 157,
    priority: "low" as const,
    status: "pending" as const,
  },
  {
    id: "A1003",
    vehicleId: "V003",
    vehicleName: "Mercedes-Benz E-Class (GHI-789)",
    type: "Révision",
    dueDate: "10/04/2025",
    daysLeft: -12,
    priority: "high" as const,
    status: "overdue" as const,
  },
  {
    id: "A1004",
    vehicleId: "V004",
    vehicleName: "Tesla Model 3 (JKL-012)",
    type: "Mise à jour système",
    dueDate: "22/04/2025",
    daysLeft: 0,
    priority: "high" as const,
    status: "pending" as const,
  },
];

const getStatusClass = (status: string) => {
  switch (status) {
    case "scheduled":
      return "bg-blue-100 text-blue-800";
    case "pending":
      return "bg-amber-100 text-amber-800";
    case "overdue":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const statusLabel = {
  scheduled: "Planifié",
  pending: "À planifier",
  overdue: "En retard",
};

const VehicleMaintenance = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [vehicleFilter, setVehicleFilter] = useState("all");
  const [maintenanceTypeFilter, setMaintenanceTypeFilter] = useState("all");

  const filteredRecords = maintenanceRecords.filter(
    (record) =>
      (vehicleFilter === "all" || record.vehicleId === vehicleFilter) &&
      (maintenanceTypeFilter === "all" || record.type === maintenanceTypeFilter) &&
      (record.vehicleName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.notes.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredPlanned = maintenancePlanned.filter(
    (record) =>
      (vehicleFilter === "all" || record.vehicleId === vehicleFilter) &&
      (maintenanceTypeFilter === "all" || record.type === maintenanceTypeFilter) &&
      (record.vehicleName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.notes.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const uniqueVehicles = Array.from(
    new Set([...maintenanceRecords, ...maintenancePlanned].map((item) => item.vehicleId))
  ).map((id) => {
    const vehicle = [...maintenanceRecords, ...maintenancePlanned].find((item) => item.vehicleId === id);
    return {
      id,
      name: vehicle?.vehicleName || "",
    };
  });

  const uniqueMaintenanceTypes = Array.from(
    new Set([...maintenanceRecords, ...maintenancePlanned].map((item) => item.type))
  );

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Maintenance des Véhicules</h1>
        <div className="space-x-2">
          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" /> Rapports
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Nouvel entretien
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-3">
          <MaintenanceAlerts alerts={maintenanceAlerts} />
        </div>
      </div>

      <Tabs defaultValue="history" className="mb-6">
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-2">
          <TabsTrigger value="history" className="flex items-center">
            <Wrench className="mr-2 h-4 w-4" /> Historique d'entretien
          </TabsTrigger>
          <TabsTrigger value="planned" className="flex items-center">
            <Calendar className="mr-2 h-4 w-4" /> Entretiens planifiés
          </TabsTrigger>
        </TabsList>

        <div className="flex flex-wrap items-center justify-between gap-4 my-4">
          <div className="flex items-center gap-4">
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center">
              <span className="mr-2">Véhicule:</span>
              <Select
                value={vehicleFilter}
                onValueChange={(value) => setVehicleFilter(value)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Tous les véhicules" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les véhicules</SelectItem>
                  {uniqueVehicles.map((vehicle) => (
                    <SelectItem key={vehicle.id} value={vehicle.id}>
                      {vehicle.name.split(" ")[0]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center">
              <span className="mr-2">Type:</span>
              <Select
                value={maintenanceTypeFilter}
                onValueChange={(value) => setMaintenanceTypeFilter(value)}
              >
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Tous les types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les types</SelectItem>
                  {uniqueMaintenanceTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" /> Filtres avancés
          </Button>
        </div>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Historique des entretiens</CardTitle>
              <CardDescription>
                Liste de tous les entretiens effectués sur les véhicules
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
                      <TableHead>Date</TableHead>
                      <TableHead>Kilométrage</TableHead>
                      <TableHead>Coût</TableHead>
                      <TableHead>Prestataire</TableHead>
                      <TableHead>Documents</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRecords.length > 0 ? (
                      filteredRecords.map((record) => (
                        <TableRow key={record.id}>
                          <TableCell className="font-medium">
                            {record.id}
                          </TableCell>
                          <TableCell>{record.vehicleName}</TableCell>
                          <TableCell>{record.type}</TableCell>
                          <TableCell>{record.date}</TableCell>
                          <TableCell>{record.mileage} km</TableCell>
                          <TableCell>{record.cost} MAD</TableCell>
                          <TableCell>{record.provider}</TableCell>
                          <TableCell>
                            <div className="flex space-x-1">
                              {record.documents.map((doc, index) => (
                                <Button
                                  key={index}
                                  variant="outline"
                                  size="sm"
                                  className="h-7 px-2"
                                >
                                  <FileText className="h-3.5 w-3.5 mr-1" />
                                  <span className="text-xs">
                                    {doc.includes("facture")
                                      ? "Facture"
                                      : doc.includes("rapport")
                                      ? "Rapport"
                                      : doc.includes("certificat")
                                      ? "Certificat"
                                      : "Doc"}
                                  </span>
                                </Button>
                              ))}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">
                                <Wrench className="h-4 w-4 mr-1" />
                                Détails
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={9}
                          className="text-center py-6 text-muted-foreground"
                        >
                          Aucun entretien ne correspond aux filtres sélectionnés
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>

              <div className="mt-4 flex justify-between items-center">
                <div className="text-sm text-muted-foreground">
                  Affichage de {filteredRecords.length} entretien(s) sur{" "}
                  {maintenanceRecords.length}
                </div>
                <div className="space-x-2">
                  <Button variant="outline" size="sm">
                    Précédent
                  </Button>
                  <Button variant="outline" size="sm">
                    Suivant
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="planned" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Entretiens planifiés</CardTitle>
              <CardDescription>
                Liste des entretiens à venir ou à planifier
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
                      <TableHead>Date prévue</TableHead>
                      <TableHead>Coût estimé</TableHead>
                      <TableHead>Prestataire</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPlanned.length > 0 ? (
                      filteredPlanned.map((record) => (
                        <TableRow key={record.id}>
                          <TableCell className="font-medium">
                            {record.id}
                          </TableCell>
                          <TableCell>{record.vehicleName}</TableCell>
                          <TableCell>{record.type}</TableCell>
                          <TableCell>{record.plannedDate}</TableCell>
                          <TableCell>{record.estimatedCost} MAD</TableCell>
                          <TableCell>{record.provider}</TableCell>
                          <TableCell>
                            <Badge
                              className={getStatusClass(record.status)}
                              variant="outline"
                            >
                              {statusLabel[record.status as keyof typeof statusLabel]}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">
                                <Calendar className="h-4 w-4 mr-1" />
                                {record.status === "scheduled"
                                  ? "Modifier"
                                  : "Planifier"}
                              </Button>
                              <Button variant="outline" size="sm">
                                <Wrench className="h-4 w-4 mr-1" />
                                Détails
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={8}
                          className="text-center py-6 text-muted-foreground"
                        >
                          Aucun entretien planifié ne correspond aux filtres
                          sélectionnés
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

export default VehicleMaintenance;
