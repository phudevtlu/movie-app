import React, { useEffect, useState } from "react";

import useSWR from "swr";
import MovieCard from "../components/movie/MovieCard.js";
import { fetcher } from "../config.js";
import useDebounce from "../hook/useDebounce.js";

const MoviePage = () => {
  const [filter, setFilter] = useState("");
  const filterDebounce = useDebounce(filter, 1000);
  const [url, setUrl] = useState(
    "https://api.themoviedb.org/3/movie/popular?api_key=269756819b6cc916ba4f6519b0007fff"
  );
  const handleFilerChange = (e) => {
    setFilter(e.target.value);
  };

  const { data, error, isLoading } = useSWR(url, fetcher);
  useEffect(() => {
    if (filterDebounce) {
      setUrl(
        `https://api.themoviedb.org/3/search/movie?api_key=269756819b6cc916ba4f6519b0007fff&query=${filterDebounce}`
      );
    } else {
      setUrl(
        "https://api.themoviedb.org/3/movie/popular?api_key=269756819b6cc916ba4f6519b0007fff"
      );
    }
  }, [filterDebounce]);

  const movies = data?.results || [];
  return (
    <div className="py-10 page-container ">
      <div className="flex mb-10">
        <div className="flex-1">
          <input
            onChange={handleFilerChange}
            type="text"
            className="w-full p-4 rounded-lg outline-none bg-slate-800 text-white"
            placeholder="Type here to search..."
          />
        </div>
        <button className="p-4 bg-primary text-white rounded-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
      </div>
      <div className="grid grid-cols-4 gap-10">
        {movies.length > 0 &&
          movies.map((item) => (
            <MovieCard key={item.id} item={item}></MovieCard>
          ))}
      </div>
    </div>
  );
};

export default MoviePage;
