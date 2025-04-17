
import React from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";

interface VehicleFilterProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  applyFilters: () => void;
}

const VehicleFilter = ({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  applyFilters
}: VehicleFilterProps) => {
  return (
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
  );
};

export default VehicleFilter;
