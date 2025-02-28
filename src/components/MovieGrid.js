import React, { useState } from "react";
import MovieCard from "./MovieCard";
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
        slidesPerView={"auto"} // why isn't {auto} working idk
        spaceBetween={30}
        centeredSlides={false}
        slidesOffsetBefore={30}
        slidesOffsetAfter={30}

        className="mySwiper"
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <MovieCard movie={movie} onSelectMovie={handleSelectMovie} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MovieGrid;
