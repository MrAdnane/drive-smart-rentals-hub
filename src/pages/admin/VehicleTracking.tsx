
import React, { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VehicleOverviewTab from "@/components/admin/VehicleOverviewTab";
import VehicleTechnicalTab from "@/components/admin/VehicleTechnicalTab";
import VehicleDocumentsTab from "@/components/admin/VehicleDocumentsTab";
import { sampleVehicles } from "@/data/sampleVehicles";

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
          <VehicleOverviewTab
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            applyFilters={applyFilters}
            filteredVehicles={filteredVehicles}
          />
        </TabsContent>
        
        <TabsContent value="technical">
          <VehicleTechnicalTab vehicles={sampleVehicles} />
        </TabsContent>
        
        <TabsContent value="documents">
          <VehicleDocumentsTab vehicles={sampleVehicles} />
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

export default VehicleTracking;
