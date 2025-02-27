import React from "react";

const MovieCard = ({ movie, onSelectMovie }) => {
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
  const PLACEHOLDER_IMAGE = "https://via.placeholder.com/150";

  return (
    <div className="movie-card" onClick={() => onSelectMovie(movie)}>
      <img
        src={
          movie.media_type === "person"
            ? movie.profile_path
              ? `${IMAGE_BASE_URL}${movie.profile_path}`
              : PLACEHOLDER_IMAGE
            : movie.poster_path
            ? `${IMAGE_BASE_URL}${movie.poster_path}`
            : PLACEHOLDER_IMAGE
        }
        alt={movie.title || movie.name}
        className="movie-image"
      />
      <div className="movie-info">
        <h2 className="movie-title">{movie.title || movie.name}</h2>
        {movie.media_type && <p className="movie-type">{movie.media_type.toUpperCase()}</p>}
        {movie.release_date && <p className="movie-release-date">{movie.release_date}</p>}
      </div>
    </div>
  );
};

export default MovieCard;
