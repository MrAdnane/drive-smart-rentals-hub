
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { User, CreditCard, FileText, Lock, Upload, Shield } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Sample user data
const userData = {
  id: "u123",
  name: "Mohammed Alami",
  email: "mohammed.alami@gmail.com",
  phone: "+212 6 12 34 56 78",
  address: "123 Avenue Hassan II, Casablanca",
  birthDate: "15/05/1985",
  createdAt: "10/01/2025",
  loyaltyPoints: 350,
  documentsVerified: true,
  paymentMethods: [
    {
      id: "pm1",
      type: "card",
      last4: "4242",
      expiry: "04/28",
      brand: "Visa"
    }
  ]
};

const ClientProfile = () => {
  const { toast } = useToast();
  const [editMode, setEditMode] = useState(false);
  const [profileData, setProfileData] = useState({
    name: userData.name,
    email: userData.email,
    phone: userData.phone,
    address: userData.address
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would send the updated data to the server
    
    toast({
      title: "Profil mis à jour",
      description: "Vos informations personnelles ont été mises à jour avec succès.",
      duration: 3000
    });
    
    setEditMode(false);
  };
  
  const handlePasswordReset = () => {
    // In a real application, this would trigger a password reset flow
    
    toast({
      title: "Email envoyé",
      description: "Un email de réinitialisation de mot de passe a été envoyé à votre adresse email.",
      duration: 3000
    });
  };
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Mon Profil</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* User Summary Card */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <User className="h-12 w-12 text-primary" />
                </div>
                <h2 className="text-xl font-bold">{userData.name}</h2>
                <p className="text-muted-foreground">{userData.email}</p>
                
                <div className="w-full mt-6">
                  <div className="flex items-center justify-between py-2 border-b">
                    <span className="text-muted-foreground">Client depuis</span>
                    <span>{userData.createdAt}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b">
                    <span className="text-muted-foreground">Points fidélité</span>
                    <span className="font-medium">{userData.loyaltyPoints}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b">
                    <span className="text-muted-foreground">Documents</span>
                    {userData.documentsVerified ? (
                      <Badge className="bg-green-100 text-green-800">Vérifiés</Badge>
                    ) : (
                      <Badge variant="outline">En attente</Badge>
                    )}
                  </div>
                </div>
                
                <Button variant="outline" className="mt-6 w-full">
                  <Upload className="h-4 w-4 mr-2" />
                  Gérer mes documents
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Main Content */}
          <div className="md:col-span-2">
            <Tabs defaultValue="personal">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="personal">Infos personnelles</TabsTrigger>
                <TabsTrigger value="payment">Moyens de paiement</TabsTrigger>
                <TabsTrigger value="security">Sécurité</TabsTrigger>
              </TabsList>
              
              <TabsContent value="personal">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>Informations Personnelles</CardTitle>
                        <CardDescription>Gérez vos informations de contact et personnelles</CardDescription>
                      </div>
                      {!editMode && (
                        <Button variant="outline" onClick={() => setEditMode(true)}>
                          Modifier
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSaveProfile}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Nom complet</Label>
                          <Input 
                            id="name" 
                            name="name"
                            value={profileData.name}
                            onChange={handleChange}
                            disabled={!editMode}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input 
                            id="email" 
                            name="email"
                            type="email"
                            value={profileData.email}
                            onChange={handleChange}
                            disabled={!editMode}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Téléphone</Label>
                          <Input 
                            id="phone" 
                            name="phone"
                            value={profileData.phone}
                            onChange={handleChange}
                            disabled={!editMode}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="birthDate">Date de naissance</Label>
                          <Input 
                            id="birthDate" 
                            value={userData.birthDate}
                            disabled
                          />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="address">Adresse</Label>
                          <Input 
                            id="address" 
                            name="address"
                            value={profileData.address}
                            onChange={handleChange}
                            disabled={!editMode}
                          />
                        </div>
                      </div>
                      
                      {editMode && (
                        <div className="flex justify-end space-x-2 mt-6">
                          <Button 
                            type="button" 
                            variant="outline" 
                            onClick={() => {
                              setEditMode(false);
                              setProfileData({
                                name: userData.name,
                                email: userData.email,
                                phone: userData.phone,
                                address: userData.address
                              });
                            }}
                          >
                            Annuler
                          </Button>
                          <Button type="submit">Enregistrer</Button>
                        </div>
                      )}
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="payment">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>Moyens de Paiement</CardTitle>
                        <CardDescription>Gérez vos cartes et méthodes de paiement</CardDescription>
                      </div>
                      <Button>
                        <CreditCard className="h-4 w-4 mr-2" />
                        Ajouter
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {userData.paymentMethods.length > 0 ? (
                      <div className="space-y-4">
                        {userData.paymentMethods.map((method) => (
                          <div key={method.id} className="flex justify-between items-center p-4 border rounded-md">
                            <div className="flex items-center">
                              <CreditCard className="h-8 w-8 mr-4 text-primary" />
                              <div>
                                <p className="font-medium">
                                  {method.brand} •••• {method.last4}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  Expire le {method.expiry}
                                </p>
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <Button variant="ghost" size="sm">Modifier</Button>
                              <Button variant="ghost" size="sm">Supprimer</Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <CreditCard className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-lg font-medium mb-2">Aucun moyen de paiement</h3>
                        <p className="text-muted-foreground mb-4">
                          Vous n'avez pas encore ajouté de moyen de paiement à votre compte.
                        </p>
                        <Button>
                          <CreditCard className="h-4 w-4 mr-2" />
                          Ajouter une carte
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="security">
                <Card>
                  <CardHeader>
                    <CardTitle>Sécurité du Compte</CardTitle>
                    <CardDescription>Gérez les paramètres de sécurité de votre compte</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium mb-2">Mot de passe</h3>
                        <p className="text-muted-foreground mb-4">
                          Changez votre mot de passe pour sécuriser votre compte.
                        </p>
                        <Button onClick={handlePasswordReset}>
                          <Lock className="h-4 w-4 mr-2" />
                          Réinitialiser le mot de passe
                        </Button>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <h3 className="text-lg font-medium mb-2">Documents d'identité</h3>
                        <p className="text-muted-foreground mb-2">
                          Documents nécessaires pour la location de véhicules.
                        </p>
                        <div className="flex items-center justify-between p-3 border rounded-md mb-2">
                          <div className="flex items-center">
                            <FileText className="h-5 w-5 mr-3 text-primary" />
                            <span>Permis de conduire</span>
                          </div>
                          <Badge className="bg-green-100 text-green-800">Vérifié</Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 border rounded-md">
                          <div className="flex items-center">
                            <FileText className="h-5 w-5 mr-3 text-primary" />
                            <span>Carte d'identité</span>
                          </div>
                          <Badge className="bg-green-100 text-green-800">Vérifié</Badge>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <h3 className="text-lg font-medium mb-2">Confidentialité des données</h3>
                        <p className="text-muted-foreground mb-4">
                          Gérez la manière dont vos données sont utilisées.
                        </p>
                        <Button variant="outline">
                          <Shield className="h-4 w-4 mr-2" />
                          Paramètres de confidentialité
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ClientProfile;
