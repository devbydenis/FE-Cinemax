import { useTransition } from "react";
import { useSearchParams } from "react-router-dom";
import { Newslater } from "@/shared/components/Newslater";
import { useDebouncedValue } from "@/shared/hooks/useDebouncedValue";
import { MoviesBanner } from "../components/MoviesBanner";
import { MovieMenu } from "../components/MovieMenu";
import { MovieCard } from "../components/MovieCard";
import { Pagination } from "../components/Pagination";
import { EXPLORE_SORTS, useExplore, type ExploreSort } from "../hooks/useExplore";
import { useGenres } from "../hooks/useGenres";

function MoviesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const query = searchParams.get("query") ?? "";
  const genreRaw = searchParams.get("genre");
  const genre = genreRaw ? Number(genreRaw) : null;
  const sortRaw = searchParams.get("sort");
  const sort: ExploreSort = EXPLORE_SORTS.includes(sortRaw as ExploreSort)
    ? (sortRaw as ExploreSort)
    : "popular";
  const pageParam = Number(searchParams.get("page") ?? "1");
  const page = Number.isFinite(pageParam) && pageParam >= 1 ? pageParam : 1;

  const debouncedQuery = useDebouncedValue(query, 300);
  const explore = useExplore({ query: debouncedQuery, genre, sort, page });
  const { data: genres } = useGenres();

  const updateParams = (patch: Record<string, string | null>) => {
    const next = new URLSearchParams(searchParams);
    for (const [key, value] of Object.entries(patch)) {
      if (value === null) {
        next.delete(key);
      } else {
        next.set(key, value);
      }
    }
    next.delete("page");
    startTransition(() => setSearchParams(next));
  };

  const handlePageChange = (nextPage: number) => {
    const next = new URLSearchParams(searchParams);
    next.set("page", String(nextPage));
    startTransition(() => setSearchParams(next));
  };

  return (
    <section>
      <MoviesBanner />
      <MovieMenu
        query={query}
        sort={sort}
        genres={genres ?? []}
        activeGenre={genre}
        onQueryChange={(value) => updateParams({ query: value === "" ? null : value })}
        onSortChange={(value) =>
          updateParams({ sort: value === "popular" ? null : value })
        }
        onGenreChange={(id) => updateParams({ genre: id === null ? null : String(id) })}
      />
      <section className="px-5 md:px-10">
        {isPending && <p className="text-center text-white">Updating...</p>}
        {explore.isPending ? (
          <p className="text-center text-white">Loading...</p>
        ) : explore.data.length === 0 ? (
          <h1 className="text-center text-2xl font-semibold text-white">
            No movie found
          </h1>
        ) : (
          <ul className="flex flex-wrap justify-center gap-5 sm:gap-10">
            {explore.data.map((movie) => (
              <li key={`movie-id-${movie.id}`}>
                <MovieCard category="now playing" movie={movie} genres={genres ?? []} />
              </li>
            ))}
          </ul>
        )}
        <p className="text-center text-xl font-semibold text-white-primary">
          {explore.total} result
        </p>
        <Pagination
          page={explore.page}
          pageCount={explore.pageCount}
          onPageChange={handlePageChange}
        />
      </section>
      <Newslater />
    </section>
  );
}

export default MoviesPage;
