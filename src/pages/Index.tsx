
import MainLayout from "@/components/layout/MainLayout";
import Hero from "@/components/home/Hero";
import SearchBar from "@/components/home/SearchBar";
import VehicleGrid from "@/components/vehicles/VehicleGrid";
import { Button } from "@/components/ui/button";
import { 
  ShieldCheck, 
  ThumbsUp, 
  HeartHandshake, 
  Car,
  Truck,
  Wrench,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";

// Mock data for featured vehicles
const featuredVehicles = [
  {
    id: "v1",
    make: "Toyota",
    model: "Corolla",
    year: 2023,
    type: "Sedan",
    category: "economy",
    transmission: "automatic" as const,
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
    transmission: "automatic" as const,
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
    year: 2023,
    type: "Sedan",
    category: "luxury",
    transmission: "automatic" as const,
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
    transmission: "manual" as const,
    fuel: "diesel",
    seats: 3,
    pricePerDay: 89.99,
    image: "/vehicles/transit.jpg",
    available: false
  }
];

const Index = () => {
  return (
    <MainLayout>
      {/* Hero Section */}
      <Hero />
      
      {/* Search Bar */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SearchBar />
      </div>
      
      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose DriveSmart?</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              We offer a premium rental experience with a diverse fleet of well-maintained vehicles, 
              transparent pricing, and exceptional customer service.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow">
              <div className="h-12 w-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Assured</h3>
              <p className="text-muted-foreground">
                All vehicles undergo rigorous inspections and maintenance to ensure safety and reliability.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow">
              <div className="h-12 w-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <ThumbsUp className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Flexible Options</h3>
              <p className="text-muted-foreground">
                Choose from a wide range of vehicles to fit your budget and requirements.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow">
              <div className="h-12 w-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <HeartHandshake className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Exceptional Service</h3>
              <p className="text-muted-foreground">
                Our dedicated team ensures a smooth rental experience from booking to return.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Vehicles */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <VehicleGrid vehicles={featuredVehicles} title="Featured Vehicles" />
          
          <div className="mt-8 text-center">
            <Button asChild>
              <Link to="/vehicles">
                Browse All Vehicles
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Vehicle Categories */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Explore Our Fleet</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              From economical options to luxury vehicles, we have the perfect car for every journey.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link to="/vehicles?category=economy" className="group">
              <div className="bg-white p-6 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow group-hover:border-primary border-2 border-transparent">
                <div className="h-16 w-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                  <Car className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">Economy</h3>
                <p className="text-muted-foreground">
                  Fuel-efficient and budget-friendly options for everyday travel.
                </p>
              </div>
            </Link>
            
            <Link to="/vehicles?category=suv" className="group">
              <div className="bg-white p-6 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow group-hover:border-primary border-2 border-transparent">
                <div className="h-16 w-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                  <Car className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">SUVs</h3>
                <p className="text-muted-foreground">
                  Spacious and versatile vehicles perfect for families and adventure.
                </p>
              </div>
            </Link>
            
            <Link to="/vehicles?category=luxury" className="group">
              <div className="bg-white p-6 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow group-hover:border-primary border-2 border-transparent">
                <div className="h-16 w-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                  <Car className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">Luxury</h3>
                <p className="text-muted-foreground">
                  Premium vehicles offering comfort, style, and exceptional performance.
                </p>
              </div>
            </Link>
            
            <Link to="/vehicles?category=utility" className="group">
              <div className="bg-white p-6 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow group-hover:border-primary border-2 border-transparent">
                <div className="h-16 w-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                  <Truck className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">Utility</h3>
                <p className="text-muted-foreground">
                  Vans and trucks for moving, deliveries, or commercial needs.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Hit the Road?</h2>
            <p className="text-xl mb-8">
              Experience the freedom of the open road with our premium rental service.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/vehicles">Browse Vehicles</Link>
              </Button>
              <Button size="lg" className="bg-white text-primary hover:bg-white/90" asChild>
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
