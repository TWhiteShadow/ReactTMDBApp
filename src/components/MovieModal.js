import React from "react";

const MovieModal = ({ movie, onClose }) => {
  if (!movie) return null;

  const getStarRating = (voteAverage) => {
    const stars = (voteAverage / 2).toFixed(1);
    return stars;
  };

  const starRating = getStarRating(movie.vote_average);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close-button" onClick={onClose}>
          &times;
        </button>
        <h2>{movie.title || movie.name}</h2>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title || movie.name}
          className="modal-image"
        />
        <p><strong>Release Date:</strong> {movie.release_date}</p>
        <p><strong>Overview:</strong> {movie.overview}</p>
        <p><strong>Vote Average:</strong> {starRating} ⭐</p>
      </div>
    </div>
  );
};

export default MovieModal;
