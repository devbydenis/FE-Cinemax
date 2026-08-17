import { useQuery } from "@tanstack/react-query";
import { getNowPlayingMovies } from "../api/tmdb";
import { movieKeys } from "../api/keys";

export const nowPlayingQueryOptions = {
  queryKey: movieKeys.nowPlaying,
  queryFn: () => getNowPlayingMovies(1),
} as const;

export function useNowPlaying() {
  return useQuery(nowPlayingQueryOptions);
}
