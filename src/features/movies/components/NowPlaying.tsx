import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
import { MovieCard } from "./MovieCard";
import type { Genre, Movie } from "../types/tmdb";

interface NowPlayingProps {
  movies: Movie[];
  genres: Genre[];
  isPending: boolean;
  isError: boolean;
}

export function NowPlaying({ movies, genres, isPending, isError }: NowPlayingProps) {
  return (
    <section className="mx-10 md:mx-20 md:mt-16 md:pb-20">
      <h2 className="text-center text-2xl leading-11 font-semibold text-white md:mb-9 md:text-4xl">
        Now Showing in Cinemas
      </h2>
      {isPending ? (
        <p className="text-center text-white">Loading...</p>
      ) : isError ? (
        <p className="text-center text-2xl text-red-500">Error</p>
      ) : movies.length === 0 ? (
        <div className="w-full text-center">
          <p className="text-2xl text-red-400">No Movies Found</p>
          <small className="text-white">Something went wrong</small>
        </div>
      ) : (
        <ul className="container-card custom-scrollbar relative flex gap-5 overflow-x-scroll">
          {movies.map((movie) => (
            <li key={`movie-id-${movie.id}`}>
              <MovieCard category="now playing" movie={movie} genres={genres} />
            </li>
          ))}
        </ul>
      )}
      <span className="flex justify-center">
        <Link
          to={"/movies"}
          className="bg-orange mt-10 flex items-center justify-center gap-2 rounded-full px-3 py-1 text-sm font-medium text-white uppercase hover:opacity-70 active:scale-95 active:transition-all md:px-6 md:py-3 md:text-lg"
        >
          View All
          <FaArrowRight />
        </Link>
      </span>
    </section>
  );
}
