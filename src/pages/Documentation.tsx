
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle, FileText, Shield, Server, Rocket, Wrench, TestTube } from "lucide-react";

const Documentation = () => {
  return (
    <MainLayout>
      <div className="container mx-auto py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Documentation Technique</h1>
          <p className="text-muted-foreground">
            Plateforme de Gestion d'Agence de Location de Voitures
          </p>
          <Separator className="my-6" />
        </div>

        <Tabs defaultValue="introduction" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-7">
            <TabsTrigger value="introduction">Introduction</TabsTrigger>
            <TabsTrigger value="fonctionnalites">Fonctionnalités</TabsTrigger>
            <TabsTrigger value="architecture">Architecture</TabsTrigger>
            <TabsTrigger value="design">Design UX</TabsTrigger>
            <TabsTrigger value="securite">Sécurité</TabsTrigger>
            <TabsTrigger value="tests">Tests</TabsTrigger>
            <TabsTrigger value="deploiement">Déploiement</TabsTrigger>
          </TabsList>

          <TabsContent value="introduction" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="mr-2 h-5 w-5" />
                  Objectif du Projet
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Développer une plateforme web de gestion destinée à une agence de location de voitures.
                  L'objectif est de:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Faciliter la gestion des opérations internes (véhicules, clients, réservations)</li>
                  <li>Permettre aux clients de réserver un véhicule en ligne de manière autonome et sécurisée</li>
                  <li>Assurer un suivi technique rigoureux du parc automobile</li>
                </ul>

                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-2">Public cible</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Administrateurs et agents de l'agence de location</li>
                    <li>Clients souhaitant louer un véhicule en ligne</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="fonctionnalites" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5" />
                  Fonctionnalités pour l'Administrateur
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Gestion des véhicules</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Ajout / modification / suppression de véhicules</li>
                    <li>Informations de base: marque, modèle, année, type, immatriculation</li>
                    <li>Caractéristiques techniques: motorisation, transmission, carburant, consommation</li>
                    <li>Documents liés: carte grise, assurance, contrôle technique</li>
                    <li>Statut: disponible, réservé, en entretien, hors service</li>
                    <li>Gestion des catégories: économique, utilitaire, SUV, prestige, etc.</li>
                  </ul>
                </div>

                <div className="mt-4">
                  <h3 className="text-lg font-medium mb-2">Suivi administratif et technique</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Assurance: dates de début/fin, upload du certificat, notifications</li>
                    <li>Contrôle technique: dates, rapports, alertes automatiques</li>
                    <li>Entretien régulier: historique, suivi kilométrage, planification</li>
                    <li>Alertes automatisées: tableau de bord des échéances</li>
                  </ul>
                </div>

                <div className="mt-4">
                  <h3 className="text-lg font-medium mb-2">Gestion des réservations</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Visualisation des réservations en cours, futures et passées</li>
                    <li>Modification ou annulation</li>
                    <li>Attribution manuelle d'un véhicule à une réservation</li>
                    <li>Calendrier global (planning) avec disponibilité des véhicules</li>
                  </ul>
                </div>

                <div className="mt-4">
                  <h3 className="text-lg font-medium mb-2">Gestion des clients</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Fiches clients complètes: coordonnées, pièces justificatives, historique</li>
                    <li>Vérification des pièces jointes (permis, CNI)</li>
                    <li>Activation / désactivation de comptes</li>
                    <li>Système de points ou fidélité</li>
                  </ul>
                </div>

                <div className="mt-4">
                  <h3 className="text-lg font-medium mb-2">Rapports et Statistiques</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Taux d'utilisation des véhicules</li>
                    <li>Historique des entretiens et coûts associés</li>
                    <li>Chiffre d'affaires mensuel / annuel</li>
                    <li>Rapports d'activité par véhicule, client, catégorie</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5" />
                  Fonctionnalités pour le Client
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Gestion de compte</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Création de profil avec validation par e-mail</li>
                    <li>Upload des documents obligatoires (permis, pièce d'identité)</li>
                    <li>Historique de réservations</li>
                  </ul>
                </div>

                <div className="mt-4">
                  <h3 className="text-lg font-medium mb-2">Recherche et réservation</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Recherche multicritères (dates, agence, catégorie, prix, options)</li>
                    <li>Filtres: transmission, carburant, nombre de places</li>
                    <li>Affichage des véhicules disponibles avec photos et fiches techniques</li>
                  </ul>
                </div>

                <div className="mt-4">
                  <h3 className="text-lg font-medium mb-2">Paiement en ligne</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Paiement sécurisé (Stripe, PayPal, carte bancaire)</li>
                    <li>Acompte ou paiement total au choix</li>
                    <li>Génération de factures en PDF</li>
                  </ul>
                </div>

                <div className="mt-4">
                  <h3 className="text-lg font-medium mb-2">Confirmation et suivi</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Email de confirmation avec récapitulatif</li>
                    <li>Accès au détail de la réservation dans l'espace client</li>
                    <li>Modification / annulation selon les conditions de l'agence</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="architecture" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Server className="mr-2 h-5 w-5" />
                  Architecture Technique
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Frontend:</strong> React.js (interface responsive)</li>
                  <li><strong>Backend:</strong> Node.js (Express), Laravel (PHP) ou Django (Python)</li>
                  <li><strong>Base de données:</strong> PostgreSQL ou MySQL</li>
                  <li><strong>Stockage fichiers:</strong> AWS S3, Firebase Storage ou équivalent cloud sécurisé</li>
                  <li><strong>Hébergement:</strong> Serveur cloud (AWS, DigitalOcean, OVH)</li>
                </ul>

                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-2">API et intégrations</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>API de paiement (Stripe, PayPal)</li>
                    <li>API Google Maps (géolocalisation des agences)</li>
                    <li>Envoi d'emails (SendGrid, Mailjet)</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="design" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Rocket className="mr-2 h-5 w-5" />
                  Design et Expérience Utilisateur
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="list-disc pl-6 space-y-2">
                  <li>Interface responsive (desktop, tablette, mobile)</li>
                  <li>Navigation fluide, accessible aux utilisateurs non techniques</li>
                  <li>Thème sobre et professionnel</li>
                  <li>Maquettes à fournir avant développement (Figma ou Adobe XD)</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="securite" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="mr-2 h-5 w-5" />
                  Sécurité
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="list-disc pl-6 space-y-2">
                  <li>Connexion sécurisée (HTTPS, certificats SSL)</li>
                  <li>Authentification à deux facteurs pour les administrateurs</li>
                  <li>Cryptage des mots de passe (hash + salt)</li>
                  <li>Sauvegarde régulière des données</li>
                  <li>Journalisation des actions critiques</li>
                </ul>

                <Alert className="mt-4">
                  <Shield className="h-4 w-4" />
                  <AlertTitle>Protection des données</AlertTitle>
                  <AlertDescription>
                    Toutes les données personnelles sont traitées conformément au RGPD.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tests" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TestTube className="mr-2 h-5 w-5" />
                  Tests et Validation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Tests fonctionnels:</strong> vérification de chaque fonctionnalité</li>
                  <li><strong>Tests utilisateurs:</strong> feedback des agents de l'agence</li>
                  <li><strong>Tests de performance:</strong> nombre de connexions simultanées, temps de réponse</li>
                  <li><strong>Tests de sécurité:</strong> injection SQL, XSS, CSRF</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="deploiement" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Rocket className="mr-2 h-5 w-5" />
                  Déploiement
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="list-disc pl-6 space-y-2">
                  <li>Environnement de test (staging)</li>
                  <li>Déploiement sur production après validation</li>
                  <li>Formation des utilisateurs:
                    <ul className="list-disc pl-6 mt-2">
                      <li>Administrateurs</li>
                      <li>Conseillers clients / commerciaux</li>
                    </ul>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="mt-4">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Wrench className="mr-2 h-5 w-5" />
                  Maintenance et Support
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>Contrat de maintenance incluant:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Corrections de bugs</li>
                  <li>Sauvegardes</li>
                  <li>Mise à jour de sécurité</li>
                  <li>Ajout de nouvelles fonctionnalités</li>
                  <li>Support technique par mail, téléphone ou chat intégré</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Documentation;
