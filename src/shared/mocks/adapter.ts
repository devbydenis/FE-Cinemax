import { mockDb, type MockMovie, type MockTransaction } from "./db";
import type { HistoryStatus } from "@/shared/types/history";

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function newId(): string {
  return crypto.randomUUID();
}

export interface LoginResponse {
  result: {
    id: string;
    token: string;
  };
}

export interface RegisterResponse {
  result: {
    id: string;
  };
}

export interface CreateTransactionPayload {
  user_id: string;
  cinema: string;
  movie_name: string;
  payment_method: string;
  date_booking: string;
  time_booking: string;
  total_price: number;
  location: string;
  seats: string[];
  status?: HistoryStatus;
}

/**
 * Mock auth — login menerima kredensial apa pun (dev-only).
 * Kontrak mengikuti docs/backend-contract.md.
 */
export async function mockLogin(email: string): Promise<LoginResponse> {
  await delay(400);
  return {
    result: {
      id: email.split("@")[0] ?? "mock-user",
      token: `mock-token-${newId()}`,
    },
  };
}

export async function mockRegister(
  email: string,
  password: string,
): Promise<RegisterResponse> {
  await delay(400);
  const user = { id: newId(), email, password };
  mockDb.users.push(user);
  return { result: { id: user.id } };
}

export async function mockCreateTransaction(
  payload: CreateTransactionPayload,
): Promise<{ result: MockTransaction }> {
  await delay(400);
  const transaction: MockTransaction = {
    id: newId(),
    user_id: payload.user_id,
    cinema: payload.cinema,
    movie_name: payload.movie_name,
    payment_method: payload.payment_method,
    date_booking: payload.date_booking,
    time_booking: payload.time_booking,
    seats: payload.seats,
    total_price: payload.total_price,
    status: payload.status ?? "success",
    location: payload.location,
  };
  mockDb.transactions.push(transaction);
  return { result: transaction };
}

export async function mockGetUserHistory(): Promise<{ result: MockTransaction[] }> {
  await delay(300);
  return { result: mockDb.transactions };
}

export interface CreateMoviePayload {
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

export async function mockCreateMovie(
  payload: CreateMoviePayload,
): Promise<{ result: MockMovie }> {
  await delay(400);
  const movie: MockMovie = {
    id: newId(),
    ...payload,
  };
  mockDb.movies.push(movie);
  return { result: movie };
}

export async function mockGetMovies(): Promise<{ result: MockMovie[] }> {
  await delay(300);
  return { result: mockDb.movies };
}
