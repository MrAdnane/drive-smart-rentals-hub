
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Upload, AlertTriangle, FileText, Search, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

// Sample insurance data
const insuranceData = [
  {
    id: "ins001",
    vehicle: "Toyota Corolla (123 ABC 78)",
    provider: "AXA Assurance",
    policyNumber: "AXA-12345",
    startDate: "01/01/2025",
    endDate: "31/12/2025",
    premium: 4800,
    status: "actif",
    coverage: "Tous risques",
    documentUploaded: true
  },
  {
    id: "ins002",
    vehicle: "Honda CR-V (456 DEF 78)",
    provider: "Allianz",
    policyNumber: "ALZ-67890",
    startDate: "01/03/2025",
    endDate: "28/02/2026",
    premium: 5600,
    status: "actif",
    coverage: "Tous risques",
    documentUploaded: true
  },
  {
    id: "ins003",
    vehicle: "Mercedes-Benz Classe E (789 GHI 78)",
    provider: "MAAF",
    policyNumber: "MF-54321",
    startDate: "15/02/2025",
    endDate: "14/02/2026",
    premium: 8200,
    status: "actif",
    coverage: "Tous risques",
    documentUploaded: true
  },
  {
    id: "ins004",
    vehicle: "Tesla Model 3 (101 JKL 78)",
    provider: "AXA Assurance",
    policyNumber: "AXA-24680",
    startDate: "01/01/2025",
    endDate: "31/12/2025",
    premium: 7500,
    status: "actif",
    coverage: "Tous risques",
    documentUploaded: false
  },
  {
    id: "ins005",
    vehicle: "BMW X5 (202 MNO 78)",
    provider: "MAAF",
    policyNumber: "MF-13579",
    startDate: "01/10/2024",
    endDate: "30/09/2025",
    premium: 9200,
    status: "actif",
    coverage: "Tous risques",
    documentUploaded: true
  }
];

// Upcoming renewals (policies expiring in the next 30 days)
const upcomingRenewals = insuranceData.filter(insurance => {
  const endDate = new Date(insurance.endDate.split('/').reverse().join('-'));
  const today = new Date();
  const thirtyDaysFromNow = new Date();
  thirtyDaysFromNow.setDate(today.getDate() + 30);
  return endDate <= thirtyDaysFromNow && endDate > today;
});

// Missing documents
const missingDocuments = insuranceData.filter(insurance => !insurance.documentUploaded);

// Function to check if a date is soon
const isDateSoon = (dateStr: string) => {
  const date = new Date(dateStr.split('/').reverse().join('-'));
  const today = new Date();
  const thirtyDaysFromNow = new Date();
  thirtyDaysFromNow.setDate(today.getDate() + 30);
  return date <= thirtyDaysFromNow && date > today;
};

// Function to get status badge class
const getStatusClass = (status: string) => {
  switch (status) {
    case "actif":
      return "bg-green-100 text-green-800";
    case "expiré":
      return "bg-red-100 text-red-800";
    case "en attente":
      return "bg-amber-100 text-amber-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const InsuranceManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Filter insurance data based on search term
  const filteredInsurance = insuranceData.filter(insurance => 
    insurance.vehicle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    insurance.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
    insurance.policyNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gestion des Assurances</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Ajouter une assurance
        </Button>
      </div>
      
      {/* Alerts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Upcoming Renewals */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-amber-500" />
              Renouvellements à venir
            </CardTitle>
          </CardHeader>
          <CardContent>
            {upcomingRenewals.length > 0 ? (
              <div className="space-y-4">
                {upcomingRenewals.map((renewal) => (
                  <div key={renewal.id} className="flex justify-between items-center p-3 border rounded-md">
                    <div>
                      <h3 className="font-medium">{renewal.vehicle}</h3>
                      <p className="text-sm text-muted-foreground">
                        {renewal.provider} - {renewal.policyNumber}
                      </p>
                      <p className="text-sm">
                        <span className="text-amber-600 font-medium">Expire le: {renewal.endDate}</span>
                      </p>
                    </div>
                    <Button size="sm">Renouveler</Button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">Aucun renouvellement à prévoir dans les 30 prochains jours.</p>
            )}
          </CardContent>
        </Card>
        
        {/* Missing Documents */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2 text-red-500" />
              Documents manquants
            </CardTitle>
          </CardHeader>
          <CardContent>
            {missingDocuments.length > 0 ? (
              <div className="space-y-4">
                {missingDocuments.map((item) => (
                  <div key={item.id} className="flex justify-between items-center p-3 border rounded-md">
                    <div>
                      <h3 className="font-medium">{item.vehicle}</h3>
                      <p className="text-sm text-muted-foreground">
                        {item.provider} - {item.policyNumber}
                      </p>
                    </div>
                    <Button size="sm" variant="outline">
                      <Upload className="h-4 w-4 mr-2" />
                      Téléverser
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">Tous les documents d'assurance sont à jour.</p>
            )}
          </CardContent>
        </Card>
      </div>
      
      {/* Main Content */}
      <Tabs defaultValue="policies">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="policies">Polices d'assurance</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>
        
        <TabsContent value="policies">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Polices d'assurance</CardTitle>
              <div className="relative w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Rechercher..." 
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Véhicule</TableHead>
                      <TableHead>Assureur</TableHead>
                      <TableHead>N° de police</TableHead>
                      <TableHead>Période</TableHead>
                      <TableHead>Prime</TableHead>
                      <TableHead>Couverture</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredInsurance.map((insurance) => (
                      <TableRow key={insurance.id}>
                        <TableCell className="font-medium">{insurance.vehicle}</TableCell>
                        <TableCell>{insurance.provider}</TableCell>
                        <TableCell>{insurance.policyNumber}</TableCell>
                        <TableCell>
                          {insurance.startDate} au {insurance.endDate}
                          {isDateSoon(insurance.endDate) && (
                            <Badge variant="outline" className="ml-2 bg-amber-100 text-amber-800">
                              Expiration proche
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>{insurance.premium} MAD/an</TableCell>
                        <TableCell>{insurance.coverage}</TableCell>
                        <TableCell>
                          <Badge className={getStatusClass(insurance.status)}>
                            {insurance.status}
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
        
        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <CardTitle>Documents d'assurance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Véhicule</TableHead>
                      <TableHead>Type de document</TableHead>
                      <TableHead>Date d'expiration</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredInsurance.map((insurance) => (
                      <TableRow key={insurance.id}>
                        <TableCell className="font-medium">{insurance.vehicle}</TableCell>
                        <TableCell>Attestation d'assurance</TableCell>
                        <TableCell>{insurance.endDate}</TableCell>
                        <TableCell>
                          {!insurance.documentUploaded ? (
                            <Badge variant="destructive">Manquant</Badge>
                          ) : isDateSoon(insurance.endDate) ? (
                            <Badge className="bg-amber-100 text-amber-800">Expiration proche</Badge>
                          ) : (
                            <Badge className="bg-green-100 text-green-800">À jour</Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            {insurance.documentUploaded ? (
                              <Button variant="ghost" size="sm">
                                <FileText className="h-4 w-4 mr-2" />
                                Voir
                              </Button>
                            ) : (
                              <Button variant="ghost" size="sm">
                                <Upload className="h-4 w-4 mr-2" />
                                Téléverser
                              </Button>
                            )}
                            <Button variant="ghost" size="sm">
                              <AlertTriangle className="h-4 w-4 mr-2" />
                              Alertes
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
      </Tabs>
    </AdminLayout>
  );
};

export default InsuranceManagement;
