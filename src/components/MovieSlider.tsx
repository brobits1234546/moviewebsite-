import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Play } from 'lucide-react';
import { Movie } from '../types';
import { getImageUrl, formatDate } from '../utils/imageHelpers';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface MovieSliderProps {
  movies: Movie[];
  autoPlay?: boolean;
  showDetails?: boolean;
  onCheckOut?: (movie: Movie) => void;
}

const MovieSlider: React.FC<MovieSliderProps> = ({ 
  movies, 
  autoPlay = true, 
  showDetails = true,
  onCheckOut 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { isDark } = useTheme();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!autoPlay || movies.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoPlay, movies.length]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + movies.length) % movies.length);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
  };

  const handleCheckOut = (movie: Movie) => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    if (onCheckOut) {
      onCheckOut(movie);
    } else {
      navigate(`/movie/${movie.id}`);
    }
  };

  if (movies.length === 0) {
    return (
      <div className={`relative h-96 ${isDark ? 'bg-gray-800' : 'bg-gray-200'} rounded-lg animate-pulse`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Loading movies...
          </div>
        </div>
      </div>
    );
  }

  const currentMovie = movies[currentIndex];

  return (
    <div className="relative h-[500px] md:h-[600px] rounded-xl overflow-hidden group">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={getImageUrl(currentMovie.backdrop_path, 'original')}
          alt={currentMovie.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
      </div>

      {/* Navigation Arrows */}
      {movies.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all opacity-0 group-hover:opacity-100 hover:scale-110"
            aria-label="Previous movie"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all opacity-0 group-hover:opacity-100 hover:scale-110"
            aria-label="Next movie"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {/* Movie Details */}
      {showDetails && (
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-2xl px-6 md:px-12 text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
              {currentMovie.title}
            </h1>
            
            <div className="flex items-center space-x-6 mb-6">
              <div className="flex items-center space-x-1">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="text-lg font-semibold">
                  {currentMovie.vote_average.toFixed(1)}
                </span>
              </div>
              <span className="text-gray-300">
                {formatDate(currentMovie.release_date)}
              </span>
            </div>

            <p className="text-lg leading-relaxed mb-8 max-w-xl line-clamp-3">
              {currentMovie.overview}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => handleCheckOut(currentMovie)}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <span>Check Out</span>
              </button>
              
              <button
                onClick={() => navigate(`/movie/${currentMovie.id}`)}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white border border-white/30 px-8 py-4 rounded-lg font-semibold text-lg transition-all flex items-center justify-center space-x-2"
              >
                <Play className="w-5 h-5" />
                <span>Watch Trailer</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Indicators */}
      {movies.length > 1 && (
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {movies.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentIndex 
                  ? 'bg-white scale-125' 
                  : 'bg-white/50 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MovieSlider;