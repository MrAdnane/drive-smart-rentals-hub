
import { useState } from "react";
import VehicleCard, { VehicleProps } from "./VehicleCard";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface VehicleGridProps {
  vehicles: VehicleProps[];
  title?: string;
  showFilters?: boolean;
}

const VehicleGrid = ({ vehicles, title = "Available Vehicles", showFilters = true }: VehicleGridProps) => {
  const [sortOrder, setSortOrder] = useState<string>("recommended");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  
  // Apply filters and sorting
  const filteredVehicles = vehicles
    .filter(vehicle => categoryFilter === "all" || vehicle.category === categoryFilter)
    .sort((a, b) => {
      switch (sortOrder) {
        case "price-asc":
          return a.pricePerDay - b.pricePerDay;
        case "price-desc":
          return b.pricePerDay - a.pricePerDay;
        case "newest":
          return b.year - a.year;
        default:
          return 0; // Recommended (no specific sort)
      }
    });
  
  // Get unique categories for the filter
  const categories = Array.from(new Set(vehicles.map(v => v.category)));
  
  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h2 className="text-2xl font-bold">{title}</h2>
        
        {showFilters && (
          <div className="flex flex-col sm:flex-row gap-3 mt-3 sm:mt-0 w-full sm:w-auto">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={sortOrder} onValueChange={setSortOrder}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recommended">Recommended</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="newest">Newest First</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
      
      {filteredVehicles.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredVehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} {...vehicle} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-medium mb-2">No vehicles found</h3>
          <p className="text-muted-foreground mb-4">
            Try changing your filters or check back later for new vehicles.
          </p>
          <Button variant="outline" onClick={() => {
            setCategoryFilter("all");
            setSortOrder("recommended");
          }}>
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default VehicleGrid;
