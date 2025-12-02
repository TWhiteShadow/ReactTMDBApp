import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import MovieGrid from "../components/MovieGrid";

const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = process.env.REACT_APP_BASE_URL;

const GenreView = () => {
  const { genreId } = useParams();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMoviesByGenre = async () => {
      try {
        const response = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`);
        const data = await response.json();
        setMovies(data.results || []);
      } catch (error) {
        console.error("Error fetching movies by genre", error);
      }
    };

    fetchMoviesByGenre();
  }, [genreId]);

  return (
    <div className="container">
      <h1 className="title">Movies by Genre</h1>
      <MovieGrid movies={movies} />
    </div>
  );
};

export default GenreView;
