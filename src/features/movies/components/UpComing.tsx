import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
import { Chip } from "@/shared/components/Chip";
import { GenreChip } from "./GenreChip";
import { MovieCard } from "./MovieCard";
import type { Genre, Movie } from "../types/tmdb";

interface UpComingProps {
  movies: Movie[];
  genres: Genre[];
  isPending: boolean;
  isError: boolean;
}

const HIGHLIGHT_GENRES = ["Action", "Adventure", "Comedy", "Science Fiction"];

export function UpComing({ movies, genres, isPending, isError }: UpComingProps) {
  const highlightedGenres = genres.filter((genre) =>
    HIGHLIGHT_GENRES.includes(genre.name),
  );

  return (
    <section className="my-10 md:mx-20">
      <div className="mb-4 flex flex-col items-center justify-center gap-4">
        <Chip value="UPCOMING MOVIES" />
        <div className="flex flex-col items-center justify-center gap-5 md:flex-row md:items-start">
          <h3 className="flex-1 px-20 text-center text-3xl/9 font-extrabold text-white lg:flex-4 lg:text-5xl">
            Exciting Movie Coming Soon
          </h3>
          <ul className="custom-scrollbar mx-auto mb-3 flex w-fit flex-2 gap-2 pb-5">
            {highlightedGenres.map((genre) => (
              <li key={genre.id}>
                <GenreChip label={genre.name} to={`/movies?genre=${genre.id}`} />
              </li>
            ))}
          </ul>
        </div>
      </div>
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
        <ul className="container-card custom-scrollbar mx-3 flex gap-5 overflow-x-scroll">
          {movies.map((movie) => (
            <li key={`movie-id-${movie.id}`}>
              <MovieCard category="upcoming" movie={movie} genres={genres} />
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
