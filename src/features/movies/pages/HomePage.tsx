import { useQueries } from "@tanstack/react-query";
import { Newslater } from "@/shared/components/Newslater";
import { NowPlaying } from "../components/NowPlaying";
import { WhyChooseUs } from "../components/WhyChooseUs";
import { Banner } from "../components/Banner";
import { UpComing } from "../components/UpComing";
import { nowPlayingQueryOptions } from "../hooks/useNowPlaying";
import { upcomingQueryOptions } from "../hooks/useUpcoming";
import { genresQueryOptions } from "../hooks/useGenres";

function HomePage() {
  const queries = useQueries({
    queries: [nowPlayingQueryOptions, upcomingQueryOptions, genresQueryOptions],
  });
  const [nowPlaying, upcoming, genres] = queries;

  return (
    <main>
      <Banner />
      <NowPlaying
        movies={nowPlaying.data ?? []}
        genres={genres.data ?? []}
        isPending={nowPlaying.isPending}
        isError={nowPlaying.isError}
      />
      <WhyChooseUs />
      <UpComing
        movies={upcoming.data ?? []}
        genres={genres.data ?? []}
        isPending={upcoming.isPending}
        isError={upcoming.isError}
      />
      <Newslater />
    </main>
  );
}

export default HomePage;
