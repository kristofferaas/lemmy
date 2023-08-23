import { client } from "@/lib/client";
import { useSuspenseQuery } from "@tanstack/react-query";

export const useCommunity = (id: number) => {
  const { data, ...query } = useSuspenseQuery({
    queryKey: ["community", id],
    queryFn: () =>
      client.getCommunity({
        id,
      }),
  });

  return [data, query] as const;
};
