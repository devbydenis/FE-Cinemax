import { env } from "@/shared/config/env";
import { createHttpClient, type HttpClient } from "./http";

export const tmdbClient: HttpClient = createHttpClient(env.tmdbUrl, (instance) => {
  instance.interceptors.request.use((config) => {
    config.headers.set("Authorization", `Bearer ${env.tmdbApiKey}`);
    config.headers.set("Accept", "application/json");
    return config;
  });
});
