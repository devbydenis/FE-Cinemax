export interface TmdbGenre {
  id: number;
  name: string;
}

export interface TmdbMovie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  genre_ids: number[];
  vote_average: number;
  vote_count: number;
}

export interface TmdbMovieDetail extends Omit<TmdbMovie, "genre_ids"> {
  runtime: number;
  genres: TmdbGenre[];
  credits?: {
    cast: Array<{ id: number; name: string; order: number }>;
    crew: Array<{ id: number; name: string; job: string }>;
  };
}

export interface TmdbNowPlayingResponse {
  page: number;
  results: TmdbMovie[];
  total_pages: number;
  total_results: number;
}

export interface TmdbUpcomingResponse {
  page: number;
  results: TmdbMovie[];
  total_pages: number;
  total_results: number;
}

export interface TmdbGenresResponse {
  genres: TmdbGenre[];
}

export interface Movie {
  id: number;
  title: string;
  overview: string;
  posterPath: string | null;
  backdropPath: string | null;
  releaseDate: string;
  genreIds: number[];
  voteAverage: number;
  voteCount: number;
}

export interface MovieDetail extends Movie {
  runtime: number;
  genres: TmdbGenre[];
  directors: string[];
  casts: string[];
}

export type Genre = TmdbGenre;
