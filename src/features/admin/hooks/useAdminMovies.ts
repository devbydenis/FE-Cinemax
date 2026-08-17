import { useMutation, useQuery } from "@tanstack/react-query";
import { createMovie, getMovies } from "../api/admin";

export const adminKeys = {
  movies: ["admin", "movies"] as const,
};

export function useCreateMovie() {
  return useMutation({
    mutationFn: createMovie,
  });
}

export function useAdminMovies() {
  return useQuery({
    queryKey: adminKeys.movies,
    queryFn: getMovies,
    select: (data) => data.result,
  });
}
