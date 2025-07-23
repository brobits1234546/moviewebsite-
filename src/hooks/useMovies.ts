import { useState, useEffect } from 'react';
import { Movie, TMDBResponse, MovieDetails, VideoResult } from '../types';

const API_KEY = '0e7e61dd51f55260b0cfef0723408d03';
const BASE_URL = 'https://api.themoviedb.org/3';

export const useMovies = () => {
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
  const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([]);
  const [actionMovies, setActionMovies] = useState<Movie[]>([]);
  const [comedyMovies, setComedyMovies] = useState<Movie[]>([]);
  const [horrorMovies, setHorrorMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const [popular, topRated, upcoming, action, comedy, horror] = await Promise.all([
          fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`),
          fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}`),
          fetch(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}`),
          fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=28`),
          fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=35`),
          fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=27`)
        ]);

        const [popularData, topRatedData, upcomingData, actionData, comedyData, horrorData] = await Promise.all([
          popular.json() as Promise<TMDBResponse<Movie>>,
          topRated.json() as Promise<TMDBResponse<Movie>>,
          upcoming.json() as Promise<TMDBResponse<Movie>>,
          action.json() as Promise<TMDBResponse<Movie>>,
          comedy.json() as Promise<TMDBResponse<Movie>>,
          horror.json() as Promise<TMDBResponse<Movie>>
        ]);

        setPopularMovies(popularData.results);
        setTopRatedMovies(topRatedData.results);
        setUpcomingMovies(upcomingData.results);
        setActionMovies(actionData.results);
        setComedyMovies(comedyData.results);
        setHorrorMovies(horrorData.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return {
    popularMovies,
    topRatedMovies,
    upcomingMovies,
    actionMovies,
    comedyMovies,
    horrorMovies,
    loading
  };
};

export const useMovieDetails = (movieId: string | undefined) => {
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [videos, setVideos] = useState<VideoResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!movieId) return;

    const fetchMovieDetails = async () => {
      try {
        const [movieResponse, videosResponse] = await Promise.all([
          fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`),
          fetch(`${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`)
        ]);

        const movieData = await movieResponse.json() as MovieDetails;
        const videosData = await videosResponse.json() as { results: VideoResult[] };

        setMovie(movieData);
        setVideos(videosData.results.filter(video => video.site === 'YouTube'));
      } catch (error) {
        console.error('Error fetching movie details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  return { movie, videos, loading };
};

export const useMovieSearch = () => {
  const [results, setResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);

  const searchMovies = async (query: string) => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
      const data = await response.json() as TMDBResponse<Movie>;
      setResults(data.results);
    } catch (error) {
      console.error('Error searching movies:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return { results, loading, searchMovies };
};