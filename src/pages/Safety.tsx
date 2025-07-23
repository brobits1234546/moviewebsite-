import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield, AlertTriangle, Eye, Lock, Users, FileText } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import ScrollReveal from '../components/ScrollReveal';

const Safety: React.FC = () => {
  const { isDark } = useTheme();
  const navigate = useNavigate();

  return (
    <div className={`min-h-screen pt-16 ${isDark ? 'bg-black' : 'bg-white'}`}>
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
            Safety & Security
          </h1>
        </div>

        {/* Introduction */}
        <ScrollReveal direction="up">
          <div className="mb-12">
            <div className="flex items-center mb-6">
              <Shield className={`w-8 h-8 mr-3 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
              <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Your Safety is Our Priority
              </h2>
            </div>
            <p className={`text-lg leading-relaxed mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              At CineVault, we take your safety and security seriously. This page outlines our safety measures, 
              security practices, and how we work to create a safe environment for all users to discover and 
              enjoy movies.
            </p>
          </div>
        </ScrollReveal>

        {/* Account Security */}
        <ScrollReveal direction="up" delay={200}>
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <Lock className={`w-6 h-6 mr-3 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
              <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Account Security
              </h3>
            </div>
            
            <div className="space-y-6">
              <div className={`p-6 rounded-lg ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
                <h4 className={`text-lg font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Password Protection
                </h4>
                <ul className={`space-y-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  <li>• Create strong passwords with at least 6 characters</li>
                  <li>• Passwords are encrypted and never stored in plain text</li>
                  <li>• Use unique passwords not used on other websites</li>
                  <li>• Consider using a password manager for better security</li>
                </ul>
              </div>

              <div className={`p-6 rounded-lg ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
                <h4 className={`text-lg font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Account Management
                </h4>
                <ul className={`space-y-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  <li>• Log out from shared or public devices</li>
                  <li>• Regularly review your account settings</li>
                  <li>• Delete your account permanently if no longer needed</li>
                  <li>• Report suspicious account activity immediately</li>
                </ul>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* Data Protection */}
        <ScrollReveal direction="up" delay={300}>
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <Eye className={`w-6 h-6 mr-3 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
              <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Data Protection
              </h3>
            </div>
            
            <div className={`p-6 rounded-lg ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
              <div className="space-y-4">
                <div className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  <h4 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Local Data Storage
                  </h4>
                  <p>
                    Your personal information and watchlist data are stored locally in your browser. This means 
                    your data stays on your device and isn't transmitted to external servers, providing an 
                    additional layer of privacy protection.
                  </p>
                </div>
                
                <div className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  <h4 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Data Minimization
                  </h4>
                  <p>
                    We only collect the minimum information necessary to provide our service. Optional profile 
                    pictures are stored locally, and you can remove them at any time.
                  </p>
                </div>

                <div className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  <h4 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Third-Party Data
                  </h4>
                  <p>
                    Movie information is sourced from The Movie Database (TMDB) API. We don't share your personal 
                    data with TMDB or any other third parties.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* Content Safety */}
        <ScrollReveal direction="up" delay={400}>
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <FileText className={`w-6 h-6 mr-3 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
              <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Content Safety
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className={`p-6 rounded-lg ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
                <h4 className={`font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Movie Ratings
                </h4>
                <ul className={`space-y-2 text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  <li>• All movie ratings are sourced from TMDB</li>
                  <li>• Age ratings and content warnings are displayed</li>
                  <li>• Movies are classified by genre and content type</li>
                  <li>• Parental guidance information is provided when available</li>
                </ul>
              </div>

              <div className={`p-6 rounded-lg ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
                <h4 className={`font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Content Standards
                </h4>
                <ul className={`space-y-2 text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  <li>• All content follows TMDB's community guidelines</li>
                  <li>• Movie descriptions and images are moderated</li>
                  <li>• Inappropriate content is filtered out</li>
                  <li>• Trailer content is sourced from official sources</li>
                </ul>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* Community Guidelines */}
        <ScrollReveal direction="up" delay={500}>
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <Users className={`w-6 h-6 mr-3 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
              <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Community Guidelines
              </h3>
            </div>
            
            <div className={`p-6 rounded-lg ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
              <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                While CineVault is primarily a personal movie discovery tool, we expect all users to:
              </p>
              <ul className={`space-y-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                <li>• Respect the intellectual property rights of movie creators</li>
                <li>• Use the platform for its intended purpose of movie discovery</li>
                <li>• Avoid attempting to compromise the security of the platform</li>
                <li>• Report any technical issues or security concerns promptly</li>
                <li>• Be mindful of age-appropriate content when sharing recommendations</li>
              </ul>
            </div>
          </section>
        </ScrollReveal>

        {/* Safety Tips */}
        <ScrollReveal direction="up" delay={600}>
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <AlertTriangle className={`w-6 h-6 mr-3 ${isDark ? 'text-yellow-500' : 'text-yellow-600'}`} />
              <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Safety Tips for Users
              </h3>
            </div>
            
            <div className="space-y-4">
              <div className={`p-4 rounded-lg border-l-4 border-yellow-500 ${
                isDark ? 'bg-yellow-900/20' : 'bg-yellow-50'
              }`}>
                <h4 className={`font-semibold mb-2 ${isDark ? 'text-yellow-400' : 'text-yellow-800'}`}>
                  General Internet Safety
                </h4>
                <ul className={`space-y-1 text-sm ${isDark ? 'text-yellow-300' : 'text-yellow-700'}`}>
                  <li>• Always log out when using shared computers</li>
                  <li>• Be cautious about downloading movies from unofficial sources</li>
                  <li>• Verify movie streaming sources are legitimate</li>
                  <li>• Keep your browser updated for security patches</li>
                </ul>
              </div>

              <div className={`p-4 rounded-lg border-l-4 border-blue-500 ${
                isDark ? 'bg-blue-900/20' : 'bg-blue-50'
              }`}>
                <h4 className={`font-semibold mb-2 ${isDark ? 'text-blue-400' : 'text-blue-800'}`}>
                  Account Protection
                </h4>
                <ul className={`space-y-1 text-sm ${isDark ? 'text-blue-300' : 'text-blue-700'}`}>
                  <li>• Never share your account credentials with others</li>
                  <li>• Use different passwords for different websites</li>
                  <li>• Clear browser data if using a public computer</li>
                  <li>• Be aware of phishing attempts (we'll never ask for passwords via email)</li>
                </ul>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* Reporting Issues */}
        <ScrollReveal direction="up" delay={700}>
          <section className="mb-12">
            <h3 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Reporting Safety Concerns
            </h3>
            
            <div className={`p-6 rounded-lg ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
              <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                If you encounter any safety or security issues while using CineVault, please contact us immediately:
              </p>
              <div className={`space-y-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                <p><strong>Security Issues:</strong> security@cinevault.com</p>
                <p><strong>Content Concerns:</strong> content@cinevault.com</p>
                <p><strong>General Support:</strong> support@cinevault.com</p>
                <p><strong>Response Time:</strong> We aim to respond within 24-48 hours</p>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* Emergency Contacts */}
        <ScrollReveal direction="up" delay={800}>
          <section className="mb-8">
            <div className={`p-6 rounded-lg border-2 ${
              isDark ? 'bg-red-900/20 border-red-700' : 'bg-red-50 border-red-200'
            }`}>
              <h3 className={`text-lg font-bold mb-3 ${isDark ? 'text-red-400' : 'text-red-800'}`}>
                Emergency or Urgent Security Issues
              </h3>
              <p className={`mb-3 ${isDark ? 'text-red-300' : 'text-red-700'}`}>
                For urgent security vulnerabilities or immediate safety concerns:
              </p>
              <div className={`${isDark ? 'text-red-200' : 'text-red-600'}`}>
                <p><strong>Emergency Contact:</strong> urgent@cinevault.com</p>
                <p><strong>Creators:</strong> Adonay Andualem & Yafet Simon</p>
                <p className="text-sm mt-2">
                  Please include "URGENT" in the subject line for immediate attention.
                </p>
              </div>
            </div>
          </section>
        </ScrollReveal>
      </div>
    </div>
  );
};

export default Safety;