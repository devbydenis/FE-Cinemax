import { apiClient } from "@/shared/lib/api";
import { env } from "@/shared/config/env";
import { mockGetUserHistory } from "@/shared/mocks/adapter";
import type { MockTransaction } from "@/shared/mocks/db";

export async function getUserHistory(): Promise<MockTransaction[]> {
  if (env.enableMocks) {
    const response = await mockGetUserHistory();
    return response.result;
  }
  const response = await apiClient.get<{ result: MockTransaction[] }>(
    "/profile/history",
  );
  return response.result;
}
