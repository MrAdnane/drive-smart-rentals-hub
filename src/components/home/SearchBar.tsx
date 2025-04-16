
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarIcon, MapPin, Search } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const SearchBar = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const [pickupDate, setPickupDate] = useState<Date>();
  const [returnDate, setReturnDate] = useState<Date>();
  const [vehicleType, setVehicleType] = useState("");
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    const params = new URLSearchParams();
    if (location) params.append("location", location);
    if (pickupDate) params.append("pickup", pickupDate.toISOString());
    if (returnDate) params.append("return", returnDate.toISOString());
    if (vehicleType) params.append("type", vehicleType);
    
    navigate(`/vehicles?${params.toString()}`);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 -mt-10 relative z-20 max-w-5xl mx-auto">
      <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="space-y-2">
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">
            Location
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              id="location"
              placeholder="City or branch"
              className="pl-9"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="pickup-date" className="block text-sm font-medium text-gray-700">
            Pickup Date
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="pickup-date"
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !pickupDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {pickupDate ? format(pickupDate, "PPP") : <span>Select date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={pickupDate}
                onSelect={setPickupDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="return-date" className="block text-sm font-medium text-gray-700">
            Return Date
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="return-date"
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !returnDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {returnDate ? format(returnDate, "PPP") : <span>Select date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={returnDate}
                onSelect={setReturnDate}
                initialFocus
                disabled={(date) => 
                  (pickupDate ? date < pickupDate : false) || date < new Date()
                }
              />
            </PopoverContent>
          </Popover>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="vehicle-type" className="block text-sm font-medium text-gray-700">
            Vehicle Type
          </label>
          <Select value={vehicleType} onValueChange={setVehicleType}>
            <SelectTrigger id="vehicle-type">
              <SelectValue placeholder="All vehicles" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All vehicles</SelectItem>
              <SelectItem value="economy">Economy</SelectItem>
              <SelectItem value="suv">SUV</SelectItem>
              <SelectItem value="luxury">Luxury</SelectItem>
              <SelectItem value="utility">Utility</SelectItem>
              <SelectItem value="electric">Electric</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="md:col-span-4 mt-4">
          <Button type="submit" className="w-full" size="lg">
            <Search className="mr-2 h-4 w-4" />
            Search Vehicles
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
