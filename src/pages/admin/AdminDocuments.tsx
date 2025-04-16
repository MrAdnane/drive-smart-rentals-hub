
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  Plus, 
  Search, 
  FileText, 
  File, 
  FileCog, 
  FileCheck, 
  Download, 
  Share2, 
  Trash, 
  Eye
} from "lucide-react";

// Données d'exemple pour les documents
const documentCategories = [
  {
    category: "contracts",
    title: "Contrats",
    documents: [
      {
        id: "DOC001",
        name: "Contrat de Location Standard",
        type: "PDF",
        size: "245 KB",
        createdAt: "10/03/2025",
        updatedAt: "15/03/2025",
        author: "Admin"
      },
      {
        id: "DOC002",
        name: "Contrat de Location Longue Durée",
        type: "DOCX",
        size: "189 KB",
        createdAt: "12/03/2025",
        updatedAt: "12/03/2025",
        author: "Admin"
      },
      {
        id: "DOC003",
        name: "Avenant Contrat Location",
        type: "PDF",
        size: "156 KB",
        createdAt: "20/03/2025",
        updatedAt: "20/03/2025",
        author: "Admin"
      }
    ]
  },
  {
    category: "insurance",
    title: "Assurances",
    documents: [
      {
        id: "DOC004",
        name: "Police d'Assurance Flotte",
        type: "PDF",
        size: "1.2 MB",
        createdAt: "05/01/2025",
        updatedAt: "05/01/2025",
        author: "Admin"
      },
      {
        id: "DOC005",
        name: "Attestation Assurance Responsabilité Civile",
        type: "PDF",
        size: "780 KB",
        createdAt: "15/01/2025",
        updatedAt: "15/01/2025",
        author: "Admin"
      }
    ]
  },
  {
    category: "vehicle",
    title: "Documents Véhicules",
    documents: [
      {
        id: "DOC006",
        name: "Cartes Grises - Flotte Complète",
        type: "PDF",
        size: "3.5 MB",
        createdAt: "02/02/2025",
        updatedAt: "02/02/2025",
        author: "Admin"
      },
      {
        id: "DOC007",
        name: "Certificats Techniques",
        type: "ZIP",
        size: "8.7 MB",
        createdAt: "10/02/2025",
        updatedAt: "10/02/2025",
        author: "Admin"
      },
      {
        id: "DOC008",
        name: "Manuel Entretien - Toyota Corolla",
        type: "PDF",
        size: "4.2 MB",
        createdAt: "15/02/2025",
        updatedAt: "15/02/2025",
        author: "Admin"
      }
    ]
  },
  {
    category: "templates",
    title: "Modèles",
    documents: [
      {
        id: "DOC009",
        name: "Modèle Facture",
        type: "XLSX",
        size: "120 KB",
        createdAt: "01/04/2025",
        updatedAt: "01/04/2025",
        author: "Admin"
      },
      {
        id: "DOC010",
        name: "Modèle Rapport Incident",
        type: "DOCX",
        size: "95 KB",
        createdAt: "05/04/2025",
        updatedAt: "05/04/2025",
        author: "Admin"
      }
    ]
  }
];

// Fonction pour obtenir l'icône en fonction du type de document
const getDocumentIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case "pdf":
      return <FileText className="h-5 w-5 text-red-500" />;
    case "docx":
      return <FileText className="h-5 w-5 text-blue-500" />;
    case "xlsx":
      return <FileText className="h-5 w-5 text-green-500" />;
    case "zip":
      return <FileCog className="h-5 w-5 text-yellow-500" />;
    default:
      return <File className="h-5 w-5 text-gray-500" />;
  }
};

const AdminDocuments = () => {
  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gestion des Documents</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <FileCheck className="mr-2 h-4 w-4" /> Scanner
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Ajouter un Document
          </Button>
        </div>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Rechercher des documents..." 
            className="pl-8 w-full md:w-1/2 lg:w-1/3"
          />
        </div>
      </div>

      <Tabs defaultValue="all" className="mb-6">
        <TabsList>
          <TabsTrigger value="all">Tous</TabsTrigger>
          <TabsTrigger value="contracts">Contrats</TabsTrigger>
          <TabsTrigger value="insurance">Assurances</TabsTrigger>
          <TabsTrigger value="vehicle">Véhicules</TabsTrigger>
          <TabsTrigger value="templates">Modèles</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          {documentCategories.map((category) => (
            <Card key={category.category} className="mb-6">
              <CardHeader>
                <CardTitle>{category.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12"></TableHead>
                        <TableHead>Nom</TableHead>
                        <TableHead>Taille</TableHead>
                        <TableHead>Créé le</TableHead>
                        <TableHead>Modifié le</TableHead>
                        <TableHead>Auteur</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {category.documents.map((doc) => (
                        <TableRow key={doc.id}>
                          <TableCell>{getDocumentIcon(doc.type)}</TableCell>
                          <TableCell className="font-medium">{doc.name}</TableCell>
                          <TableCell>{doc.size}</TableCell>
                          <TableCell>{doc.createdAt}</TableCell>
                          <TableCell>{doc.updatedAt}</TableCell>
                          <TableCell>{doc.author}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button variant="ghost" size="icon">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Download className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Share2 className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="text-red-500">
                                <Trash className="h-4 w-4" />
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
          ))}
        </TabsContent>

        {documentCategories.map((category) => (
          <TabsContent key={category.category} value={category.category} className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>{category.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12"></TableHead>
                        <TableHead>Nom</TableHead>
                        <TableHead>Taille</TableHead>
                        <TableHead>Créé le</TableHead>
                        <TableHead>Modifié le</TableHead>
                        <TableHead>Auteur</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {category.documents.map((doc) => (
                        <TableRow key={doc.id}>
                          <TableCell>{getDocumentIcon(doc.type)}</TableCell>
                          <TableCell className="font-medium">{doc.name}</TableCell>
                          <TableCell>{doc.size}</TableCell>
                          <TableCell>{doc.createdAt}</TableCell>
                          <TableCell>{doc.updatedAt}</TableCell>
                          <TableCell>{doc.author}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button variant="ghost" size="icon">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Download className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Share2 className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="text-red-500">
                                <Trash className="h-4 w-4" />
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
        ))}
      </Tabs>
    </AdminLayout>
  );
};

export default AdminDocuments;
