
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { FileText, Upload, CheckCircle, XCircle, AlertCircle, Clock, Download } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Sample documents data
const userDocuments = [
  {
    id: "doc1",
    type: "Permis de conduire",
    uploadDate: "15/01/2025",
    expiryDate: "20/06/2027",
    fileName: "permis_mohammed_alami.pdf",
    fileSize: "1.2 MB",
    status: "verified",
    required: true
  },
  {
    id: "doc2",
    type: "Carte d'identité",
    uploadDate: "15/01/2025",
    expiryDate: "10/03/2030",
    fileName: "cni_mohammed_alami.pdf",
    fileSize: "0.8 MB",
    status: "verified",
    required: true
  },
  {
    id: "doc3",
    type: "Justificatif de domicile",
    uploadDate: "18/01/2025",
    expiryDate: null,
    fileName: "facture_eau_janvier.pdf",
    fileSize: "0.5 MB",
    status: "pending",
    required: true
  },
  {
    id: "doc4",
    type: "Attestation d'assurance",
    uploadDate: null,
    expiryDate: null,
    fileName: null,
    fileSize: null,
    status: "missing",
    required: false
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
    case "missing":
      return "bg-gray-100 text-gray-800";
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
    case "missing":
      return "Manquant";
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
      return <Clock className="h-4 w-4 text-amber-600" />;
    case "rejected":
      return <XCircle className="h-4 w-4 text-red-600" />;
    case "missing":
      return <AlertCircle className="h-4 w-4 text-gray-600" />;
    default:
      return null;
  }
};

const ClientDocuments = () => {
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadType, setUploadType] = useState<string>("");
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };
  
  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedFile || !uploadType) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner un fichier et un type de document",
        variant: "destructive"
      });
      return;
    }
    
    // In a real application, this would upload the file to a server
    
    toast({
      title: "Document téléversé",
      description: `Le document ${uploadType} a été téléversé avec succès et est en attente de vérification.`,
      duration: 3000
    });
    
    // Reset form
    setSelectedFile(null);
    setUploadType("");
    if (e.target instanceof HTMLFormElement) {
      e.target.reset();
    }
  };
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Mes Documents</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upload Section */}
          <Card>
            <CardHeader>
              <CardTitle>Téléverser un document</CardTitle>
              <CardDescription>Ajoutez ou mettez à jour vos documents</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpload}>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="document-type">Type de document</Label>
                    <select 
                      id="document-type"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={uploadType}
                      onChange={(e) => setUploadType(e.target.value)}
                      required
                    >
                      <option value="">Sélectionnez un type</option>
                      <option value="Permis de conduire">Permis de conduire</option>
                      <option value="Carte d'identité">Carte d'identité</option>
                      <option value="Justificatif de domicile">Justificatif de domicile</option>
                      <option value="Attestation d'assurance">Attestation d'assurance</option>
                    </select>
                  </div>
                  
                  <div>
                    <Label htmlFor="file-upload">Fichier</Label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md">
                      <div className="space-y-1 text-center">
                        <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                        <div className="flex text-sm text-muted-foreground">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer rounded-md font-medium text-primary hover:text-primary/90 focus-within:outline-none"
                          >
                            <span>Téléverser un fichier</span>
                            <Input 
                              id="file-upload" 
                              name="file-upload" 
                              type="file" 
                              className="sr-only"
                              accept=".pdf,.jpg,.jpeg,.png"
                              onChange={handleFileChange}
                              required
                            />
                          </label>
                          <p className="pl-1">ou glisser-déposer</p>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          PDF, JPG ou PNG jusqu'à 10 MB
                        </p>
                      </div>
                    </div>
                    {selectedFile && (
                      <div className="mt-2 text-sm text-muted-foreground">
                        Fichier sélectionné: {selectedFile.name}
                      </div>
                    )}
                  </div>
                  
                  <Button type="submit" className="w-full">
                    <Upload className="h-4 w-4 mr-2" />
                    Téléverser
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
          
          {/* Documents List */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Mes documents</CardTitle>
              <CardDescription>
                Les documents requis pour la location de véhicules
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userDocuments.map((document) => (
                  <div 
                    key={document.id} 
                    className={`p-4 border rounded-md ${document.status === 'rejected' ? 'border-red-200 bg-red-50' : ''}`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-start">
                        <FileText className="h-8 w-8 mr-3 text-primary flex-shrink-0" />
                        <div>
                          <h3 className="font-medium flex items-center">
                            {document.type}
                            {document.required && (
                              <Badge variant="outline" className="ml-2 text-xs">
                                Requis
                              </Badge>
                            )}
                          </h3>
                          {document.fileName ? (
                            <>
                              <p className="text-sm text-muted-foreground">
                                {document.fileName} {document.fileSize && `(${document.fileSize})`}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                Téléversé le: {document.uploadDate}
                              </p>
                              {document.expiryDate && (
                                <p className="text-sm text-muted-foreground">
                                  Expire le: {document.expiryDate}
                                </p>
                              )}
                              {document.status === "rejected" && (
                                <p className="text-sm text-red-600 mt-1">
                                  Document rejeté: Veuillez téléverser une nouvelle version
                                </p>
                              )}
                            </>
                          ) : (
                            <p className="text-sm text-muted-foreground">
                              Aucun document téléversé
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center">
                        <StatusIcon status={document.status} />
                        <Badge className={`ml-2 ${getStatusClass(document.status)}`}>
                          {translateStatus(document.status)}
                        </Badge>
                      </div>
                    </div>
                    
                    {document.fileName && (
                      <div className="flex justify-end mt-3 space-x-2">
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Télécharger
                        </Button>
                        <Button variant="outline" size="sm">
                          <Upload className="h-4 w-4 mr-2" />
                          Mettre à jour
                        </Button>
                      </div>
                    )}
                    
                    {document.status === "missing" && (
                      <div className="flex justify-end mt-3">
                        <Button variant="outline" size="sm">
                          <Upload className="h-4 w-4 mr-2" />
                          Téléverser
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 text-blue-800 rounded-md">
                <h3 className="font-medium mb-2 flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  Informations importantes
                </h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Les documents requis doivent être valides et lisibles</li>
                  <li>La vérification des documents peut prendre jusqu'à 24 heures</li>
                  <li>Vous serez notifié par email lorsque vos documents auront été vérifiés</li>
                  <li>Pour toute question, n'hésitez pas à contacter notre service client</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default ClientDocuments;
