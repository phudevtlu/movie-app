import React from "react";
import { SwiperSlide, Swiper } from "swiper/react";
import MovieCard from "./MovieCard";
import { fetcher } from "../../config.js";
import useSWR from "swr";
const MovieList = ({ type = "now_playing" }) => {
  const { data, error, isLoading } = useSWR(
    `https://api.themoviedb.org/3/movie/${type}?api_key=269756819b6cc916ba4f6519b0007fff`,
    fetcher
  );
  const movies = data?.results || [];

  return (
    <div className="movie-list">
      <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
        {movies.length > 0 &&
          movies.map((item) => (
            <SwiperSlide key={item.id}>
              <MovieCard item={item}></MovieCard>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default MovieList;
