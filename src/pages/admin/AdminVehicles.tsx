
import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import VehicleGrid from "@/components/vehicles/VehicleGrid";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

// Sample vehicle data
const sampleVehicles = [
  {
    id: "1",
    title: "Toyota Corolla",
    image: "/vehicles/corolla.jpg",
    pricePerDay: 350,
    year: 2022,
    transmission: "Automatique",
    fuelType: "Essence",
    category: "économique",
    seats: 5,
    description: "Voiture économique parfaite pour les trajets urbains."
  },
  {
    id: "2",
    title: "Honda CR-V",
    image: "/vehicles/crv.jpg",
    pricePerDay: 450,
    year: 2021,
    transmission: "Automatique",
    fuelType: "Essence",
    category: "suv",
    seats: 5,
    description: "SUV spacieux avec une grande capacité de bagages."
  },
  {
    id: "3",
    title: "Mercedes-Benz Classe E",
    image: "/vehicles/eclass.jpg",
    pricePerDay: 800,
    year: 2023,
    transmission: "Automatique",
    fuelType: "Diesel",
    category: "luxe",
    seats: 5,
    description: "Berline de luxe avec intérieur premium et technologie avancée."
  },
  {
    id: "4",
    title: "Tesla Model 3",
    image: "/vehicles/model3.jpg",
    pricePerDay: 700,
    year: 2023,
    transmission: "Automatique",
    fuelType: "Électrique",
    category: "électrique",
    seats: 5,
    description: "Véhicule électrique haute performance avec autonomie étendue."
  }
];

const AdminVehicles = () => {
  const [vehicles] = useState(sampleVehicles);

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gestion des Véhicules</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Ajouter un Véhicule
        </Button>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Flotte de Véhicules</CardTitle>
        </CardHeader>
        <CardContent>
          <VehicleGrid 
            vehicles={vehicles} 
            title="Tous les Véhicules" 
            showFilters={true}
          />
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default AdminVehicles;
