// App.jsx
import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import ContactPage from './pages/ContactPage';
import ProductsPage from './pages/ProductsPage';
import DistributorTable from './pages/Distributors';
import './pages/index.css';

// Create a wrapper component that uses useLocation
function AppContent() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // This is now safe because AppContent is rendered inside BrowserRouter
  const location = useLocation();

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (error) {
      console.error('Error parsing saved user:', error);
      localStorage.removeItem('user');
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const hideLayout = location.pathname === '/login' || location.pathname === '/register';

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {!hideLayout && <Navbar user={user} onLogout={logout} />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/Distributor" element={<DistributorTable />} />
        <Route
          path="/register"
          element={
            user ? <Navigate to="/dashboard" replace /> : <RegisterPage onLogin={login} />
          }
        />
        <Route
          path="/login"
          element={
            user ? <Navigate to="/dashboard" replace /> : <LoginPage onLogin={login} />
          }
        />
        <Route
          path="/dashboard"
          element={
            user ? <Dashboard user={user} /> : <Navigate to="/login" replace />
          }
        />
      </Routes>
      {!hideLayout && <Footer />}
    </div>
  );
}

// Main App component - NO router hooks here, just returns the content wrapper
function App() {
  return <AppContent />;
}

export default App;