
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Shield, Clock, ThumbsUp, Users } from "lucide-react";

const About = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">À Propos de DriveSmart</h1>
          <p className="text-xl text-gray-600">
            Votre partenaire de confiance pour la location de véhicules au Maroc depuis 2010.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div>
            <h2 className="text-2xl font-bold mb-4">Notre Mission</h2>
            <p className="text-gray-700 mb-4">
              Chez DriveSmart, notre mission est de fournir des solutions de mobilité fiables et abordables pour tous vos besoins de déplacement au Maroc. Que ce soit pour un voyage d'affaires, des vacances en famille ou une aventure à travers le pays, nous nous engageons à vous offrir une expérience de location sans stress.
            </p>
            <p className="text-gray-700">
              Nous croyons en la transparence, la qualité et le service client exceptionnel. Notre flotte diversifiée de véhicules bien entretenus vous permet de choisir le véhicule parfait pour chaque occasion.
            </p>
          </div>
          <div className="rounded-lg overflow-hidden h-64">
            <img
              src="/car-hero.png"
              alt="Notre équipe DriveSmart"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">Pourquoi Choisir DriveSmart?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-primary/10 p-3 rounded-full mb-4">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Fiabilité</h3>
                  <p className="text-gray-600">
                    Tous nos véhicules sont régulièrement entretenus et contrôlés pour assurer votre sécurité.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-primary/10 p-3 rounded-full mb-4">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Efficacité</h3>
                  <p className="text-gray-600">
                    Processus de réservation rapide et simple, avec prise en charge et retour efficaces.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-primary/10 p-3 rounded-full mb-4">
                    <ThumbsUp className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Qualité</h3>
                  <p className="text-gray-600">
                    Des véhicules de qualité supérieure pour une expérience de conduite exceptionnelle.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-primary/10 p-3 rounded-full mb-4">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Service Client</h3>
                  <p className="text-gray-600">
                    Une équipe dévouée prête à vous aider à tout moment de votre location.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Prêt à Prendre la Route?</h2>
          <p className="text-lg text-gray-700 mb-6">
            Découvrez notre flotte de véhicules et réservez dès aujourd'hui pour votre prochain voyage.
          </p>
          <a 
            href="/vehicles" 
            className="inline-flex items-center text-primary font-medium hover:underline"
          >
            Voir nos véhicules
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </div>
      </div>
    </MainLayout>
  );
};

export default About;
