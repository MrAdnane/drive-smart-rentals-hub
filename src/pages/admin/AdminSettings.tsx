
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Save, Globe, Bell, Shield, Users, Mail, Smartphone } from "lucide-react";

const AdminSettings = () => {
  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Paramètres</h1>
        <Button>
          <Save className="mr-2 h-4 w-4" /> Enregistrer les Modifications
        </Button>
      </div>

      <Tabs defaultValue="general" className="mb-6">
        <TabsList className="grid grid-cols-5 w-full max-w-3xl">
          <TabsTrigger value="general" className="flex items-center">
            <Globe className="mr-2 h-4 w-4" /> Général
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center">
            <Bell className="mr-2 h-4 w-4" /> Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center">
            <Shield className="mr-2 h-4 w-4" /> Sécurité
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center">
            <Users className="mr-2 h-4 w-4" /> Utilisateurs
          </TabsTrigger>
          <TabsTrigger value="billing" className="flex items-center">
            <Mail className="mr-2 h-4 w-4" /> Facturation
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres Généraux</CardTitle>
              <CardDescription>
                Configurez les paramètres généraux de l'application
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="company-name">Nom de l'Entreprise</Label>
                <Input id="company-name" defaultValue="DriveSmart" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contact-email">Email de Contact</Label>
                <Input id="contact-email" type="email" defaultValue="contact@drivesmart.ma" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contact-phone">Téléphone de Contact</Label>
                <Input id="contact-phone" defaultValue="+212 5 22 33 44 55" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="address">Adresse</Label>
                <Textarea id="address" defaultValue="123 Avenue Mohammed V, Casablanca, Maroc" />
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <Label htmlFor="language">Langue par Défaut</Label>
                <Select defaultValue="fr">
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner une langue" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fr">Français</SelectItem>
                    <SelectItem value="ar">Arabe</SelectItem>
                    <SelectItem value="en">Anglais</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="currency">Devise</Label>
                <Select defaultValue="mad">
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner une devise" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mad">Dirham Marocain (MAD)</SelectItem>
                    <SelectItem value="eur">Euro (EUR)</SelectItem>
                    <SelectItem value="usd">Dollar Américain (USD)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="timezone">Fuseau Horaire</Label>
                <Select defaultValue="africa/casablanca">
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un fuseau horaire" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="africa/casablanca">Casablanca (UTC+01:00)</SelectItem>
                    <SelectItem value="europe/paris">Paris (UTC+01:00/+02:00)</SelectItem>
                    <SelectItem value="utc">UTC</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="dark-mode">Mode Sombre</Label>
                  <p className="text-sm text-muted-foreground">Activer le mode sombre pour l'interface</p>
                </div>
                <Switch id="dark-mode" />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="maintenance-mode">Mode Maintenance</Label>
                  <p className="text-sm text-muted-foreground">Mettre le site en mode maintenance</p>
                </div>
                <Switch id="maintenance-mode" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres de Notifications</CardTitle>
              <CardDescription>
                Configurez quand et comment vous recevez des notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Notifications par Email</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Nouvelles Réservations</Label>
                    <p className="text-sm text-muted-foreground">Recevoir un email pour chaque nouvelle réservation</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Maintenances Planifiées</Label>
                    <p className="text-sm text-muted-foreground">Recevoir des rappels pour les maintenances à venir</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Alertes Système</Label>
                    <p className="text-sm text-muted-foreground">Recevoir des emails pour les alertes importantes</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Rapports Hebdomadaires</Label>
                    <p className="text-sm text-muted-foreground">Recevoir un résumé hebdomadaire des activités</p>
                  </div>
                  <Switch />
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Notifications par SMS</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Nouvelles Réservations</Label>
                    <p className="text-sm text-muted-foreground">Recevoir un SMS pour chaque nouvelle réservation</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Alertes Urgentes</Label>
                    <p className="text-sm text-muted-foreground">Recevoir un SMS pour les alertes critiques</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Fréquence des Résumés</h3>
                <div className="space-y-2">
                  <Label htmlFor="summary-frequency">Réception des Résumés</Label>
                  <Select defaultValue="weekly">
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner une fréquence" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Quotidien</SelectItem>
                      <SelectItem value="weekly">Hebdomadaire</SelectItem>
                      <SelectItem value="monthly">Mensuel</SelectItem>
                      <SelectItem value="never">Jamais</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres de Sécurité</CardTitle>
              <CardDescription>
                Gérez la sécurité de votre compte et de l'application
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="password">Changer le Mot de Passe</Label>
                <Input id="password" type="password" placeholder="••••••••" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirmer le Mot de Passe</Label>
                <Input id="confirm-password" type="password" placeholder="••••••••" />
              </div>
              
              <Button className="mt-2">Mettre à Jour le Mot de Passe</Button>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="two-factor">Authentification à Deux Facteurs</Label>
                  <p className="text-sm text-muted-foreground">Ajouter une couche de sécurité supplémentaire à votre compte</p>
                </div>
                <Switch id="two-factor" />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="session-timeout">Expiration de Session</Label>
                  <p className="text-sm text-muted-foreground">Déconnecter automatiquement après une période d'inactivité</p>
                </div>
                <Select defaultValue="30">
                  <SelectTrigger className="w-24">
                    <SelectValue placeholder="Délai" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 min</SelectItem>
                    <SelectItem value="30">30 min</SelectItem>
                    <SelectItem value="60">1 heure</SelectItem>
                    <SelectItem value="never">Jamais</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Journal d'Activité</h3>
                <p className="text-sm text-muted-foreground">
                  Dernière connexion: 16/04/2025 à 10:45 depuis Casablanca, Maroc
                </p>
                <Button variant="outline">Voir Toutes les Activités</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Gestion des Utilisateurs</CardTitle>
              <CardDescription>
                Gérez les utilisateurs et leurs permissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex justify-end">
                <Button>
                  <Plus className="mr-2 h-4 w-4" /> Ajouter un Utilisateur
                </Button>
              </div>
              
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nom</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Rôle</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Admin Principal</TableCell>
                      <TableCell>admin@drivesmart.ma</TableCell>
                      <TableCell>Administrateur</TableCell>
                      <TableCell>
                        <Badge variant="success">Actif</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">Modifier</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Karim Moussaoui</TableCell>
                      <TableCell>karim@drivesmart.ma</TableCell>
                      <TableCell>Gestionnaire</TableCell>
                      <TableCell>
                        <Badge variant="success">Actif</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">Modifier</Button>
                          <Button variant="ghost" size="sm" className="text-red-500">Supprimer</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Amina Berrada</TableCell>
                      <TableCell>amina@drivesmart.ma</TableCell>
                      <TableCell>Support</TableCell>
                      <TableCell>
                        <Badge variant="success">Actif</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">Modifier</Button>
                          <Button variant="ghost" size="sm" className="text-red-500">Supprimer</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              
              <Separator className="my-6" />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Rôles et Permissions</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Administrateur</p>
                      <p className="text-sm text-muted-foreground">Accès complet à toutes les fonctionnalités</p>
                    </div>
                    <Button variant="outline" size="sm">Modifier</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Gestionnaire</p>
                      <p className="text-sm text-muted-foreground">Gestion des véhicules et des réservations</p>
                    </div>
                    <Button variant="outline" size="sm">Modifier</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Support</p>
                      <p className="text-sm text-muted-foreground">Accès en lecture seule à la plupart des fonctionnalités</p>
                    </div>
                    <Button variant="outline" size="sm">Modifier</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres de Facturation</CardTitle>
              <CardDescription>
                Gérez les modèles et les paramètres de facturation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="invoice-prefix">Préfixe des Factures</Label>
                <Input id="invoice-prefix" defaultValue="DS-INV-" />
                <p className="text-xs text-muted-foreground mt-1">Exemple: DS-INV-0001</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="payment-terms">Conditions de Paiement par Défaut</Label>
                <Select defaultValue="15">
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7">7 jours</SelectItem>
                    <SelectItem value="15">15 jours</SelectItem>
                    <SelectItem value="30">30 jours</SelectItem>
                    <SelectItem value="custom">Personnalisé</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="tax-rate">Taux de TVA</Label>
                <Select defaultValue="20">
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7">7%</SelectItem>
                    <SelectItem value="10">10%</SelectItem>
                    <SelectItem value="20">20%</SelectItem>
                    <SelectItem value="0">0% (exonéré)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <Label htmlFor="invoice-footer">Pied de Page des Factures</Label>
                <Textarea id="invoice-footer" placeholder="Termes et conditions..." defaultValue="Merci pour votre confiance. Pour toute question concernant cette facture, veuillez contacter notre service comptabilité au +212 5 22 33 44 55 ou par email à comptabilite@drivesmart.ma" />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="auto-invoicing">Facturation Automatique</Label>
                  <p className="text-sm text-muted-foreground">Générer automatiquement les factures à la fin de la location</p>
                </div>
                <Switch id="auto-invoicing" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="email-invoices">Envoi Automatique par Email</Label>
                  <p className="text-sm text-muted-foreground">Envoyer automatiquement les factures par email aux clients</p>
                </div>
                <Switch id="email-invoices" defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

// Composant Badge personnalisé
const Badge = ({ children, variant = "default" }: { children: React.ReactNode; variant?: "default" | "success" | "warning" | "error" }) => {
  const variantClasses = {
    default: "bg-gray-100 text-gray-800",
    success: "bg-green-100 text-green-800",
    warning: "bg-amber-100 text-amber-800",
    error: "bg-red-100 text-red-800",
  };
  
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${variantClasses[variant]}`}>
      {children}
    </span>
  );
};

// Composant Table et éléments associés
const Table = ({ children }: { children: React.ReactNode }) => {
  return <table className="w-full">{children}</table>;
};

const TableHeader = ({ children }: { children: React.ReactNode }) => {
  return <thead>{children}</thead>;
};

const TableBody = ({ children }: { children: React.ReactNode }) => {
  return <tbody>{children}</tbody>;
};

const TableRow = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return <tr className={className}>{children}</tr>;
};

const TableHead = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return <th className={`h-12 px-4 text-left align-middle font-medium text-muted-foreground ${className}`}>{children}</th>;
};

const TableCell = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return <td className={`p-4 align-middle ${className}`}>{children}</td>;
};

export default AdminSettings;
