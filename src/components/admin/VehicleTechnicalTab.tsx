
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import VehicleInspectionCard from "./VehicleInspectionCard";
import { Vehicle } from "@/types/vehicle";

interface VehicleTechnicalTabProps {
  vehicles: Vehicle[];
}

const VehicleTechnicalTab = ({ vehicles }: VehicleTechnicalTabProps) => {
  // Filter vehicles that need inspection in the next 30 days
  const vehiclesNeedingInspection = vehicles.filter(vehicle => {
    const nextInspDate = new Date(vehicle.nextInspection.split('/').reverse().join('-'));
    const today = new Date();
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(today.getDate() + 30);
    return nextInspDate <= thirtyDaysFromNow;
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Suivi Technique</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-4">Véhicules nécessitant un contrôle technique</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {vehiclesNeedingInspection.map(vehicle => (
              <VehicleInspectionCard key={vehicle.id} vehicle={vehicle} />
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
  );
};

export default VehicleTechnicalTab;
