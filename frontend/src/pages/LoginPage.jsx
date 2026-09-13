import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import LOGO from '../img/LOGO.jpg';

const backendURL = import.meta.env.VITE_BACKEND_URL;

const LoginPage = ({ onLogin }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email';

    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Min 6 characters';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    
    try {
      const res = await fetch(`${backendURL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      
      if (!res.ok) {
        setErrors({ email: data.message || 'Invalid credentials' });
        return;
      }

      // Store token in localStorage
      localStorage.setItem('token', data.token);

      // Call the onLogin callback to update app state
      if (onLogin) {
        onLogin({
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
          company: data.user.company,
          phone: data.user.phone,
          createdAt: data.user.createdAt,
        });
      }

      // Show success message and redirect
      alert('Login successful!');
      navigate('/contact'); // Redirect to contact page or wherever you want
      
    } catch (err) {
      console.error('Login error:', err);
      setErrors({ email: 'Server error. Try later.' });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Hidden on small screens */}
      <div className="hidden md:flex md:w-1/2 bg-black text-white items-center justify-center p-10 relative">
        <img
          src="https://images.unsplash.com/photo-1746420096724-5c0ddd30912a?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2hlbWljYWxzJTIwbmVvbnxlbnwwfHwwfHx8MA%3D%3D"
          alt="Login Graphic"
          className="absolute inset-0 w-full h-full object-cover opacity-90"
        />
        <div className="relative z-10 max-w-md">
          <p className="text-sm text-black font-bold tracking-widest uppercase mb-2">A wise quote</p>
          <h1 className="text-4xl md:text-5xl font-semibold leading-tight">
            Get Everything <br /> You Want
          </h1>
          <p className="mt-4 text-sm font-bold text-black opacity-100">
            You can get everything you want if you work hard, trust the process, and stick to the plan.
          </p>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full md:w-1/2 bg-white flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Logo */}
          <Link
            to="/">
          <div className="flex justify-center mb-6">
            <img src={LOGO} alt="Logo" className="h-16 w-auto" />
          </div></Link>

          <h2 className="text-3xl font-semibold text-gray-800 mb-2 text-center">Welcome Back</h2>
          <p className="text-sm text-gray-600 mb-6 text-center">
            Enter your email and password to access your account
          </p>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className={`pl-10 pr-4 py-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-black ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
              </div>
              {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className={`pl-10 pr-10 py-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-black ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && <p className="text-sm text-red-600 mt-1">{errors.password}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 px-4 rounded-md text-white font-semibold transition-all duration-300 ${
                loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-black hover:bg-gray-800'
              }`}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Signing in...
                </div>
              ) : (
                'Sign In'
              )}
            </button>

            {/* Bottom Link */}
            <div className="text-center text-sm text-gray-600 mt-4">
              Don't have an account?{' '}
              <Link to="/register" className="text-blue-600 font-medium hover:underline">
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;