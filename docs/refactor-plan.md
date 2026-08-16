# Plan Refactor `cinemax` — Structure & Data Flow

> Status: **draft — belum dieksekusi**.
> Berisi keputusan final hasil sesi grilling. Jangan dieksekusi tanpa persetujuan.

## Konteks

Refactor seluruh project dengan tujuan: struktur feature-based yang jelas, data flow yang konsisten, dan pembersihan dead code. Backend custom (`localhost:8800`) belum dikembangkan — untuk sementara memakai mock dev-only.

## Keputusan terkunci (hasil grilling)

| # | Keputusan | Detail |
|---|---|---|
| 1 | Data source | **TMDB untuk semua katalog**: browse, detail, homepage, genre. Custom backend hanya auth/order/payment/profile/admin. |
| 2 | Fetch layer | **React Query** (server state) + **Redux** (client state persist). |
| 3 | Detail & order | `useMovieDetail` (TMDB) dipakai juga di `OrderSeatPage`/`OrderTicketPage` (bukan fetch `/movies/:id` custom). |
| 4 | Explore | **Client-side filter** (URL-driven, `toSorted`, tanpa pagination server-side), kanonis `/movies`. |
| 5 | Routing | Hapus semua `*IntegrationPage` + `CardIntegration` + tipe `MoviesIntegration`. `/buy-ticket` → `<Navigate to="/movies">`. Satu item nav "Movie". |
| 6 | Genre chips | `GenreChip` controlled, di-homepage wired ke `/movies?genre=…`, ambil dari cache `useGenres`. |
| 7 | Backend belum ada | **Mock adapter** dev-only (`VITE_ENABLE_MOCKS=true`) + `docs/backend-contract.md`. |
| 8 | Auth token | Interceptor `api.ts` inject `user.token`; persist dipertahankan. |
| 9 | Keamanan | Hapus semua token TMDB hardcoded → `VITE_TMDB_API_KEY` saja. |
| 10 | Bersih-bersih | Hapus `history.ts` (tidak terdaftar), `moviesSlice.ts`, `MoviesContext`/`DetailContext`/`ModalContext`/`EditProfileContext`, `AdminExamplePage`. **Pertahankan `axios`** sebagai basis HTTP client. |
| 11 | Code style | Ikuti `.agents/AGENTS.md` (aliases `@/*`, TS strict, komponen <150 baris, ErrorBoundary) + `vercel-react-best-practices` (daftar rule di bawah). |

## Target struktur

```
src/
  app/            providers.tsx, App.tsx (rute), ErrorBoundary
  shared/         config/env.ts · lib/{http,tmdb,api,queryClient}.ts · mocks/
                  types/ · hooks/{useDebouncedValue}.ts · components/{ErrorBoundary, Chip, Modal, Loader, Navbar, Footer, layouts, ProtectedRoute}
  features/
    movies/       api/{keys,tmdb}.ts · hooks/{useNowPlaying,useUpcoming,useGenres,useExplore,useMovieDetail}.ts
                  components/{Banner,NowPlaying,UpComing,WhyChooseUs,MovieCard,GenreChip,Menu,Pagination,GradientText}.tsx
                  pages/{HomePage,MoviesPage,MovieDetailPage}.tsx · types/
    auth/         api/ hooks/ store/ components/ pages/ types/ constants/
    order/        api/{transactions}.ts · hooks/ store/orderSlice.ts · pages/{OrderSeat,OrderPayment,OrderTicket} · types/
    profile/      api/{history}.ts · hooks/ store/ components/ pages/ types/
    admin/        api/ hooks/ store/ components/ pages/ types/
  store/          combineReducers + persist (user, order, admin) — moviesSlice & history dihapus
```

## Data flow

- **Env**: `VITE_TMDB_URL`, `VITE_TMDB_API_KEY`, `VITE_TMDB_IMAGE_URL`, `VITE_API_URL`, `VITE_API_IMAGE_URL`, `VITE_ENABLE_MOCKS`.
- **Client HTTP**: `http.ts` (factory axios + interceptor unwrap + error deskriptif), `tmdb.ts` (injeksi Bearer), `api.ts` (injeksi `user.token` dari store). **Mock**: saat `VITE_ENABLE_MOCKS=true`, `api.ts` mengembalikan data dari `shared/mocks/` tanpa network.
- **Query hooks**: `useNowPlaying`, `useUpcoming`, `useGenres` (homepage via `useQueries` paralel), `useExplore(filters)` untuk `/movies`, `useMovieDetail(id)` untuk detail + order pages.
- **Order flow**: DetailPage booking → orderSlice → seat/ticket/payment. Halaman order ambil backdrop/title/genres dari `useMovieDetail(id)` (URL param), bukan custom backend.
- **Explore**: state filter di URL (`?query=&genre=&sort=&page=`), derive-during-render, `toSorted()` (tidak mutasi store), `useDebouncedValue` 300ms untuk search.
- **Auth**: `useLogin`/`useRegister` mutation → sukses dispatch `addInfoLoginAction`. Di-mock saat backend belum ada.

## Rule skill yang wajib dipatuhi

- `async-parallel` (useQueries homepage) · `bundle-barrel-imports` (**tanpa barrel index**) · `rerender-derived-state-no-effect` (hapus pola `useEffect`+fetch) · `js-tosorted-immutable` (sort explore) · `js-index-maps` (Map genre di MovieCard) · `rerender-memo` (MovieCard `memo()` + hoist default props) · `rerender-move-effect-to-event` (debounce search) · `rendering-conditional-render` (ternary, bukan `&&`) · `bundle-dynamic-imports` (lazy admin/order + `Suspense`) · `client-localstorage-schema` (version key persist) · `rendering-usetransition-loading` (search/filter) · `advanced-init-once` (queryClient module-level).
- Verifikasi API library via **context7-mcp** saat menulis kode (TanStack Query v5, Redux Toolkit v2, React Router v7, RHF).

## Fase implementasi

- **P0 Fondasi**: aliases (tsconfig+vite), `pnpm add @tanstack/react-query`, shared lib/types/hooks/ErrorBoundary, env split, persist versioning, mock adapter + `docs/backend-contract.md`.
- **P1 Movies (TMDB)**: api+query hooks → NowPlaying/UpComing/Banner/WhyChooseUs, `MovieCard`, `GenreChip`, MoviesPage baru (hapus MoviesIntegrationPage, `/buy-ticket` redirect), MovieDetailPage + order pages pakai `useMovieDetail`. Hapus moviesSlice, `CardIntegration`, context movies.
- **P2 Auth**: pages/components ke features/auth, `useLogin`/`useRegister` + mock, bersihkan token hardcoded.
- **P3 Order**: orderSlice colocate, `useCreateTransaction` (mock), OrderSeat/OrderPayment/OrderTicket refactor + hapus `history.ts`.
- **P4 Profile & Admin**: history via `useUserHistory` (mock), admin pages colocate + lazy load, adminSlice rapi.
- **P5 Shared UI & cleanup**: pindah shared components, hapus `src/pages/`, `src/components/`, context yang dibuang, `AdminExamplePage`.
- **P6 Verifikasi**: 7 gate DoD (lint, build, grep zero `useEffect`+fetch, feature boundary clean, mock on/off jalan, docs terisi, smoke test 17 rute).

## Definition of Done

1. `pnpm lint` dan `pnpm build` (tsc strict) **bebas error**.
2. `grep` pola `useEffect`+`fetch` untuk ambil data = **nol** (semua lewat React Query hooks).
3. `src/pages/` dan `src/components/` **kosong** — semua sudah pindah ke feature masing-masing.
4. Tidak ada import relatif yang menembus batas feature; semua pakai alias `@/features/*`, `@/shared/*`, dll.
5. Dengan `VITE_ENABLE_MOCKS=true`, seluruh flow (login → booking → seat → payment → ticket → history) jalan tanpa backend; dengan `false`, tetap jalan saat backend ada.
6. `docs/backend-contract.md` terisi (kontrak tiap endpoint custom + kebutuhan header auth) sebagai pengingat develop backend.
7. Semua 17 rute di `App.tsx` di-smoke-test.

## Risiko yang tersisa

- **Perilaku explore berubah** dari yang sekarang (pagination 4 tombol hardcoded) — dengan keputusan client-side, tetap dipertahankan.
- **Kontrak backend** untuk auth/history/transactions masih asumsi dari kode lama — dikunci lewat `docs/backend-contract.md` + mock, disesuaikan saat backend jadi.
- `directors[0].name` bisa crash untuk film TMDB tanpa kredit Director → mapping `useMovieDetail` harus defensif (`directors[0]?.name ?? "Unknown"`).
