import React, { useState, useEffect } from 'react';
import { AlertCircle, Shield } from 'lucide-react';

const backendURL = import.meta.env.VITE_BACKEND_URL;

// Helper functions for authentication
const getCurrentUser = () => {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return null;
    }
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error('Error parsing user data:', error);
    localStorage.removeItem('user'); // Clear corrupted data
    return null;
  }
};

const getAuthToken = () => {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return null;
    }
    return localStorage.getItem('token');
  } catch (error) {
    console.error('Error getting auth token:', error);
    return null;
  }
};

const isAdminUser = () => {
  const user = getCurrentUser();
  return user?.email === 'molytrixpetrochem25@gmail.com';
};

// Alert Component
const Alert = ({ children, variant = 'default', onClose }) => {
  const baseClasses = 'p-4 rounded-lg border flex items-start space-x-3 mb-4';
  const variants = {
    default: 'bg-blue-50 border-blue-200 text-blue-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    success: 'bg-green-50 border-green-200 text-green-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800'
  };
  
  return (
    <div className={`${baseClasses} ${variants[variant]}`}>
      <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
      <div className="flex-1">{children}</div>
      {onClose && (
        <button 
          onClick={onClose}
          className="ml-2 text-gray-500 hover:text-gray-700"
        >
          ×
        </button>
      )}
    </div>
  );
};

const AdminProduct = ({ onProductAdded }) => {
  const [formData, setFormData] = useState({
    imageFile: null,
    heading: '',
    description: '',
    availablesizes: '',
    flashpoint: '',
    viscosityindex: '',
    keyfeatures: [''],
    applications: [''],
    certifications: [''],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check authentication on component mount
  useEffect(() => {
    const initializeAuth = async () => {
      setIsLoading(true);
      const currentUser = getCurrentUser();
      const adminStatus = isAdminUser();
      const token = getAuthToken();
      
      console.log('Auth Debug - Current user:', currentUser);
      console.log('Auth Debug - Token exists:', !!token);
      console.log('Auth Debug - Is admin:', adminStatus);
      
      setUser(currentUser);
      setIsAdmin(adminStatus);

      // Show warning if user is not admin
      if (currentUser && !adminStatus) {
        setAuthError('Access denied. Only admin users can add products.');
      } else if (!currentUser) {
        setAuthError('Please log in to add products.');
      }
      
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const validateForm = () => {
    if (!formData.imageFile) {
      setSubmitError('Please select an image file');
      return false;
    }
    if (!formData.heading.trim()) {
      setSubmitError('Product heading is required');
      return false;
    }
    if (!formData.description.trim()) {
      setSubmitError('Product description is required');
      return false;
    }
    if (!formData.availablesizes.trim()) {
      setSubmitError('Available sizes are required');
      return false;
    }
    if (!formData.flashpoint.trim()) {
      setSubmitError('Flash point is required');
      return false;
    }
    if (!formData.viscosityindex.trim()) {
      setSubmitError('Viscosity index is required');
      return false;
    }
    return true;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear errors when user starts typing
    if (submitError) setSubmitError('');
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setSubmitError('Please select a valid image file');
        return;
      }
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setSubmitError('Image file must be less than 5MB');
        return;
      }
      setFormData(prev => ({ ...prev, imageFile: file }));
      setSubmitError('');
    }
  };

  const handleArrayChange = (e, index, field) => {
    const updated = [...formData[field]];
    updated[index] = e.target.value;
    setFormData(prev => ({ ...prev, [field]: updated }));
  };

  const addArrayItem = (field) => {
    setFormData(prev => ({ ...prev, [field]: [...prev[field], ''] }));
  };

  const removeArrayItem = (index, field) => {
    if (formData[field].length > 1) {
      const updated = formData[field].filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, [field]: updated }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log('Submit triggered');
    
    // Clear previous errors
    setSubmitError('');
    setAuthError('');
    
    // Validate form
    if (!validateForm()) {
      return;
    }
    
    // Check authentication before submitting
    const token = getAuthToken();
    if (!token || !isAdmin) {
      console.log('Submission debug — token:', token);
console.log('Submission debug — isAdmin:', isAdmin);
console.log('Submission debug — user:', user);

      setAuthError('Authentication required. Please log in as admin.');
      return;
    }

    setIsSubmitting(true);

    const data = new FormData();
    data.append("image", formData.imageFile);
    data.append("heading", formData.heading);
    data.append("description", formData.description);
    data.append("availablesizes", formData.availablesizes);
    data.append("flashpoint", formData.flashpoint);
    data.append("viscosityindex", formData.viscosityindex);
    data.append("keyfeatures", JSON.stringify(formData.keyfeatures.filter(k => k.trim() !== '')));
    data.append("applications", JSON.stringify(formData.applications.filter(a => a.trim() !== '')));
    data.append("certifications", JSON.stringify(formData.certifications.filter(c => c.trim() !== '')));

    try {
      console.log('Sending request to API...');
      const res = await fetch(`${backendURL}/api/products`, {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: data,
      });

      console.log('Response status:', res.status);

      if (res.ok) {
        const result = await res.json();
        console.log('Success response:', result);
        alert("✅ Product added successfully!");
        
        // Reset form
        setFormData({
          imageFile: null,
          heading: '',
          description: '',
          availablesizes: '',
          flashpoint: '',
          viscosityindex: '',
          keyfeatures: [''],
          applications: [''],
          certifications: [''],
        });
        
        // Reset file input
        const fileInput = document.querySelector('input[type="file"]');
        if (fileInput) {
          fileInput.value = '';
        }
        
        // Call the callback to refresh products list
        if (onProductAdded) {
          onProductAdded();
        }
      } else {
        const errorData = await res.json().catch(() => ({ error: 'Unknown error' }));
        console.log('Error response:', errorData);
        
        if (res.status === 403) {
          setAuthError('Access denied. Only admin users can upload products.');
        } else if (res.status === 401) {
          setAuthError('Authentication failed. Please log in again.');
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        } else {
          setSubmitError(`Error: ${errorData.error || 'Failed to add product'}`);
        }
      }
    } catch (err) {
      console.error('Network error:', err);
      setSubmitError("Upload failed. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderArrayInputs = (field, label) => (
    <div>
      <label className="block font-semibold mb-1">{label}</label>
      {formData[field].map((item, index) => (
        <div key={index} className="flex items-center mb-2">
          <input
            type="text"
            value={item}
            onChange={(e) => handleArrayChange(e, index, field)}
            className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={`Enter ${label.toLowerCase().slice(0, -1)}`}
          />
          {formData[field].length > 1 && (
            <button
              type="button"
              onClick={() => removeArrayItem(index, field)}
              className="ml-2 text-red-600 hover:text-red-800 font-bold px-2"
              title="Remove"
            >
              ×
            </button>
          )}
        </div>
      ))}
      <button 
        type="button" 
        onClick={() => addArrayItem(field)} 
        className="text-blue-600 hover:text-blue-800 text-sm mb-4 font-medium"
      >
        + Add More {label.slice(0, -1)}
      </button>
    </div>
  );

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show access denied message if user is not logged in
  if (!user) {
    return (
      <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md">
        <Alert variant="warning">
          <div>
            <div className="font-semibold">Authentication Required</div>
            <div className="mt-1">Please log in to access the product management system.</div>
          </div>
        </Alert>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md">
        <Alert variant="error">
          <div>
            <div className="font-semibold">Access Denied</div>
            <div className="mt-1">Only admin users (molytrixpetrochem25@gmail.com 

) can add products.</div>
            <div className="mt-2 text-sm">Current user: {user.email}</div>
          </div>
        </Alert>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md">
      {/* Admin indicator */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Add New Product</h2>
        <div className="flex items-center space-x-2 text-green-600">
          <Shield className="w-5 h-5" />
          <span className="text-sm font-medium">Admin Access</span>
        </div>
      </div>

      {/* Show auth error if any */}
      {authError && (
        <Alert variant="error" onClose={() => setAuthError('')}>
          {authError}
        </Alert>
      )}

      {/* Show submit error if any */}
      {submitError && (
        <Alert variant="error" onClose={() => setSubmitError('')}>
          {submitError}
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Image Upload */}
        <div>
          <label className="block font-semibold mb-1">Product Image *</label>
          <input
            type="file"
            accept="image/*"
            required
            onChange={handleFileChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-sm text-gray-500 mt-1">Supported formats: JPG, PNG, GIF (Max 5MB)</p>
        </div>

        {/* Product Heading */}
        <div>
          <label className="block font-semibold mb-1">Product Heading *</label>
          <input
            type="text"
            name="heading"
            value={formData.heading}
            onChange={handleInputChange}
            placeholder="Enter product name"
            required
            className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-semibold mb-1">Description *</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Enter detailed product description"
            required
            rows="4"
            className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Available Sizes */}
        <div>
          <label className="block font-semibold mb-1">Available Sizes *</label>
          <input
            type="text"
            name="availablesizes"
            value={formData.availablesizes}
            onChange={handleInputChange}
            placeholder="e.g., 1L, 5L, 20L, 208L"
            required
            className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-sm text-gray-500 mt-1">Separate multiple sizes with commas</p>
        </div>

        {/* Technical Specifications */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-1">Flash Point *</label>
            <input
              type="text"
              name="flashpoint"
              value={formData.flashpoint}
              onChange={handleInputChange}
              placeholder="e.g., 220°C"
              required
              className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block font-semibold mb-1">Viscosity Index *</label>
            <input
              type="text"
              name="viscosityindex"
              value={formData.viscosityindex}
              onChange={handleInputChange}
              placeholder="e.g., 105"
              required
              className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Dynamic Arrays */}
        {renderArrayInputs("keyfeatures", "Key Features")}
        {renderArrayInputs("applications", "Applications")}
        {renderArrayInputs("certifications", "Certifications")}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full font-semibold py-3 px-6 rounded-md transition duration-300 ${
            isSubmitting
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-black hover:bg-gray-700 text-white'
          }`}
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Adding Product...
            </div>
          ) : (
            'Submit Product'
          )}
        </button>
      </form>
    </div>
  );
};

export default AdminProduct;