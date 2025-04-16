
import MainLayout from "@/components/layout/MainLayout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const FAQ = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Foire Aux Questions</h1>
          <p className="text-xl text-gray-600">
            Tout ce que vous devez savoir sur la location de véhicules avec DriveSmart
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto mb-12">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Quels documents sont nécessaires pour louer un véhicule?</AccordionTrigger>
              <AccordionContent>
                Pour louer un véhicule chez DriveSmart, vous devez présenter:
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Un permis de conduire valide (depuis au moins 1 an)</li>
                  <li>Une pièce d'identité (carte nationale ou passeport)</li>
                  <li>Une carte de crédit au nom du conducteur principal</li>
                  <li>Pour les étrangers: passeport et permis de conduire international</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2">
              <AccordionTrigger>Quelle est la politique de carburant?</AccordionTrigger>
              <AccordionContent>
                Tous nos véhicules sont fournis avec un réservoir plein et doivent être retournés avec un réservoir plein. 
                Si le véhicule est retourné avec moins de carburant qu'au départ, des frais de remplissage 
                s'appliqueront au tarif du marché plus des frais de service.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3">
              <AccordionTrigger>Y a-t-il une limite de kilométrage?</AccordionTrigger>
              <AccordionContent>
                La plupart de nos offres de location incluent le kilométrage illimité. Cependant, 
                certains véhicules de catégories spéciales (comme les véhicules de luxe) peuvent 
                avoir des restrictions de kilométrage. Ces limitations seront clairement indiquées 
                lors du processus de réservation.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-4">
              <AccordionTrigger>Quelle est votre politique d'annulation?</AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Annulation 48h ou plus avant la prise en charge: remboursement complet</li>
                  <li>Annulation entre 24h et 48h: remboursement de 75% du montant total</li>
                  <li>Annulation moins de 24h avant la prise en charge: remboursement de 50%</li>
                  <li>Non-présentation: aucun remboursement</li>
                </ul>
                <p className="mt-2">
                  Pour les réservations à tarif spécial ou promotionnel, des conditions d'annulation 
                  différentes peuvent s'appliquer.
                </p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-5">
              <AccordionTrigger>L'assurance est-elle incluse dans le prix?</AccordionTrigger>
              <AccordionContent>
                Oui, tous nos tarifs incluent une assurance de base qui couvre:
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Responsabilité civile</li>
                  <li>Protection contre le vol (avec franchise)</li>
                  <li>Protection contre les dommages en cas de collision (avec franchise)</li>
                </ul>
                <p className="mt-2">
                  Des options d'assurance supplémentaires sont disponibles pour réduire ou éliminer 
                  la franchise et étendre la couverture.
                </p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-6">
              <AccordionTrigger>Peut-on louer un véhicule pour un aller simple?</AccordionTrigger>
              <AccordionContent>
                Oui, nous proposons des locations en aller simple entre nos différentes agences 
                au Maroc. Des frais supplémentaires peuvent s'appliquer en fonction de la distance 
                entre les agences. Ces frais seront indiqués lors de votre réservation.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-7">
              <AccordionTrigger>Quel âge minimum faut-il avoir pour louer un véhicule?</AccordionTrigger>
              <AccordionContent>
                L'âge minimum pour louer un véhicule chez DriveSmart est de 21 ans, avec 
                un permis de conduire obtenu depuis au moins 1 an. Pour certaines catégories 
                de véhicules (luxe, SUV de grande taille), l'âge minimum peut être de 25 ans. 
                Des frais supplémentaires peuvent s'appliquer pour les conducteurs âgés de 
                moins de 25 ans.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-8">
              <AccordionTrigger>Puis-je ajouter un conducteur supplémentaire?</AccordionTrigger>
              <AccordionContent>
                Oui, vous pouvez ajouter des conducteurs supplémentaires à votre contrat de 
                location. Chaque conducteur supplémentaire doit répondre aux mêmes critères 
                que le conducteur principal et être présent lors de la prise en charge du 
                véhicule avec tous les documents nécessaires. Des frais s'appliquent pour 
                chaque conducteur supplémentaire.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        
        <div className="max-w-3xl mx-auto bg-gray-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Vous avez d'autres questions?</h2>
          <p className="text-lg text-gray-700 mb-6">
            Notre équipe du service client est disponible pour répondre à toutes vos questions.
          </p>
          <Button asChild>
            <Link to="/contact">
              Contactez-nous
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default FAQ;
