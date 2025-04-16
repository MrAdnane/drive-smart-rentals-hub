
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Données clients d'exemple
const sampleCustomers = [
  {
    id: "C001",
    name: "Mohammed Alami",
    email: "mohammed.alami@gmail.com",
    phone: "+212 6 12 34 56 78",
    reservations: 3,
    status: "actif"
  },
  {
    id: "C002",
    name: "Fatima Benali",
    email: "fatima.benali@yahoo.fr",
    phone: "+212 6 23 45 67 89",
    reservations: 1,
    status: "actif"
  },
  {
    id: "C003",
    name: "Youssef El Mansouri",
    email: "youssef.elmansouri@gmail.com",
    phone: "+212 6 34 56 78 90",
    reservations: 5,
    status: "actif"
  },
  {
    id: "C004",
    name: "Laila Ouazzani",
    email: "laila.ouazzani@outlook.com",
    phone: "+212 6 45 67 89 01",
    reservations: 0,
    status: "inactif"
  },
  {
    id: "C005",
    name: "Karim Ziani",
    email: "karim.ziani@gmail.com",
    phone: "+212 6 56 78 90 12",
    reservations: 2,
    status: "actif"
  }
];

const AdminCustomers = () => {
  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gestion des Clients</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Ajouter un Client
        </Button>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Clients</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Rechercher un client..." className="pl-8" />
            </div>
            <div className="flex gap-2">
              <Button variant="outline">Exporter</Button>
              <Button variant="outline">Filtrer</Button>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Nom</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Téléphone</TableHead>
                  <TableHead>Réservations</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sampleCustomers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell className="font-medium">{customer.id}</TableCell>
                    <TableCell>{customer.name}</TableCell>
                    <TableCell>{customer.email}</TableCell>
                    <TableCell>{customer.phone}</TableCell>
                    <TableCell>{customer.reservations}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        customer.status === "actif" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                      }`}>
                        {customer.status}
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

export default AdminCustomers;
