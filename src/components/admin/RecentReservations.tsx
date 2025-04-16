
import { Calendar, Clock, User, Car } from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Reservation {
  id: string;
  customerName: string;
  vehicleName: string;
  startDate: string;
  endDate: string;
  status: "active" | "upcoming" | "completed" | "cancelled";
}

interface RecentReservationsProps {
  reservations: Reservation[];
}

const RecentReservations = ({ reservations }: RecentReservationsProps) => {
  const getStatusBadge = (status: Reservation["status"]) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>;
      case "upcoming":
        return <Badge variant="outline" className="text-blue-500 border-blue-200 bg-blue-50">Upcoming</Badge>;
      case "completed":
        return <Badge variant="secondary">Completed</Badge>;
      case "cancelled":
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold">Recent Reservations</CardTitle>
          <Button variant="outline" size="sm" className="h-8">
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {reservations.length > 0 ? (
          <div className="space-y-4">
            {reservations.map((reservation) => (
              <div key={reservation.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b last:border-0 last:pb-0">
                <div>
                  <div className="flex items-center">
                    <h5 className="font-medium">Reservation #{reservation.id}</h5>
                    <div className="ml-2">{getStatusBadge(reservation.status)}</div>
                  </div>
                  
                  <div className="mt-2 space-y-1 text-sm">
                    <div className="flex items-center text-muted-foreground">
                      <User className="h-3 w-3 mr-2" /> 
                      {reservation.customerName}
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Car className="h-3 w-3 mr-2" /> 
                      {reservation.vehicleName}
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Calendar className="h-3 w-3 mr-2" /> 
                      {reservation.startDate} - {reservation.endDate}
                    </div>
                  </div>
                </div>
                
                <Button size="sm" variant="outline" className="self-start sm:self-center">
                  Details
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6">
            <Calendar className="h-8 w-8 mx-auto text-muted-foreground opacity-40" />
            <p className="mt-2 text-muted-foreground">No recent reservations</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentReservations;
