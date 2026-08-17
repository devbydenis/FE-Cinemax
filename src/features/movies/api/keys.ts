export const movieKeys = {
  all: ["movies"] as const,
  nowPlaying: ["movies", "now-playing"] as const,
  upcoming: ["movies", "upcoming"] as const,
  genres: ["movies", "genres"] as const,
  detail: (id: string | number) => ["movies", "detail", String(id)] as const,
};
