
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, Fuel, Cog } from "lucide-react";

export interface VehicleProps {
  id: string;
  title: string;
  image: string;
  pricePerDay: number;
  year: number;
  transmission: string;
  fuelType: string;
  category: string;
  seats: number;
  description: string;
}

const VehicleCard = ({
  id,
  title,
  image,
  pricePerDay,
  year,
  transmission,
  fuelType,
  category,
  seats,
  description,
}: VehicleProps) => {
  // Format price in Moroccan Dirham
  const formattedPrice = new Intl.NumberFormat('fr-MA', {
    style: 'currency',
    currency: 'MAD',
    minimumFractionDigits: 0,
  }).format(pricePerDay);

  // Function to get category color
  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "économique":
      case "economique":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case "suv":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      case "luxe":
        return "bg-purple-100 text-purple-800 hover:bg-purple-200";
      case "utilitaire":
        return "bg-orange-100 text-orange-800 hover:bg-orange-200";
      case "électrique":
      case "electrique":
        return "bg-cyan-100 text-cyan-800 hover:bg-cyan-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  return (
    <Card className="h-full flex flex-col overflow-hidden group hover:shadow-lg transition-shadow">
      <CardHeader className="p-0 relative">
        <div className="relative aspect-video overflow-hidden">
          <img
            src={image || "/car-placeholder.jpg"}
            alt={title}
            className="w-full h-full object-cover transition-transform group-hover:scale-105"
          />
          <Badge className={`absolute top-2 right-2 ${getCategoryColor(category)}`}>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-4">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-sm text-gray-500 mb-3">{description}</p>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1 text-gray-500" />
            <span>{year}</span>
          </div>
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-1 text-gray-500" />
            <span>{seats} sièges</span>
          </div>
          <div className="flex items-center">
            <Fuel className="h-4 w-4 mr-1 text-gray-500" />
            <span>{fuelType}</span>
          </div>
          <div className="flex items-center">
            <Cog className="h-4 w-4 mr-1 text-gray-500" />
            <span>{transmission}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="px-4 pb-4 pt-0 flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-500">Prix par jour</p>
          <p className="text-xl font-bold text-primary">{formattedPrice}</p>
        </div>
        <Button size="sm" asChild>
          <Link to={`/vehicles/${id}`}>Réserver</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default VehicleCard;
