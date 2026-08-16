import { apiClient } from "@/shared/lib/api";
import { env } from "@/shared/config/env";
import { mockCreateMovie, mockGetMovies } from "@/shared/mocks/adapter";
import type { MockMovie } from "@/shared/mocks/db";

export interface CreateMoviePayload {
  title: string;
  category: string;
  release_date: string;
  duration_hour: number;
  duration_minute: number;
  director_name: string;
  genres: string;
  cast: string;
  synopsis: string;
}

export async function createMovie(
  payload: CreateMoviePayload,
): Promise<{ result: MockMovie }> {
  if (env.enableMocks) {
    return mockCreateMovie(payload);
  }
  return apiClient.post<{ result: MockMovie }>("/movies/create", payload);
}

export async function getMovies(): Promise<{ result: MockMovie[] }> {
  if (env.enableMocks) {
    return mockGetMovies();
  }
  return apiClient.get<{ result: MockMovie[] }>("/movies");
}
