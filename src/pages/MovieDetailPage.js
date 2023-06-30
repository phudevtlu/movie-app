import React from "react";
import { useParams } from "react-router-dom";

import { SwiperSlide, Swiper } from "swiper/react";

import useSWR from "swr";
import MovieCard from "../components/movie/MovieCard";
import { fetcher, apiKey } from "../config";
const MovieDetailPage = () => {
  const { movieId } = useParams();
  const { data, error } = useSWR(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`,
    fetcher
  );

  const { backdrop_path, poster_path, title, overview, genres } = data || {};

  return (
    <div className="py-10">
      <div className="w-full h-[600px] relative">
        <div className="overlay absolute inset-0 bg-gradient-to-t rounded-lg from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.5)]"></div>
        <div
          className="w-full h-full justify-center  bg-no-repeat bg-cover bg-center rounded-lg"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${backdrop_path})`,
          }}
        ></div>
      </div>
      <div className="w-full h-[500px] mx-auto -mt-[300px] relative z-10 pb-10">
        <img
          src={`https://image.tmdb.org/t/p/original/${poster_path}`}
          alt=""
          className="w-full h-full object-contain rounded-xl"
        />
      </div>
      <h1 className="text-center text-4xl  text-white font-bold mb-10">
        {title}
      </h1>
      {genres && genres.length > 0 && (
        <div className="flex items-center justify-center gap-x-5 mb-10">
          {genres.map((item) => (
            <span
              className="py-2 px-4 border-primary text-primary border rounded-lg"
              key={item.id}
            >
              {item.name}
            </span>
          ))}
        </div>
      )}
      <p className="text-center text-sm leading-relaxed max-w-[600px] mx-auto mb-10">
        {overview}
      </p>
      <MovieCredits></MovieCredits>
      <MovieVideo></MovieVideo>
      <MovieSimilar></MovieSimilar>
    </div>
  );
};

function MovieCredits() {
  const { movieId } = useParams();
  const { data, error } = useSWR(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`,
    fetcher
  );
  const { cast } = data || {};
  return (
    <div className="py-10">
      <h2 className="text-center text-3xl mb-10 font-medium">Casts</h2>
      <div className="grid grid-cols-4 gap-5">
        {cast &&
          cast.slice(0, 4).map((item) => (
            <div className="cast-item" key={item.id}>
              <img
                src={`https://image.tmdb.org/t/p/original/${item.profile_path}`}
                alt=""
                className="w-full h-[350px] object-cover rounded-lg"
              />
              <h3 className="text-xl font-medium text-center">{item.name}</h3>
            </div>
          ))}
      </div>
    </div>
  );
}
function MovieVideo() {
  const { movieId } = useParams();
  const { data, error } = useSWR(
    `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`,
    fetcher
  );
  if (!data) return null;
  const { results } = data || {};
  if (!results || results.length <= 0) return null;
  return (
    <div className="py-10">
      <div className="flex flex-col gap-10">
        {results.slice(0, 2).map((item) => (
          <div className="" key={item.id}>
            <h3 className="mb-5 text-xl font-medium p-3 bg-blue-800 inline-block">
              {item.name}
            </h3>
            <div className="w-full aspect-video">
              <iframe
                width="942"
                height="530"
                src={`https://www.youtube.com/embed/${item.key}`}
                title="Live Visuals/VJ Set🛸 tripart_radiated_art 👽 . . . DJ Set Fabio Panaro Techno Keller Vol. 03"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full object-fill"
              ></iframe>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MovieSimilar() {
  const { movieId } = useParams();
  const { data, error } = useSWR(
    `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${apiKey}`,
    fetcher
  );
  const { results } = data || {};
  return (
    <div className="py-10">
      <h2 className="text-3xl font-medium mb-10">Similar moives</h2>
      <div className="movie-list">
        <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
          {results &&
            results.map((item) => (
              <SwiperSlide key={item.id}>
                <MovieCard item={item}></MovieCard>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
}

export default MovieDetailPage;
