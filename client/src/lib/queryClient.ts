import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: async ({ queryKey }) => {
	const user = JSON.parse(localStorage.getItem("user") as string);
	const token = user["data"]["accessToken"];
        const res = await fetch(queryKey[0] as string, {
          credentials: "include",
	  headers: {
	    "Content-Type": "application/json",
	    ...(token ? { Authorization: `Bearer ${token}` } : {}),
	  },
        });

        if (!res.ok) {
          if (res.status >= 500) {
            throw new Error(`${res.status}: ${res.statusText}`);
          }

          throw new Error(`${res.status}: ${await res.text()}`);
        }

        return res.json();
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
  const res = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    throw new Error(`${res.status}: ${await res.text()}`);
  }

  return res.json();
}
