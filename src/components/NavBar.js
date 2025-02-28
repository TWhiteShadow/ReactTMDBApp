import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";

const API_KEY = "65b8c81a835e49e2a499028aeaf7ab9b";
const BASE_URL = "https://api.themoviedb.org/3";

const NavBar = () => {
  const [genres, setGenres] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
        const data = await response.json();
        setGenres(data.genres || []);
      } catch (error) {
        console.error("Error fetching genres", error);
      }
    };

    fetchGenres();
  }, []);

  const handleGenreChange = (event) => {
    const genreId = event.target.value;
    navigate(`/genre/${genreId}`);
  };

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Raph's TMDB React App 🎥</Link>
        </li>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/search">Search</Link>
        </li>
        <li>
          <select onChange={handleGenreChange} defaultValue="">
            <option value="" disabled>Select Genre</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
