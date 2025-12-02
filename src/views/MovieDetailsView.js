import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  addFavorite, removeFavorite, isFavorite,
  saveRating, getRating, saveComment, getComments
} from "../utils/db";

const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = process.env.REACT_APP_BASE_URL;

const MovieDetailsView = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [favorite, setFavorite] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
        const data = await response.json();
        setMovie(data);

        isFavorite(data.id).then(setFavorite);
        getRating(data.id).then(setRating);
        getComments(data.id).then(setComments);
        console.log("Movie details", data);
      } catch (error) {
        console.error("Error fetching movie details", error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const handleFavorite = async () => {
    if (favorite) {
      await removeFavorite(movie.id);
    } else {
      await addFavorite(movie);
    }
    setFavorite(!favorite);
  };

  const handleRating = async (newRating) => {
    if (newRating === rating) {
      newRating = 0;
    }
    setRating(newRating);
    await saveRating(movie.id, newRating);
  };

  const handleComment = async () => {
    if (comment.trim()) {
      await saveComment(movie.id, comment);
      setComment(""); // Clear input field
      getComments(movie.id).then(setComments); // Fetch updated comments
    }
  };

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="movie-details">
      <div className="background-image" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})` }}>
        <div className="content-container">
          <div className="content">
            <div className="left">
              <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="movie-poster" />
            </div>
            <div className="right">
              <h1>{movie.title}</h1>
              <div className="flex">
                <p><strong>Release Date:</strong> {movie.release_date}</p>
                <p><strong>Vote Average:</strong> {(Math.round((movie.vote_average / 2) * 10) / 10).toFixed(1)} ⭐</p>
                <button onClick={handleFavorite}>
                  {favorite ? "❤️" : "🤍"}
                </button>
              </div>
              <p><strong>Overview:</strong> {movie.overview}</p>
              <div className="rating">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} onClick={() => handleRating(star)} style={{ cursor: "pointer", fontSize: "24px" }}>
                    {star <= rating ? "⭐" : "☆"}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="comment-section">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your review..."
          rows="3"
        />
        <button onClick={handleComment}>Submit Review</button>
      </div>

      <div className="comments-feed">
        <h3>Latest Reviews</h3>
        {comments.length === 0 ? (
          <p>No comments yet. Be the first to review!</p>
        ) : (
          <ul>
            {comments.map((c, index) => (
              <li key={index}>
                <p>{c.text}</p>
                <small>{new Date(c.timestamp).toLocaleString()}</small>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MovieDetailsView;
