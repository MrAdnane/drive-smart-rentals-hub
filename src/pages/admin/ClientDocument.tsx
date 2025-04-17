
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileText, Search, CheckCircle, XCircle, AlertCircle, Download, Eye } from "lucide-react";
import { useState } from "react";

// Sample client documents data
const clientDocuments = [
  {
    id: "cd001",
    client: "Mohammed Alami",
    clientId: "C001",
    documentType: "Permis de conduire",
    dateUploaded: "15/01/2025",
    expiryDate: "20/06/2027",
    status: "verified",
    fileName: "permis_mohammed_alami.pdf"
  },
  {
    id: "cd002",
    client: "Mohammed Alami",
    clientId: "C001",
    documentType: "Carte d'identité",
    dateUploaded: "15/01/2025",
    expiryDate: "10/03/2030",
    status: "verified",
    fileName: "cni_mohammed_alami.pdf"
  },
  {
    id: "cd003",
    client: "Fatima Benali",
    clientId: "C002",
    documentType: "Permis de conduire",
    dateUploaded: "20/02/2025",
    expiryDate: "15/11/2026",
    status: "pending",
    fileName: "permis_fatima_benali.pdf"
  },
  {
    id: "cd004",
    client: "Fatima Benali",
    clientId: "C002",
    documentType: "Carte d'identité",
    dateUploaded: "20/02/2025",
    expiryDate: "05/05/2028",
    status: "verified",
    fileName: "cni_fatima_benali.pdf"
  },
  {
    id: "cd005",
    client: "Youssef El Mansouri",
    clientId: "C003",
    documentType: "Permis de conduire",
    dateUploaded: "05/03/2025",
    expiryDate: "30/09/2029",
    status: "rejected",
    fileName: "permis_youssef_elmansouri.pdf",
    notes: "Document illisible, veuillez téléverser une nouvelle copie"
  },
  {
    id: "cd006",
    client: "Youssef El Mansouri",
    clientId: "C003",
    documentType: "Justificatif de domicile",
    dateUploaded: "05/03/2025",
    expiryDate: null,
    status: "verified",
    fileName: "justificatif_youssef_elmansouri.pdf"
  },
  {
    id: "cd007",
    client: "Laila Ouazzani",
    clientId: "C004",
    documentType: "Permis de conduire",
    dateUploaded: "12/03/2025",
    expiryDate: "22/04/2028",
    status: "verified",
    fileName: "permis_laila_ouazzani.pdf"
  }
];

// Function to get status badge class
const getStatusClass = (status: string) => {
  switch (status) {
    case "verified":
      return "bg-green-100 text-green-800";
    case "pending":
      return "bg-amber-100 text-amber-800";
    case "rejected":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

// Function to translate status
const translateStatus = (status: string) => {
  switch (status) {
    case "verified":
      return "Vérifié";
    case "pending":
      return "En attente";
    case "rejected":
      return "Rejeté";
    default:
      return status;
  }
};

// Function to get status icon
const StatusIcon = ({ status }: { status: string }) => {
  switch (status) {
    case "verified":
      return <CheckCircle className="h-4 w-4 text-green-600" />;
    case "pending":
      return <AlertCircle className="h-4 w-4 text-amber-600" />;
    case "rejected":
      return <XCircle className="h-4 w-4 text-red-600" />;
    default:
      return null;
  }
};

const ClientDocument = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  
  // Filter documents based on search term and status
  const filteredDocuments = clientDocuments.filter(doc => {
    const matchesSearch = 
      doc.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.documentType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (doc.fileName && doc.fileName.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = statusFilter === "all" || doc.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Documents Clients</h1>
      </div>
      
      <Card className="mb-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Liste des Documents</CardTitle>
          <div className="flex items-center space-x-2">
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Rechercher..." 
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex space-x-1">
              <Button 
                variant={statusFilter === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("all")}
              >
                Tous
              </Button>
              <Button 
                variant={statusFilter === "pending" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("pending")}
              >
                <AlertCircle className="h-4 w-4 mr-1" />
                En attente
              </Button>
              <Button 
                variant={statusFilter === "verified" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("verified")}
              >
                <CheckCircle className="h-4 w-4 mr-1" />
                Vérifiés
              </Button>
              <Button 
                variant={statusFilter === "rejected" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("rejected")}
              >
                <XCircle className="h-4 w-4 mr-1" />
                Rejetés
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client</TableHead>
                  <TableHead>Type de document</TableHead>
                  <TableHead>Date ajouté</TableHead>
                  <TableHead>Date d'expiration</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDocuments.map((doc) => (
                  <TableRow key={doc.id}>
                    <TableCell className="font-medium">{doc.client}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                        {doc.documentType}
                      </div>
                    </TableCell>
                    <TableCell>{doc.dateUploaded}</TableCell>
                    <TableCell>{doc.expiryDate || "N/A"}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <StatusIcon status={doc.status} />
                        <Badge className={`ml-2 ${getStatusClass(doc.status)}`}>
                          {translateStatus(doc.status)}
                        </Badge>
                      </div>
                      {doc.status === "rejected" && doc.notes && (
                        <p className="text-xs text-red-600 mt-1">{doc.notes}</p>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          Voir
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Télécharger
                        </Button>
                        {doc.status === "pending" && (
                          <Button variant="outline" size="sm" className="text-green-600">
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Valider
                          </Button>
                        )}
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
          <CardTitle>Documents en attente de vérification</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {clientDocuments
              .filter(doc => doc.status === "pending")
              .map(doc => (
                <Card key={doc.id} className="overflow-hidden">
                  <div className="bg-gray-100 p-8 flex justify-center items-center">
                    <FileText className="h-16 w-16 text-gray-400" />
                  </div>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium">{doc.documentType}</h3>
                        <p className="text-sm text-muted-foreground">{doc.client}</p>
                      </div>
                      <Badge className={getStatusClass(doc.status)}>
                        {translateStatus(doc.status)}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p>Ajouté le: {doc.dateUploaded}</p>
                      {doc.expiryDate && <p>Expire le: {doc.expiryDate}</p>}
                      <p>Fichier: {doc.fileName}</p>
                    </div>
                    <div className="flex space-x-2 mt-3">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Eye className="h-4 w-4 mr-2" />
                        Voir
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 text-green-600">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Valider
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 text-red-600">
                        <XCircle className="h-4 w-4 mr-2" />
                        Rejeter
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default ClientDocument;
