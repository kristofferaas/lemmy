import { client } from "@/lib/client";
import { useQuery } from "@tanstack/react-query";

export const useCommunity = (id: number) => {
  const { data, ...query } = useQuery({
    queryKey: ["community", id],
    queryFn: () =>
      client.getCommunity({
        id,
      }),
    suspense: true,
  });

  return [data!, query] as const;
};
