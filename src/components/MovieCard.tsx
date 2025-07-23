import React, { useState } from 'react';
import { Star, Bookmark, BookmarkCheck } from 'lucide-react';
import { Movie } from '../types';
import { getImageUrl, getRatingColor } from '../utils/imageHelpers';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface MovieCardProps {
  movie: Movie;
  size?: 'small' | 'medium' | 'large';
  showWatchlistButton?: boolean;
}

const MovieCard: React.FC<MovieCardProps> = ({ 
  movie, 
  size = 'medium',
  showWatchlistButton = true 
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { isDark } = useTheme();
  const { user, addToWatchlist, removeFromWatchlist } = useAuth();
  const navigate = useNavigate();

  const isInWatchlist = user?.watchlist.includes(movie.id) || false;

  const handleWatchlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!user) {
      navigate('/login');
      return;
    }

    if (isInWatchlist) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie.id);
    }
  };

  const handleClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'w-48 h-72';
      case 'large':
        return 'w-72 h-96';
      default:
        return 'w-64 h-80';
    }
  };

  return (
    <div 
      className={`${getSizeClasses()} flex-shrink-0 cursor-pointer group relative`}
      onClick={handleClick}
    >
      <div className={`w-full h-full rounded-lg overflow-hidden shadow-lg transition-all duration-300 group-hover:shadow-2xl group-hover:scale-105 ${
        isDark ? 'bg-gray-800' : 'bg-white'
      }`}>
        {/* Movie Poster */}
        <div className="relative h-4/5 overflow-hidden">
          {!imageLoaded && (
            <div className={`absolute inset-0 ${isDark ? 'bg-gray-700' : 'bg-gray-200'} animate-pulse`} />
          )}
          <img
            src={getImageUrl(movie.poster_path, 'w500')}
            alt={movie.title}
            className={`w-full h-full object-cover transition-all duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
          />
          
          {/* Overlay on Hover */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="text-white text-center p-4">
              <h3 className="font-semibold text-lg mb-2 line-clamp-2">{movie.title}</h3>
              <p className="text-sm opacity-90 line-clamp-3">{movie.overview}</p>
            </div>
          </div>

          {/* Watchlist Button */}
          {showWatchlistButton && (
            <button
              onClick={handleWatchlistToggle}
              className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-300 ${
                isInWatchlist 
                  ? 'bg-green-600 text-white' 
                  : 'bg-black/50 text-white hover:bg-green-600'
              } opacity-0 group-hover:opacity-100 hover:scale-110`}
              title={isInWatchlist ? 'Remove from watchlist' : 'Add to watchlist'}
            >
              {isInWatchlist ? (
                <BookmarkCheck className="w-5 h-5" />
              ) : (
                <Bookmark className="w-5 h-5" />
              )}
            </button>
          )}

          {/* Rating Badge */}
          <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded-md text-sm font-semibold flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className={getRatingColor(movie.vote_average)}>
              {movie.vote_average.toFixed(1)}
            </span>
          </div>
        </div>

        {/* Movie Info */}
        <div className="p-4 h-1/5 flex flex-col justify-center">
          <h3 className={`font-semibold text-lg line-clamp-1 mb-1 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            {movie.title}
          </h3>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {new Date(movie.release_date).getFullYear()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;