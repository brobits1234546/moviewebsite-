import React from 'react';
import { useNavigate } from 'react-router-dom';
import MovieSlider from '../components/MovieSlider';
import CategorySlider from '../components/CategorySlider';
import ScrollReveal from '../components/ScrollReveal';
import { useMovies } from '../hooks/useMovies';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { Movie } from '../types';

const Dashboard: React.FC = () => {
  const { 
    popularMovies, 
    topRatedMovies, 
    upcomingMovies, 
    actionMovies, 
    comedyMovies, 
    horrorMovies, 
    loading 
  } = useMovies();
  const { isDark } = useTheme();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleMovieSelect = (movie: Movie) => {
    navigate(`/movie/${movie.id}`);
  };

  if (loading) {
    return (
      <div className={`min-h-screen pt-16 ${isDark ? 'bg-black' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse">
            <div className={`h-8 w-64 rounded mb-4 ${isDark ? 'bg-gray-800' : 'bg-gray-200'}`} />
            <div className={`h-96 rounded-xl mb-12 ${isDark ? 'bg-gray-800' : 'bg-gray-200'}`} />
            <div className={`h-8 w-48 rounded mb-8 ${isDark ? 'bg-gray-800' : 'bg-gray-200'}`} />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className={`h-80 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-200'}`} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen pt-16 ${isDark ? 'bg-black' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <section className="py-8">
          <div className="mb-8">
            <h1 className={`text-3xl md:text-4xl font-bold mb-2 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Welcome back, {user?.name}!
            </h1>
            <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Discover your next favorite movie
            </p>
          </div>

          {/* Featured Movies Slider */}
          <MovieSlider 
            movies={popularMovies.slice(0, 5)} 
            autoPlay={true}
            showDetails={true}
            onCheckOut={handleMovieSelect}
          />
        </section>

        {/* Movie Categories */}
        <ScrollReveal direction="up" delay={200}>
          <CategorySlider 
            movies={topRatedMovies} 
            title="Top Rated Movies" 
            subtitle="Critics' and audiences' favorites"
          />
        </ScrollReveal>

        <ScrollReveal direction="up" delay={300}>
          <CategorySlider 
            movies={upcomingMovies} 
            title="Coming Soon" 
            subtitle="Get ready for these upcoming releases"
          />
        </ScrollReveal>

        <ScrollReveal direction="up" delay={400}>
          <CategorySlider 
            movies={actionMovies} 
            title="Action Movies" 
            subtitle="Heart-pumping adventures and thrills"
          />
        </ScrollReveal>

        <ScrollReveal direction="up" delay={500}>
          <CategorySlider 
            movies={comedyMovies} 
            title="Comedy Movies" 
            subtitle="Laugh out loud with these comedies"
          />
        </ScrollReveal>

        <ScrollReveal direction="up" delay={600}>
          <CategorySlider 
            movies={horrorMovies} 
            title="Horror Movies" 
            subtitle="Spine-chilling scares await"
          />
        </ScrollReveal>

        {/* Featured Single Movie */}
        {popularMovies.length > 0 && (
          <ScrollReveal direction="up" delay={700}>
            <section className="py-16">
              <div className="text-center mb-12">
                <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  Editor's Choice
                </h2>
                <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Our top pick for you this week
                </p>
              </div>
              <MovieSlider 
                movies={[popularMovies[3]]} 
                autoPlay={false}
                showDetails={true}
                onCheckOut={handleMovieSelect}
              />
            </section>
          </ScrollReveal>
        )}
      </div>
    </div>
  );
};

export default Dashboard;