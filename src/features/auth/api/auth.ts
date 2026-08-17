import { apiClient } from "@/shared/lib/api";
import { env } from "@/shared/config/env";
import { mockLogin, mockRegister } from "@/shared/mocks/adapter";
import type { UserLoginRequest } from "@/shared/types/user";

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

export async function login(credentials: UserLoginRequest): Promise<LoginResponse> {
  if (env.enableMocks) {
    return mockLogin(credentials.email);
  }
  return apiClient.post<LoginResponse>("/auth/login", credentials);
}

export async function register(
  credentials: UserLoginRequest,
): Promise<RegisterResponse> {
  if (env.enableMocks) {
    return mockRegister(credentials.email, credentials.password);
  }
  return apiClient.post<RegisterResponse>("/auth/register", credentials);
}
