
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Car, Users, Fuel, Settings, Check } from "lucide-react";

export interface VehicleProps {
  id: string;
  make: string;
  model: string;
  year: number;
  type: string;
  category: string;
  transmission: 'automatic' | 'manual';
  fuel: string;
  seats: number;
  pricePerDay: number;
  image: string;
  available: boolean;
}

const VehicleCard = ({
  id,
  make,
  model,
  year,
  type,
  category,
  transmission,
  fuel,
  seats,
  pricePerDay,
  image,
  available
}: VehicleProps) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="relative">
        {!available && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
            <Badge variant="destructive" className="text-lg py-1 px-3">Currently Unavailable</Badge>
          </div>
        )}
        
        <Badge className="absolute top-2 right-2 z-10 capitalize">{category}</Badge>
        
        <img 
          src={image || "/car-placeholder.jpg"} 
          alt={`${make} ${model}`}
          className="w-full h-48 object-cover"
        />
      </div>
      
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-bold">
              {make} {model}
            </h3>
            <p className="text-sm text-muted-foreground">{year} • {type}</p>
          </div>
          <div className="text-right">
            <span className="text-lg font-bold text-primary">${pricePerDay}</span>
            <p className="text-xs text-muted-foreground">per day</p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>{seats} Seats</span>
          </div>
          <div className="flex items-center">
            <Settings className="h-4 w-4 mr-2 text-muted-foreground" />
            <span className="capitalize">{transmission}</span>
          </div>
          <div className="flex items-center">
            <Fuel className="h-4 w-4 mr-2 text-muted-foreground" />
            <span className="capitalize">{fuel}</span>
          </div>
          <div className="flex items-center">
            <Car className="h-4 w-4 mr-2 text-muted-foreground" />
            <span className="capitalize">{type}</span>
          </div>
        </div>
        
        <div className="mt-4 flex flex-col space-y-1">
          <div className="flex items-center">
            <Check className="h-4 w-4 mr-2 text-green-500" />
            <span className="text-sm">Free cancellation</span>
          </div>
          <div className="flex items-center">
            <Check className="h-4 w-4 mr-2 text-green-500" />
            <span className="text-sm">Unlimited mileage</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter>
        <Button className="w-full" asChild disabled={!available}>
          <Link to={`/vehicles/${id}`}>
            {available ? "View Details" : "Not Available"}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default VehicleCard;
