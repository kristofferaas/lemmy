import { z } from "zod";

export const listSchema = z.enum(["local", "fediverse", "subscribed"]);

export const filterSchema = z.object({
  list: listSchema.optional(),
  type: z.enum(["Posts", "Comments"]).optional(),
  from: z.enum(["All", "Subscribed", "Local"]).optional(),
  saved: z.boolean().optional(),
  sort: z
    .enum([
      "Active",
      "Hot",
      "New",
      "Old",
      "TopDay",
      "TopWeek",
      "TopMonth",
      "TopYear",
      "TopAll",
      "MostComments",
      "NewComments",
      "TopHour",
      "TopSixHour",
      "TopTwelveHour",
      "TopThreeMonths",
      "TopSixMonths",
      "TopNineMonths",
      "Controversial",
    ])
    .optional(),
  communityId: z.coerce.number().optional(),
});

export type Filter = z.infer<typeof filterSchema>;
