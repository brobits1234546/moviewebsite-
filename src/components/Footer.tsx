import React from 'react';
import { Link } from 'react-router-dom';
import { Film, Mail, Phone, MapPin } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Footer: React.FC = () => {
  const { isDark } = useTheme();

  return (
    <footer className={`${isDark ? 'bg-gray-900' : 'bg-gray-100'} border-t ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <Film className={`w-8 h-8 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
              <span className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                CineVault
              </span>
            </Link>
            <p className={`text-sm mb-4 max-w-md ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Your ultimate destination for discovering and exploring movies. Create your personal watchlist, 
              get detailed movie information, and never miss a great film again.
            </p>
            <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              <p className="mb-1">Producers:</p>
              <p className="font-medium">Adonay Andualem & Yafet Simon</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className={`text-sm transition-colors hover:text-green-500 ${
                    isDark ? 'text-gray-300' : 'text-gray-600'
                  }`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className={`text-sm transition-colors hover:text-green-500 ${
                    isDark ? 'text-gray-300' : 'text-gray-600'
                  }`}
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className={`text-sm transition-colors hover:text-green-500 ${
                    isDark ? 'text-gray-300' : 'text-gray-600'
                  }`}
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/safety"
                  className={`text-sm transition-colors hover:text-green-500 ${
                    isDark ? 'text-gray-300' : 'text-gray-600'
                  }`}
                >
                  Safety Concerns
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <Mail className={`w-4 h-4 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
                <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  contact@cinevault.com
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className={`w-4 h-4 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
                <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  +1 (555) 123-4567
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className={`w-4 h-4 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
                <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  Los Angeles, CA
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className={`mt-8 pt-8 border-t ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              © 2025 CineVault. All rights reserved.
            </p>
            <p className={`text-sm mt-2 sm:mt-0 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Powered by TMDB API
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;