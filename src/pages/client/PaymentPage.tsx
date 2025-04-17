
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { CreditCard, Calendar, Lock, CheckCircle, Car, Clock, FileText, Building } from "lucide-react";

// Sample reservation data (would come from a reservation context or API in a real app)
const reservationData = {
  id: "RES-12345",
  vehicle: {
    name: "Honda CR-V",
    image: "/vehicles/crv.jpg",
    category: "SUV",
    transmission: "Automatique"
  },
  dates: {
    pickup: "15/05/2025",
    return: "20/05/2025",
    duration: 5
  },
  location: {
    pickup: "Agence Casablanca Centre",
    return: "Agence Casablanca Centre"
  },
  pricing: {
    dailyRate: 450,
    duration: 5,
    subtotal: 2250,
    insurance: 300,
    total: 2550
  }
};

const PaymentPage = () => {
  const { toast } = useToast();
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardDetails, setCardDetails] = useState({
    number: "",
    name: "",
    expiry: "",
    cvc: ""
  });
  const [saveCard, setSaveCard] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardDetails((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // In a real application, this would process the payment with Stripe, etc.
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Paiement effectué",
        description: "Votre réservation a été confirmée avec succès!",
        duration: 5000
      });
      
      // In a real app, redirect to confirmation page
    }, 2000);
  };
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Paiement</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Payment Methods Section */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Choisissez un mode de paiement</CardTitle>
                <CardDescription>Toutes les transactions sont sécurisées et chiffrées</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="card" onValueChange={setPaymentMethod}>
                  <TabsList className="grid w-full grid-cols-3 mb-6">
                    <TabsTrigger value="card">Carte bancaire</TabsTrigger>
                    <TabsTrigger value="paypal">PayPal</TabsTrigger>
                    <TabsTrigger value="transfer">Virement</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="card">
                    <form onSubmit={handleSubmit}>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="card-number">Numéro de carte</Label>
                          <div className="relative">
                            <Input 
                              id="card-number" 
                              name="number"
                              placeholder="1234 5678 9012 3456"
                              value={cardDetails.number}
                              onChange={handleCardChange}
                              required
                            />
                            <CreditCard className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="card-name">Nom sur la carte</Label>
                          <Input 
                            id="card-name" 
                            name="name"
                            placeholder="J. SMITH"
                            value={cardDetails.name}
                            onChange={handleCardChange}
                            required
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="card-expiry">Date d'expiration</Label>
                            <div className="relative">
                              <Input 
                                id="card-expiry" 
                                name="expiry"
                                placeholder="MM/AA"
                                value={cardDetails.expiry}
                                onChange={handleCardChange}
                                required
                              />
                              <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="card-cvc">CVC</Label>
                            <div className="relative">
                              <Input 
                                id="card-cvc" 
                                name="cvc"
                                placeholder="123"
                                value={cardDetails.cvc}
                                onChange={handleCardChange}
                                required
                              />
                              <Lock className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="save-card"
                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                            checked={saveCard}
                            onChange={() => setSaveCard(!saveCard)}
                          />
                          <Label htmlFor="save-card" className="text-sm">
                            Enregistrer cette carte pour mes futurs paiements
                          </Label>
                        </div>
                        
                        <div className="pt-4">
                          <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? (
                              <>
                                <span className="animate-spin mr-2">
                                  <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                  </svg>
                                </span>
                                Traitement en cours...
                              </>
                            ) : (
                              <>
                                <Lock className="h-4 w-4 mr-2" />
                                Payer {reservationData.pricing.total} MAD
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    </form>
                    
                    <div className="flex items-center justify-center space-x-4 mt-6 pt-6 border-t">
                      <Lock className="h-5 w-5 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        Paiement sécurisé par SSL. Vos données de carte sont chiffrées.
                      </p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="paypal">
                    <div className="text-center py-8">
                      <div className="bg-blue-50 p-8 rounded-md mb-6">
                        <img src="https://www.paypalobjects.com/digitalassets/c/website/marketing/apac/C2/logos-buttons/optimize/Logo_Space_min.png" 
                          alt="PayPal" 
                          className="h-10 mx-auto mb-4" 
                        />
                        <p className="text-sm text-muted-foreground mb-4">
                          Vous allez être redirigé vers PayPal pour effectuer votre paiement sécurisé.
                        </p>
                      </div>
                      <Button className="w-full" disabled={loading}>
                        <Lock className="h-4 w-4 mr-2" />
                        Continuer avec PayPal
                      </Button>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="transfer">
                    <div className="space-y-4">
                      <div className="bg-blue-50 p-4 rounded-md">
                        <h3 className="font-medium flex items-center mb-2">
                          <Building className="h-5 w-5 mr-2 text-primary" />
                          Informations bancaires
                        </h3>
                        <div className="space-y-2 text-sm">
                          <p><span className="font-medium">Bénéficiaire:</span> DriveSmart SARL</p>
                          <p><span className="font-medium">Banque:</span> Banque Populaire</p>
                          <p><span className="font-medium">IBAN:</span> MA01 2345 6789 1234 5678 9012 345</p>
                          <p><span className="font-medium">BIC/SWIFT:</span> BCPOMAMC</p>
                          <p><span className="font-medium">Référence:</span> {reservationData.id}</p>
                        </div>
                      </div>
                      
                      <div className="p-4 border rounded-md">
                        <h3 className="font-medium flex items-center mb-2">
                          <Clock className="h-5 w-5 mr-2 text-primary" />
                          Instructions
                        </h3>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          <li>Effectuez le virement dans un délai de 48 heures</li>
                          <li>Incluez la référence de réservation dans le libellé du virement</li>
                          <li>Envoyez une confirmation du virement à <span className="text-primary">reservations@drivesmart.ma</span></li>
                          <li>Votre réservation sera confirmée dès réception du paiement</li>
                        </ul>
                      </div>
                      
                      <Button className="w-full" onClick={() => {
                        toast({
                          title: "Instructions envoyées",
                          description: "Les instructions de paiement ont été envoyées à votre adresse email.",
                          duration: 3000
                        });
                      }}>
                        <FileText className="h-4 w-4 mr-2" />
                        Envoyer les instructions par email
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
          
          {/* Order Summary */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Résumé de la réservation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="h-20 w-20 rounded-md overflow-hidden flex-shrink-0">
                      <img 
                        src={reservationData.vehicle.image} 
                        alt={reservationData.vehicle.name} 
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium">{reservationData.vehicle.name}</h3>
                      <div className="flex space-x-2 mt-1">
                        <Badge variant="outline">{reservationData.vehicle.category}</Badge>
                        <Badge variant="outline">{reservationData.vehicle.transmission}</Badge>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <div className="flex items-start">
                      <Calendar className="h-5 w-5 mr-2 text-primary flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium">Dates</p>
                        <p className="text-sm">
                          Du {reservationData.dates.pickup} au {reservationData.dates.return}
                          <span className="text-muted-foreground ml-1">
                            ({reservationData.dates.duration} jours)
                          </span>
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Car className="h-5 w-5 mr-2 text-primary flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium">Lieu de prise en charge</p>
                        <p className="text-sm">{reservationData.location.pickup}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Car className="h-5 w-5 mr-2 text-primary flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium">Lieu de retour</p>
                        <p className="text-sm">{reservationData.location.return}</p>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Tarif journalier × {reservationData.dates.duration} jours
                      </span>
                      <span>{reservationData.pricing.subtotal} MAD</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Assurance</span>
                      <span>{reservationData.pricing.insurance} MAD</span>
                    </div>
                    
                    <Separator className="my-2" />
                    
                    <div className="flex justify-between font-medium">
                      <span>Total</span>
                      <span>{reservationData.pricing.total} MAD</span>
                    </div>
                  </div>
                  
                  <div className="rounded-md bg-green-50 p-3 flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0" />
                    <div className="text-sm text-green-800">
                      <p className="font-medium">Annulation gratuite</p>
                      <p>Jusqu'à 48h avant la prise en charge</p>
                    </div>
                  </div>
                  
                  <div className="text-xs text-muted-foreground">
                    <p>En effectuant ce paiement, vous acceptez nos conditions générales de location.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default PaymentPage;
