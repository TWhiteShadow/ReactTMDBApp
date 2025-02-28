import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import { addFavorite, removeFavorite, isFavorite } from "../utils/db";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  const [favorite, setFavorite] = useState(false);  const handleClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  console.log(movie);
  useEffect(() => {
    isFavorite(movie.id).then(setFavorite);
  }, [movie.id]);

  const handleFavorite = async () => {
    if (favorite) {
      await removeFavorite(movie.id);
    } else {
      await addFavorite(movie);
    }
    setFavorite(!favorite);
  };

  return (
    <div className="movie-card" >
      <img onClick={handleClick}
     src={`https://image.tmdb.org/t/p/w500${movie.poster_path || movie.profile_path}`} 
     alt={movie.title || movie.name}
     className="movie-image"
     onError={(e) => e.target.src = 'https://media.istockphoto.com/id/1472933890/vector/no-image-vector-symbol-missing-available-icon-no-gallery-for-this-moment-placeholder.jpg?s=612x612&w=0&k=20&c=Rdn-lecwAj8ciQEccm0Ep2RX50FCuUJOaEM8qQjiLL0='}
/>
      <div className="movie-info">
        <h2 className="movie-title">{movie.title || movie.name}</h2>
        {movie.media_type && <p className="movie-type">{movie.media_type.toUpperCase()}</p>}
        <button onClick={handleFavorite}>
        {favorite ? "Remove from Favorites ❤️" : "Add to Favorites 🤍"}
      </button>
      </div>
    </div>
  );
};

export default MovieCard;
