
import { useParams } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Users, Fuel, Cog, ShieldCheck, Map, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

// Sample vehicle data - in a real app, this would come from an API
const sampleVehicles = [
  {
    id: "1",
    title: "Toyota Corolla",
    make: "Toyota",
    model: "Corolla",
    image: "/vehicles/corolla.jpg",
    pricePerDay: 350,
    year: 2022,
    transmission: "Automatique",
    fuelType: "Essence",
    category: "économique",
    seats: 5,
    description: "Voiture économique parfaite pour les trajets urbains.",
    available: true
  },
  {
    id: "2",
    title: "Honda CR-V",
    make: "Honda",
    model: "CR-V",
    image: "/vehicles/crv.jpg",
    pricePerDay: 450,
    year: 2021,
    transmission: "Automatique",
    fuelType: "Essence",
    category: "suv",
    seats: 5,
    description: "SUV spacieux avec une grande capacité de bagages.",
    available: true
  },
  {
    id: "3",
    title: "Mercedes-Benz Classe E",
    make: "Mercedes-Benz",
    model: "Classe E",
    image: "/vehicles/eclass.jpg",
    pricePerDay: 800,
    year: 2023,
    transmission: "Automatique",
    fuelType: "Diesel",
    category: "luxe",
    seats: 5,
    description: "Berline de luxe avec intérieur premium et technologie avancée.",
    available: true
  },
  {
    id: "4",
    title: "Tesla Model 3",
    make: "Tesla",
    model: "Model 3",
    image: "/vehicles/model3.jpg",
    pricePerDay: 700,
    year: 2023,
    transmission: "Automatique",
    fuelType: "Électrique",
    category: "électrique",
    seats: 5,
    description: "Véhicule électrique haute performance avec autonomie étendue.",
    available: true
  }
];

const VehicleDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  
  // Find the vehicle by ID from our sample data
  const vehicle = sampleVehicles.find(v => v.id === id);
  
  if (!vehicle) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Véhicule non trouvé</h1>
            <p className="mb-6">Le véhicule que vous recherchez n'existe pas ou a été retiré.</p>
            <Button asChild>
              <Link to="/vehicles">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Retour aux véhicules
              </Link>
            </Button>
          </div>
        </div>
      </MainLayout>
    );
  }

  // Format price in Moroccan Dirham
  const formattedPrice = new Intl.NumberFormat('fr-MA', {
    style: 'currency',
    currency: 'MAD',
    minimumFractionDigits: 0,
  }).format(vehicle.pricePerDay);

  const handleReservation = (e: React.FormEvent) => {
    e.preventDefault();
    // Here would go the reservation logic
    alert(`Réservation effectuée pour ${vehicle.title} du ${startDate} au ${endDate}`);
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <Link to="/vehicles" className="flex items-center text-primary mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour aux véhicules
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Vehicle details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="aspect-video overflow-hidden">
                <img 
                  src={vehicle.image || "/car-placeholder.jpg"} 
                  alt={vehicle.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="p-6">
                <h1 className="text-3xl font-bold mb-2">{vehicle.title}</h1>
                <p className="text-gray-600 mb-6">{vehicle.description}</p>
                
                <h2 className="text-xl font-semibold mb-4">Caractéristiques</h2>
                <div className="grid grid-cols-2 gap-y-4 mb-6">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-primary" />
                    <span>Année: {vehicle.year}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-5 w-5 mr-2 text-primary" />
                    <span>{vehicle.seats} sièges</span>
                  </div>
                  <div className="flex items-center">
                    <Fuel className="h-5 w-5 mr-2 text-primary" />
                    <span>Carburant: {vehicle.fuelType}</span>
                  </div>
                  <div className="flex items-center">
                    <Cog className="h-5 w-5 mr-2 text-primary" />
                    <span>Transmission: {vehicle.transmission}</span>
                  </div>
                </div>
                
                <div className="border-t pt-6">
                  <h2 className="text-xl font-semibold mb-4">Services inclus</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex items-center">
                      <ShieldCheck className="h-5 w-5 mr-2 text-primary" />
                      <span>Assurance complète</span>
                    </div>
                    <div className="flex items-center">
                      <Map className="h-5 w-5 mr-2 text-primary" />
                      <span>Kilométrage illimité</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Reservation form */}
          <div>
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Réserver ce véhicule</h2>
                <div className="mb-4">
                  <p className="text-sm text-gray-500">Prix par jour</p>
                  <p className="text-3xl font-bold text-primary">{formattedPrice}</p>
                </div>
                
                <form onSubmit={handleReservation} className="space-y-4">
                  <div>
                    <label htmlFor="pickupDate" className="block text-sm font-medium mb-1">
                      Date de prise en charge
                    </label>
                    <input
                      type="date"
                      id="pickupDate"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full border rounded-md p-2"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="returnDate" className="block text-sm font-medium mb-1">
                      Date de retour
                    </label>
                    <input
                      type="date"
                      id="returnDate"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full border rounded-md p-2"
                      required
                    />
                  </div>
                  
                  <Button type="submit" className="w-full">
                    Réserver maintenant
                  </Button>
                </form>
                
                <div className="mt-4 text-sm text-gray-500">
                  <p>Annulation gratuite jusqu'à 24h avant la prise en charge</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default VehicleDetail;
