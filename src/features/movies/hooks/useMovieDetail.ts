import { useQuery } from "@tanstack/react-query";
import { getMovieDetail } from "../api/tmdb";
import { movieKeys } from "../api/keys";

export function useMovieDetail(id: string | number | undefined) {
  return useQuery({
    queryKey: movieKeys.detail(id ?? ""),
    queryFn: () => getMovieDetail(id ?? ""),
    enabled: Boolean(id),
  });
}
