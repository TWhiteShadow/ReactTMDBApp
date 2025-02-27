import React, { useState, useEffect } from "react";
import MovieGrid from "../components/MovieGrid";

const API_KEY = "65b8c81a835e49e2a499028aeaf7ab9b";
const BASE_URL = "https://api.themoviedb.org/3";

const getTrendingMovies = async () => {
  try {
    const response = await fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`);
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error("Error fetching latest movies", error);
    return [];
  }
};

const HomeView = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const trendingMovies = await getTrendingMovies();
      setMovies(trendingMovies);
    };

    fetchMovies();
  }, []);

  return (
    <div className="container">
      <h1 className="title">Trending Movies</h1>
      <MovieGrid movies={movies} />
    </div>
  );
};

export default HomeView;
