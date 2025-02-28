import { useState, useEffect, useRef } from "react";
import Fuse from "fuse.js";

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

const SearchBar = ({ onResults }) => {
  const [query, setQuery] = useState("");
  const [allResults, setAllResults] = useState([]);
  const debounceTimeout = useRef(null);

  useEffect(() => {
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

    debounceTimeout.current = setTimeout(async () => {
      if (!query.trim()) {
        getTrendingMovies().then(onResults);
        return;
      }

      try {
        const response = await fetch(`${BASE_URL}/search/multi?api_key=${API_KEY}&query=${query}`);
        const data = await response.json();
        setAllResults(data.results || []);
      } catch (error) {
        console.error("Error searching", error);
        setAllResults([]);
      }
    }, 500);

    return () => clearTimeout(debounceTimeout.current);
  }, [query]);

  useEffect(() => {
    if (query.trim() && allResults.length > 0) {
      const options = {
        keys: ["title", "name"],
        threshold: 0.2,
        minMatchCharLength: 2,
      };

      const fuse = new Fuse(allResults, options);
      const filteredResults = fuse.search(query.trim().toLowerCase()).map((result) => result.item);

      onResults(filteredResults);
    }
  }, [query, allResults]);

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search movies, actors, series, directors..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search-input"
      />
    </div>
  );
};

export default SearchBar;
