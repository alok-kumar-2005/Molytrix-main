import React, { useState, useEffect } from 'react';
import { AlertCircle, Plus, X, MapPin, Building, Phone, Globe, Trash2 } from 'lucide-react';

const backendURL = import.meta.env.VITE_BACKEND_URL;

const getCurrentUser = () => {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return null;
    }
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error('Error parsing user data:', error);
    localStorage.removeItem('user');
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

const Alert = ({ children, variant = 'default', onClose }) => {
  const baseClasses = 'p-3 sm:p-4 rounded-lg border flex items-start space-x-2 sm:space-x-3 mb-4';
  const variants = {
    default: 'bg-blue-50 border-blue-200 text-blue-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    success: 'bg-green-50 border-green-200 text-green-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800'
  };
  
  return (
    <div className={`${baseClasses} ${variants[variant]}`}>
      <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 flex-shrink-0" />
      <div className="flex-1 text-sm sm:text-base">{children}</div>
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

const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm, distributorName, isDeleting }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-md">
        <div className="flex items-center space-x-3 mb-4">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
            <Trash2 className="w-5 h-5 text-red-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Delete Distributor</h3>
            <p className="text-sm text-gray-600">This action cannot be undone.</p>
          </div>
        </div>
        
        <p className="text-gray-700 mb-6">
          Are you sure you want to delete <strong>{distributorName}</strong>?
        </p>
        
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 disabled:opacity-50 text-sm sm:text-base"
            disabled={isDeleting}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="w-full sm:flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 text-sm sm:text-base"
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
};

const AddDistributorModal = ({ isOpen, onClose, onSubmit, isSubmitting }) => {
  const [formData, setFormData] = useState({
    country: '',
    company: '',
    address: '',
    phone: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const resetForm = () => {
    setFormData({
      country: '',
      company: '',
      address: '',
      phone: ''
    });
  };

  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Add New Distributor</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
            disabled={isSubmitting}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Country *
            </label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              placeholder="Enter country"
              disabled={isSubmitting}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Company *
            </label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              placeholder="Enter company name"
              disabled={isSubmitting}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address *
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              placeholder="Enter address"
              disabled={isSubmitting}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone *
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              placeholder="Enter phone number"
              disabled={isSubmitting}
            />
          </div>
          
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 disabled:opacity-50 text-sm sm:text-base"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              className="w-full sm:flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 text-sm sm:text-base"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Adding...' : 'Add Distributor'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const DistributorCard = ({ distributor, onDelete, isAdmin, isDeleting }) => (
  <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
    <div className="space-y-3">
      <div className="flex items-start space-x-2">
        <Globe className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
        <div>
          <span className="text-xs text-gray-500 uppercase tracking-wide">Country</span>
          <p className="font-semibold text-gray-900">{distributor.country}</p>
        </div>
      </div>
      
      <div className="flex items-start space-x-2">
        <Building className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
        <div>
          <span className="text-xs text-gray-500 uppercase tracking-wide">Company</span>
          <p className="font-semibold text-gray-900">{distributor.company}</p>
        </div>
      </div>
      
      <div className="flex items-start space-x-2">
        <MapPin className="w-4 h-4 text-red-600 mt-1 flex-shrink-0" />
        <div>
          <span className="text-xs text-gray-500 uppercase tracking-wide">Address</span>
          <p className="text-gray-700 text-sm">{distributor.address}</p>
        </div>
      </div>
      
      <div className="flex items-start space-x-2">
        <Phone className="w-4 h-4 text-purple-600 mt-1 flex-shrink-0" />
        <div>
          <span className="text-xs text-gray-500 uppercase tracking-wide">Phone</span>
          <p className="text-gray-700 font-mono text-sm">{distributor.phone}</p>
        </div>
      </div>

      {/* Delete button for cards - only show for database distributors and admin users */}
      {isAdmin && distributor._id && (
        <div className="pt-2 border-t border-gray-100">
          <button
            onClick={() => onDelete(distributor)}
            disabled={isDeleting}
            className="w-full flex items-center justify-center space-x-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-md transition-colors disabled:opacity-50"
          >
            <Trash2 className="w-4 h-4" />
            <span className="text-sm">Delete</span>
          </button>
        </div>
      )}
    </div>
  </div>
);

const DistributorTable = () => {
  const staticDistributors = [
    {
      country: 'Brazil',
      company: 'Lactea Cientifica',
      address: 'Rua Scuvero 22301527-00, São Paulo (SP)',
      phone: '+55 11 3277 8523',
    },
    {
      country: 'Algeria',
      company: 'Tenerflow',
      address: 'Algeria',
      phone: '+216 98 938 128',
    },
    {
      country: 'Argentina',
      company: 'Supertec S.A',
      address: 'Piedras 1930, Buenos Aires',
      phone: '+54(11) 4307-2141',
    },
    {
      country: 'India',
      company: 'Wide Range Corporation',
      address: 'Aurangabad',
      phone: '+91 93733 50298',
    },
  ];

  const [distributors, setDistributors] = useState(staticDistributors);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [distributorToDelete, setDistributorToDelete] = useState(null);
  const [viewMode, setViewMode] = useState('cards'); // 'cards' or 'table'

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
      setIsLoading(false);
    };

    // Set initial view mode based on screen size
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setViewMode('cards');
      } else {
        setViewMode('table');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    
    initializeAuth();
    fetchDistributors();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const fetchDistributors = async () => {
    try {
      console.log('Fetching distributors from:', `${backendURL}/api/Distributor`);
      const response = await fetch(`${backendURL}/api/Distributor`);
      if (response.ok) {
        const data = await response.json();
        console.log('Distributors fetched:', data.distributors);
        if (data.distributors && data.distributors.length > 0) {
          setDistributors([...data.distributors, ...staticDistributors]);
        }
      } else {
        console.error('Failed to fetch distributors:', response.status);
      }
    } catch (error) {
      console.error('Error fetching distributors:', error);
    }
  };

  const handleAddDistributor = async (formData) => {
    setIsSubmitting(true);
    setSubmitError('');
    setSuccessMessage('');

    try {
      const token = getAuthToken();
      const response = await fetch(`${backendURL}/api/auth/Distributor`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage('Distributor added successfully!');
        setShowModal(false);
        setDistributors(prev => [data.distributors, ...prev]);
        
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        setSubmitError(data.message || 'Failed to add distributor');
      }
    } catch (error) {
      console.error('Error adding distributor:', error);
      setSubmitError('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteDistributor = async (distributor) => {
    setDistributorToDelete(distributor);
    setShowDeleteModal(true);
  };

  const confirmDeleteDistributor = async () => {
    if (!distributorToDelete || !distributorToDelete._id) return;

    setIsDeleting(true);
    setSubmitError('');
    setSuccessMessage('');

    try {
      const token = getAuthToken();
      console.log('Attempting to delete distributor:', distributorToDelete._id);
      console.log('DELETE URL:', `${backendURL}/api/auth/Distributor/${distributorToDelete._id}`);
      
      const response = await fetch(`${backendURL}/api/auth/Distributor/${distributorToDelete._id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('Delete response status:', response.status);
      console.log('Delete response ok:', response.ok);

      if (response.ok) {
        setSuccessMessage('Distributor deleted successfully!');
        setDistributors(prev => prev.filter(dist => dist._id !== distributorToDelete._id));
        setShowDeleteModal(false);
        setDistributorToDelete(null);
        
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        // Handle error response - only read the body once
        let errorMessage = `Failed to delete distributor (${response.status})`;
        
        try {
          // Clone the response to avoid consuming the body multiple times
          const responseClone = response.clone();
          const contentType = response.headers.get('content-type');
          
          if (contentType && contentType.includes('application/json')) {
            const data = await response.json();
            errorMessage = data.message || errorMessage;
          } else {
            const textResponse = await responseClone.text();
            errorMessage = textResponse || errorMessage;
          }
        } catch (parseError) {
          console.error('Error parsing error response:', parseError);
          // Use the default error message with status code
        }
        
        console.error('Delete failed:', errorMessage);
        setSubmitError(errorMessage);
      }
    } catch (error) {
      console.error('Error deleting distributor:', error);
      setSubmitError('Network error. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleOpenModal = () => {
    setShowModal(true);
    setSubmitError('');
  };

  if (isLoading) {
    return (
      <div className="py-12 sm:py-20 bg-white">
        <div className="flex justify-center items-center">
          <div className="text-lg text-gray-600">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 sm:py-12 lg:py-20 bg-white">
      <section className="bg-white py-1">
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 space-y-4 sm:space-y-0">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-gray-900 mb-2">
                Our Distributors
              </h2>
              <p className="text-gray-600 text-sm sm:text-base">
                Find our authorized distributors worldwide
              </p>
            </div>
            
            {/* Controls */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
              {/* View Toggle - Hidden on mobile */}
              <div className="hidden md:flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('table')}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    viewMode === 'table' 
                      ? 'bg-white text-gray-900 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Table
                </button>
                <button
                  onClick={() => setViewMode('cards')}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    viewMode === 'cards' 
                      ? 'bg-white text-gray-900 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Cards
                </button>
              </div>

              {/* Add Button */}
              {user && isAdmin && (
                <button
                  onClick={handleOpenModal}
                  className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors w-full sm:w-auto"
                >
                  <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-sm sm:text-base">Add Distributor</span>
                </button>
              )}
            </div>
          </div>

          {/* Alert Messages */}
          {submitError && (
            <div className="mb-4">
              <Alert variant="error" onClose={() => setSubmitError('')}>
                {submitError}
              </Alert>
            </div>
          )}

          {successMessage && (
            <div className="mb-4">
              <Alert variant="success" onClose={() => setSuccessMessage('')}>
                {successMessage}
              </Alert>
            </div>
          )}

          {/* Content */}
          {viewMode === 'cards' ? (
            /* Card View */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {distributors.map((dist, index) => (
                <DistributorCard 
                  key={dist._id || index} 
                  distributor={dist} 
                  onDelete={handleDeleteDistributor}
                  isAdmin={isAdmin}
                  isDeleting={isDeleting}
                />
              ))}
            </div>
          ) : (
            /* Table View - Only visible on desktop */
            <div className="hidden md:block overflow-x-auto border border-gray-300 rounded-lg shadow-sm">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left px-4 lg:px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Country
                    </th>
                    <th className="text-left px-4 lg:px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Company
                    </th>
                    <th className="text-left px-4 lg:px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Address
                    </th>
                    <th className="text-left px-4 lg:px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Phone
                    </th>
                    {isAdmin && (
                      <th className="text-left px-4 lg:px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {distributors.map((dist, index) => (
                    <tr key={dist._id || index} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Globe className="w-4 h-4 text-blue-600 mr-2" />
                          <span className="text-sm font-medium text-gray-900">{dist.country}</span>
                        </div>
                      </td>
                      <td className="px-4 lg:px-6 py-4">
                        <div className="flex items-center">
                          <Building className="w-4 h-4 text-green-600 mr-2" />
                          <span className="text-sm text-gray-900">{dist.company}</span>
                        </div>
                      </td>
                      <td className="px-4 lg:px-6 py-4">
                        <div className="flex items-start">
                          <MapPin className="w-4 h-4 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{dist.address}</span>
                        </div>
                      </td>
                      <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Phone className="w-4 h-4 text-purple-600 mr-2" />
                          <span className="text-sm text-gray-700 font-mono">{dist.phone}</span>
                        </div>
                      </td>
                      {isAdmin && (
                        <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                          {/* Only show delete button for database distributors (those with _id) */}
                          {dist._id ? (
                            <button
                              onClick={() => handleDeleteDistributor(dist)}
                              disabled={isDeleting}
                              className="inline-flex items-center px-3 py-1 border border-red-300 text-sm font-medium rounded-md text-red-700 bg-red-50 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 transition-colors"
                            >
                              <Trash2 className="w-4 h-4 mr-1" />
                              Delete
                            </button>
                          ) : (
                            <span className="text-xs text-gray-400">Static</span>
                          )}
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Stats */}
          <div className="mt-6 sm:mt-8 text-center">
            <p className="text-sm sm:text-base text-gray-600">
              Showing <span className="font-semibold">{distributors.length}</span> distributors worldwide
            </p>
          </div>
        </div>
      </section>

      {/* Add Distributor Modal */}
      <AddDistributorModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleAddDistributor}
        isSubmitting={isSubmitting}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmDeleteModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setDistributorToDelete(null);
        }}
        onConfirm={confirmDeleteDistributor}
        distributorName={distributorToDelete?.company}
        isDeleting={isDeleting}
      />
    </div>
  );
};

export default DistributorTable;