import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Search, ArrowLeft } from 'lucide-react';
import { useMovieSearch } from '../hooks/useMovies';
import { useTheme } from '../contexts/ThemeContext';
import MovieGrid from '../components/MovieGrid';
import ScrollReveal from '../components/ScrollReveal';

const SearchResults: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const query = searchParams.get('q') || '';
  const { results, loading, searchMovies } = useMovieSearch();
  const { isDark } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    if (query) {
      setSearchQuery(query);
      searchMovies(query);
    }
  }, [query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className={`min-h-screen pt-16 ${isDark ? 'bg-black' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
            Search Results
          </h1>
        </div>

        {/* Search Bar */}
        <ScrollReveal direction="up">
          <form onSubmit={handleSearch} className="mb-8">
            <div className="relative max-w-2xl">
              <input
                type="text"
                placeholder="Search for movies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full px-6 py-4 pl-14 text-lg rounded-full border-2 transition-all focus:outline-none focus:ring-2 focus:ring-green-500 ${
                  isDark 
                    ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-green-500' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-green-500'
                }`}
              />
              <Search className={`absolute left-5 top-1/2 transform -translate-y-1/2 w-6 h-6 ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`} />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full font-medium transition-colors"
              >
                Search
              </button>
            </div>
          </form>
        </ScrollReveal>

        {/* Results */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(12)].map((_, i) => (
              <div key={i} className={`h-80 rounded-lg animate-pulse ${
                isDark ? 'bg-gray-800' : 'bg-gray-200'
              }`} />
            ))}
          </div>
        ) : results.length > 0 ? (
          <ScrollReveal direction="up" delay={200}>
            <div className="mb-6">
              <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Found {results.length} result{results.length !== 1 ? 's' : ''} for "{query}"
              </p>
            </div>
            <MovieGrid 
              movies={results} 
              title="" 
              showLoadMore={false}
            />
          </ScrollReveal>
        ) : query ? (
          <ScrollReveal direction="up" delay={200}>
            <div className="text-center py-16">
              <div className={`text-6xl mb-4 ${isDark ? 'text-gray-700' : 'text-gray-300'}`}>
                🎬
              </div>
              <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                No movies found
              </h2>
              <p className={`text-lg mb-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                We couldn't find any movies matching "{query}". Try searching with different keywords.
              </p>
              <div className="space-y-2">
                <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                  Search tips:
                </p>
                <ul className={`text-sm space-y-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  <li>• Try different keywords or movie titles</li>
                  <li>• Check for spelling mistakes</li>
                  <li>• Use more general terms</li>
                </ul>
              </div>
            </div>
          </ScrollReveal>
        ) : (
          <ScrollReveal direction="up" delay={200}>
            <div className="text-center py-16">
              <div className={`text-6xl mb-4 ${isDark ? 'text-gray-700' : 'text-gray-300'}`}>
                🔍
              </div>
              <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Start Your Search
              </h2>
              <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Enter a movie title, actor, or keyword to discover great films
              </p>
            </div>
          </ScrollReveal>
        )}
      </div>
    </div>
  );
};

export default SearchResults;