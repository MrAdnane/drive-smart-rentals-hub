
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Calendar, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

// Données de réservations d'exemple
const sampleReservations = [
  {
    id: "R1001",
    customer: "Mohammed Alami",
    vehicle: "Toyota Corolla",
    startDate: "15/04/2025",
    endDate: "20/04/2025",
    total: 1750,
    status: "active"
  },
  {
    id: "R1002",
    customer: "Fatima Benali",
    vehicle: "Honda CR-V",
    startDate: "18/04/2025",
    endDate: "22/04/2025",
    total: 1800,
    status: "upcoming"
  },
  {
    id: "R1003",
    customer: "Youssef El Mansouri",
    vehicle: "Mercedes-Benz Classe E",
    startDate: "10/04/2025",
    endDate: "15/04/2025",
    total: 4000,
    status: "completed"
  },
  {
    id: "R1004",
    customer: "Karim Ziani",
    vehicle: "Tesla Model 3",
    startDate: "12/04/2025",
    endDate: "14/04/2025",
    total: 1400,
    status: "canceled"
  },
  {
    id: "R1005",
    customer: "Laila Ouazzani",
    vehicle: "Honda CR-V",
    startDate: "25/04/2025",
    endDate: "30/04/2025",
    total: 2250,
    status: "upcoming"
  }
];

// Fonction pour déterminer la classe de statut
const getStatusClass = (status: string) => {
  switch (status) {
    case "active":
      return "bg-blue-100 text-blue-800";
    case "upcoming":
      return "bg-amber-100 text-amber-800";
    case "completed":
      return "bg-green-100 text-green-800";
    case "canceled":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

// Fonction pour traduire le statut
const translateStatus = (status: string) => {
  switch (status) {
    case "active":
      return "En cours";
    case "upcoming":
      return "À venir";
    case "completed":
      return "Terminée";
    case "canceled":
      return "Annulée";
    default:
      return status;
  }
};

const AdminReservations = () => {
  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gestion des Réservations</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Nouvelle Réservation
        </Button>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Réservations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-4">
              <div className="relative w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Rechercher..." className="pl-8" />
              </div>
              <div className="flex items-center">
                <span className="mr-2">Statut:</span>
                <Select defaultValue="all">
                  <SelectTrigger className="w-36">
                    <SelectValue placeholder="Tous" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous</SelectItem>
                    <SelectItem value="active">En cours</SelectItem>
                    <SelectItem value="upcoming">À venir</SelectItem>
                    <SelectItem value="completed">Terminées</SelectItem>
                    <SelectItem value="canceled">Annulées</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button variant="outline">
              <Calendar className="mr-2 h-4 w-4" /> Calendrier
            </Button>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Véhicule</TableHead>
                  <TableHead>Date début</TableHead>
                  <TableHead>Date fin</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sampleReservations.map((reservation) => (
                  <TableRow key={reservation.id}>
                    <TableCell className="font-medium">{reservation.id}</TableCell>
                    <TableCell>{reservation.customer}</TableCell>
                    <TableCell>{reservation.vehicle}</TableCell>
                    <TableCell>{reservation.startDate}</TableCell>
                    <TableCell>{reservation.endDate}</TableCell>
                    <TableCell>{reservation.total} MAD</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusClass(reservation.status)}`}>
                        {translateStatus(reservation.status)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">Détails</Button>
                        <Button variant="ghost" size="sm">Modifier</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default AdminReservations;
