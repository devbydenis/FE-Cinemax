import { FiSearch } from "react-icons/fi";
import { GenreChip } from "./GenreChip";
import { EXPLORE_SORTS, type ExploreSort } from "../hooks/useExplore";
import type { Genre } from "../types/tmdb";

interface MovieMenuProps {
  query: string;
  sort: ExploreSort;
  genres: Genre[];
  activeGenre: number | null;
  onQueryChange: (value: string) => void;
  onSortChange: (value: ExploreSort) => void;
  onGenreChange: (id: number | null) => void;
}

export function MovieMenu({
  query,
  sort,
  genres,
  activeGenre,
  onQueryChange,
  onSortChange,
  onGenreChange,
}: MovieMenuProps) {
  return (
    <form
      className="grid grid-cols-1 gap-5 px-5 py-10 md:grid-cols-2 md:px-20 md:py-15"
      onSubmit={(event) => event.preventDefault()}
    >
      <section className="flex w-full items-center justify-between gap-5 md:col-span-2">
        <h2 className="text-2xl leading-7 font-semibold text-white-primary md:text-4xl">
          Now Showing in Cinemas
        </h2>
        <select
          className="border-orange text-orange w-fit cursor-pointer rounded-md border-2 px-2 py-3 font-semibold focus:outline-none"
          id="sortby"
          value={sort}
          onChange={(event) => onSortChange(event.currentTarget.value as ExploreSort)}
        >
          {EXPLORE_SORTS.map((value) => (
            <option className="font-semibold" key={value} value={value}>
              {value.charAt(0).toUpperCase() + value.slice(1)}
            </option>
          ))}
        </select>
      </section>
      <section>
        <div className="flex flex-col gap-5">
          <h2 className="text-xl/7 font-semibold text-white-primary">Find Movie</h2>
          <div className="flex items-center gap-3 rounded-full border-2 border-white-primary px-6 py-4">
            <FiSearch className="text-white-primary" />
            <input
              className="w-full rounded-full tracking-wider text-white-primary focus:outline-none"
              type="text"
              placeholder="Search Your Movie"
              name="query"
              value={query}
              onChange={(event) => onQueryChange(event.currentTarget.value)}
            />
          </div>
        </div>
      </section>
      <section>
        <h2 className="mb-5 text-xl/7 font-semibold text-white-primary">Filter</h2>
        <div className="custom-scrollbar flex h-28 flex-wrap gap-4 overflow-x-scroll">
          {genres.map((genre) => (
            <GenreChip
              key={genre.id}
              label={genre.name}
              active={activeGenre === genre.id}
              onSelect={() =>
                onGenreChange(activeGenre === genre.id ? null : genre.id)
              }
            />
          ))}
        </div>
      </section>
    </form>
  );
}
