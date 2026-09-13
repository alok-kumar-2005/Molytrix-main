import React from 'react';
import { Link } from 'react-router-dom';

import india from '../assets/flags/india.jpg';
import china from '../assets/flags/china.jpg';
import germany from '../assets/flags/germany.jpg';
import france from '../assets/flags/france.jpg';

const Footer = () => {
  return (
    <div className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Molytrix Petrochem</h3>
            <p className="text-gray-400">
              Your trusted partner in industrial lubricants and solutions.
            </p>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-lg font-semibold mb-4">
              <Link to="/products">Products</Link>
            </h4>
            <ul className="space-y-2 text-gray-400">
              <li>Hydraulic Oil</li>
              <li>Gear Oil</li>
              <li>Engine Oil</li>
              <li>Greases</li>
              <li>Aerosols</li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#about">About Us</a>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Global Presence */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Global Presence</h4>
            <div className="flex space-x-3">
              <img src={india} alt="India" className="w-8 h-5 object-cover rounded-sm" />
              <img src={china} alt="China" className="w-8 h-5 object-cover rounded-sm" />
              <img src={germany} alt="Germany" className="w-8 h-5 object-cover rounded-sm" />
              <img src={france} alt="France" className="w-8 h-5 object-cover rounded-sm" />
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Molytrix Petrochem. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;