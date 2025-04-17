
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { SaveIcon, LockIcon, BellIcon, ShieldIcon, DatabaseIcon, GlobeIcon } from "lucide-react";

const AdminSettings = () => {
  const { user } = useAuth();

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Paramètres</h1>
        <Button>
          <SaveIcon className="mr-2 h-4 w-4" /> Sauvegarder les modifications
        </Button>
      </div>

      <Tabs defaultValue="profile" className="mb-6">
        <TabsList className="mb-4">
          <TabsTrigger value="profile">Profil</TabsTrigger>
          <TabsTrigger value="security">Sécurité</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="system">Système</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Informations du Profil</CardTitle>
              <CardDescription>
                Gérez vos informations personnelles et vos préférences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col gap-6">
                <div className="flex items-center space-x-4">
                  <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center text-white text-xl">
                    {user?.name?.[0] || 'A'}
                  </div>
                  <div>
                    <h3 className="font-medium">{user?.name || 'Administrateur'}</h3>
                    <p className="text-sm text-muted-foreground">{user?.email || 'admin@example.com'}</p>
                  </div>
                  <Button variant="outline" size="sm" className="ml-auto">
                    Changer l'image
                  </Button>
                </div>
                <Separator />
                <div className="grid gap-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nom</Label>
                      <Input id="name" defaultValue={user?.name || 'Administrateur'} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue={user?.email || 'admin@example.com'} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">Biographie</Label>
                    <Input id="bio" defaultValue="Administrateur du système de gestion de flotte automobile." />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Sécurité</CardTitle>
              <CardDescription>
                Gérez les paramètres de sécurité de votre compte
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-medium">Mot de passe</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Mot de passe actuel</Label>
                      <Input id="currentPassword" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">Nouveau mot de passe</Label>
                      <Input id="newPassword" type="password" />
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="mt-2">
                    <LockIcon className="mr-2 h-4 w-4" />
                    Changer le mot de passe
                  </Button>
                </div>
                <Separator />
                <div className="space-y-2">
                  <h3 className="font-medium">Authentification à deux facteurs</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Protégez votre compte avec la 2FA</p>
                    </div>
                    <Switch />
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <h3 className="font-medium">Sessions actives</h3>
                  <div className="rounded-md border p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Navigateur Chrome</p>
                        <p className="text-sm text-muted-foreground">Casablanca, Maroc • Actif maintenant</p>
                      </div>
                      <Button variant="outline" size="sm">Déconnecter</Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>
                Configurez vos préférences de notifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h3 className="font-medium">Alertes par email</h3>
                    <p className="text-sm text-muted-foreground">Recevoir des notifications par email</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h3 className="font-medium">Nouvelles réservations</h3>
                    <p className="text-sm text-muted-foreground">Recevoir une notification pour chaque nouvelle réservation</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h3 className="font-medium">Alertes de maintenance</h3>
                    <p className="text-sm text-muted-foreground">Notifications pour les maintenances à venir</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h3 className="font-medium">Résumé quotidien</h3>
                    <p className="text-sm text-muted-foreground">Recevoir un résumé quotidien des activités</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres Système</CardTitle>
              <CardDescription>
                Configurez les paramètres généraux du système
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Nom de l'entreprise</Label>
                    <Input id="companyName" defaultValue="DriveSmart" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Fuseau horaire</Label>
                    <Input id="timezone" defaultValue="Africa/Casablanca" />
                  </div>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h3 className="font-medium">Sauvegarde automatique</h3>
                    <p className="text-sm text-muted-foreground">Sauvegarder automatiquement les données du système</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="space-y-2">
                  <h3 className="font-medium">Gestion de la base de données</h3>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <DatabaseIcon className="mr-2 h-4 w-4" />
                      Exporter les données
                    </Button>
                    <Button variant="outline" size="sm">
                      <DatabaseIcon className="mr-2 h-4 w-4" />
                      Importer des données
                    </Button>
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <h3 className="font-medium">Langue du système</h3>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" className="bg-primary text-white">
                      <GlobeIcon className="mr-2 h-4 w-4" />
                      Français
                    </Button>
                    <Button variant="outline" size="sm">
                      <GlobeIcon className="mr-2 h-4 w-4" />
                      English
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

export default AdminSettings;
