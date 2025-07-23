import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, User, Menu, X, Film, LogOut, Settings, BookmarkIcon } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { user, logout } = useAuth();
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const handleGetStarted = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isDark ? 'bg-black/90' : 'bg-white/90'
    } backdrop-blur-md border-b ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <Film className={`w-8 h-8 ${isDark ? 'text-green-400' : 'text-green-600'} group-hover:scale-110 transition-transform`} />
            <span className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} group-hover:text-green-500 transition-colors`}>
             YAHMovies
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`font-medium transition-colors hover:text-green-500 ${
                isActive('/') 
                  ? 'text-green-500' 
                  : isDark ? 'text-white' : 'text-gray-900'
              }`}
            >
              Home
            </Link>
            {user && (
              <Link
                to="/dashboard"
                className={`font-medium transition-colors hover:text-green-500 ${
                  isActive('/dashboard') 
                    ? 'text-green-500' 
                    : isDark ? 'text-white' : 'text-gray-900'
                }`}
              >
                Dashboard
              </Link>
            )}
            <Link
              to="/about"
              className={`font-medium transition-colors hover:text-green-500 ${
                isActive('/about') 
                  ? 'text-green-500' 
                  : isDark ? 'text-white' : 'text-gray-900'
              }`}
            >
              About
            </Link>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden sm:flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search movies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-64 px-4 py-2 pl-10 rounded-full border transition-all focus:outline-none focus:ring-2 focus:ring-green-500 ${
                  isDark 
                    ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
              />
              <Search className={`absolute left-3 top-2.5 w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
            </div>
          </form>

          {/* User Menu / Get Started */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className={`flex items-center space-x-2 p-2 rounded-full hover:bg-opacity-10 hover:bg-green-500 transition-colors ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {user.profilePicture ? (
                    <img
                      src={user.profilePicture}
                      alt={user.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <User className="w-6 h-6" />
                  )}
                  <span className="hidden sm:block font-medium">{user.name}</span>
                </button>

                {showProfileMenu && (
                  <div className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg ${
                    isDark ? 'bg-gray-800' : 'bg-white'
                  } ring-1 ring-black ring-opacity-5 z-50`}>
                    <div className="py-1">
                      <Link
                        to="/profile"
                        className={`flex items-center px-4 py-2 text-sm hover:bg-green-500 hover:text-white transition-colors ${
                          isDark ? 'text-white' : 'text-gray-700'
                        }`}
                        onClick={() => setShowProfileMenu(false)}
                      >
                        <Settings className="w-4 h-4 mr-3" />
                        Profile Settings
                      </Link>
                      <Link
                        to="/watchlist"
                        className={`flex items-center px-4 py-2 text-sm hover:bg-green-500 hover:text-white transition-colors ${
                          isDark ? 'text-white' : 'text-gray-700'
                        }`}
                        onClick={() => setShowProfileMenu(false)}
                      >
                        <BookmarkIcon className="w-4 h-4 mr-3" />
                        My Watchlist
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                          setShowProfileMenu(false);
                        }}
                        className={`flex items-center w-full px-4 py-2 text-sm hover:bg-red-500 hover:text-white transition-colors ${
                          isDark ? 'text-white' : 'text-gray-700'
                        }`}
                      >
                        <LogOut className="w-4 h-4 mr-3" />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={handleGetStarted}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full font-medium transition-all transform hover:scale-105"
              >
                Get Started
              </button>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`md:hidden p-2 rounded-md hover:bg-opacity-10 hover:bg-green-500 transition-colors ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className={`md:hidden border-t ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/"
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isActive('/') 
                    ? 'text-green-500 bg-green-500 bg-opacity-10' 
                    : isDark 
                      ? 'text-white hover:text-green-400' 
                      : 'text-gray-900 hover:text-green-600'
                }`}
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              {user && (
                <Link
                  to="/dashboard"
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActive('/dashboard') 
                      ? 'text-green-500 bg-green-500 bg-opacity-10' 
                      : isDark 
                        ? 'text-white hover:text-green-400' 
                        : 'text-gray-900 hover:text-green-600'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </Link>
              )}
              <Link
                to="/about"
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isActive('/about') 
                    ? 'text-green-500 bg-green-500 bg-opacity-10' 
                    : isDark 
                      ? 'text-white hover:text-green-400' 
                      : 'text-gray-900 hover:text-green-600'
                }`}
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="px-3 py-2">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search movies..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`w-full px-4 py-2 pl-10 rounded-full border transition-all focus:outline-none focus:ring-2 focus:ring-green-500 ${
                      isDark 
                        ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                  />
                  <Search className={`absolute left-3 top-2.5 w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
