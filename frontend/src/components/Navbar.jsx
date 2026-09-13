import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User, LogOut, Menu, X, Droplets } from 'lucide-react';
import LOGO from '../img/LOGO.jpg';

const Navbar = ({ user, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src={LOGO} alt="Logo" className="h-12 w-auto" />
            <span className="text-xl font-bold text-gray-900"></span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`transition-colors ${
                isActive('/') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Home
            </Link>
            <Link
              to="/products"
              className={`transition-colors ${
                isActive('/products') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Products
            </Link>
            <Link
              to="/Distributor"
              className={`transition-colors ${
                isActive('/Distributor') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Distributors
            </Link>
            <Link
              to="/contact"
              className={`transition-colors ${
                isActive('/contact') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Contact
            </Link>

            {user ? (
              <div className="flex items-center space-x-4">
                <Link
                  to="/dashboard"
                  className={`transition-colors ${
                    isActive('/dashboard') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  Dashboard
                </Link>
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-gray-600" />
                  <span className="text-gray-700">{user.name}</span>
                </div>
                <button
                  onClick={onLogout}
                  className="flex items-center space-x-1 text-gray-700 hover:text-red-600 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-blue-600 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 transition-colors"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <Link
                to="/"
                className={`transition-colors ${
                  isActive('/') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/products"
                className={`transition-colors ${
                  isActive('/products') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
              {/* FIXED: Added missing Distributors link for mobile */}
              <Link
                to="/Distributor"
                className={`transition-colors ${
                  isActive('/Distributor') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Distributors
              </Link>
              <Link
                to="/contact"
                className={`transition-colors ${
                  isActive('/contact') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>

              {user ? (
                <>
                  <Link
                    to="/dashboard"
                    className={`transition-colors ${
                      isActive('/dashboard') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <div className="flex items-center space-x-2 py-2">
                    <User className="h-5 w-5 text-gray-600" />
                    <span className="text-gray-700">{user.name}</span>
                  </div>
                  <button
                    onClick={() => {
                      onLogout();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center space-x-1 text-gray-700 hover:text-red-600 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-gray-700 hover:text-blue-600 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;