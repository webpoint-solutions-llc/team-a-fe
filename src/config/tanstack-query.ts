import { AxiosError } from "axios";
import { addToast } from "@heroui/react";
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      onError: (error) => {
        if (error instanceof AxiosError) {
          addToast({
            title: error.response?.data?.message || "Something went wrong",
            color: "danger",
          });
        }
      },
    },
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
      staleTime: 1000 * 25, // 25 seconds
      retry: (failureCount, error) => {
        if (
          error instanceof AxiosError &&
          [404, 403].includes(error.response?.status as number)
        ) {
          return false;
        } else if (failureCount < 3) {
          return true;
        } else return false;
      },
    },
  },
});
