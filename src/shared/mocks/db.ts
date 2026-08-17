import type { HistoryStatus } from "@/shared/types/history";

export interface MockTransaction {
  id: string;
  user_id: string;
  cinema: string;
  movie_name: string;
  payment_method: string;
  date_booking: string;
  time_booking: string;
  seats: string[];
  total_price: number;
  status: HistoryStatus;
  location: string;
}

export interface MockUser {
  id: string;
  email: string;
  password: string;
}

export interface MockMovie {
  id: string;
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

/**
 * In-memory "database" untuk mock adapter (dev-only).
 * Data hilang saat halaman di-reload — cukup untuk development flow.
 */
export const mockDb = {
  users: [] as MockUser[],
  transactions: [] as MockTransaction[],
  movies: [] as MockMovie[],
};
