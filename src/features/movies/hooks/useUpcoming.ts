import { useQuery } from "@tanstack/react-query";
import { getUpcomingMovies } from "../api/tmdb";
import { movieKeys } from "../api/keys";

export const upcomingQueryOptions = {
  queryKey: movieKeys.upcoming,
  queryFn: () => getUpcomingMovies(1),
} as const;

export function useUpcoming() {
  return useQuery(upcomingQueryOptions);
}
