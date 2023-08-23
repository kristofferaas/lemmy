import { client } from "@/lib/client";
import { useSuspenseQuery } from "@tanstack/react-query";

export const usePost = (id: number) => {
  const { data, ...query } = useSuspenseQuery({
    queryKey: ["post", id],
    queryFn: () =>
      client.getPost({
        id,
      }),
  });

  return [data, query] as const;
};
