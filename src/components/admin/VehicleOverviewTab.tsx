
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import VehicleFilter from "./VehicleFilter";
import VehicleStatusBadge from "./VehicleStatusBadge";
import { Vehicle } from "@/types/vehicle";

interface VehicleOverviewTabProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  applyFilters: () => void;
  filteredVehicles: Vehicle[];
}

const VehicleOverviewTab = ({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  applyFilters,
  filteredVehicles
}: VehicleOverviewTabProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>État du Parc Automobile</CardTitle>
        <VehicleFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          applyFilters={applyFilters}
        />
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
                    <VehicleStatusBadge status={vehicle.status} />
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
  );
};

export default VehicleOverviewTab;
