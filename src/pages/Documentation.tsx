
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, AlertCircle, Info, Rocket, Wrench, ShieldCheck, FileText, DownloadCloud } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const Documentation = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Documentation Technique</h1>
        
        <Alert className="mb-8">
          <Info className="h-4 w-4" />
          <AlertTitle>Cahier des Charges</AlertTitle>
          <AlertDescription>
            Cette page documente les fonctionnalités implémentées et planifiées selon le cahier des charges de la plateforme de gestion d'agence de location de voitures.
          </AlertDescription>
        </Alert>
        
        <Tabs defaultValue="fonctionnalites">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="fonctionnalites">Fonctionnalités</TabsTrigger>
            <TabsTrigger value="architecture">Architecture</TabsTrigger>
            <TabsTrigger value="securite">Sécurité</TabsTrigger>
            <TabsTrigger value="maintenance">Tests et Maintenance</TabsTrigger>
          </TabsList>
          
          <TabsContent value="fonctionnalites">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Check className="h-5 w-5 mr-2 text-green-500" />
                    Fonctionnalités Implémentées
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <h3 className="font-semibold">Pour l'Administrateur</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Interface d'administration protégée par authentification</li>
                    <li>Tableau de bord avec statistiques</li>
                    <li>Gestion des véhicules (liste, détails)</li>
                    <li>Gestion des réservations (liste, détails, filtres)</li>
                    <li>Gestion des clients (liste)</li>
                  </ul>
                  
                  <h3 className="font-semibold mt-4">Pour le Client</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Création de compte et authentification</li>
                    <li>Recherche de véhicules avec filtres multiples</li>
                    <li>Affichage des véhicules disponibles avec photos et fiches techniques</li>
                    <li>Formulaire de réservation en ligne</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <AlertCircle className="h-5 w-5 mr-2 text-amber-500" />
                    Fonctionnalités À Développer
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <h3 className="font-semibold">Pour l'Administrateur</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Ajout/modification/suppression complète des véhicules</li>
                    <li>Suivi technique des véhicules (assurance, contrôle technique, entretien)</li>
                    <li>Gestion des alertes automatisées</li>
                    <li>Planification des entretiens</li>
                    <li>Génération de rapports détaillés</li>
                  </ul>
                  
                  <h3 className="font-semibold mt-4">Pour le Client</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Upload des documents obligatoires (permis, CNI)</li>
                    <li>Paiement en ligne sécurisé</li>
                    <li>Espace client complet avec historique des réservations</li>
                    <li>Modification/annulation de réservation</li>
                    <li>Génération de factures PDF</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="architecture">
            <Card>
              <CardHeader>
                <CardTitle>Architecture Technique</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-3">Technologies Actuelles</h3>
                    <ul className="list-disc pl-5 space-y-2">
                      <li><strong>Frontend:</strong> React.js avec TypeScript</li>
                      <li><strong>UI Framework:</strong> Tailwind CSS avec Shadcn UI</li>
                      <li><strong>Routing:</strong> React Router</li>
                      <li><strong>État global:</strong> Contexts React</li>
                      <li><strong>Authentification:</strong> Système interne (simulation)</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-3">Technologies Prévues</h3>
                    <ul className="list-disc pl-5 space-y-2">
                      <li><strong>Backend:</strong> Node.js (Express) ou Laravel (PHP)</li>
                      <li><strong>Base de données:</strong> PostgreSQL ou MySQL</li>
                      <li><strong>Stockage fichiers:</strong> AWS S3 ou Firebase Storage</li>
                      <li><strong>Hébergement:</strong> AWS, DigitalOcean ou OVH</li>
                      <li><strong>API Paiement:</strong> Stripe ou PayPal</li>
                      <li><strong>API Géolocalisation:</strong> Google Maps</li>
                      <li><strong>Envoi d'emails:</strong> SendGrid ou Mailjet</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="securite">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ShieldCheck className="h-5 w-5 mr-2 text-blue-500" />
                  Sécurité
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-3">Mesures Implémentées</h3>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Authentification avec système de rôles (admin/client)</li>
                      <li>Protection des routes administratives</li>
                      <li>Sessions utilisateurs sécurisées</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-3">Mesures Prévues</h3>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Connexion sécurisée (HTTPS, certificats SSL)</li>
                      <li>Authentification à deux facteurs pour les administrateurs</li>
                      <li>Cryptage des mots de passe (hash + salt)</li>
                      <li>Protection contre les injections SQL, XSS, CSRF</li>
                      <li>Sauvegarde régulière des données</li>
                      <li>Journalisation des actions critiques</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="maintenance">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Wrench className="h-5 w-5 mr-2 text-blue-500" />
                    Tests et Validation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Tests fonctionnels:</strong> Vérification de chaque fonctionnalité</li>
                    <li><strong>Tests utilisateurs:</strong> Feedback des agents de l'agence</li>
                    <li><strong>Tests de performance:</strong> Nombre de connexions simultanées, temps de réponse</li>
                    <li><strong>Tests de sécurité:</strong> Injection SQL, XSS, CSRF</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Rocket className="h-5 w-5 mr-2 text-purple-500" />
                    Déploiement
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Environnement de test (staging)</strong></li>
                    <li><strong>Déploiement sur production après validation</strong></li>
                    <li>
                      <strong>Formation des utilisateurs:</strong>
                      <ul className="list-circle pl-5 mt-1">
                        <li>Administrateurs</li>
                        <li>Conseillers clients / commerciaux</li>
                      </ul>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-green-500" />
                    Maintenance et Support
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      <strong>Contrat de maintenance incluant:</strong>
                      <ul className="list-circle pl-5 mt-1">
                        <li>Corrections de bugs</li>
                        <li>Sauvegardes</li>
                        <li>Mise à jour de sécurité</li>
                        <li>Ajout de nouvelles fonctionnalités</li>
                      </ul>
                    </li>
                    <li><strong>Support technique:</strong> par mail, téléphone, ou chat intégré</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Documentation;
