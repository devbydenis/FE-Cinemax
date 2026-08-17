import { tmdbClient } from "@/shared/lib/tmdb";
import type {
  Movie,
  MovieDetail,
  TmdbGenre,
  TmdbGenresResponse,
  TmdbMovie,
  TmdbMovieDetail,
  TmdbNowPlayingResponse,
  TmdbUpcomingResponse,
} from "../types/tmdb";

function mapTmdbMovie(movie: TmdbMovie): Movie {
  return {
    id: movie.id,
    title: movie.title,
    overview: movie.overview,
    posterPath: movie.poster_path,
    backdropPath: movie.backdrop_path,
    releaseDate: movie.release_date,
    genreIds: movie.genre_ids,
    voteAverage: movie.vote_average,
    voteCount: movie.vote_count,
  };
}

function mapTmdbMovieDetail(detail: TmdbMovieDetail): MovieDetail {
  const directors = (detail.credits?.crew ?? [])
    .filter((crew) => crew.job === "Director")
    .map((crew) => crew.name);
  const casts = (detail.credits?.cast ?? [])
    .toSorted((a, b) => a.order - b.order)
    .slice(0, 6)
    .map((cast) => cast.name);

  return {
    id: detail.id,
    title: detail.title,
    overview: detail.overview,
    posterPath: detail.poster_path,
    backdropPath: detail.backdrop_path,
    releaseDate: detail.release_date,
    genreIds: [],
    voteAverage: detail.vote_average,
    voteCount: detail.vote_count,
    runtime: detail.runtime ?? 0,
    genres: detail.genres ?? [],
    directors,
    casts,
  };
}

export async function getNowPlayingMovies(page = 1): Promise<Movie[]> {
  const data = await tmdbClient.get<TmdbNowPlayingResponse>("/movie/now_playing", {
    params: { language: "en-US", page },
  });
  return data.results.map(mapTmdbMovie);
}

export async function getUpcomingMovies(page = 1): Promise<Movie[]> {
  const data = await tmdbClient.get<TmdbUpcomingResponse>("/movie/upcoming", {
    params: { language: "en-US", page },
  });
  return data.results.map(mapTmdbMovie);
}

export async function getGenres(): Promise<TmdbGenre[]> {
  const data = await tmdbClient.get<TmdbGenresResponse>("/genre/movie/list", {
    params: { language: "en-US" },
  });
  return data.genres;
}

export async function getMovieDetail(id: string | number): Promise<MovieDetail> {
  const data = await tmdbClient.get<TmdbMovieDetail>(`/movie/${id}`, {
    params: { language: "en-US", append_to_response: "credits" },
  });
  return mapTmdbMovieDetail(data);
}
