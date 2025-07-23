import React from 'react';
import { useNavigate } from 'react-router-dom';
import MovieSlider from '../components/MovieSlider';
import CategorySlider from '../components/CategorySlider';
import ScrollReveal from '../components/ScrollReveal';
import { useMovies } from '../hooks/useMovies';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { Movie } from '../types';

const Home: React.FC = () => {
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

  const handleCheckOut = (movie: Movie) => {
    if (!user) {
      navigate('/login');
      return;
    }
    navigate(`/movie/${movie.id}`);
  };

  if (loading) {
    return (
      <div className={`min-h-screen pt-16 ${isDark ? 'bg-black' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse">
            <div className={`h-96 rounded-xl mb-12 ${isDark ? 'bg-gray-800' : 'bg-gray-200'}`} />
            <div className={`h-8 w-64 rounded mb-8 ${isDark ? 'bg-gray-800' : 'bg-gray-200'}`} />
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
        {/* Hero Slider */}
        <section className="py-8">
          <MovieSlider 
            movies={popularMovies.slice(0, 5)} 
            autoPlay={true}
            showDetails={true}
            onCheckOut={handleCheckOut}
          />
        </section>

        {/* About Section */}
        <ScrollReveal direction="up" delay={200}>
          <section className="py-16 text-center">
            <div className="max-w-4xl mx-auto">
              <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                Welcome to CineVault
              </h2>
              <p className={`text-xl leading-relaxed mb-8 ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Your ultimate destination for discovering incredible movies. Create your personal watchlist, 
                explore detailed movie information, and never miss a great film again. From blockbusters to 
                hidden gems, we've got everything you need to fuel your movie passion.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                <ScrollReveal direction="up" delay={300}>
                  <div className={`p-6 rounded-lg ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
                    <h3 className={`text-xl font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Discover Movies
                    </h3>
                    <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      Explore thousands of movies with detailed information, ratings, and trailers.
                    </p>
                  </div>
                </ScrollReveal>
                <ScrollReveal direction="up" delay={400}>
                  <div className={`p-6 rounded-lg ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
                    <h3 className={`text-xl font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Personal Watchlist
                    </h3>
                    <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      Save movies to your personal watchlist and never forget what to watch next.
                    </p>
                  </div>
                </ScrollReveal>
                <ScrollReveal direction="up" delay={500}>
                  <div className={`p-6 rounded-lg ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
                    <h3 className={`text-xl font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Smart Search
                    </h3>
                    <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      Find exactly what you're looking for with our powerful search functionality.
                    </p>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* Movie Categories */}
        <ScrollReveal direction="up" delay={600}>
          <CategorySlider 
            movies={topRatedMovies} 
            title="Top Rated Movies" 
            subtitle="Critics' and audiences' favorites"
          />
        </ScrollReveal>

        <ScrollReveal direction="up" delay={700}>
          <CategorySlider 
            movies={upcomingMovies} 
            title="Coming Soon" 
            subtitle="Get ready for these upcoming releases"
          />
        </ScrollReveal>

        <ScrollReveal direction="up" delay={800}>
          <CategorySlider 
            movies={actionMovies} 
            title="Action Movies" 
            subtitle="Heart-pumping adventures and thrills"
          />
        </ScrollReveal>

        <ScrollReveal direction="up" delay={900}>
          <CategorySlider 
            movies={comedyMovies} 
            title="Comedy Movies" 
            subtitle="Laugh out loud with these comedies"
          />
        </ScrollReveal>

        <ScrollReveal direction="up" delay={1000}>
          <CategorySlider 
            movies={horrorMovies} 
            title="Horror Movies" 
            subtitle="Spine-chilling scares await"
          />
        </ScrollReveal>

        {/* Featured Movie Section */}
        {popularMovies.length > 0 && (
          <ScrollReveal direction="up" delay={1100}>
            <section className="py-16">
              <div className="text-center mb-12">
                <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  Movie of the Week
                </h2>
                <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Don't miss this week's featured movie
                </p>
              </div>
              <MovieSlider 
                movies={[popularMovies[0]]} 
                autoPlay={false}
                showDetails={true}
                onCheckOut={handleCheckOut}
              />
            </section>
          </ScrollReveal>
        )}
      </div>
    </div>
  );
};

export default Home;