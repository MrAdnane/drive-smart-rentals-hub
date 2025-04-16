
import { ReactNode, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Home, 
  Car, 
  Users, 
  Calendar, 
  BarChart3, 
  Wrench, 
  CircleAlert, 
  FileText, 
  Settings, 
  LogOut,
  Menu,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: Home },
    { name: 'Vehicles', href: '/admin/vehicles', icon: Car },
    { name: 'Customers', href: '/admin/customers', icon: Users },
    { name: 'Reservations', href: '/admin/reservations', icon: Calendar },
    { name: 'Maintenance', href: '/admin/maintenance', icon: Wrench },
    { name: 'Alerts', href: '/admin/alerts', icon: CircleAlert },
    { name: 'Reports', href: '/admin/reports', icon: BarChart3 },
    { name: 'Documents', href: '/admin/documents', icon: FileText },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];
  
  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="bg-white"
        >
          {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
      </div>
      
      {/* Sidebar backdrop for mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 transition-transform duration-300 lg:translate-x-0 transform lg:relative",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          <div className="px-4 py-6 border-b border-gray-200">
            <Link to="/admin" className="flex items-center">
              <Car className="h-6 w-6 text-primary" />
              <span className="ml-2 text-xl font-bold">DriveSmart</span>
              <span className="ml-1 text-sm text-muted-foreground">Admin</span>
            </Link>
          </div>
          
          <nav className="flex-1 px-2 py-4 overflow-y-auto">
            <ul className="space-y-1">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className={cn(
                      "flex items-center px-3 py-2 text-sm font-medium rounded-md",
                      location.pathname === item.href
                        ? "bg-primary text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    )}
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    <item.icon className={cn(
                      "mr-3 h-5 w-5",
                      location.pathname === item.href
                        ? "text-white"
                        : "text-gray-500"
                    )} />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          
          <div className="p-4 border-t border-gray-200">
            <Button variant="outline" className="w-full justify-start text-left" asChild>
              <Link to="/">
                <LogOut className="mr-2 h-4 w-4" />
                Exit to Website
              </Link>
            </Button>
          </div>
        </div>
      </aside>
      
      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <header className="bg-white shadow-sm z-10">
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-900">
                {navigation.find(item => item.href === location.pathname)?.name || 'Admin Panel'}
              </h1>
              <div className="flex items-center space-x-4">
                <div className="hidden sm:flex items-center">
                  <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white">
                    A
                  </div>
                  <span className="ml-2 text-sm font-medium">Admin User</span>
                </div>
              </div>
            </div>
          </div>
        </header>
        
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
