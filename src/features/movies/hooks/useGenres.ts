import { useQuery } from "@tanstack/react-query";
import { getGenres } from "../api/tmdb";
import { movieKeys } from "../api/keys";

export const genresQueryOptions = {
  queryKey: movieKeys.genres,
  queryFn: getGenres,
} as const;

export function useGenres() {
  return useQuery(genresQueryOptions);
}
