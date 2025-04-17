
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Calendar, Car, FileText, Clock, CreditCard, MapPin } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Sample reservations data
const reservations = [
  {
    id: "r001",
    vehicle: "Toyota Corolla",
    vehicleImage: "/vehicles/corolla.jpg",
    startDate: "20/04/2025",
    endDate: "25/04/2025",
    status: "confirmée",
    totalPrice: 1750,
    location: "Agence Casablanca Centre",
    invoice: "INV-2025-001",
    invoiceGenerated: true
  },
  {
    id: "r002",
    vehicle: "Honda CR-V",
    vehicleImage: "/vehicles/crv.jpg",
    startDate: "15/05/2025",
    endDate: "20/05/2025",
    status: "en attente",
    totalPrice: 2250,
    location: "Agence Casablanca Centre",
    invoice: null,
    invoiceGenerated: false
  },
  {
    id: "r003",
    vehicle: "Mercedes-Benz Classe E",
    vehicleImage: "/vehicles/eclass.jpg",
    startDate: "10/03/2025",
    endDate: "15/03/2025",
    status: "terminée",
    totalPrice: 4000,
    location: "Agence Rabat",
    invoice: "INV-2025-002",
    invoiceGenerated: true
  }
];

// Past reservations
const pastReservations = reservations.filter(res => res.status === "terminée");

// Current and upcoming reservations
const activeReservations = reservations.filter(res => res.status === "confirmée" || res.status === "en attente");

// Function to get status badge class
const getStatusClass = (status: string) => {
  switch (status) {
    case "confirmée":
      return "bg-green-100 text-green-800";
    case "en attente":
      return "bg-amber-100 text-amber-800";
    case "terminée":
      return "bg-blue-100 text-blue-800";
    case "annulée":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const ClientReservations = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Mes Réservations</h1>
        
        <Tabs defaultValue="upcoming" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="upcoming">Réservations actives</TabsTrigger>
            <TabsTrigger value="history">Historique</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming">
            {activeReservations.length > 0 ? (
              <div className="grid grid-cols-1 gap-6">
                {activeReservations.map((reservation) => (
                  <Card key={reservation.id}>
                    <div className="grid grid-cols-1 md:grid-cols-3">
                      <div className="aspect-[4/3] overflow-hidden">
                        <img 
                          src={reservation.vehicleImage || "/car-placeholder.jpg"} 
                          alt={reservation.vehicle} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-6 md:col-span-2">
                        <div className="flex justify-between mb-2">
                          <h2 className="text-xl font-bold">{reservation.vehicle}</h2>
                          <Badge className={getStatusClass(reservation.status)}>
                            {reservation.status}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 mb-4">
                          <div className="flex items-center">
                            <Calendar className="h-5 w-5 mr-2 text-primary" />
                            <div>
                              <p className="text-sm text-muted-foreground">Date de début</p>
                              <p>{reservation.startDate}</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <Calendar className="h-5 w-5 mr-2 text-primary" />
                            <div>
                              <p className="text-sm text-muted-foreground">Date de fin</p>
                              <p>{reservation.endDate}</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-5 w-5 mr-2 text-primary" />
                            <div>
                              <p className="text-sm text-muted-foreground">Lieu de prise en charge</p>
                              <p>{reservation.location}</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <CreditCard className="h-5 w-5 mr-2 text-primary" />
                            <div>
                              <p className="text-sm text-muted-foreground">Prix total</p>
                              <p className="font-semibold">{reservation.totalPrice} MAD</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mt-4">
                          <Button variant="outline">
                            <FileText className="h-4 w-4 mr-2" />
                            Détails
                          </Button>
                          {reservation.status === "en attente" && (
                            <Button>
                              <CreditCard className="h-4 w-4 mr-2" />
                              Payer maintenant
                            </Button>
                          )}
                          {reservation.status === "confirmée" && (
                            <>
                              <Button variant="outline">
                                <Clock className="h-4 w-4 mr-2" />
                                Modifier
                              </Button>
                              <Button variant="outline" className="text-red-600 hover:bg-red-50">
                                Annuler
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Car className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-medium mb-2">Aucune réservation active</h3>
                <p className="text-muted-foreground mb-6">Vous n'avez pas de réservations en cours ou à venir.</p>
                <Button asChild>
                  <a href="/vehicles">Réserver un véhicule</a>
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Historique des Réservations</CardTitle>
              </CardHeader>
              <CardContent>
                {pastReservations.length > 0 ? (
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Référence</TableHead>
                          <TableHead>Véhicule</TableHead>
                          <TableHead>Dates</TableHead>
                          <TableHead>Montant</TableHead>
                          <TableHead>Statut</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {pastReservations.map((reservation) => (
                          <TableRow key={reservation.id}>
                            <TableCell className="font-medium">{reservation.id}</TableCell>
                            <TableCell>{reservation.vehicle}</TableCell>
                            <TableCell>
                              {reservation.startDate} au {reservation.endDate}
                            </TableCell>
                            <TableCell>{reservation.totalPrice} MAD</TableCell>
                            <TableCell>
                              <Badge className={getStatusClass(reservation.status)}>
                                {reservation.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button variant="ghost" size="sm">
                                  <FileText className="h-4 w-4 mr-2" />
                                  Facture
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Car className="h-4 w-4 mr-2" />
                                  Détails
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">Aucune réservation passée.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default ClientReservations;
