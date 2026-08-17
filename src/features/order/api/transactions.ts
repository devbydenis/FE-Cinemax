import { apiClient } from "@/shared/lib/api";
import { env } from "@/shared/config/env";
import { mockCreateTransaction } from "@/shared/mocks/adapter";
import type { MockTransaction } from "@/shared/mocks/db";
import type { HistoryStatus } from "@/shared/types/history";

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
  status: HistoryStatus;
}

export async function createTransaction(
  payload: CreateTransactionPayload,
): Promise<{ result: MockTransaction }> {
  if (env.enableMocks) {
    return mockCreateTransaction(payload);
  }
  return apiClient.post<{ result: MockTransaction }>("/transactions/create", payload);
}
