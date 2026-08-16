import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios";

export interface HttpClient {
  get<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T>;
  post<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T>;
  put<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T>;
  delete<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T>;
}

function describeError(error: unknown): string {
  if (error instanceof Error) return error.message;
  return "Unexpected error";
}

/**
 * Factory HTTP client berbasis axios dengan response interceptor yang
 * me-unwrap `response.data` dan menerjemahkan error ke pesan deskriptif.
 * `configure` dipakai untuk menambah request interceptor (auth header, dll).
 */
export function createHttpClient(
  baseURL: string,
  configure?: (instance: AxiosInstance) => void,
): HttpClient {
  const instance: AxiosInstance = axios.create({ baseURL });

  instance.interceptors.response.use(
    (response) => response.data,
    (error) => {
      const message =
        error.response?.data?.message ??
        error.response?.data?.status_message ??
        describeError(error);
      return Promise.reject(new Error(message));
    },
  );

  configure?.(instance);

  return {
    get: (url, config) => instance.get(url, config),
    post: (url, data, config) => instance.post(url, data, config),
    put: (url, data, config) => instance.put(url, data, config),
    delete: (url, config) => instance.delete(url, config),
  };
}
