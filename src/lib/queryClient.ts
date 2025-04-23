import { QueryClient } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: async ({ queryKey }) => {
        const { data } = await axiosInstance.get(queryKey[0] as string);
        return data; // .json();
      },
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    }
  },
});

export async function mutationFn({
  url,
  method = "POST",
  body,
}: {
  url: string,
  method: "POST" | "PUT" | "DELETE",
  body: any,
}) {
  try {
    const { data } = await axiosInstance({
      url,
      method,
      data: body,
    });

    return data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(`${error.response.status}: ${error.response.data.message || error.response.data}`);
    } else if (error.request) {
      throw new Error("No response from server. Please try again.");
    } else {
      throw new Error ("Request failed: ${error.message}");
    }
  }
}
