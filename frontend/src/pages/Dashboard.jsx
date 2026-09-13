import React, { useState } from 'react';
import { User, Edit2, Save, X } from 'lucide-react';

const Dashboard = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    company: user.company || '',
    phone: user.phone || '',
    address: user.address || '',
  });

  const handleSave = () => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers = users.map(u =>
      u.id === user.id ? { ...u, ...formData } : u
    );
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    const currentUser = { ...user, ...formData };
    localStorage.setItem('user', JSON.stringify(currentUser));

    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user.name,
      email: user.email,
      company: user.company || '',
      phone: user.phone || '',
      address: user.address || '',
    });
    setIsEditing(false);
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-200 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-black to-gray-700 px-6 py-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-white rounded-full p-3">
                  <User className="h-8 w-8 text-blue-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">Welcome back, {user.name}</h1>
                  <p className="text-blue-100">Member since {new Date(user.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-gray-100 transition-colors flex items-center space-x-2"
              >
                <Edit2 className="h-4 w-4" />
                <span className='text-black'>Edit Profile</span>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Profile Information */}
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-gray-900">Profile Information</h2>
                <div className="space-y-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-md">{user.name}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    {isEditing ? (
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-md">{user.email}</p>
                    )}
                  </div>

                  {/* Company */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Company
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Enter your company name"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-md">
                        {user.company || 'Not specified'}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    {isEditing ? (
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter your phone number"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-md">
                        {user.phone || 'Not specified'}
                      </p>
                    )}
                  </div>

                  {/* Address */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address
                    </label>
                    {isEditing ? (
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Enter your address"
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-md">
                        {user.address || 'Not specified'}
                      </p>
                    )}
                  </div>
                </div>

                {/* Save/Cancel Buttons */}
                {isEditing && (
                  <div className="flex space-x-3">
                    <button
                      onClick={handleSave}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2"
                    >
                      <Save className="h-4 w-4" />
                      <span>Save Changes</span>
                    </button>
                    <button
                      onClick={handleCancel}
                      className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors flex items-center space-x-2"
                    >
                      <X className="h-4 w-4" />
                      <span>Cancel</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Account Overview */}
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-gray-900">Account Overview</h2>

                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-blue-900">Account Status</h3>
                    <p className="text-2xl font-bold text-blue-600 mt-1">Active</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-green-900">Orders Placed</h3>
                    <p className="text-2xl font-bold text-green-600 mt-1">12</p>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-orange-900">Pending Orders</h3>
                    <p className="text-2xl font-bold text-orange-600 mt-1">2</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-purple-900">Loyalty Points</h3>
                    <p className="text-2xl font-bold text-purple-600 mt-1">1,250</p>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Recent Activity</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Order #12345 completed</span>
                      <span className="text-gray-400">2 days ago</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Profile updated</span>
                      <span className="text-gray-400">1 week ago</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Order #12344 shipped</span>
                      <span className="text-gray-400">2 weeks ago</span>
                    </div>
                  </div>
                </div>

                {/* Preferred Lubricant Types */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Preferred Lubricant Types</h3>
                  <div className="space-y-2">
                    {[
                      { id: 'synthetic-pref', label: 'Synthetic Lubricants', defaultChecked: true },
                      { id: 'bio-pref', label: 'Biodegradable Options' },
                      { id: 'hightemp-pref', label: 'High Temperature Resistant', defaultChecked: true },
                      { id: 'longlife-pref', label: 'Extended Service Life' },
                    ].map(({ id, label, defaultChecked }) => (
                      <div key={id} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={id}
                          defaultChecked={defaultChecked}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor={id} className="text-sm text-gray-700">
                          {label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 
    </div>
  );
};

export default Dashboard;
