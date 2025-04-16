
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Vehicles from "./pages/Vehicles";
import VehicleDetail from "./pages/VehicleDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminVehicles from "./pages/admin/AdminVehicles";
import AdminCustomers from "./pages/admin/AdminCustomers";
import AdminReservations from "./pages/admin/AdminReservations";
import AdminMaintenance from "./pages/admin/AdminMaintenance";
import AdminAlerts from "./pages/admin/AdminAlerts";
import AdminReports from "./pages/admin/AdminReports";
import AdminDocuments from "./pages/admin/AdminDocuments";
import AdminSettings from "./pages/admin/AdminSettings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Routes orientées client */}
          <Route path="/" element={<Index />} />
          <Route path="/vehicles" element={<Vehicles />} />
          <Route path="/vehicles/:id" element={<VehicleDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          
          {/* Routes d'administration */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/vehicles" element={<AdminVehicles />} />
          <Route path="/admin/customers" element={<AdminCustomers />} />
          <Route path="/admin/reservations" element={<AdminReservations />} />
          <Route path="/admin/maintenance" element={<AdminMaintenance />} />
          <Route path="/admin/alerts" element={<AdminAlerts />} />
          <Route path="/admin/reports" element={<AdminReports />} />
          <Route path="/admin/documents" element={<AdminDocuments />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
          
          {/* Route d'erreur 404 pour les chemins inexistants */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
