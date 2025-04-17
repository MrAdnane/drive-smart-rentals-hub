
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { CalendarIcon, Check, CreditCard, Info, MapPin, Shield } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const ReservationPage = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<string>("card");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Réservation confirmée",
      description: "Votre réservation a été effectuée avec succès. Un email de confirmation vous a été envoyé.",
      variant: "default",
    });
    // Redirection vers la page de confirmation
  };

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
    window.scrollTo(0, 0);
  };

  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
    window.scrollTo(0, 0);
  };

  const vehicles = [
    {
      id: "v1",
      name: "Toyota Corolla",
      image: "/vehicles/corolla.jpg",
      category: "Économique",
      transmission: "Automatique",
      fuel: "Essence",
      seats: 5,
      pricePerDay: 350
    },
    {
      id: "v2",
      name: "Honda CR-V",
      image: "/vehicles/crv.jpg",
      category: "SUV",
      transmission: "Automatique",
      fuel: "Essence",
      seats: 5,
      pricePerDay: 450
    },
    {
      id: "v3",
      name: "Mercedes-Benz Classe E",
      image: "/vehicles/eclass.jpg",
      category: "Luxe",
      transmission: "Automatique",
      fuel: "Diesel",
      seats: 5,
      pricePerDay: 800
    }
  ];

  const selectedVehicleData = vehicles.find(v => v.id === selectedVehicle);

  return (
    <MainLayout>
      <div className="container mx-auto py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Réservation de véhicule</h1>
          <p className="text-muted-foreground">
            Réservez votre véhicule en quelques étapes simples
          </p>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className={cn(
                "flex items-center justify-center w-10 h-10 rounded-full mr-4",
                currentStep >= 1 ? "bg-primary text-white" : "bg-muted text-muted-foreground"
              )}>
                1
              </div>
              <span className={cn(
                "font-medium",
                currentStep >= 1 ? "text-primary" : "text-muted-foreground"
              )}>Dates</span>
            </div>
            <Separator className="w-12 sm:w-24" />
            <div className="flex items-center">
              <div className={cn(
                "flex items-center justify-center w-10 h-10 rounded-full mr-4",
                currentStep >= 2 ? "bg-primary text-white" : "bg-muted text-muted-foreground"
              )}>
                2
              </div>
              <span className={cn(
                "font-medium",
                currentStep >= 2 ? "text-primary" : "text-muted-foreground"
              )}>Véhicule</span>
            </div>
            <Separator className="w-12 sm:w-24" />
            <div className="flex items-center">
              <div className={cn(
                "flex items-center justify-center w-10 h-10 rounded-full mr-4",
                currentStep >= 3 ? "bg-primary text-white" : "bg-muted text-muted-foreground"
              )}>
                3
              </div>
              <span className={cn(
                "font-medium",
                currentStep >= 3 ? "text-primary" : "text-muted-foreground"
              )}>Paiement</span>
            </div>
          </div>
        </div>

        {currentStep === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Sélectionnez vos dates de location</CardTitle>
              <CardDescription>
                Choisissez les dates de prise en charge et de retour du véhicule
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="pickup-location">Lieu de prise en charge</Label>
                    <div className="flex">
                      <Input
                        id="pickup-location"
                        placeholder="Ville ou agence"
                        className="rounded-r-none"
                      />
                      <Button variant="outline" className="rounded-l-none">
                        <MapPin className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Date de prise en charge</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !startDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {startDate ? (
                            format(startDate, "PPP", { locale: fr })
                          ) : (
                            <span>Sélectionner une date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={startDate}
                          onSelect={setStartDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="pickup-time">Heure</Label>
                      <select
                        id="pickup-time"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2"
                      >
                        {Array.from({ length: 24 }).map((_, i) => (
                          <option key={i} value={`${i}:00`}>
                            {i.toString().padStart(2, "0")}:00
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pickup-minute">Minute</Label>
                      <select
                        id="pickup-minute"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2"
                      >
                        <option value="00">00</option>
                        <option value="15">15</option>
                        <option value="30">30</option>
                        <option value="45">45</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="return-location">Lieu de retour</Label>
                    <div className="flex">
                      <Input
                        id="return-location"
                        placeholder="Même que la prise en charge"
                        className="rounded-r-none"
                      />
                      <Button variant="outline" className="rounded-l-none">
                        <MapPin className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Date de retour</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !endDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {endDate ? (
                            format(endDate, "PPP", { locale: fr })
                          ) : (
                            <span>Sélectionner une date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={endDate}
                          onSelect={setEndDate}
                          initialFocus
                          disabled={(date) =>
                            (startDate ? date < startDate : false) ||
                            date < new Date()
                          }
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="return-time">Heure</Label>
                      <select
                        id="return-time"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2"
                      >
                        {Array.from({ length: 24 }).map((_, i) => (
                          <option key={i} value={`${i}:00`}>
                            {i.toString().padStart(2, "0")}:00
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="return-minute">Minute</Label>
                      <select
                        id="return-minute"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2"
                      >
                        <option value="00">00</option>
                        <option value="15">15</option>
                        <option value="30">30</option>
                        <option value="45">45</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertTitle>Information</AlertTitle>
                  <AlertDescription>
                    Les horaires d'ouverture des agences sont de 8h à 19h, du lundi au samedi.
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleNextStep} disabled={!startDate || !endDate}>
                Continuer
              </Button>
            </CardFooter>
          </Card>
        )}

        {currentStep === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>Sélectionnez votre véhicule</CardTitle>
              <CardDescription>
                Choisissez parmi les véhicules disponibles aux dates sélectionnées
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {vehicles.map((vehicle) => (
                  <div
                    key={vehicle.id}
                    className={cn(
                      "border rounded-lg p-4 transition-all",
                      selectedVehicle === vehicle.id
                        ? "border-primary bg-primary/5"
                        : "hover:border-primary/50"
                    )}
                    onClick={() => setSelectedVehicle(vehicle.id)}
                  >
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="md:w-1/3">
                        <img
                          src={vehicle.image}
                          alt={vehicle.name}
                          className="w-full h-48 object-cover rounded-md"
                        />
                      </div>
                      <div className="md:w-2/3 space-y-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-semibold">{vehicle.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {vehicle.category}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="text-xl font-bold">
                              {vehicle.pricePerDay} MAD
                              <span className="text-sm font-normal text-muted-foreground">
                                /jour
                              </span>
                            </div>
                            {selectedVehicle === vehicle.id && (
                              <div className="flex items-center text-primary">
                                <Check className="h-4 w-4 mr-1" />
                                <span className="text-sm">Sélectionné</span>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="flex items-center gap-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="text-muted-foreground"
                            >
                              <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
                              <circle cx="7" cy="17" r="2" />
                              <path d="M9 17h6" />
                              <circle cx="17" cy="17" r="2" />
                            </svg>
                            <span>{vehicle.transmission}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="text-muted-foreground"
                            >
                              <path d="M20 16V8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2Z" />
                              <path d="M6 8h12" />
                              <path d="M14 8v8" />
                              <path d="M6 12h3" />
                              <path d="M11 12h3" />
                            </svg>
                            <span>{vehicle.fuel}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="text-muted-foreground"
                            >
                              <path d="M16 17a4 4 0 1 0 0-8" />
                              <path d="M12 17V9" />
                              <path d="M8 13h8" />
                            </svg>
                            <span>Climatisation</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="text-muted-foreground"
                            >
                              <path d="M16 5h6a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-6" />
                              <path d="M12 9V5H1v14h11v-4" />
                              <path d="M15 9h7" />
                              <path d="M15 17h7" />
                              <path d="M8 5v14" />
                              <path d="M1 9h11" />
                              <path d="M1 17h11" />
                            </svg>
                            <span>{vehicle.seats} places</span>
                          </div>
                        </div>

                        <div className="flex justify-end">
                          <Button
                            onClick={() => setSelectedVehicle(vehicle.id)}
                            variant={
                              selectedVehicle === vehicle.id
                                ? "default"
                                : "outline"
                            }
                          >
                            {selectedVehicle === vehicle.id
                              ? "Sélectionné"
                              : "Sélectionner"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handlePrevStep}>
                Retour
              </Button>
              <Button onClick={handleNextStep} disabled={!selectedVehicle}>
                Continuer
              </Button>
            </CardFooter>
          </Card>
        )}

        {currentStep === 3 && selectedVehicleData && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Paiement</CardTitle>
                  <CardDescription>
                    Choisissez votre méthode de paiement
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit}>
                    <Tabs
                      defaultValue="card"
                      className="w-full"
                      onValueChange={(value) => setPaymentMethod(value)}
                    >
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="card">Carte bancaire</TabsTrigger>
                        <TabsTrigger value="paypal">PayPal</TabsTrigger>
                        <TabsTrigger value="deposit">Acompte</TabsTrigger>
                      </TabsList>
                      <TabsContent value="card" className="space-y-4 pt-4">
                        <div className="space-y-2">
                          <Label htmlFor="card-number">Numéro de carte</Label>
                          <Input
                            id="card-number"
                            placeholder="1234 5678 9012 3456"
                            required
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="expiry">Date d'expiration</Label>
                            <Input
                              id="expiry"
                              placeholder="MM/AA"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cvc">CVC</Label>
                            <Input 
                              id="cvc" 
                              placeholder="123" 
                              required 
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="name">Nom sur la carte</Label>
                          <Input
                            id="name"
                            placeholder="JEAN DUPONT"
                            required
                          />
                        </div>
                      </TabsContent>
                      <TabsContent value="paypal" className="pt-4">
                        <div className="flex justify-center items-center py-8">
                          <Button className="w-full max-w-md">
                            <svg
                              className="mr-2 h-4 w-4"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M9.5 15.5c-1.5 0-2.7-.3-3.5-.7-1-.5-1.5-1.2-1.8-2-.6-1.5-.2-3.3.3-4.5.9-2.5 3-4 5.7-4h4.2c.3 0 .5.1.8.1.3-.7.8-1.3 1.5-1.7.5-.3 1-.5 1.6-.6h.2-.9c-1.6 0-3 .9-3.7 2.2-1.3-.4-2.6-.4-3.1-.4H6.3c-3.5 0-6.3 2.3-7.3 5.9-.4 1.2-.6 2.4-.3 3.7.2 1.3.8 2.4 1.8 3.4-1.6.9-1.5 2.7-1.5 2.8 0 .2.2.3.3.3h3.4c.2 0 .3-.1.3-.3 0-.7-.4-1.8 1.3-1.8h.3c.9 0 1.8-.1 2.7-.2-.5-.4-.7-1-.7-1.7.1-.9.8-1.7 1.9-2.1z"
                                fill="#0070e0"
                              />
                              <path
                                d="M22.6 9.5c-.8-1-2-1.7-3.2-1.7h-5c-.5 0-.9.4-.9.9v7.4c0 .5.4.9.9.9h2.7c.6 0 1.2-.1 1.8-.2.6-.2 1.1-.4 1.6-.7 1-.7 1.7-1.7 1.9-2.8.4-1.3.3-2.6-.8-3.8zm-6.6 4.9c0 .3-.3.6-.6.6h-.4c-.3 0-.6-.3-.6-.6v-.4c0-.3.3-.6.6-.6h.4c.3 0 .6.3.6.6v.4zm5.5-4.2c-.2.6-.5 1.1-1 1.5-.5.4-1 .7-1.7.9-.6.2-1.2.3-1.9.3h-.4c-.3 0-.6-.3-.6-.6v-.4c0-.3.3-.6.6-.6h.4c.5 0 1-.1 1.5-.2.4-.1.8-.3 1.1-.6.3-.3.5-.6.6-1 .1-.3.1-.7 0-1-.2-.7-.9-1.2-1.6-1.2h-5c-.3 0-.6-.3-.6-.6v-.4c0-.3.3-.6.6-.6h5c1.3 0 2.5.9 2.9 2.2.2.7.2 1.5-.1 2.2l.2.1z"
                                fill="#0070e0"
                              />
                            </svg>
                            Payer avec PayPal
                          </Button>
                        </div>
                        <p className="text-sm text-center text-muted-foreground">
                          Vous serez redirigé vers PayPal pour effectuer votre paiement
                        </p>
                      </TabsContent>
                      <TabsContent value="deposit" className="space-y-4 pt-4">
                        <div className="bg-muted p-4 rounded-lg">
                          <p className="font-medium">Paiement en acompte</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            Payez uniquement 30% maintenant et le reste lors de
                            la prise en charge du véhicule.
                          </p>
                        </div>
                        <div className="space-y-4">
                          <div className="flex justify-between">
                            <span>Montant total</span>
                            <span className="font-medium">
                              {selectedVehicleData.pricePerDay * 
                                (endDate && startDate
                                  ? Math.max(
                                      1,
                                      Math.ceil(
                                        (endDate.getTime() -
                                          startDate.getTime()) /
                                          (1000 * 60 * 60 * 24)
                                      )
                                    )
                                  : 1)}{" "}
                              MAD
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Acompte (30%)</span>
                            <span className="font-medium">
                              {Math.round(
                                selectedVehicleData.pricePerDay *
                                  (endDate && startDate
                                    ? Math.max(
                                        1,
                                        Math.ceil(
                                          (endDate.getTime() -
                                            startDate.getTime()) /
                                            (1000 * 60 * 60 * 24)
                                        )
                                      )
                                    : 1) *
                                  0.3
                              )}{" "}
                              MAD
                            </span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="card-number-deposit">Numéro de carte</Label>
                          <Input
                            id="card-number-deposit"
                            placeholder="1234 5678 9012 3456"
                            required
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="expiry-deposit">Date d'expiration</Label>
                            <Input
                              id="expiry-deposit"
                              placeholder="MM/AA"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cvc-deposit">CVC</Label>
                            <Input 
                              id="cvc-deposit" 
                              placeholder="123" 
                              required 
                            />
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>

                    <div className="mt-6">
                      <Alert className="bg-primary/5 border-primary/20">
                        <Shield className="h-4 w-4 text-primary" />
                        <AlertTitle>Paiement sécurisé</AlertTitle>
                        <AlertDescription className="text-sm">
                          Toutes vos informations de paiement sont chiffrées et sécurisées.
                        </AlertDescription>
                      </Alert>
                    </div>

                    <div className="mt-6 space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="terms"
                            className="h-4 w-4 rounded border-gray-300"
                            required
                          />
                          <label htmlFor="terms" className="text-sm">
                            J'accepte les{" "}
                            <a href="#" className="text-primary">
                              conditions générales
                            </a>{" "}
                            et la{" "}
                            <a href="#" className="text-primary">
                              politique de confidentialité
                            </a>
                          </label>
                        </div>
                      </div>

                      <div className="flex justify-between">
                        <Button variant="outline" onClick={handlePrevStep}>
                          Retour
                        </Button>
                        <Button type="submit">
                          <CreditCard className="mr-2 h-4 w-4" />
                          {paymentMethod === "deposit"
                            ? "Payer l'acompte"
                            : "Payer maintenant"}
                        </Button>
                      </div>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Récapitulatif</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-medium">Véhicule</h3>
                    <div className="flex items-center space-x-3">
                      <img
                        src={selectedVehicleData.image}
                        alt={selectedVehicleData.name}
                        className="w-20 h-14 object-cover rounded"
                      />
                      <div>
                        <p className="font-medium">{selectedVehicleData.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {selectedVehicleData.category}
                        </p>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <h3 className="font-medium">Dates de location</h3>
                    <div className="text-sm">
                      <div className="flex justify-between">
                        <span>Prise en charge</span>
                        <span>
                          {startDate
                            ? format(startDate, "dd MMMM yyyy", { locale: fr })
                            : "Non définie"}
                        </span>
                      </div>
                      <div className="flex justify-between mt-1">
                        <span>Retour</span>
                        <span>
                          {endDate
                            ? format(endDate, "dd MMMM yyyy", { locale: fr })
                            : "Non définie"}
                        </span>
                      </div>
                      <div className="flex justify-between mt-1">
                        <span>Durée</span>
                        <span>
                          {endDate && startDate
                            ? `${Math.max(
                                1,
                                Math.ceil(
                                  (endDate.getTime() - startDate.getTime()) /
                                    (1000 * 60 * 60 * 24)
                                )
                              )} jours`
                            : "Non définie"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <h3 className="font-medium">Tarifs</h3>
                    <div className="text-sm">
                      <div className="flex justify-between">
                        <span>
                          {selectedVehicleData.pricePerDay} MAD x{" "}
                          {endDate && startDate
                            ? Math.max(
                                1,
                                Math.ceil(
                                  (endDate.getTime() - startDate.getTime()) /
                                    (1000 * 60 * 60 * 24)
                                )
                              )
                            : 1}{" "}
                          jours
                        </span>
                        <span>
                          {selectedVehicleData.pricePerDay *
                            (endDate && startDate
                              ? Math.max(
                                  1,
                                  Math.ceil(
                                    (endDate.getTime() - startDate.getTime()) /
                                      (1000 * 60 * 60 * 24)
                                  )
                                )
                              : 1)}{" "}
                          MAD
                        </span>
                      </div>
                      <div className="flex justify-between mt-1">
                        <span>Assurance tous risques</span>
                        <span>Incluse</span>
                      </div>
                      <div className="flex justify-between mt-1">
                        <span>Frais de service</span>
                        <span>150 MAD</span>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>
                      {selectedVehicleData.pricePerDay *
                        (endDate && startDate
                          ? Math.max(
                              1,
                              Math.ceil(
                                (endDate.getTime() - startDate.getTime()) /
                                  (1000 * 60 * 60 * 24)
                              )
                            )
                          : 1) +
                        150}{" "}
                      MAD
                    </span>
                  </div>

                  {paymentMethod === "deposit" && (
                    <>
                      <div className="flex justify-between text-primary font-medium">
                        <span>Acompte à payer maintenant (30%)</span>
                        <span>
                          {Math.round(
                            (selectedVehicleData.pricePerDay *
                              (endDate && startDate
                                ? Math.max(
                                    1,
                                    Math.ceil(
                                      (endDate.getTime() -
                                        startDate.getTime()) /
                                        (1000 * 60 * 60 * 24)
                                    )
                                  )
                                : 1) +
                              150) *
                              0.3
                          )}{" "}
                          MAD
                        </span>
                      </div>
                      <div className="flex justify-between text-muted-foreground">
                        <span>Reste à payer à la prise en charge</span>
                        <span>
                          {Math.round(
                            (selectedVehicleData.pricePerDay *
                              (endDate && startDate
                                ? Math.max(
                                    1,
                                    Math.ceil(
                                      (endDate.getTime() -
                                        startDate.getTime()) /
                                        (1000 * 60 * 60 * 24)
                                    )
                                  )
                                : 1) +
                              150) *
                              0.7
                          )}{" "}
                          MAD
                        </span>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default ReservationPage;
