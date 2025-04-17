
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Mail, Phone, MessageSquare, Clock, HelpCircle, ShieldCheck } from "lucide-react";

const Support = () => {
  const { toast } = useToast();
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Demande envoyée",
      description: "Notre équipe va traiter votre demande dans les plus brefs délais.",
    });
    setMessage("");
    setEmail("");
    setSubject("");
  };

  return (
    <MainLayout>
      <div className="container mx-auto py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Support Technique</h1>
          <p className="text-muted-foreground">
            Besoin d'aide? Notre équipe est à votre disposition pour répondre à vos questions.
          </p>
        </div>

        <Tabs defaultValue="contact" className="w-full">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-4">
            <TabsTrigger value="contact">Nous contacter</TabsTrigger>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
            <TabsTrigger value="chat">Chat en direct</TabsTrigger>
            <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
          </TabsList>

          <TabsContent value="contact" className="space-y-4 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Mail className="mr-2 h-5 w-5" />
                    Email
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>support@drivesmart.com</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Réponse sous 24h ouvrées
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Phone className="mr-2 h-5 w-5" />
                    Téléphone
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>+212 522 123 456</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Lun-Ven: 9h-18h
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="mr-2 h-5 w-5" />
                    Heures d'ouverture
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Du lundi au vendredi</p>
                  <p>9h00 - 18h00</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Formulaire de contact</CardTitle>
                <CardDescription>
                  Envoyez-nous votre demande et nous vous répondrons dans les plus brefs délais.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit}>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        placeholder="Votre email" 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required 
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="subject">Sujet</Label>
                      <Input 
                        id="subject" 
                        placeholder="Sujet de votre demande" 
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        required 
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="message">Message</Label>
                      <Textarea 
                        id="message" 
                        placeholder="Décrivez votre problème ou votre question" 
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required 
                        className="min-h-[150px]"
                      />
                    </div>
                    <Button type="submit">Envoyer</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="faq" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <HelpCircle className="mr-2 h-5 w-5" />
                  Questions fréquemment posées
                </CardTitle>
                <CardDescription>
                  Retrouvez les réponses aux questions les plus fréquentes.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Comment réserver un véhicule?</AccordionTrigger>
                    <AccordionContent>
                      Pour réserver un véhicule, vous devez d'abord créer un compte ou vous connecter. 
                      Ensuite, utilisez notre moteur de recherche pour trouver un véhicule disponible 
                      aux dates souhaitées. Sélectionnez le véhicule, complétez les informations de 
                      réservation et procédez au paiement.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>Comment puis-je modifier ma réservation?</AccordionTrigger>
                    <AccordionContent>
                      Vous pouvez modifier votre réservation en vous connectant à votre compte, 
                      en accédant à la section "Mes réservations" et en cliquant sur "Modifier" 
                      pour la réservation concernée. Les modifications sont soumises aux conditions 
                      générales et peuvent entraîner des frais supplémentaires.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>Quels documents dois-je fournir pour louer un véhicule?</AccordionTrigger>
                    <AccordionContent>
                      Pour louer un véhicule, vous devez fournir une pièce d'identité valide (carte d'identité ou passeport), 
                      un permis de conduire valide depuis au moins 2 ans, et une carte bancaire à votre nom pour le paiement 
                      et la caution.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-4">
                    <AccordionTrigger>Comment fonctionne le programme de fidélité?</AccordionTrigger>
                    <AccordionContent>
                      Notre programme de fidélité vous permet de cumuler des points à chaque location. 
                      Ces points peuvent être échangés contre des réductions, des surclassements ou des 
                      options gratuites. Vous gagnez 1 point pour chaque 100 MAD dépensés.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-5">
                    <AccordionTrigger>Quelle est la politique d'annulation?</AccordionTrigger>
                    <AccordionContent>
                      Les annulations effectuées plus de 48 heures avant le début de la location 
                      sont intégralement remboursées. Les annulations dans les 48 heures précédant 
                      la location entraînent des frais d'annulation de 30% du montant total. 
                      Les non-présentations ne sont pas remboursées.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="chat" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="mr-2 h-5 w-5" />
                  Chat en direct
                </CardTitle>
                <CardDescription>
                  Discutez en temps réel avec un conseiller.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted p-4 rounded-lg h-[300px] flex flex-col">
                  <div className="flex-1 space-y-4 overflow-auto">
                    <div className="bg-primary/10 p-3 rounded-lg rounded-bl-none max-w-[80%]">
                      <p className="text-sm">Bonjour, comment puis-je vous aider aujourd'hui?</p>
                      <span className="text-xs text-muted-foreground">Support - 10:30</span>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Input 
                      placeholder="Tapez votre message..." 
                      className="flex-1" 
                    />
                    <Button>Envoyer</Button>
                  </div>
                </div>
                <div className="mt-4 text-sm text-muted-foreground">
                  <p>Service disponible du lundi au vendredi, de 9h à 18h.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="maintenance" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ShieldCheck className="mr-2 h-5 w-5" />
                  Contrat de Maintenance
                </CardTitle>
                <CardDescription>
                  Notre contrat de maintenance inclut les services suivants
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="mr-2 mt-0.5 h-5 w-5 text-primary flex-shrink-0">
                      <CheckCircle className="h-5 w-5" />
                    </div>
                    <div>
                      <strong>Corrections de bugs</strong>
                      <p className="text-sm text-muted-foreground">
                        Résolution rapide des problèmes techniques et bugs identifiés.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-0.5 h-5 w-5 text-primary flex-shrink-0">
                      <CheckCircle className="h-5 w-5" />
                    </div>
                    <div>
                      <strong>Sauvegardes régulières</strong>
                      <p className="text-sm text-muted-foreground">
                        Sauvegardes quotidiennes des données avec rétention de 30 jours.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-0.5 h-5 w-5 text-primary flex-shrink-0">
                      <CheckCircle className="h-5 w-5" />
                    </div>
                    <div>
                      <strong>Mises à jour de sécurité</strong>
                      <p className="text-sm text-muted-foreground">
                        Application régulière des correctifs de sécurité et mise à jour des dépendances.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-0.5 h-5 w-5 text-primary flex-shrink-0">
                      <CheckCircle className="h-5 w-5" />
                    </div>
                    <div>
                      <strong>Évolutions fonctionnelles</strong>
                      <p className="text-sm text-muted-foreground">
                        Ajout de nouvelles fonctionnalités selon vos besoins et les évolutions du marché.
                      </p>
                    </div>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Télécharger le contrat de maintenance (PDF)</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Support;
