import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Movie } from '../types';
import MovieCard from './MovieCard';
import { useTheme } from '../contexts/ThemeContext';

interface CategorySliderProps {
  movies: Movie[];
  title: string;
  subtitle?: string;
}

const CategorySlider: React.FC<CategorySliderProps> = ({ movies, title, subtitle }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { isDark } = useTheme();

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 320; // Width of card + gap
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  if (movies.length === 0) return null;

  return (
    <section className="py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className={`text-2xl md:text-3xl font-bold ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            {title}
          </h2>
          {subtitle && (
            <p className={`text-lg mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {subtitle}
            </p>
          )}
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={() => scroll('left')}
            className={`p-2 rounded-full transition-all hover:scale-110 ${
              isDark 
                ? 'bg-gray-800 hover:bg-gray-700 text-white' 
                : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
            }`}
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => scroll('right')}
            className={`p-2 rounded-full transition-all hover:scale-110 ${
              isDark 
                ? 'bg-gray-800 hover:bg-gray-700 text-white' 
                : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
            }`}
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex space-x-6 overflow-x-auto scrollbar-hide pb-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
};

export default CategorySlider;