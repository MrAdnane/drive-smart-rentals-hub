
import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  AlertTriangle, 
  Eye, 
  File, 
  FileText, 
  Filter, 
  Pencil, 
  Plus, 
  Search, 
  Trash2, 
  Upload 
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";

// Données factices pour les documents
const documents = [
  {
    id: "DOC001",
    vehicleId: "V001",
    vehicleName: "Toyota Corolla (ABC-123)",
    type: "Carte grise",
    filename: "carte_grise_toyota_corolla.pdf",
    uploadDate: "10/01/2025",
    expiryDate: "N/A",
    fileSize: "1.2 Mo",
    status: "valid"
  },
  {
    id: "DOC002",
    vehicleId: "V001",
    vehicleName: "Toyota Corolla (ABC-123)",
    type: "Assurance",
    filename: "assurance_toyota_corolla_2025.pdf",
    uploadDate: "15/01/2025",
    expiryDate: "15/01/2026",
    fileSize: "890 Ko",
    status: "valid"
  },
  {
    id: "DOC003",
    vehicleId: "V002",
    vehicleName: "Honda CR-V (DEF-456)",
    type: "Contrôle technique",
    filename: "ct_honda_crv_2025.pdf",
    uploadDate: "05/01/2025",
    expiryDate: "05/01/2026",
    fileSize: "1.5 Mo",
    status: "valid"
  },
  {
    id: "DOC004",
    vehicleId: "V003",
    vehicleName: "Mercedes-Benz E-Class (GHI-789)",
    type: "Assurance",
    filename: "assurance_mercedes_classe_e.pdf",
    uploadDate: "10/11/2024",
    expiryDate: "09/11/2025",
    fileSize: "950 Ko",
    status: "expiring"
  },
  {
    id: "DOC005",
    vehicleId: "V004",
    vehicleName: "Tesla Model 3 (JKL-012)",
    type: "Carte grise",
    filename: "carte_grise_tesla_model3.pdf",
    uploadDate: "22/12/2024",
    expiryDate: "N/A",
    fileSize: "1.1 Mo",
    status: "valid"
  },
  {
    id: "DOC006",
    vehicleId: "V002",
    vehicleName: "Honda CR-V (DEF-456)",
    type: "Facture d'achat",
    filename: "facture_achat_honda_crv.pdf",
    uploadDate: "15/09/2023",
    expiryDate: "N/A",
    fileSize: "2.3 Mo",
    status: "valid"
  },
  {
    id: "DOC007",
    vehicleId: "V004",
    vehicleName: "Tesla Model 3 (JKL-012)",
    type: "Contrôle technique",
    filename: "ct_tesla_model3.pdf",
    uploadDate: "05/12/2024",
    expiryDate: "05/12/2025",
    fileSize: "1.8 Mo",
    status: "valid"
  }
];

// Données factices pour les documents clients
const clientDocuments = [
  {
    id: "CDOC001",
    clientId: "C001",
    clientName: "Mohammed Alami",
    type: "Permis de conduire",
    filename: "permis_mohammed_alami.pdf",
    uploadDate: "12/01/2025",
    expiryDate: "12/01/2030",
    fileSize: "950 Ko",
    status: "valid",
    verified: true
  },
  {
    id: "CDOC002",
    clientId: "C001",
    clientName: "Mohammed Alami",
    type: "Carte d'identité",
    filename: "cni_mohammed_alami.pdf",
    uploadDate: "12/01/2025",
    expiryDate: "05/09/2030",
    fileSize: "780 Ko",
    status: "valid",
    verified: true
  },
  {
    id: "CDOC003",
    clientId: "C002",
    clientName: "Fatima Benali",
    type: "Permis de conduire",
    filename: "permis_fatima_benali.pdf",
    uploadDate: "18/01/2025",
    expiryDate: "18/01/2028",
    fileSize: "870 Ko",
    status: "valid",
    verified: true
  },
  {
    id: "CDOC004",
    clientId: "C002",
    clientName: "Fatima Benali",
    type: "Carte d'identité",
    filename: "cni_fatima_benali.pdf",
    uploadDate: "18/01/2025",
    expiryDate: "22/03/2028",
    fileSize: "820 Ko",
    status: "valid",
    verified: true
  },
  {
    id: "CDOC005",
    clientId: "C003",
    clientName: "Youssef El Mansouri",
    type: "Permis de conduire",
    filename: "permis_youssef_elmansouri.pdf",
    uploadDate: "02/02/2025",
    expiryDate: "15/07/2026",
    fileSize: "910 Ko",
    status: "expiring",
    verified: true
  },
  {
    id: "CDOC006",
    clientId: "C003",
    clientName: "Youssef El Mansouri",
    type: "Carte d'identité",
    filename: "cni_youssef_elmansouri.pdf",
    uploadDate: "02/02/2025",
    expiryDate: "10/11/2029",
    fileSize: "880 Ko",
    status: "valid",
    verified: true
  },
  {
    id: "CDOC007",
    clientId: "C004",
    clientName: "Karim Ziani",
    type: "Permis de conduire",
    filename: "permis_karim_ziani.pdf",
    uploadDate: "05/02/2025",
    expiryDate: "05/02/2027",
    fileSize: "920 Ko",
    status: "valid",
    verified: false
  }
];

// Fonction pour obtenir la classe CSS selon le statut
const getStatusClass = (status: string) => {
  switch (status) {
    case "valid":
      return "bg-green-100 text-green-800";
    case "expiring":
      return "bg-amber-100 text-amber-800";
    case "expired":
      return "bg-red-100 text-red-800";
    case "pending":
      return "bg-blue-100 text-blue-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

// Fonction pour obtenir le libellé du statut
const getStatusLabel = (status: string) => {
  switch (status) {
    case "valid":
      return "Valide";
    case "expiring":
      return "Expire bientôt";
    case "expired":
      return "Expiré";
    case "pending":
      return "En attente";
    default:
      return status;
  }
};

// Fonction pour obtenir l'icône du type de document
const getDocumentIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case "carte grise":
      return <FileText className="h-4 w-4 text-blue-500" />;
    case "assurance":
      return <FileText className="h-4 w-4 text-green-500" />;
    case "contrôle technique":
      return <FileText className="h-4 w-4 text-amber-500" />;
    case "facture d'achat":
      return <FileText className="h-4 w-4 text-purple-500" />;
    case "permis de conduire":
      return <FileText className="h-4 w-4 text-red-500" />;
    case "carte d'identité":
      return <FileText className="h-4 w-4 text-indigo-500" />;
    default:
      return <File className="h-4 w-4 text-gray-500" />;
  }
};

const AdminDocuments = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [documentTypeFilter, setDocumentTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // Filtrer les documents véhicules
  const filteredDocuments = documents.filter(
    (doc) =>
      (documentTypeFilter === "all" || doc.type === documentTypeFilter) &&
      (statusFilter === "all" || doc.status === statusFilter) &&
      (doc.vehicleName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.filename.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.type.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Filtrer les documents clients
  const filteredClientDocuments = clientDocuments.filter(
    (doc) =>
      (documentTypeFilter === "all" || doc.type === documentTypeFilter) &&
      (statusFilter === "all" || doc.status === statusFilter) &&
      (doc.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.filename.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.type.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Obtenir les types de documents uniques
  const uniqueDocumentTypes = Array.from(
    new Set([...documents, ...clientDocuments].map((doc) => doc.type))
  );

  // Calculer les statistiques
  const expiringDocuments = documents.filter((doc) => doc.status === "expiring").length;
  const expiredDocuments = documents.filter((doc) => doc.status === "expired").length;
  const pendingVerifications = clientDocuments.filter((doc) => !doc.verified).length;

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gestion des Documents</h1>
        <div className="space-x-2">
          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" /> Générer un rapport
          </Button>
          <Button>
            <Upload className="mr-2 h-4 w-4" /> Importer des documents
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Documents à expiration</CardTitle>
            <CardDescription>
              Documents véhicules expirant prochainement
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-end">
              <div>
                <div className="text-2xl font-bold">{expiringDocuments}</div>
                <div className="text-muted-foreground text-sm">
                  documents expirant bientôt
                </div>
              </div>
              {expiringDocuments > 0 && (
                <AlertTriangle className="h-8 w-8 text-amber-500" />
              )}
            </div>
            <Progress
              value={
                documents.length > 0
                  ? ((documents.length - expiringDocuments) / documents.length) * 100
                  : 100
              }
              className="h-2 mt-4"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Documents expirés</CardTitle>
            <CardDescription>
              Documents dont la validité a expiré
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-end">
              <div>
                <div className="text-2xl font-bold">{expiredDocuments}</div>
                <div className="text-muted-foreground text-sm">
                  documents expirés
                </div>
              </div>
              {expiredDocuments > 0 && (
                <AlertTriangle className="h-8 w-8 text-red-500" />
              )}
            </div>
            <Progress
              value={
                documents.length > 0
                  ? ((documents.length - expiredDocuments) / documents.length) * 100
                  : 100
              }
              className="h-2 mt-4"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Vérifications en attente</CardTitle>
            <CardDescription>
              Documents clients à vérifier
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-end">
              <div>
                <div className="text-2xl font-bold">{pendingVerifications}</div>
                <div className="text-muted-foreground text-sm">
                  documents à vérifier
                </div>
              </div>
              {pendingVerifications > 0 && (
                <AlertTriangle className="h-8 w-8 text-blue-500" />
              )}
            </div>
            <Progress
              value={
                clientDocuments.length > 0
                  ? ((clientDocuments.length - pendingVerifications) /
                      clientDocuments.length) *
                    100
                  : 100
              }
              className="h-2 mt-4"
            />
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="vehicles" className="mb-6">
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-2">
          <TabsTrigger value="vehicles" className="flex items-center">
            <File className="mr-2 h-4 w-4" /> Documents Véhicules
          </TabsTrigger>
          <TabsTrigger value="clients" className="flex items-center">
            <File className="mr-2 h-4 w-4" /> Documents Clients
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
              <span className="mr-2">Type:</span>
              <Select
                value={documentTypeFilter}
                onValueChange={(value) => setDocumentTypeFilter(value)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Tous les types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les types</SelectItem>
                  {uniqueDocumentTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center">
              <span className="mr-2">Statut:</span>
              <Select
                value={statusFilter}
                onValueChange={(value) => setStatusFilter(value)}
              >
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Tous les statuts" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous</SelectItem>
                  <SelectItem value="valid">Valides</SelectItem>
                  <SelectItem value="expiring">Expirent bientôt</SelectItem>
                  <SelectItem value="expired">Expirés</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" /> Filtres avancés
          </Button>
        </div>

        <TabsContent value="vehicles" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Documents des véhicules</CardTitle>
              <CardDescription>
                Gérez les documents administratifs et techniques des véhicules
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Véhicule</TableHead>
                      <TableHead>Fichier</TableHead>
                      <TableHead>Date d'ajout</TableHead>
                      <TableHead>Expiration</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredDocuments.length > 0 ? (
                      filteredDocuments.map((doc) => (
                        <TableRow key={doc.id}>
                          <TableCell className="font-medium">{doc.id}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              {getDocumentIcon(doc.type)}
                              <span className="ml-2">{doc.type}</span>
                            </div>
                          </TableCell>
                          <TableCell>{doc.vehicleName}</TableCell>
                          <TableCell className="font-mono text-xs">
                            {doc.filename}
                          </TableCell>
                          <TableCell>{doc.uploadDate}</TableCell>
                          <TableCell>
                            {doc.expiryDate === "N/A" ? (
                              <span className="text-muted-foreground">
                                Non applicable
                              </span>
                            ) : (
                              doc.expiryDate
                            )}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={getStatusClass(doc.status)}
                            >
                              {getStatusLabel(doc.status)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4 mr-1" />
                                Voir
                              </Button>
                              <Button variant="outline" size="sm">
                                <Pencil className="h-4 w-4 mr-1" />
                                Éditer
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
                          Aucun document ne correspond aux filtres sélectionnés
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>

              <div className="mt-4 flex justify-between items-center">
                <div className="text-sm text-muted-foreground">
                  Affichage de {filteredDocuments.length} document(s) sur{" "}
                  {documents.length}
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

        <TabsContent value="clients" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Documents des clients</CardTitle>
              <CardDescription>
                Gérez les documents d'identité et permis de conduire des clients
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead>Fichier</TableHead>
                      <TableHead>Date d'ajout</TableHead>
                      <TableHead>Expiration</TableHead>
                      <TableHead>Vérifié</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredClientDocuments.length > 0 ? (
                      filteredClientDocuments.map((doc) => (
                        <TableRow key={doc.id}>
                          <TableCell className="font-medium">{doc.id}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              {getDocumentIcon(doc.type)}
                              <span className="ml-2">{doc.type}</span>
                            </div>
                          </TableCell>
                          <TableCell>{doc.clientName}</TableCell>
                          <TableCell className="font-mono text-xs">
                            {doc.filename}
                          </TableCell>
                          <TableCell>{doc.uploadDate}</TableCell>
                          <TableCell>{doc.expiryDate}</TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={
                                doc.verified
                                  ? "bg-green-100 text-green-800"
                                  : "bg-amber-100 text-amber-800"
                              }
                            >
                              {doc.verified ? "Vérifié" : "À vérifier"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4 mr-1" />
                                Voir
                              </Button>
                              {!doc.verified && (
                                <Button size="sm">
                                  <div className="flex items-center">
                                    <FileText className="h-4 w-4 mr-1" />
                                    Vérifier
                                  </div>
                                </Button>
                              )}
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
                          Aucun document ne correspond aux filtres sélectionnés
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>

              <div className="mt-4 flex justify-between items-center">
                <div className="text-sm text-muted-foreground">
                  Affichage de {filteredClientDocuments.length} document(s) sur{" "}
                  {clientDocuments.length}
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
      </Tabs>
    </AdminLayout>
  );
};

export default AdminDocuments;
