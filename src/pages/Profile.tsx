import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Calendar, Camera, Moon, Sun, Trash2, Save, ArrowLeft } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

const Profile: React.FC = () => {
  const { user, updateProfile, deleteAccount, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  
  const [name, setName] = useState(user?.name || '');
  const [profilePicture, setProfilePicture] = useState(user?.profilePicture || '');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deletePassword, setDeletePassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSaveProfile = async () => {
    setLoading(true);
    setMessage('');
    
    try {
      updateProfile({ name, profilePicture });
      setMessage('Profile updated successfully!');
    } catch (error) {
      setMessage('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!deletePassword) {
      setMessage('Please enter your password to delete your account.');
      return;
    }

    setLoading(true);
    try {
      const success = await deleteAccount(deletePassword);
      if (success) {
        navigate('/');
      } else {
        setMessage('Incorrect password. Please try again.');
      }
    } catch (error) {
      setMessage('Failed to delete account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePicture(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!user) {
    return (
      <div className={`min-h-screen pt-16 flex items-center justify-center ${isDark ? 'bg-black' : 'bg-white'}`}>
        <div className="text-center">
          <h1 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Please log in to view your profile
          </h1>
          <button
            onClick={() => navigate('/login')}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen pt-16 ${isDark ? 'bg-black' : 'bg-gray-50'}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button
            onClick={() => navigate(-1)}
            className={`mr-4 p-2 rounded-full transition-colors hover:bg-opacity-10 hover:bg-green-500 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Profile Settings
          </h1>
        </div>

        {message && (
          <div className={`mb-6 p-4 rounded-lg ${
            message.includes('success') 
              ? 'bg-green-100 text-green-700 border border-green-400' 
              : 'bg-red-100 text-red-700 border border-red-400'
          }`}>
            {message}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Information */}
          <div className="lg:col-span-2">
            <div className={`rounded-lg shadow-lg p-6 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
              <h2 className={`text-xl font-semibold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Personal Information
              </h2>

              <div className="space-y-6">
                {/* Profile Picture */}
                <div className="flex items-center space-x-6">
                  <div className="relative">
                    {profilePicture ? (
                      <img
                        src={profilePicture}
                        alt="Profile"
                        className="w-20 h-20 rounded-full object-cover"
                      />
                    ) : (
                      <div className={`w-20 h-20 rounded-full flex items-center justify-center ${
                        isDark ? 'bg-gray-700' : 'bg-gray-200'
                      }`}>
                        <User className={`w-10 h-10 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                      </div>
                    )}
                    <label className="absolute bottom-0 right-0 bg-green-600 hover:bg-green-700 text-white p-1 rounded-full cursor-pointer transition-colors">
                      <Camera className="w-4 h-4" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleProfilePictureChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                  <div>
                    <h3 className={`text-lg font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Profile Picture
                    </h3>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      Click the camera icon to upload a new picture
                    </p>
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 ${
                      isDark 
                        ? 'bg-gray-800 border-gray-700 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  />
                </div>

                {/* Email (Read-only) */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}>
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={user.email}
                      readOnly
                      className={`w-full px-4 py-3 rounded-lg border cursor-not-allowed ${
                        isDark 
                          ? 'bg-gray-800 border-gray-700 text-gray-400' 
                          : 'bg-gray-100 border-gray-300 text-gray-500'
                      }`}
                    />
                    <Mail className={`absolute right-3 top-3 w-5 h-5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                  </div>
                  <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Email cannot be changed
                  </p>
                </div>

                {/* Member Since */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}>
                    Member Since
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={new Date(user.createdAt).toLocaleDateString()}
                      readOnly
                      className={`w-full px-4 py-3 rounded-lg border cursor-not-allowed ${
                        isDark 
                          ? 'bg-gray-800 border-gray-700 text-gray-400' 
                          : 'bg-gray-100 border-gray-300 text-gray-500'
                      }`}
                    />
                    <Calendar className={`absolute right-3 top-3 w-5 h-5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                  </div>
                </div>

                {/* Save Button */}
                <button
                  onClick={handleSaveProfile}
                  disabled={loading}
                  className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white px-6 py-3 rounded-lg font-medium transition-all transform hover:scale-105 flex items-center justify-center space-x-2"
                >
                  <Save className="w-5 h-5" />
                  <span>{loading ? 'Saving...' : 'Save Changes'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Settings Panel */}
          <div className="space-y-6">
            {/* Theme Toggle */}
            <div className={`rounded-lg shadow-lg p-6 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
              <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Theme Settings
              </h3>
              <button
                onClick={toggleTheme}
                className={`w-full flex items-center justify-between p-4 rounded-lg border-2 transition-all ${
                  isDark 
                    ? 'border-green-500 bg-green-500/10' 
                    : 'border-gray-300 hover:border-green-500'
                }`}
              >
                <div className="flex items-center space-x-3">
                  {isDark ? (
                    <Moon className="w-6 h-6 text-green-400" />
                  ) : (
                    <Sun className="w-6 h-6 text-yellow-500" />
                  )}
                  <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {isDark ? 'Dark Mode' : 'Light Mode'}
                  </span>
                </div>
                <div className={`w-12 h-6 rounded-full transition-colors ${
                  isDark ? 'bg-green-600' : 'bg-gray-300'
                }`}>
                  <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                    isDark ? 'translate-x-6' : 'translate-x-0.5'
                  } mt-0.5`} />
                </div>
              </button>
            </div>

            {/* Account Stats */}
            <div className={`rounded-lg shadow-lg p-6 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
              <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Account Statistics
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Movies in Watchlist
                  </span>
                  <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {user.watchlist.length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Account Type
                  </span>
                  <span className={`font-semibold text-green-600`}>
                    Free
                  </span>
                </div>
              </div>
            </div>

            {/* Danger Zone */}
            <div className={`rounded-lg shadow-lg p-6 border-2 border-red-500 ${
              isDark ? 'bg-red-900/20' : 'bg-red-50'
            }`}>
              <h3 className={`text-lg font-semibold mb-4 text-red-600`}>
                Danger Zone
              </h3>
              
              {!showDeleteConfirm ? (
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                >
                  <Trash2 className="w-5 h-5" />
                  <span>Delete Account</span>
                </button>
              ) : (
                <div className="space-y-4">
                  <p className={`text-sm ${isDark ? 'text-red-400' : 'text-red-600'}`}>
                    This action cannot be undone. Please enter your password to confirm.
                  </p>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    value={deletePassword}
                    onChange={(e) => setDeletePassword(e.target.value)}
                    className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-red-500 ${
                      isDark 
                        ? 'bg-gray-800 border-gray-700 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  />
                  <div className="flex space-x-2">
                    <button
                      onClick={handleDeleteAccount}
                      disabled={loading}
                      className="flex-1 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                      {loading ? 'Deleting...' : 'Confirm Delete'}
                    </button>
                    <button
                      onClick={() => {
                        setShowDeleteConfirm(false);
                        setDeletePassword('');
                      }}
                      className={`flex-1 border px-4 py-2 rounded-lg font-medium transition-colors ${
                        isDark 
                          ? 'border-gray-600 text-gray-300 hover:bg-gray-800' 
                          : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;