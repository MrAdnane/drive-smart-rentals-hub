
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
              Conduisez Intelligent avec Notre Service de Location Premium
            </h1>
            <p className="text-lg mb-8 text-blue-100">
              Découvrez la liberté de la route avec notre flotte diversifiée de véhicules. 
              De l'économique au luxe, nous avons le véhicule parfait pour vos besoins.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link to="/vehicles">
                  Parcourir les Véhicules
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="bg-white/10 hover:bg-white/20 text-white border-white/30" asChild>
                <Link to="/about">En Savoir Plus</Link>
              </Button>
            </div>
          </div>
          <div className="hidden lg:block">
            <img 
              src="/car-hero.png" 
              alt="Voiture de location premium" 
              className="rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
