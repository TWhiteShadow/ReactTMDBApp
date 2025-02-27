import React, { useState } from "react";
import MovieCard from "./MovieCard";
import MovieModal from "./MovieModal";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

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
      <Swiper
        slidesPerView={"auto"}
        spaceBetween={30}
        centeredSlides={true}
        
        className="mySwiper"
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <MovieCard movie={movie} onSelectMovie={handleSelectMovie} />
          </SwiperSlide>
        ))}
      </Swiper>
      <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
    </div>
  );
};

export default MovieGrid;
