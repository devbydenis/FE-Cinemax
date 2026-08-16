import { env } from "@/shared/config/env";
import { createHttpClient, type HttpClient } from "./http";
import { store } from "@/store/store";

/**
 * HTTP client untuk custom backend (auth/order/payment/profile/admin).
 * Request interceptor meng-inject `user.token` dari Redux store (persist).
 * Saat `VITE_ENABLE_MOCKS=true`, panggilan API custom dialihkan ke mock
 * di layer features/api — bukan di client ini.
 */
export const apiClient: HttpClient = createHttpClient(env.apiUrl, (instance) => {
  instance.interceptors.request.use((config) => {
    const token = store.getState().user.user.token;
    if (token) {
      config.headers.set("Authorization", `Bearer ${token}`);
    }
    config.headers.set("Accept", "application/json");
    return config;
  });
});
