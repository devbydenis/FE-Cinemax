# Backend Contract — Custom API

Dokumen ini mengunci kontrak endpoint **backend custom** (`VITE_API_URL`, default `http://localhost:8800/api/v1`)
yang dikonsumsi app. Selama backend belum dikembangkan, app berjalan dengan **mock adapter dev-only**
(`VITE_ENABLE_MOCKS=true` di `.env.local`/dev). Kontrak di bawah ini adalah sumber kebenaran untuk
mengimplementasikan backend maupun untuk menjaga mock tetap sinkron.

## Konvensi global

- **Base URL**: `VITE_API_URL`. Seluruh path di bawah relatif ke base URL.
- **Auth**: semua endpoint (kecuali `auth/*`) wajib header `Authorization: Bearer <token>`.
  Token didapat dari `POST /auth/login` dan di-persist di Redux (`user.token`).
  Header `Accept: application/json` selalu dikirim.
- **Response envelope**:
  - Sukses: `{ "result": <data> }`
  - Error: `{ "error": { "message": string, "code"?: number } }` (HTTP 4xx/5xx)
- **Status transaksi** (`HistoryStatus`): `"success" | "pending" | "failed"`.

## Endpoints

### Auth

| Method | Path            | Request body                                  | Response `result`                 |
|--------|-----------------|-----------------------------------------------|-----------------------------------|
| POST   | `/auth/login`   | `{ email, password }`                         | `{ id: string, token: string }`   |
| POST   | `/auth/register`| `{ email, password }`                         | `{ id: string }`                  |

Login disimulasikan: mock menerima kredensial apa pun, `id = bagian sebelum "@"`.

### Transactions (Order)

| Method | Path                    | Request body                                  | Response `result`                 |
|--------|-------------------------|-----------------------------------------------|-----------------------------------|
| POST   | `/transactions/create`  | lihat `CreateTransactionPayload` di bawah      | `Transaction`                      |

`CreateTransactionPayload` (wajib mengikuti, mock = `src/shared/mocks/adapter.ts`):

```ts
{
  user_id: string;
  cinema: string;          // "cineone" | "hiflix" | "ebvid"
  movie_name: string;
  payment_method: string;  // "gpay" | "visa" | "gopay" | "paypal" | "dana" | "bca" | "bri" | "ovo"
  date_booking: string;    // "YYYY-MM-DD"
  time_booking: string;    // "HH:mm"
  total_price: number;
  location: string;
  seats: string[];         // contoh ["A1", "A2"]
  status: HistoryStatus;
}
```

`Transaction` menambahkan `id: string` + `created_at` (opsional).

### History (Profile)

| Method | Path          | Response `result`       |
|--------|---------------|-------------------------|
| GET    | `/history`    | `Transaction[]`         |

Saat ini query history memakai seluruh transaksi mock (belum ada filter `user_id`).
Saat backend jadi, wajib filter per user berdasarkan token.

### Movies (Admin)

| Method | Path               | Request body                                  | Response `result`     |
|--------|--------------------|-----------------------------------------------|-----------------------|
| POST   | `/movies/create`   | lihat `CreateMoviePayload` di bawah            | `Movie`               |
| GET    | `/movies`          | —                                             | `Movie[]`             |

`CreateMoviePayload`:

```ts
{
  title: string;
  category: string;
  release_date: string;   // "YYYY-MM-DD"
  duration_hour: number;
  duration_minute: number;
  director_name: string;
  genres: string;
  cast: string;
  synopsis: string;
}
```

`Movie` menambahkan `id: string`.

## Sinkronisasi mock

File yang wajib konsisten dengan dokumen ini:

- `src/shared/mocks/db.ts` — tipe `MockTransaction`, `MockUser`, `MockMovie` + `mockDb`.
- `src/shared/mocks/adapter.ts` — `mockLogin`, `mockRegister`, `mockCreateTransaction`,
  `mockGetUserHistory`, `mockCreateMovie`, `mockGetMovies`.
- `src/features/order/api/transactions.ts` — `createTransaction`.
- `src/features/profile/api/history.ts` — `getUserHistory`.
- `src/features/auth/api/auth.ts` — `login`, `register`.
- `src/features/admin/api/admin.ts` — `createMovie`, `getMovies`.

Saat `VITE_ENABLE_MOCKS=false`, fungsi di atas memanggil `apiClient` (base `VITE_API_URL`) dengan
body/response yang sama persis seperti tabel di atas.
