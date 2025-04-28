import urlJoin from "url-join";

import axios, {
  AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";

import {
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
} from "@/utils/access-token";

const BASE_URL = "http://10.10.1.93:5000/api/";
const TOKEN_REFRESH__URL = urlJoin(BASE_URL, "");

// ---  Axios instance ---
const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// --- Flag to avoid multiple refreshes ---
let isRefreshing = false;
let failedQueue: {
  resolve: (value?: any) => void;
  reject: (error: any) => void;
}[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// --- Request interceptor ---
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getAccessToken();
    if (token && config.headers) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// --- Response interceptor ---
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    // If unauthorized error
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        try {
          const token = await new Promise<string>((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          });

          if (originalRequest.headers) {
            originalRequest.headers["Authorization"] = `Bearer ${token}`;
          }
          return api(originalRequest);
        } catch (err) {
          return Promise.reject(err);
        }
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = getRefreshToken();
        if (!refreshToken) {
          throw new Error("No refresh token available.");
        }

        // Refresh the token
        const { data } = await axios.post(TOKEN_REFRESH__URL, {
          refresh_token: refreshToken,
        });

        const newAccessToken = data.access_token;
        const newRefreshToken = data.refresh_token;

        setAccessToken(newAccessToken);
        setRefreshToken(newRefreshToken);

        api.defaults.headers.common["Authorization"] =
          `Bearer ${newAccessToken}`;

        processQueue(null, newAccessToken);

        if (originalRequest.headers) {
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        }

        return api(originalRequest);
      } catch (err) {
        processQueue(err, null);
        // Optional: redirect to login or logout user
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export default api;
