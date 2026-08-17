import { QueryClient } from "@tanstack/react-query";

/**
 * QueryClient module-level (advanced-init-once): dibuat sekali per app load,
 * bukan per mount. `staleTime` default 5 menit sesuai AGENTS.md.
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});
