
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Car, Search, Filter, Calendar, FileText, AlertCircle, Clock } from "lucide-react";
import { useState } from "react";

// Sample vehicles data
const sampleVehicles = [
  {
    id: "v1",
    make: "Toyota",
    model: "Corolla",
    year: 2022,
    plate: "123 ABC 78",
    status: "disponible",
    lastInspection: "15/01/2025",
    nextInspection: "15/07/2025",
    insurance: {
      provider: "AXA Assurance",
      policyNumber: "AXA-12345",
      startDate: "01/01/2025",
      endDate: "31/12/2025",
      status: "actif"
    },
    documents: [
      { name: "Carte grise", expires: null, uploaded: true },
      { name: "Attestation d'assurance", expires: "31/12/2025", uploaded: true },
      { name: "Rapport de contrôle technique", expires: "15/07/2025", uploaded: true }
    ],
    mileage: 28500,
    fuelType: "Essence",
    transmission: "Automatique",
    nextMaintenance: "10000 km ou 15/07/2025"
  },
  {
    id: "v2",
    make: "Honda",
    model: "CR-V",
    year: 2023,
    plate: "456 DEF 78",
    status: "en entretien",
    lastInspection: "20/12/2024",
    nextInspection: "20/06/2025",
    insurance: {
      provider: "Allianz",
      policyNumber: "ALZ-67890",
      startDate: "01/03/2025",
      endDate: "28/02/2026",
      status: "actif"
    },
    documents: [
      { name: "Carte grise", expires: null, uploaded: true },
      { name: "Attestation d'assurance", expires: "28/02/2026", uploaded: true },
      { name: "Rapport de contrôle technique", expires: "20/06/2025", uploaded: true }
    ],
    mileage: 15200,
    fuelType: "Hybride",
    transmission: "Automatique",
    nextMaintenance: "10000 km ou 01/09/2025"
  },
  {
    id: "v3",
    make: "Mercedes-Benz",
    model: "Classe E",
    year: 2022,
    plate: "789 GHI 78",
    status: "réservé",
    lastInspection: "10/02/2025",
    nextInspection: "10/08/2025",
    insurance: {
      provider: "MAAF",
      policyNumber: "MF-54321",
      startDate: "15/02/2025",
      endDate: "14/02/2026",
      status: "actif"
    },
    documents: [
      { name: "Carte grise", expires: null, uploaded: true },
      { name: "Attestation d'assurance", expires: "14/02/2026", uploaded: true },
      { name: "Rapport de contrôle technique", expires: "10/08/2025", uploaded: true }
    ],
    mileage: 32100,
    fuelType: "Diesel",
    transmission: "Automatique",
    nextMaintenance: "10000 km ou 15/05/2025"
  },
  {
    id: "v4",
    make: "Tesla",
    model: "Model 3",
    year: 2023,
    plate: "101 JKL 78",
    status: "disponible",
    lastInspection: "05/03/2025",
    nextInspection: "05/09/2025",
    insurance: {
      provider: "AXA Assurance",
      policyNumber: "AXA-24680",
      startDate: "01/01/2025",
      endDate: "31/12/2025",
      status: "actif"
    },
    documents: [
      { name: "Carte grise", expires: null, uploaded: true },
      { name: "Attestation d'assurance", expires: "31/12/2025", uploaded: true },
      { name: "Rapport de contrôle technique", expires: "05/09/2025", uploaded: false }
    ],
    mileage: 12800,
    fuelType: "Électrique",
    transmission: "Automatique",
    nextMaintenance: "20000 km ou 01/10/2025"
  }
];

// Fonction pour déterminer la classe de statut
const getStatusClass = (status: string) => {
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

// Function to check if a document is about to expire
const isDocumentExpiringSoon = (expiryDate: string | null) => {
  if (!expiryDate) return false;
  
  const expiry = new Date(expiryDate.split('/').reverse().join('-'));
  const today = new Date();
  const thirtyDaysFromNow = new Date();
  thirtyDaysFromNow.setDate(today.getDate() + 30);
  
  return expiry <= thirtyDaysFromNow && expiry > today;
};

const VehicleTracking = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [filteredVehicles, setFilteredVehicles] = useState(sampleVehicles);
  
  // Apply filters when search or status filter changes
  const applyFilters = () => {
    let result = sampleVehicles;
    
    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(vehicle => 
        vehicle.make.toLowerCase().includes(term) || 
        vehicle.model.toLowerCase().includes(term) ||
        vehicle.plate.toLowerCase().includes(term)
      );
    }
    
    // Apply status filter
    if (statusFilter !== "all") {
      result = result.filter(vehicle => vehicle.status === statusFilter);
    }
    
    setFilteredVehicles(result);
  };
  
  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Suivi des Véhicules</h1>
      </div>
      
      <Tabs defaultValue="overview" className="mb-6">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="technical">Suivi Technique</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>État du Parc Automobile</CardTitle>
              <div className="flex items-center space-x-2">
                <div className="relative w-64">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Rechercher un véhicule..." 
                    className="pl-8" 
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      applyFilters();
                    }}
                  />
                </div>
                <Select 
                  value={statusFilter} 
                  onValueChange={(value) => {
                    setStatusFilter(value);
                    applyFilters();
                  }}
                >
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous</SelectItem>
                    <SelectItem value="disponible">Disponible</SelectItem>
                    <SelectItem value="réservé">Réservé</SelectItem>
                    <SelectItem value="en entretien">En entretien</SelectItem>
                    <SelectItem value="hors service">Hors service</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="icon" onClick={applyFilters}>
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Véhicule</TableHead>
                      <TableHead>Immatriculation</TableHead>
                      <TableHead>État</TableHead>
                      <TableHead>Kilométrage</TableHead>
                      <TableHead>Prochain Contrôle</TableHead>
                      <TableHead>Assurance</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredVehicles.map((vehicle) => (
                      <TableRow key={vehicle.id}>
                        <TableCell className="font-medium">
                          {vehicle.make} {vehicle.model} ({vehicle.year})
                        </TableCell>
                        <TableCell>{vehicle.plate}</TableCell>
                        <TableCell>
                          <Badge className={getStatusClass(vehicle.status)}>
                            {vehicle.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{vehicle.mileage} km</TableCell>
                        <TableCell>{vehicle.nextInspection}</TableCell>
                        <TableCell>
                          {new Date(vehicle.insurance.endDate.split('/').reverse().join('-')) < new Date() ? (
                            <Badge variant="destructive">Expirée</Badge>
                          ) : (
                            <Badge variant="outline" className="bg-green-100 text-green-800">
                              Valide jusqu'au {vehicle.insurance.endDate}
                            </Badge>
                          )}
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
        
        <TabsContent value="technical">
          <Card>
            <CardHeader>
              <CardTitle>Suivi Technique</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-4">Véhicules nécessitant un contrôle technique</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {sampleVehicles
                    .filter(vehicle => {
                      const nextInspDate = new Date(vehicle.nextInspection.split('/').reverse().join('-'));
                      const today = new Date();
                      const thirtyDaysFromNow = new Date();
                      thirtyDaysFromNow.setDate(today.getDate() + 30);
                      return nextInspDate <= thirtyDaysFromNow;
                    })
                    .map(vehicle => (
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
                    ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-4">Maintenance planifiée</h3>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Véhicule</TableHead>
                        <TableHead>Type d'entretien</TableHead>
                        <TableHead>Date / Kilométrage</TableHead>
                        <TableHead>Statut</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">
                          Toyota Corolla (123 ABC 78)
                        </TableCell>
                        <TableCell>Vidange & Filtres</TableCell>
                        <TableCell>10000 km ou 15/07/2025</TableCell>
                        <TableCell>
                          <Badge className="bg-blue-100 text-blue-800">Planifié</Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">Détails</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">
                          Honda CR-V (456 DEF 78)
                        </TableCell>
                        <TableCell>Contrôle des freins</TableCell>
                        <TableCell>17/04/2025</TableCell>
                        <TableCell>
                          <Badge className="bg-amber-100 text-amber-800">En cours</Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">Détails</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">
                          Mercedes-Benz Classe E (789 GHI 78)
                        </TableCell>
                        <TableCell>Révision complète</TableCell>
                        <TableCell>15/05/2025</TableCell>
                        <TableCell>
                          <Badge className="bg-blue-100 text-blue-800">Planifié</Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">Détails</Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <CardTitle>Documents Véhicules</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Véhicule</TableHead>
                      <TableHead>Document</TableHead>
                      <TableHead>Date d'expiration</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sampleVehicles.flatMap(vehicle => 
                      vehicle.documents.map((doc, index) => (
                        <TableRow key={`${vehicle.id}-${index}`}>
                          <TableCell className="font-medium">
                            {vehicle.make} {vehicle.model} ({vehicle.plate})
                          </TableCell>
                          <TableCell>{doc.name}</TableCell>
                          <TableCell>{doc.expires || 'N/A'}</TableCell>
                          <TableCell>
                            {!doc.uploaded ? (
                              <Badge variant="destructive">Manquant</Badge>
                            ) : doc.expires && isDocumentExpiringSoon(doc.expires) ? (
                              <Badge className="bg-amber-100 text-amber-800">Expiration proche</Badge>
                            ) : (
                              <Badge className="bg-green-100 text-green-800">À jour</Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              {doc.uploaded ? (
                                <Button variant="ghost" size="sm">
                                  <FileText className="h-4 w-4 mr-2" />
                                  Voir
                                </Button>
                              ) : (
                                <Button variant="ghost" size="sm">
                                  <FileText className="h-4 w-4 mr-2" />
                                  Ajouter
                                </Button>
                              )}
                              <Button variant="ghost" size="sm">
                                <AlertCircle className="h-4 w-4 mr-2" />
                                Alertes
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
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

export default VehicleTracking;
