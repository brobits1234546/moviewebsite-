import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield, Eye, Lock, Database } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import ScrollReveal from '../components/ScrollReveal';

const Privacy: React.FC = () => {
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
            Privacy Policy
          </h1>
        </div>

        {/* Introduction */}
        <ScrollReveal direction="up">
          <div className="mb-12">
            <div className="flex items-center mb-6">
              <Shield className={`w-8 h-8 mr-3 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
              <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Your Privacy Matters
              </h2>
            </div>
            <p className={`text-lg leading-relaxed mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              At CineVault, we are committed to protecting your privacy and ensuring the security of your personal information. 
              This Privacy Policy explains how we collect, use, and safeguard your data when you use our movie discovery platform.
            </p>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Last updated: January 2025
            </p>
          </div>
        </ScrollReveal>

        {/* Information We Collect */}
        <ScrollReveal direction="up" delay={200}>
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <Database className={`w-6 h-6 mr-3 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
              <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Information We Collect
              </h3>
            </div>
            
            <div className="space-y-6">
              <div className={`p-6 rounded-lg ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
                <h4 className={`text-lg font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Personal Information
                </h4>
                <ul className={`space-y-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  <li>• Email address (required for account creation)</li>
                  <li>• Full name (for personalization)</li>
                  <li>• Profile picture (optional)</li>
                  <li>• Password (encrypted and stored securely)</li>
                </ul>
              </div>

              <div className={`p-6 rounded-lg ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
                <h4 className={`text-lg font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Usage Information
                </h4>
                <ul className={`space-y-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  <li>• Movies added to your watchlist</li>
                  <li>• Search queries and browsing history</li>
                  <li>• Device information and browser type</li>
                  <li>• Account preferences and settings</li>
                </ul>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* How We Use Your Information */}
        <ScrollReveal direction="up" delay={300}>
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <Eye className={`w-6 h-6 mr-3 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
              <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                How We Use Your Information
              </h3>
            </div>
            
            <div className={`p-6 rounded-lg ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
              <ul className={`space-y-3 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                <li className="flex items-start">
                  <span className="font-medium mr-2">Service Provision:</span>
                  To provide and maintain our movie discovery service, including user accounts and watchlists.
                </li>
                <li className="flex items-start">
                  <span className="font-medium mr-2">Personalization:</span>
                  To customize your experience and provide relevant movie recommendations.
                </li>
                <li className="flex items-start">
                  <span className="font-medium mr-2">Communication:</span>
                  To send important account updates and service notifications (no marketing emails without consent).
                </li>
                <li className="flex items-start">
                  <span className="font-medium mr-2">Improvement:</span>
                  To analyze usage patterns and improve our platform's functionality and user experience.
                </li>
                <li className="flex items-start">
                  <span className="font-medium mr-2">Security:</span>
                  To protect against unauthorized access and maintain the security of our platform.
                </li>
              </ul>
            </div>
          </section>
        </ScrollReveal>

        {/* Data Security */}
        <ScrollReveal direction="up" delay={400}>
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <Lock className={`w-6 h-6 mr-3 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
              <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Data Security & Storage
              </h3>
            </div>
            
            <div className={`p-6 rounded-lg ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
              <div className="space-y-4">
                <div className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  <h4 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Local Storage
                  </h4>
                  <p>
                    Your account information is stored locally in your browser's storage. This means your data 
                    remains on your device and is not transmitted to external servers.
                  </p>
                </div>
                
                <div className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  <h4 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Password Protection
                  </h4>
                  <p>
                    All passwords are handled securely and are never stored in plain text. We use industry-standard 
                    practices to protect your login credentials.
                  </p>
                </div>

                <div className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  <h4 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Third-Party APIs
                  </h4>
                  <p>
                    Movie data is sourced from The Movie Database (TMDB) API. We only request publicly available 
                    movie information and do not share your personal data with TMDB.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* Your Rights */}
        <ScrollReveal direction="up" delay={500}>
          <section className="mb-12">
            <h3 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Your Rights & Choices
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className={`p-6 rounded-lg ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
                <h4 className={`font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Access & Control
                </h4>
                <ul className={`space-y-2 text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  <li>• View and edit your profile information</li>
                  <li>• Manage your watchlist</li>
                  <li>• Update account preferences</li>
                  <li>• Change or delete your profile picture</li>
                </ul>
              </div>

              <div className={`p-6 rounded-lg ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
                <h4 className={`font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Account Management
                </h4>
                <ul className={`space-y-2 text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  <li>• Delete your account at any time</li>
                  <li>• Export your watchlist data</li>
                  <li>• Control theme preferences</li>
                  <li>• Clear browser storage</li>
                </ul>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* Cookies and Tracking */}
        <ScrollReveal direction="up" delay={600}>
          <section className="mb-12">
            <h3 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Cookies & Tracking
            </h3>
            
            <div className={`p-6 rounded-lg ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
              <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                We use local storage to remember your preferences and maintain your session. We do not use 
                third-party tracking cookies or analytics services that compromise your privacy.
              </p>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                You can clear your browser's local storage at any time to remove all stored data.
              </p>
            </div>
          </section>
        </ScrollReveal>

        {/* Contact Information */}
        <ScrollReveal direction="up" delay={700}>
          <section className="mb-12">
            <h3 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Contact Us
            </h3>
            
            <div className={`p-6 rounded-lg ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
              <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                If you have any questions about this Privacy Policy or our privacy practices, please contact us:
              </p>
              <div className={`space-y-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                <p><strong>Email:</strong> privacy@cinevault.com</p>
                <p><strong>Creators:</strong> Adonay Andualem & Yafet Simon</p>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* Policy Updates */}
        <ScrollReveal direction="up" delay={800}>
          <section className="mb-8">
            <div className={`p-6 rounded-lg border-2 ${
              isDark ? 'bg-green-900/20 border-green-700' : 'bg-green-50 border-green-200'
            }`}>
              <h3 className={`text-lg font-bold mb-3 ${isDark ? 'text-green-400' : 'text-green-800'}`}>
                Policy Updates
              </h3>
              <p className={`${isDark ? 'text-green-300' : 'text-green-700'}`}>
                We may update this Privacy Policy from time to time. Any changes will be posted on this page 
                with an updated "Last modified" date. We encourage you to review this policy periodically.
              </p>
            </div>
          </section>
        </ScrollReveal>
      </div>
    </div>
  );
};

export default Privacy;