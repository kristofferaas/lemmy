import { client } from "@/lib/client";
import { useQuery } from "@tanstack/react-query";

export const usePost = (id: number) => {
  const { data, ...query } = useQuery({
    queryKey: ["post", id],
    queryFn: () =>
      client.getPost({
        id,
      }),
    suspense: true,
  });

  return [data!, query] as const;
};
