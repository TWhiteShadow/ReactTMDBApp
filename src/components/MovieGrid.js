import React, { useState } from "react";
import MovieCard from "./MovieCard";
import MovieModal from "./MovieModal";

const MovieGrid = ({ movies }) => {
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleSelectMovie = (movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  return (
    <div className="movies-grid">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} onSelectMovie={handleSelectMovie} />
      ))}
      <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
    </div>
  );
};

export default MovieGrid;
