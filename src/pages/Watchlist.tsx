import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Bookmark, Trash2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { Movie } from '../types';
import MovieCard from '../components/MovieCard';
import ScrollReveal from '../components/ScrollReveal';

const API_KEY = '0e7e61dd51f55260b0cfef0723408d03';
const BASE_URL = 'https://api.themoviedb.org/3';

const Watchlist: React.FC = () => {
  const { user, removeFromWatchlist } = useAuth();
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [watchlistMovies, setWatchlistMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWatchlistMovies = async () => {
      if (!user || user.watchlist.length === 0) {
        setLoading(false);
        return;
      }

      try {
        const moviePromises = user.watchlist.map(movieId =>
          fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`)
            .then(response => response.json())
        );

        const movies = await Promise.all(moviePromises);
        setWatchlistMovies(movies.filter(movie => movie.id)); // Filter out failed requests
      } catch (error) {
        console.error('Error fetching watchlist movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWatchlistMovies();
  }, [user]);

  const handleRemoveAll = () => {
    if (user && window.confirm('Are you sure you want to remove all movies from your watchlist?')) {
      user.watchlist.forEach(movieId => {
        removeFromWatchlist(movieId);
      });
      setWatchlistMovies([]);
    }
  };

  if (!user) {
    return (
      <div className={`min-h-screen pt-16 flex items-center justify-center ${isDark ? 'bg-black' : 'bg-white'}`}>
        <div className="text-center">
          <h1 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Please log in to view your watchlist
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
    <div className={`min-h-screen pt-16 ${isDark ? 'bg-black' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <button
              onClick={() => navigate(-1)}
              className={`mr-4 p-2 rounded-full transition-colors hover:bg-opacity-10 hover:bg-green-500 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                My Watchlist
              </h1>
              <p className={`text-lg mt-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {watchlistMovies.length} movie{watchlistMovies.length !== 1 ? 's' : ''} saved
              </p>
            </div>
          </div>

          {watchlistMovies.length > 0 && (
            <button
              onClick={handleRemoveAll}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
            >
              <Trash2 className="w-5 h-5" />
              <span>Clear All</span>
            </button>
          )}
        </div>

        {/* Content */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className={`h-80 rounded-lg animate-pulse ${
                isDark ? 'bg-gray-800' : 'bg-gray-200'
              }`} />
            ))}
          </div>
        ) : watchlistMovies.length > 0 ? (
          <ScrollReveal direction="up">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {watchlistMovies.map((movie) => (
                <div key={movie.id}>
                  <MovieCard movie={movie} showWatchlistButton={true} />
                </div>
              ))}
            </div>
          </ScrollReveal>
        ) : (
          <ScrollReveal direction="up">
            <div className="text-center py-16">
              <div className={`text-6xl mb-6 ${isDark ? 'text-gray-700' : 'text-gray-300'}`}>
                <Bookmark className="w-24 h-24 mx-auto" />
              </div>
              <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Your watchlist is empty
              </h2>
              <p className={`text-lg mb-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Start adding movies to your watchlist to keep track of what you want to watch!
              </p>
              <div className="space-x-4">
                <button
                  onClick={() => navigate('/dashboard')}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-all transform hover:scale-105"
                >
                  Browse Movies
                </button>
                <button
                  onClick={() => navigate('/search')}
                  className={`border px-6 py-3 rounded-lg font-medium transition-all ${
                    isDark 
                      ? 'border-gray-600 text-gray-300 hover:bg-gray-800' 
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Search Movies
                </button>
              </div>
            </div>
          </ScrollReveal>
        )}
      </div>
    </div>
  );
};

export default Watchlist;