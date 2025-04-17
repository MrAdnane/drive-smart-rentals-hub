
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, AlertCircle } from "lucide-react";
import { Vehicle } from "@/types/vehicle";

interface VehicleDocumentsTabProps {
  vehicles: Vehicle[];
}

// Function to check if a document is about to expire
const isDocumentExpiringSoon = (expiryDate: string | null) => {
  if (!expiryDate) return false;
  
  const expiry = new Date(expiryDate.split('/').reverse().join('-'));
  const today = new Date();
  const thirtyDaysFromNow = new Date();
  thirtyDaysFromNow.setDate(today.getDate() + 30);
  
  return expiry <= thirtyDaysFromNow && expiry > today;
};

const VehicleDocumentsTab = ({ vehicles }: VehicleDocumentsTabProps) => {
  return (
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
              {vehicles.flatMap(vehicle => 
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
  );
};

export default VehicleDocumentsTab;
