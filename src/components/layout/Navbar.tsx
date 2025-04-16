
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Car, User, Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Car className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-bold text-gray-900">DriveSmart</span>
            </Link>
          </div>
          
          <nav className="hidden md:flex items-center space-x-4">
            <Link to="/" className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">
              Home
            </Link>
            <Link to="/vehicles" className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">
              Vehicles
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">
              About Us
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">
              Contact
            </Link>
            <Link to="/admin" className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">
              Admin
            </Link>
          </nav>
          
          <div className="hidden md:flex items-center space-x-2">
            <Button variant="outline" size="sm" asChild>
              <Link to="/login">
                <User className="h-4 w-4 mr-2" />
                Login
              </Link>
            </Button>
            <Button size="sm" asChild>
              <Link to="/register">Register</Link>
            </Button>
          </div>
          
          <div className="md:hidden">
            <button 
              onClick={toggleMobileMenu}
              className="text-gray-700 hover:text-primary inline-flex items-center justify-center rounded-md p-2"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
            <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary">
              Home
            </Link>
            <Link to="/vehicles" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary">
              Vehicles
            </Link>
            <Link to="/about" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary">
              About Us
            </Link>
            <Link to="/contact" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary">
              Contact
            </Link>
            <Link to="/admin" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary">
              Admin
            </Link>
            <div className="pt-4 pb-3 border-t border-gray-200">
              <Link to="/login" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary">
                Login
              </Link>
              <Link to="/register" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary">
                Register
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
