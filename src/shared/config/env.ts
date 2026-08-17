interface Env {
  tmdbUrl: string;
  tmdbApiKey: string;
  tmdbImageUrl: string;
  apiUrl: string;
  apiImageUrl: string;
  enableMocks: boolean;
}

export const env: Env = {
  tmdbUrl: import.meta.env.VITE_TMDB_URL ?? "https://api.themoviedb.org/3",
  tmdbApiKey: import.meta.env.VITE_TMDB_API_KEY ?? "",
  tmdbImageUrl: import.meta.env.VITE_TMDB_IMAGE_URL ?? "https://image.tmdb.org/t/p/w500",
  apiUrl: import.meta.env.VITE_API_URL ?? "http://localhost:8800",
  apiImageUrl: import.meta.env.VITE_API_IMAGE_URL ?? "http://localhost:8800/uploads",
  enableMocks: import.meta.env.VITE_ENABLE_MOCKS === "true",
};
