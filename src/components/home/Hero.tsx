
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative bg-gradient-to-r from-blue-900 to-blue-700 overflow-hidden">
      <div className="absolute inset-0 bg-[url('/hero-bg.jpg')] opacity-20 bg-cover bg-center"></div>
      <div className="container mx-auto px-4 py-16 sm:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="text-white">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
              Drive Smart with Our Premium Car Rental Service
            </h1>
            <p className="text-lg mb-8 text-blue-100">
              Experience the freedom of the open road with our diverse fleet of vehicles. 
              From economy to luxury, we have the perfect car for your needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link to="/vehicles">
                  Browse Vehicles
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="bg-white/10 hover:bg-white/20 text-white border-white/30" asChild>
                <Link to="/about">Learn More</Link>
              </Button>
            </div>
          </div>
          <div className="hidden lg:block">
            <img 
              src="/car-hero.png" 
              alt="Premium rental car" 
              className="rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
