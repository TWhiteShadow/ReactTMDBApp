import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import MovieGrid from "../components/MovieGrid";

const SearchView = () => {
  const [movies, setMovies] = useState([]);

  return (
    <div className="container">
      <h1 className="title">Search Results</h1>
      <SearchBar onResults={setMovies} />
      <MovieGrid movies={movies} />
    </div>
  );
};

export default SearchView;
