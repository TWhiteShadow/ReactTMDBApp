import React from "react";
import { useNavigate } from "react-router";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  return (
    <div className="movie-card" onClick={handleClick}>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title || movie.name}
        className="movie-image"
      />
      <div className="movie-info">
        <h2 className="movie-title">{movie.title || movie.name}</h2>
        {movie.media_type && <p className="movie-type">{movie.media_type.toUpperCase()}</p>}
      </div>
    </div>
  );
};

export default MovieCard;
