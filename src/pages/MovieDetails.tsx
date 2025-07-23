import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Clock, Calendar, Bookmark, BookmarkCheck, Play, ArrowLeft } from 'lucide-react';
import { useMovieDetails } from '../hooks/useMovies';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { getImageUrl, formatDate, formatRuntime, getRatingColor } from '../utils/imageHelpers';
import ScrollReveal from '../components/ScrollReveal';

const MovieDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { movie, videos, loading } = useMovieDetails(id);
  const { user, addToWatchlist, removeFromWatchlist } = useAuth();
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [showTrailer, setShowTrailer] = useState(false);

  const isInWatchlist = user?.watchlist.includes(movie?.id || 0) || false;

  const handleWatchlistToggle = () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (!movie) return;

    if (isInWatchlist) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie.id);
    }
  };

  const trailer = videos.find(video => 
    video.type === 'Trailer' && video.site === 'YouTube'
  ) || videos[0];

  if (loading) {
    return (
      <div className={`min-h-screen pt-16 ${isDark ? 'bg-black' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse">
            <div className={`h-96 rounded-xl mb-8 ${isDark ? 'bg-gray-800' : 'bg-gray-200'}`} />
            <div className={`h-8 w-64 rounded mb-4 ${isDark ? 'bg-gray-800' : 'bg-gray-200'}`} />
            <div className={`h-4 w-full rounded mb-2 ${isDark ? 'bg-gray-800' : 'bg-gray-200'}`} />
            <div className={`h-4 w-3/4 rounded ${isDark ? 'bg-gray-800' : 'bg-gray-200'}`} />
          </div>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className={`min-h-screen pt-16 flex items-center justify-center ${isDark ? 'bg-black' : 'bg-white'}`}>
        <div className="text-center">
          <h1 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Movie not found
          </h1>
          <button
            onClick={() => navigate(-1)}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen pt-16 ${isDark ? 'bg-black' : 'bg-white'}`}>
      {/* Hero Section */}
      <div className="relative h-[70vh] overflow-hidden">
        <img
          src={getImageUrl(movie.backdrop_path, 'original')}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all hover:scale-110"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>

        {/* Movie Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="max-w-4xl">
            <ScrollReveal direction="up">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                {movie.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-6 mb-6 text-white">
                <div className="flex items-center space-x-1">
                  <Star className="w-6 h-6 text-yellow-400 fill-current" />
                  <span className="text-xl font-semibold">
                    {movie.vote_average.toFixed(1)}
                  </span>
                  <span className="text-gray-300">
                    ({movie.vote_count.toLocaleString()} votes)
                  </span>
                </div>
                
                <div className="flex items-center space-x-1">
                  <Calendar className="w-5 h-5" />
                  <span>{formatDate(movie.release_date)}</span>
                </div>
                
                <div className="flex items-center space-x-1">
                  <Clock className="w-5 h-5" />
                  <span>{formatRuntime(movie.runtime)}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {movie.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>

              <p className="text-lg text-gray-200 mb-8 max-w-3xl leading-relaxed">
                {movie.overview}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleWatchlistToggle}
                  className={`flex items-center space-x-2 px-8 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 ${
                    isInWatchlist
                      ? 'bg-green-600 hover:bg-green-700 text-white'
                      : 'bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white border border-white/30'
                  }`}
                >
                  {isInWatchlist ? (
                    <BookmarkCheck className="w-6 h-6" />
                  ) : (
                    <Bookmark className="w-6 h-6" />
                  )}
                  <span>
                    {isInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
                  </span>
                </button>

                {trailer && (
                  <button
                    onClick={() => setShowTrailer(true)}
                    className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105"
                  >
                    <Play className="w-6 h-6" />
                    <span>Watch Trailer</span>
                  </button>
                )}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>

      {/* Movie Details Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Movie Poster */}
          <ScrollReveal direction="left">
            <div className="lg:col-span-1">
              <img
                src={getImageUrl(movie.poster_path, 'w500')}
                alt={movie.title}
                className="w-full max-w-md mx-auto rounded-lg shadow-2xl"
              />
            </div>
          </ScrollReveal>

          {/* Movie Information */}
          <ScrollReveal direction="right">
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Synopsis
                </h2>
                <p className={`text-lg leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {movie.overview}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Release Information
                  </h3>
                  <div className={`space-y-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    <p><strong>Release Date:</strong> {formatDate(movie.release_date)}</p>
                    <p><strong>Runtime:</strong> {formatRuntime(movie.runtime)}</p>
                    <p><strong>Status:</strong> {movie.status}</p>
                    <p><strong>Language:</strong> {movie.original_language.toUpperCase()}</p>
                  </div>
                </div>

                <div>
                  <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Production
                  </h3>
                  <div className={`space-y-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    <p><strong>Budget:</strong> ${movie.budget.toLocaleString()}</p>
                    <p><strong>Revenue:</strong> ${movie.revenue.toLocaleString()}</p>
                    <div>
                      <strong>Companies:</strong>
                      <ul className="mt-1">
                        {movie.production_companies.slice(0, 3).map((company) => (
                          <li key={company.id}>• {company.name}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {movie.tagline && (
                <div>
                  <blockquote className={`text-xl italic border-l-4 border-green-500 pl-4 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    "{movie.tagline}"
                  </blockquote>
                </div>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Trailer Modal */}
      {showTrailer && trailer && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
          <div className="relative w-full max-w-4xl aspect-video">
            <button
              onClick={() => setShowTrailer(false)}
              className="absolute -top-10 right-0 text-white text-2xl hover:text-gray-300 transition-colors"
            >
              ✕
            </button>
            <iframe
              src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
              title={trailer.name}
              className="w-full h-full rounded-lg"
              allowFullScreen
              allow="autoplay; encrypted-media"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;