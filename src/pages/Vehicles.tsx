
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import VehicleGrid from "@/components/vehicles/VehicleGrid";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { 
  Filter, 
  Search,
  Car,
  Fuel,
  Users,
  Settings,
  Sparkles
} from "lucide-react";
import { VehicleProps } from "@/components/vehicles/VehicleCard";

// Mock data for vehicles
const allVehicles: VehicleProps[] = [
  {
    id: "v1",
    make: "Toyota",
    model: "Corolla",
    year: 2023,
    type: "Sedan",
    category: "economy",
    transmission: "automatic",
    fuel: "gasoline",
    seats: 5,
    pricePerDay: 49.99,
    image: "/vehicles/corolla.jpg",
    available: true
  },
  {
    id: "v2",
    make: "Honda",
    model: "CR-V",
    year: 2023,
    type: "SUV",
    category: "suv",
    transmission: "automatic",
    fuel: "hybrid",
    seats: 5,
    pricePerDay: 69.99,
    image: "/vehicles/crv.jpg",
    available: true
  },
  {
    id: "v3",
    make: "Mercedes-Benz",
    model: "E-Class",
    year: 2022,
    type: "Sedan",
    category: "luxury",
    transmission: "automatic",
    fuel: "gasoline",
    seats: 5,
    pricePerDay: 129.99,
    image: "/vehicles/eclass.jpg",
    available: true
  },
  {
    id: "v4",
    make: "Ford",
    model: "Transit",
    year: 2022,
    type: "Van",
    category: "utility",
    transmission: "manual",
    fuel: "diesel",
    seats: 3,
    pricePerDay: 89.99,
    image: "/vehicles/transit.jpg",
    available: true
  },
  {
    id: "v5",
    make: "Tesla",
    model: "Model 3",
    year: 2023,
    type: "Sedan",
    category: "electric",
    transmission: "automatic",
    fuel: "electric",
    seats: 5,
    pricePerDay: 109.99,
    image: "/vehicles/model3.jpg",
    available: true
  },
  {
    id: "v6",
    make: "BMW",
    model: "X5",
    year: 2023,
    type: "SUV",
    category: "luxury",
    transmission: "automatic",
    fuel: "gasoline",
    seats: 7,
    pricePerDay: 139.99,
    image: "/vehicles/x5.jpg",
    available: true
  },
  {
    id: "v7",
    make: "Hyundai",
    model: "Tucson",
    year: 2022,
    type: "SUV",
    category: "suv",
    transmission: "automatic",
    fuel: "hybrid",
    seats: 5,
    pricePerDay: 79.99,
    image: "/vehicles/tucson.jpg",
    available: true
  },
  {
    id: "v8",
    make: "Toyota",
    model: "Sienna",
    year: 2023,
    type: "Minivan",
    category: "utility",
    transmission: "automatic",
    fuel: "hybrid",
    seats: 8,
    pricePerDay: 99.99,
    image: "/vehicles/sienna.jpg",
    available: false
  }
];

const Vehicles = () => {
  const [searchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get("category");
  const [vehicles, setVehicles] = useState<VehicleProps[]>(allVehicles);
  const [filteredVehicles, setFilteredVehicles] = useState<VehicleProps[]>(allVehicles);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    category: categoryFromUrl || "",
    transmission: {
      automatic: false,
      manual: false
    },
    fuel: {
      gasoline: false,
      diesel: false,
      hybrid: false,
      electric: false
    },
    features: {
      available: false
    }
  });
  
  // Apply filters when they change
  useEffect(() => {
    let result = vehicles;
    
    // Search term filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(vehicle => 
        vehicle.make.toLowerCase().includes(term) || 
        vehicle.model.toLowerCase().includes(term) ||
        vehicle.type.toLowerCase().includes(term) ||
        vehicle.category.toLowerCase().includes(term)
      );
    }
    
    // Category filter
    if (filters.category) {
      result = result.filter(vehicle => vehicle.category === filters.category);
    }
    
    // Transmission filter
    const selectedTransmissions = Object.entries(filters.transmission)
      .filter(([_, selected]) => selected)
      .map(([type]) => type);
    
    if (selectedTransmissions.length > 0) {
      result = result.filter(vehicle => selectedTransmissions.includes(vehicle.transmission));
    }
    
    // Fuel filter
    const selectedFuels = Object.entries(filters.fuel)
      .filter(([_, selected]) => selected)
      .map(([type]) => type);
    
    if (selectedFuels.length > 0) {
      result = result.filter(vehicle => selectedFuels.includes(vehicle.fuel));
    }
    
    // Available only filter
    if (filters.features.available) {
      result = result.filter(vehicle => vehicle.available);
    }
    
    // Price range filter
    result = result.filter(
      vehicle => vehicle.pricePerDay >= priceRange[0] && vehicle.pricePerDay <= priceRange[1]
    );
    
    setFilteredVehicles(result);
  }, [vehicles, searchTerm, filters, priceRange]);
  
  // Handle initial category filter from URL
  useEffect(() => {
    if (categoryFromUrl) {
      setFilters(prev => ({
        ...prev,
        category: categoryFromUrl
      }));
    }
  }, [categoryFromUrl]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // The actual filtering is handled by the useEffect
  };
  
  const handleCategoryChange = (category: string) => {
    setFilters(prev => ({
      ...prev,
      category: prev.category === category ? "" : category
    }));
  };
  
  const handleResetFilters = () => {
    setSearchTerm("");
    setPriceRange([0, 200]);
    setFilters({
      category: "",
      transmission: {
        automatic: false,
        manual: false
      },
      fuel: {
        gasoline: false,
        diesel: false,
        hybrid: false,
        electric: false
      },
      features: {
        available: false
      }
    });
  };
  
  return (
    <MainLayout>
      {/* Header */}
      <div className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Our Fleet</h1>
          <p className="text-xl max-w-3xl">
            Explore our extensive range of well-maintained vehicles to find the perfect match for your journey.
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters - Desktop */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-lg">Filters</h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleResetFilters}
                  className="text-sm h-8"
                >
                  Reset
                </Button>
              </div>
              
              <div className="space-y-6">
                {/* Search */}
                <div>
                  <Label htmlFor="search">Search</Label>
                  <div className="relative mt-1">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="search"
                      placeholder="Search vehicles..."
                      className="pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                
                {/* Price Range */}
                <div>
                  <div className="flex justify-between mb-2">
                    <Label htmlFor="price-range">Price Range</Label>
                    <span className="text-sm text-muted-foreground">
                      ${priceRange[0]} - ${priceRange[1]}
                    </span>
                  </div>
                  <Slider
                    id="price-range"
                    defaultValue={[0, 200]}
                    max={200}
                    step={10}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="mt-2"
                  />
                </div>
                
                {/* Categories */}
                <div>
                  <Label className="mb-2 block">Category</Label>
                  <div className="grid grid-cols-1 gap-2">
                    <Button 
                      variant={filters.category === "economy" ? "default" : "outline"} 
                      size="sm"
                      className="justify-start"
                      onClick={() => handleCategoryChange("economy")}
                    >
                      <Car className="mr-2 h-4 w-4" />
                      Economy
                    </Button>
                    <Button 
                      variant={filters.category === "suv" ? "default" : "outline"} 
                      size="sm"
                      className="justify-start"
                      onClick={() => handleCategoryChange("suv")}
                    >
                      <Car className="mr-2 h-4 w-4" />
                      SUV
                    </Button>
                    <Button 
                      variant={filters.category === "luxury" ? "default" : "outline"} 
                      size="sm"
                      className="justify-start"
                      onClick={() => handleCategoryChange("luxury")}
                    >
                      <Sparkles className="mr-2 h-4 w-4" />
                      Luxury
                    </Button>
                    <Button 
                      variant={filters.category === "utility" ? "default" : "outline"} 
                      size="sm"
                      className="justify-start"
                      onClick={() => handleCategoryChange("utility")}
                    >
                      <Car className="mr-2 h-4 w-4" />
                      Utility
                    </Button>
                    <Button 
                      variant={filters.category === "electric" ? "default" : "outline"} 
                      size="sm"
                      className="justify-start"
                      onClick={() => handleCategoryChange("electric")}
                    >
                      <Car className="mr-2 h-4 w-4" />
                      Electric
                    </Button>
                  </div>
                </div>
                
                {/* Transmission */}
                <div>
                  <Label className="mb-2 block">Transmission</Label>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Checkbox 
                        id="transmission-auto" 
                        checked={filters.transmission.automatic}
                        onCheckedChange={(checked) => 
                          setFilters(prev => ({
                            ...prev,
                            transmission: {
                              ...prev.transmission,
                              automatic: checked === true
                            }
                          }))
                        }
                      />
                      <label
                        htmlFor="transmission-auto"
                        className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Automatic
                      </label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox 
                        id="transmission-manual" 
                        checked={filters.transmission.manual}
                        onCheckedChange={(checked) => 
                          setFilters(prev => ({
                            ...prev,
                            transmission: {
                              ...prev.transmission,
                              manual: checked === true
                            }
                          }))
                        }
                      />
                      <label
                        htmlFor="transmission-manual"
                        className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Manual
                      </label>
                    </div>
                  </div>
                </div>
                
                {/* Fuel Type */}
                <div>
                  <Label className="mb-2 block">Fuel Type</Label>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Checkbox 
                        id="fuel-gasoline" 
                        checked={filters.fuel.gasoline}
                        onCheckedChange={(checked) => 
                          setFilters(prev => ({
                            ...prev,
                            fuel: {
                              ...prev.fuel,
                              gasoline: checked === true
                            }
                          }))
                        }
                      />
                      <label
                        htmlFor="fuel-gasoline"
                        className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Gasoline
                      </label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox 
                        id="fuel-diesel" 
                        checked={filters.fuel.diesel}
                        onCheckedChange={(checked) => 
                          setFilters(prev => ({
                            ...prev,
                            fuel: {
                              ...prev.fuel,
                              diesel: checked === true
                            }
                          }))
                        }
                      />
                      <label
                        htmlFor="fuel-diesel"
                        className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Diesel
                      </label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox 
                        id="fuel-hybrid" 
                        checked={filters.fuel.hybrid}
                        onCheckedChange={(checked) => 
                          setFilters(prev => ({
                            ...prev,
                            fuel: {
                              ...prev.fuel,
                              hybrid: checked === true
                            }
                          }))
                        }
                      />
                      <label
                        htmlFor="fuel-hybrid"
                        className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Hybrid
                      </label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox 
                        id="fuel-electric" 
                        checked={filters.fuel.electric}
                        onCheckedChange={(checked) => 
                          setFilters(prev => ({
                            ...prev,
                            fuel: {
                              ...prev.fuel,
                              electric: checked === true
                            }
                          }))
                        }
                      />
                      <label
                        htmlFor="fuel-electric"
                        className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Electric
                      </label>
                    </div>
                  </div>
                </div>
                
                {/* Features */}
                <div>
                  <Label className="mb-2 block">Features</Label>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Checkbox 
                        id="available-only" 
                        checked={filters.features.available}
                        onCheckedChange={(checked) => 
                          setFilters(prev => ({
                            ...prev,
                            features: {
                              ...prev.features,
                              available: checked === true
                            }
                          }))
                        }
                      />
                      <label
                        htmlFor="available-only"
                        className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Available Now
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Mobile Filters Toggle */}
          <div className="md:hidden mb-4">
            <Button 
              onClick={() => setIsFilterOpen(!isFilterOpen)} 
              variant="outline"
              className="w-full"
            >
              <Filter className="mr-2 h-4 w-4" />
              {isFilterOpen ? "Hide Filters" : "Show Filters"}
            </Button>
            
            {/* Mobile Filters Panel */}
            {isFilterOpen && (
              <div className="bg-white p-6 rounded-lg shadow-sm mt-2">
                {/* Filter content here - similar to desktop but optimized for mobile */}
                {/* ... */}
              </div>
            )}
          </div>
          
          {/* Vehicle Grid */}
          <div className="flex-1">
            <VehicleGrid 
              vehicles={filteredVehicles} 
              title={`${filteredVehicles.length} Vehicles Available`} 
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Vehicles;
