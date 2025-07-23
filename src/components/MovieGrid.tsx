import React, { useState } from 'react';
import { Movie } from '../types';
import MovieCard from './MovieCard';
import { useTheme } from '../contexts/ThemeContext';

interface MovieGridProps {
  movies: Movie[];
  title: string;
  showLoadMore?: boolean;
  initialCount?: number;
}

const MovieGrid: React.FC<MovieGridProps> = ({ 
  movies, 
  title, 
  showLoadMore = false, 
  initialCount = 8 
}) => {
  const [visibleCount, setVisibleCount] = useState(initialCount);
  const { isDark } = useTheme();

  const handleLoadMore = () => {
    setVisibleCount(prev => Math.min(prev + 8, movies.length));
  };

  const visibleMovies = movies.slice(0, visibleCount);
  const hasMore = visibleCount < movies.length;

  return (
    <section className="py-12">
      <h2 className={`text-3xl font-bold mb-8 text-center ${
        isDark ? 'text-white' : 'text-gray-900'
      }`}>
        {title}
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
        {visibleMovies.map((movie) => (
          <div key={movie.id} className="flex justify-center">
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>

      {showLoadMore && hasMore && (
        <div className="text-center">
          <button
            onClick={handleLoadMore}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-all transform hover:scale-105"
          >
            Load More Movies
          </button>
        </div>
      )}
    </section>
  );
};

export default MovieGrid;