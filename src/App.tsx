
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import AdminGuard from "@/components/auth/AdminGuard";

// Pages
import Index from "./pages/Index";
import Vehicles from "./pages/Vehicles";
import VehicleDetail from "./pages/VehicleDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";

// Pages Admin
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminVehicles from "./pages/admin/AdminVehicles";
import AdminCustomers from "./pages/admin/AdminCustomers";
import AdminReservations from "./pages/admin/AdminReservations";
import AdminMaintenance from "./pages/admin/AdminMaintenance";
import AdminAlerts from "./pages/admin/AdminAlerts";
import AdminReports from "./pages/admin/AdminReports";
import AdminDocuments from "./pages/admin/AdminDocuments";
import AdminSettings from "./pages/admin/AdminSettings";
import VehicleTracking from "./pages/admin/VehicleTracking";
import VehicleMaintenance from "./pages/admin/VehicleMaintenance";
import InsuranceManagement from "./pages/admin/InsuranceManagement";
import ClientDocument from "./pages/admin/ClientDocument";

// Pages Client
import ClientReservations from "./pages/client/ClientReservations";
import ClientProfile from "./pages/client/ClientProfile";
import ClientDocuments from "./pages/client/ClientDocuments";
import PaymentPage from "./pages/client/PaymentPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Routes publiques */}
            <Route path="/" element={<Index />} />
            <Route path="/vehicles" element={<Vehicles />} />
            <Route path="/vehicles/:id" element={<VehicleDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Routes client */}
            <Route path="/client/reservations" element={<ClientReservations />} />
            <Route path="/client/profile" element={<ClientProfile />} />
            <Route path="/client/documents" element={<ClientDocuments />} />
            <Route path="/client/payment" element={<PaymentPage />} />
            
            {/* Routes d'administration protégées */}
            <Route path="/admin" element={<AdminGuard><AdminDashboard /></AdminGuard>} />
            <Route path="/admin/vehicles" element={<AdminGuard><AdminVehicles /></AdminGuard>} />
            <Route path="/admin/customers" element={<AdminGuard><AdminCustomers /></AdminGuard>} />
            <Route path="/admin/reservations" element={<AdminGuard><AdminReservations /></AdminGuard>} />
            <Route path="/admin/maintenance" element={<AdminGuard><AdminMaintenance /></AdminGuard>} />
            <Route path="/admin/alerts" element={<AdminGuard><AdminAlerts /></AdminGuard>} />
            <Route path="/admin/reports" element={<AdminGuard><AdminReports /></AdminGuard>} />
            <Route path="/admin/documents" element={<AdminGuard><AdminDocuments /></AdminGuard>} />
            <Route path="/admin/settings" element={<AdminGuard><AdminSettings /></AdminGuard>} />
            <Route path="/admin/vehicle-tracking" element={<AdminGuard><VehicleTracking /></AdminGuard>} />
            <Route path="/admin/vehicle-maintenance" element={<AdminGuard><VehicleMaintenance /></AdminGuard>} />
            <Route path="/admin/insurance" element={<AdminGuard><InsuranceManagement /></AdminGuard>} />
            <Route path="/admin/client-documents" element={<AdminGuard><ClientDocument /></AdminGuard>} />
            
            {/* Route d'erreur 404 pour les chemins inexistants */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
