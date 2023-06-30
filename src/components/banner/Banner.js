import React from "react";
import useSWR from "swr";
import { fetcher } from "../../config";
import { SwiperSlide, Swiper } from "swiper/react";

const Banner = () => {
  const { data, error, isLoading } = useSWR(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=269756819b6cc916ba4f6519b0007fff`,
    fetcher
  );
  const movies = data?.results || [];

  return (
    <section className="banner h-[500px] page-container mb-20">
      <Swiper grabCursor="true" slidesPerView={"auto"}>
        {movies.length > 0 &&
          movies.map((item) => (
            <SwiperSlide key={item.id}>
              <BannerItem item={item}></BannerItem>
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  );
};
function BannerItem({ item }) {
  const { poster_path, title, backdrop_path } = item || {};
  return (
    <div className="w-full h-full rounded-lg relative select-none">
      <div className="overlay absolute inset-0 bg-gradient-to-t rounded-lg from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.5)]"></div>
      <img
        src={`https://image.tmdb.org/t/p/w500/${backdrop_path}`}
        alt=""
        className="w-full h-full  object-cover rounded-lg"
      />
      <div className="content absolute left-5 bottom-5 w-full text-white">
        <h2 className="font-bold text-3xl mb-5">{title}</h2>
        <div className="flex items-center gap-x-3 mb-8">
          <span className="py-2 px-4 border-white rounded-md border">
            Adventure
          </span>
          <span className="py-2 px-4 border-white rounded-md border">
            Adventure
          </span>
          <span className="py-2 px-4 border-white rounded-md border">
            Adventure
          </span>
        </div>
        <button className="py-3 px-6 rounded-lg bg-primary text-white font-medium">
          Watch Now
        </button>
      </div>
    </div>
  );
}

export default Banner;
