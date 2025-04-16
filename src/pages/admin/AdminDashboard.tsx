
import AdminLayout from "@/components/admin/AdminLayout";
import StatCard from "@/components/admin/StatCard";
import DashboardAlerts from "@/components/admin/DashboardAlerts";
import RecentReservations from "@/components/admin/RecentReservations";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Car, 
  Users, 
  CalendarCheck, 
  AlertTriangle, 
  DollarSign, 
  Percent,
  TrendingUp,
  Wrench
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

// Mock data for the dashboard
const revenueData = [
  { name: 'Jan', revenue: 4000 },
  { name: 'Feb', revenue: 3000 },
  { name: 'Mar', revenue: 5000 },
  { name: 'Apr', revenue: 4500 },
  { name: 'May', revenue: 6000 },
  { name: 'Jun', revenue: 7000 },
  { name: 'Jul', revenue: 8500 },
];

const utilizationData = [
  { name: 'Economy', value: 85 },
  { name: 'SUV', value: 78 },
  { name: 'Luxury', value: 62 },
  { name: 'Utility', value: 45 },
  { name: 'Electric', value: 92 },
];

const alerts = [
  {
    id: "1",
    type: "warning" as const,
    title: "Vehicle Maintenance Due",
    description: "Toyota Corolla (XYZ-123) requires oil change",
    date: "Today"
  },
  {
    id: "2",
    type: "info" as const,
    title: "New Reservation",
    description: "New booking made for Honda CR-V",
    date: "Yesterday"
  },
  {
    id: "3",
    type: "reminder" as const,
    title: "Insurance Renewal",
    description: "Insurance for 5 vehicles expires in 15 days",
    date: "15 Aug 2023"
  },
  {
    id: "4",
    type: "success" as const,
    title: "Maintenance Completed",
    description: "Mercedes E-Class service completed",
    date: "10 Aug 2023"
  }
];

const reservations = [
  {
    id: "R1234",
    customerName: "John Smith",
    vehicleName: "Toyota Corolla",
    startDate: "15 Aug 2023",
    endDate: "20 Aug 2023",
    status: "active" as const
  },
  {
    id: "R1235",
    customerName: "Sarah Johnson",
    vehicleName: "Honda CR-V",
    startDate: "17 Aug 2023",
    endDate: "22 Aug 2023",
    status: "upcoming" as const
  },
  {
    id: "R1236",
    customerName: "Michael Davis",
    vehicleName: "Mercedes E-Class",
    startDate: "10 Aug 2023",
    endDate: "15 Aug 2023",
    status: "completed" as const
  }
];

const AdminDashboard = () => {
  return (
    <AdminLayout>
      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard
          title="Total Vehicles"
          value="34"
          icon={<Car className="h-5 w-5" />}
          description="4 in maintenance"
        />
        <StatCard
          title="Active Customers"
          value="127"
          icon={<Users className="h-5 w-5" />}
          trend="up"
          trendValue="+12% from last month"
        />
        <StatCard
          title="Current Bookings"
          value="18"
          icon={<CalendarCheck className="h-5 w-5" />}
          description="7 upcoming today"
        />
        <StatCard
          title="Monthly Revenue"
          value="$24,532"
          icon={<DollarSign className="h-5 w-5" />}
          trend="up"
          trendValue="+8.3% vs last month"
        />
      </div>
      
      {/* Charts & Alerts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Revenue Chart */}
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Revenue Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={revenueData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#0284c7"
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Alerts */}
        <DashboardAlerts alerts={alerts} />
      </div>
      
      {/* Fleet Utilization & Recent Reservations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Fleet Utilization */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Fleet Utilization</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={utilizationData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[0, 100]} />
                  <YAxis dataKey="name" type="category" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#0284c7" name="Utilization %" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Recent Reservations */}
        <div className="col-span-2">
          <RecentReservations reservations={reservations} />
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
