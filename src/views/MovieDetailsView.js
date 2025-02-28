import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

const API_KEY = "65b8c81a835e49e2a499028aeaf7ab9b";
const BASE_URL = "https://api.themoviedb.org/3";

const MovieDetailsView = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie details", error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="movie-details">
      <h1>{movie.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="movie-poster"
      />
      <p><strong>Release Date:</strong> {movie.release_date}</p>
      <p><strong>Overview:</strong> {movie.overview}</p>
      <p><strong>Vote Average:</strong> {movie.vote_average}</p>
    </div>
  );
};

export default MovieDetailsView;
