
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Download, FileText, BarChart3, PieChart as PieChartIcon, LineChart as LineChartIcon } from "lucide-react";

// Données pour les graphiques
const revenueData = [
  { mois: "Jan", montant: 42000 },
  { mois: "Fév", montant: 38000 },
  { mois: "Mar", montant: 55000 },
  { mois: "Avr", montant: 45000 },
  { mois: "Mai", montant: 60000 },
  { mois: "Juin", montant: 70000 },
];

const reservationsByCategory = [
  { categorie: "Économique", total: 45 },
  { categorie: "SUV", total: 30 },
  { categorie: "Luxe", total: 15 },
  { categorie: "Utilitaire", total: 8 },
  { categorie: "Électrique", total: 12 },
];

const vehicleUtilization = [
  { id: "V001", marque: "Toyota", modele: "Corolla", utilisation: 85 },
  { id: "V002", marque: "Honda", modele: "CR-V", utilisation: 78 },
  { id: "V003", marque: "Mercedes", modele: "Classe E", utilisation: 62 },
  { id: "V004", marque: "Tesla", modele: "Model 3", utilisation: 92 },
  { id: "V005", marque: "Toyota", modele: "Sienna", utilisation: 45 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A569BD'];

const AdminReports = () => {
  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Rapports</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" /> Générer un Rapport
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" /> Exporter
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="flex items-center">
          <span className="mr-2">Période:</span>
          <Select defaultValue="6m">
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Sélectionner" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">7 derniers jours</SelectItem>
              <SelectItem value="1m">30 derniers jours</SelectItem>
              <SelectItem value="3m">3 derniers mois</SelectItem>
              <SelectItem value="6m">6 derniers mois</SelectItem>
              <SelectItem value="1y">Cette année</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="overview" className="mb-6">
        <TabsList className="mb-4">
          <TabsTrigger value="overview" className="flex items-center">
            <BarChart3 className="mr-2 h-4 w-4" /> Vue d'Ensemble
          </TabsTrigger>
          <TabsTrigger value="revenue" className="flex items-center">
            <LineChartIcon className="mr-2 h-4 w-4" /> Revenus
          </TabsTrigger>
          <TabsTrigger value="vehicles" className="flex items-center">
            <PieChartIcon className="mr-2 h-4 w-4" /> Véhicules
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenus Mensuels</CardTitle>
                <CardDescription>Évolution des revenus sur les 6 derniers mois</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={revenueData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="mois" />
                      <YAxis />
                      <Tooltip formatter={(value) => `${value} MAD`} />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="montant" 
                        name="Revenus" 
                        stroke="#0284c7" 
                        activeDot={{ r: 8 }} 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Réservations par Catégorie</CardTitle>
                <CardDescription>Distribution des réservations par type de véhicule</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={reservationsByCategory}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="total"
                        nameKey="categorie"
                      >
                        {reservationsByCategory.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `${value} réservations`} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="revenue">
          <Card>
            <CardHeader>
              <CardTitle>Analyse Détaillée des Revenus</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={revenueData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="mois" />
                    <YAxis />
                    <Tooltip formatter={(value) => `${value} MAD`} />
                    <Legend />
                    <Bar dataKey="montant" name="Revenus" fill="#0284c7" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vehicles">
          <Card>
            <CardHeader>
              <CardTitle>Taux d'Utilisation des Véhicules</CardTitle>
              <CardDescription>Pourcentage d'utilisation par véhicule</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    layout="vertical"
                    data={vehicleUtilization}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[0, 100]} />
                    <YAxis dataKey="modele" type="category" />
                    <Tooltip formatter={(value) => `${value}%`} />
                    <Legend />
                    <Bar dataKey="utilisation" name="Taux d'utilisation" fill="#0284c7" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

export default AdminReports;
