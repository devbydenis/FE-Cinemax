import { memo, useMemo } from "react";
import { Link } from "react-router-dom";
import { env } from "@/shared/config/env";
import type { Genre, Movie } from "../types/tmdb";

interface MovieCardProps {
  movie: Movie;
  genres?: Genre[];
  category?: "now playing" | "upcoming";
}

function MovieCardBase({ movie, genres = [], category = "now playing" }: MovieCardProps) {
  const genreNameById = useMemo(
    () => new Map(genres.map((genre) => [genre.id, genre.name] as const)),
    [genres],
  );

  const title =
    movie.title.length <= 25 ? movie.title : `${movie.title.substring(0, 25)}...`;

  return (
    <div className="group relative mb-5 h-fit w-[9.5rem] text-center md:w-[18.5rem]">
      <div className="invisible absolute top-0 right-0 left-0 h-56 rounded-2xl transition duration-300 group-hover:visible group-hover:bg-black group-hover:opacity-50 md:h-[27.75rem]"></div>
      <div className="invisible absolute top-0 right-0 left-0 z-10 flex h-56 flex-col items-center justify-center gap-3 group-hover:visible md:h-[27.75rem]">
        <Link
          to={`/movies/${movie.id}`}
          className="hover:bg-orange w-36 rounded py-3 text-center text-white outline outline-white hover:font-bold hover:outline-none"
        >
          Details
        </Link>
        <Link
          to={`/movies/${movie.id}`}
          className="hover:bg-orange w-36 rounded py-3 text-center text-white outline outline-white hover:font-bold hover:outline-none"
        >
          Buy Tickets
        </Link>
      </div>
      {movie.voteAverage >= 7 && (
        <span className="bg-orange/80 absolute top-0 left-0 h-8 w-fit rounded-tl-2xl px-3 pt-2 text-xs font-semibold text-white">
          Recomended
        </span>
      )}
      <div
        className="mb-2.5 h-56 w-[9.5rem] rounded-2xl md:h-[27.75rem] md:w-[296px]"
        style={{
          backgroundImage: `url(${env.tmdbImageUrl}${movie.posterPath})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
      <Link
        className="text-lg leading-4 font-semibold text-white md:text-xl md:leading-7"
        to={`/movies/${movie.id}`}
      >
        {title}
      </Link>
      {category === "now playing" && (
        <ul
          className={`mt-1.5 flex ${movie.genreIds.length <= 3 ? "justify-center" : "justify-start"} gap-1 custom-scrollbar-second md:gap-2`}
        >
          {movie.genreIds.map((id) => {
            const name = genreNameById.get(id);
            return (
              <li
                key={id}
                className="mb-2 rounded-full border border-white bg-transparent px-2 py-1.5 text-xs text-white md:px-2 md:py-2 md:text-sm md:leading-6"
              >
                {name === "Science Fiction" ? "Sci-fi" : name}
              </li>
            );
          })}
        </ul>
      )}
      {category === "upcoming" && (
        <div className="mt-1 flex justify-center">
          <p className="bg-orange/40 text-orange w-fit rounded px-2 py-1 text-[10px] md:px-4 md:py-2 md:text-base">
            {movie.releaseDate}
          </p>
        </div>
      )}
    </div>
  );
}

export const MovieCard = memo(MovieCardBase);
