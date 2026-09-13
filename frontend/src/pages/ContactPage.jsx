import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Clock, Send, User, Building, MessageSquare, CheckCircle, Globe, Fan as Fax, AlertCircle } from 'lucide-react';
const backendURL = import.meta.env.VITE_BACKEND_URL
import { useNavigate, Link } from 'react-router-dom';
const ContactPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    subject: '',
    message: '',
    inquiryType: 'General Inquiry'
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const inquiryTypes = [
    { value: 'General Inquiry', label: 'General Inquiry' },
    { value: 'Request Quote', label: 'Request Quote' },
    { value: 'Technical Support', label: 'Technical Support' },
    { value: 'Partnership Opportunity', label: 'Partnership Opportunity' },
    { value: 'Complaint/Issue', label: 'Complaint/Issue' }
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    if (formData.phone && !/^\+?[\d\s-()]+$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ REMOVED AUTH CHECK - Contact form is now public
    if (!validateForm()) return;

    setLoading(true);
    console.log("Submitting:", formData);

    fetch(`${backendURL}/api/auth/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // ✅ REMOVED Authorization header - no token needed
      },
      body: JSON.stringify(formData)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Server response:', data);
        setSubmitted(true);
        setFormData({
          name: '',
          email: '',
          company: '',
          phone: '',
          inquiryType: 'General Inquiry',
          subject: '',
          message: '',
        });
        setTimeout(() => {
          setSubmitted(false);
        }, 3000);
      })
      .catch(error => {
        console.error('Error submitting contact form:', error);
        setErrors({ submit: 'Failed to send message. Please try again later.' });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full text-center">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="bg-green-100 rounded-full p-6 w-20 h-20 mx-auto mb-6">
              <CheckCircle className="h-8 w-8 text-green-600 mx-auto" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Message Sent!</h2>
            <p className="text-gray-600 mb-6">
              Thank you for contacting us. We'll get back to you within 24 hours.
            </p>
            <div className="animate-pulse text-sm text-gray-500">
              Redirecting back to form...
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get in touch with our team of Molytrix. We're here to help with your industrial lubrication needs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-8 h-fit">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
              <div className="space-y-6">
                {/* Contact items */}
                {[{
                  icon: <Phone className="h-6 w-6 text-blue-600" />,
                  title: 'Phone',
                  content: ['+91 77589 36968', 'Mon-Fri: 8:00 AM - 6:00 PM'],
                  bg: 'bg-blue-100'
                }, {
                  icon: <Mail className="h-6 w-6 text-green-600" />,
                  title: 'Email',
                  content: ['info@molytrixpetrochem.com', 'sales@molytrixpetrochem.com'],
                  bg: 'bg-green-100'
                }, {
                  icon: <MapPin className="h-6 w-6 text-purple-600" />,
                  title: 'Address',
                  content: ['Regd.Office(India): 138/A/1/12, Nakshatra, Rajbag Colony Warnali, Sangli, Maharashtra, India-416416','Plant Address: Avda.de Ranillas, 3A, 50018,Zaragoza Aragon, Spain-11600'],
                  bg: 'bg-purple-100'
                }, {
                  icon: <Clock className="h-6 w-6 text-orange-600" />,
                  title: 'Business Hours',
                  content: ['Monday - Friday: 8:00 AM - 6:00 PM', 'Saturday: Closed', 'Sunday: Closed'],
                  bg: 'bg-orange-100'
                },].map((item, i) => (
                  <div key={i} className="flex items-start space-x-4">
                    <div className={`${item.bg} rounded-full p-3`}>
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                      {item.content.map((line, j) => (
                        <p key={j} className="text-gray-600 text-sm">{line}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
              
              {/* ✅ REMOVED LOGIN WARNING - Contact form is now public */}

              {/* General Submit Error */}
              {errors.submit && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center">
                    <AlertCircle className="h-5 w-5 text-red-600 mr-3" />
                    <p className="text-sm text-red-700">{errors.submit}</p>
                  </div>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-3 py-3 border ${
                          errors.name ? 'border-red-300' : 'border-gray-300'
                        } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                        placeholder="Enter your full name"
                      />
                    </div>
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-3 py-3 border ${
                          errors.email ? 'border-red-300' : 'border-gray-300'
                        } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                        placeholder="Enter your email address"
                      />
                    </div>
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                      Company
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Building className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter your company name"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-3 py-3 border ${
                          errors.phone ? 'border-red-300' : 'border-gray-300'
                        } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                        placeholder="Enter your phone number"
                      />
                    </div>
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="inquiryType" className="block text-sm font-medium text-gray-700 mb-2">
                    Inquiry Type
                  </label>
                  <select
                    id="inquiryType"
                    name="inquiryType"
                    value={formData.inquiryType}
                    onChange={handleChange}
                    className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {inquiryTypes.map(type => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`w-full px-3 py-3 border ${
                      errors.subject ? 'border-red-300' : 'border-gray-300'
                    } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                    placeholder="Enter the subject of your inquiry"
                  />
                  {errors.subject && (
                    <p className="mt-1 text-sm text-red-600">{errors.subject}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <div className="relative">
                    <div className="absolute top-3 left-3 pointer-events-none">
                      <MessageSquare className="h-5 w-5 text-gray-400" />
                    </div>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-3 py-3 border ${
                        errors.message ? 'border-red-300' : 'border-gray-300'
                      } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical`}
                      placeholder="Please provide details about your inquiry..."
                    />
                  </div>
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                  )}
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white ${
                      loading
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-black hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                    } transition-colors`}
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                        Sending Message...
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5 mr-2" />
                        Send Message
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-12">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Find Us</h2>
            <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-sm text-gray-500 mt-2">
                  <b>Reg.d office (India):</b> 138/A/1/12, Nakshatra, Rajbag Colony, Warnali, Sangli, Maharashtra, India - 416416 <br />
                  <b>Plant Address:</b> Avda.de Ranillas, 3A, 50018,Zaragoza Aragon, Spain 11600
                </p>
                <a href="https://maps.app.goo.gl/iuKMNjuW7mHeKgnQA?g_st=ac"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm mt-2 inline-block">
                  View on Google Maps 
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;