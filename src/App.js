import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import "./Movies.css";

const API_KEY = "65b8c81a835e49e2a499028aeaf7ab9b";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500"; // TMDB image base URL
const PLACEHOLDER_IMAGE = "https://via.placeholder.com/150"; // Placeholder for missing images

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

function App() {
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
      <h1 className="title">Movie Search</h1>
      <SearchBar onResults={setMovies} />
      <div className="movies-grid">
        {movies.map((item) => (
          <div className="movie-card" key={item.id}>
            <img
              src={
                item.media_type === "person"
                  ? item.profile_path
                    ? `${IMAGE_BASE_URL}${item.profile_path}`
                    : PLACEHOLDER_IMAGE
                  : item.poster_path
                  ? `${IMAGE_BASE_URL}${item.poster_path}`
                  : PLACEHOLDER_IMAGE
              }
              alt={item.title || item.name}
              className="movie-image"
            />
            <div className="movie-info">
              <h2 className="movie-title">{item.title || item.name}</h2>
              {item.media_type && <p className="movie-type">{item.media_type.toUpperCase()}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
