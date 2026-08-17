import { useMemo } from "react";
import { useNowPlaying } from "./useNowPlaying";

export type ExploreSort = "popular" | "latest" | "ascending" | "descending";

export interface ExploreFilters {
  query: string;
  genre: number | null;
  sort: ExploreSort;
  page: number;
}

export const EXPLORE_SORTS: ReadonlyArray<ExploreSort> = [
  "popular",
  "latest",
  "ascending",
  "descending",
];

const PAGE_SIZE = 8;

/**
 * Explore berjalan client-side di atas data now playing yang sudah di-cache
 * oleh React Query. Semua state (query/genre/sort/page) berasal dari URL,
 * sehingga hasil pencarian bisa di-share lewat link.
 */
export function useExplore(filters: ExploreFilters) {
  const nowPlaying = useNowPlaying();

  const results = useMemo(() => {
    const q = filters.query.trim().toLowerCase();
    const filtered = (nowPlaying.data ?? []).filter((movie) => {
      const matchesQuery = q === "" || movie.title.toLowerCase().includes(q);
      const matchesGenre =
        filters.genre === null || movie.genreIds.includes(filters.genre);
      return matchesQuery && matchesGenre;
    });

    return filtered.toSorted((a, b) => {
      switch (filters.sort) {
        case "popular":
          return b.voteCount - a.voteCount;
        case "latest":
          return (
            new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
          );
        case "ascending":
          return a.title.localeCompare(b.title);
        case "descending":
          return b.title.localeCompare(a.title);
      }
    });
  }, [nowPlaying.data, filters.query, filters.genre, filters.sort]);

  const pageCount = Math.max(1, Math.ceil(results.length / PAGE_SIZE));
  const safePage = Math.min(Math.max(filters.page, 1), pageCount);

  return {
    data: results.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE),
    total: results.length,
    page: safePage,
    pageCount,
    isPending: nowPlaying.isPending,
    isError: nowPlaying.isError,
  };
}
