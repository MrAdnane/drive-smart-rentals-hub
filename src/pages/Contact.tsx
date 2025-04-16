
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here would be the actual form submission logic
    console.log("Form submitted:", formData);
    setIsSubmitted(true);
    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: ""
    });
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Contactez-nous</h1>
          <p className="text-xl text-gray-600">
            Notre équipe est à votre disposition pour répondre à toutes vos questions.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <Card>
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="bg-primary/10 p-3 rounded-full mb-4">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Téléphone</h3>
              <p className="text-gray-600 mb-2">Appelez-nous directement</p>
              <a href="tel:+212522123456" className="text-primary hover:underline">
                +212 522 123 456
              </a>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="bg-primary/10 p-3 rounded-full mb-4">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Email</h3>
              <p className="text-gray-600 mb-2">Envoyez-nous un message</p>
              <a href="mailto:info@drivesmart.ma" className="text-primary hover:underline">
                info@drivesmart.ma
              </a>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="bg-primary/10 p-3 rounded-full mb-4">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Heures d'ouverture</h3>
              <p className="text-gray-600 mb-1">Lun-Ven: 8h00 - 19h00</p>
              <p className="text-gray-600">Sam-Dim: 9h00 - 17h00</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div>
            <h2 className="text-2xl font-bold mb-6">Envoyez-nous un message</h2>
            
            {isSubmitted ? (
              <div className="bg-green-50 border border-green-200 text-green-800 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold mb-2">Message envoyé!</h3>
                <p>Merci de nous avoir contactés. Notre équipe vous répondra dans les plus brefs délais.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">
                    Nom complet
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border rounded-md p-2"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border rounded-md p-2"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-1">
                    Sujet
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full border rounded-md p-2"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full border rounded-md p-2"
                    required
                  />
                </div>
                
                <Button type="submit" className="w-full">
                  Envoyer le message
                </Button>
              </form>
            )}
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-6">Notre Emplacement</h2>
            <div className="bg-gray-100 rounded-lg overflow-hidden mb-4" style={{ height: "300px" }}>
              <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
                <MapPin className="h-8 w-8 mr-2" />
                <span>Carte interactive ici</span>
              </div>
            </div>
            <div className="flex items-start">
              <MapPin className="h-5 w-5 text-primary mt-1 mr-2 flex-shrink-0" />
              <p className="text-gray-700">
                123 Rue de Location, Quartier des Affaires, Casablanca, Maroc, 20000
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Questions Fréquentes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Quels documents sont nécessaires pour louer un véhicule?</h3>
              <p className="text-gray-700">
                Pour louer un véhicule, vous aurez besoin d'un permis de conduire valide, d'une carte d'identité ou passeport, et d'une carte de crédit au nom du conducteur principal.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Quelle est votre politique d'annulation?</h3>
              <p className="text-gray-700">
                Les annulations effectuées 24 heures avant la date de prise en charge sont gratuites. Des frais peuvent s'appliquer pour les annulations tardives.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">L'assurance est-elle incluse dans le prix?</h3>
              <p className="text-gray-700">
                Oui, une assurance de base est incluse dans tous nos tarifs. Des options d'assurance supplémentaires sont disponibles pour une tranquillité d'esprit totale.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Puis-je modifier ma réservation?</h3>
              <p className="text-gray-700">
                Oui, vous pouvez modifier votre réservation jusqu'à 24 heures avant la date de prise en charge, sous réserve de disponibilité.
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Contact;
