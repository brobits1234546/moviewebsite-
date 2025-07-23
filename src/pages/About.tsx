import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Film, Heart, Star, Users } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import ScrollReveal from '../components/ScrollReveal';

const About: React.FC = () => {
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
            About CineVault
          </h1>
        </div>

        {/* Hero Section */}
        <ScrollReveal direction="up">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <Film className={`w-20 h-20 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
            </div>
            <h2 className={`text-4xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Your Gateway to Cinema
            </h2>
            <p className={`text-xl leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              CineVault is your ultimate destination for movie discovery and personal curation. 
              We've created a platform where movie enthusiasts can explore, organize, and never 
              miss another great film.
            </p>
          </div>
        </ScrollReveal>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <ScrollReveal direction="left" delay={200}>
            <div className={`p-8 rounded-lg ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
              <div className="flex items-center mb-4">
                <Heart className={`w-8 h-8 mr-3 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
                <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Our Mission
                </h3>
              </div>
              <p className={`text-lg leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                To make movie discovery effortless and enjoyable. We believe everyone deserves 
                to find their next favorite film without the hassle of endless scrolling and 
                indecision.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={300}>
            <div className={`p-8 rounded-lg ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
              <div className="flex items-center mb-4">
                <Star className={`w-8 h-8 mr-3 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
                <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Our Vision
                </h3>
              </div>
              <p className={`text-lg leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                To become the go-to platform for movie lovers worldwide, providing comprehensive 
                movie information and personalized recommendations that enhance the viewing experience.
              </p>
            </div>
          </ScrollReveal>
        </div>

        {/* Features */}
        <ScrollReveal direction="up" delay={400}>
          <div className="mb-16">
            <h3 className={`text-3xl font-bold text-center mb-12 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              What Makes CineVault Special
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                  isDark ? 'bg-green-900' : 'bg-green-100'
                }`}>
                  <Film className={`w-8 h-8 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
                </div>
                <h4 className={`text-xl font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Comprehensive Database
                </h4>
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Access detailed information about thousands of movies, including ratings, cast, 
                  crew, and plot summaries.
                </p>
              </div>

              <div className="text-center">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                  isDark ? 'bg-green-900' : 'bg-green-100'
                }`}>
                  <Heart className={`w-8 h-8 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
                </div>
                <h4 className={`text-xl font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Personal Watchlists
                </h4>
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Create and manage your personal watchlist to keep track of movies you want to watch.
                </p>
              </div>

              <div className="text-center">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                  isDark ? 'bg-green-900' : 'bg-green-100'
                }`}>
                  <Users className={`w-8 h-8 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
                </div>
                <h4 className={`text-xl font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  User-Friendly Design
                </h4>
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Enjoy a clean, intuitive interface designed with movie lovers in mind.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Creators Section */}
        <ScrollReveal direction="up" delay={500}>
          <div className={`rounded-lg p-8 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
            <h3 className={`text-2xl font-bold text-center mb-8 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Meet the Creators
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="text-center">
                <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 ${
                  isDark ? 'bg-green-700' : 'bg-green-200'
                }`}>
                  <span className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-green-800'}`}>
                    AA
                  </span>
                </div>
                <h4 className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Adonay Andualem
                </h4>
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Co-Producer & Lead Developer
                </p>
                <p className={`text-sm mt-2 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                  Passionate about creating seamless user experiences and bringing movie discovery to life.
                </p>
              </div>

              <div className="text-center">
                <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 ${
                  isDark ? 'bg-green-700' : 'bg-green-200'
                }`}>
                  <span className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-green-800'}`}>
                    YS
                  </span>
                </div>
                <h4 className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Yafet Simon
                </h4>
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Co-Producer & Design Lead
                </p>
                <p className={`text-sm mt-2 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                  Focused on creating beautiful, intuitive designs that make movie discovery enjoyable.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Technology Section */}
        <ScrollReveal direction="up" delay={600}>
          <div className="mt-16 text-center">
            <h3 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Built with Modern Technology
            </h3>
            <p className={`text-lg mb-8 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              CineVault is powered by The Movie Database (TMDB) API and built with cutting-edge 
              web technologies to provide you with the best possible experience.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              {['React', 'TypeScript', 'Tailwind CSS', 'TMDB API'].map((tech) => (
                <span
                  key={tech}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    isDark 
                      ? 'bg-gray-800 text-green-400' 
                      : 'bg-green-100 text-green-800'
                  }`}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Call to Action */}
        <ScrollReveal direction="up" delay={700}>
          <div className="mt-16 text-center">
            <h3 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Ready to Start Your Movie Journey?
            </h3>
            <p className={`text-lg mb-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Join thousands of movie lovers who trust CineVault for their movie discovery needs.
            </p>
            <button
              onClick={() => navigate('/signup')}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-all transform hover:scale-105"
            >
              Get Started Today
            </button>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
};

export default About;