import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { GetPosts, ListingType, SortType } from "lemmy-js-client";
import { z } from "zod";

const filterSchema = z.object({
  type: z.enum(["Posts", "Comments"]).optional(),
  from: z.enum(["All", "Subscribed", "Local"]).optional(),
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
});

export type FilterValue = z.infer<typeof filterSchema>;

type FilterProps = {
  className?: string;
  value?: FilterValue;
};

export async function Filter({ className, value }: FilterProps) {
  const typeValue = value?.type || "Posts";
  const fromValue = value?.from || "Subscribed";
  const sortValue = value?.sort || "Active";

  return (
    <form className={cn("flex space-x-4", className)}>
      <Select name="type" defaultValue={typeValue}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Posts">Posts</SelectItem>
          <SelectItem value="Comments">Comments</SelectItem>
        </SelectContent>
      </Select>
      <Select name="from" defaultValue={fromValue}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="From" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Subscribed">Subscribed</SelectItem>
          <SelectItem value="Local">Local</SelectItem>
          <SelectItem value="All">All</SelectItem>
        </SelectContent>
      </Select>
      <Select name="sort" defaultValue={sortValue}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Active">Active</SelectItem>
          <SelectItem value="Hot">Hot</SelectItem>
          <SelectItem value="New">New</SelectItem>
          <SelectItem value="Old">Old</SelectItem>
          <SelectItem value="TopDay">Top Day</SelectItem>
          <SelectItem value="TopWeek">Top Week</SelectItem>
          <SelectItem value="TopMonth">Top Month</SelectItem>
          <SelectItem value="TopYear">Top Year</SelectItem>
          <SelectItem value="TopAll">Top All</SelectItem>
          <SelectItem value="MostComments">Most comments</SelectItem>
          <SelectItem value="NewComments">New comments</SelectItem>
          <SelectItem value="TopHour">Top Hour</SelectItem>
          <SelectItem value="TopSixHour">Top 6 Hour</SelectItem>
          <SelectItem value="TopTwelveHour">Top 12 Hour</SelectItem>
          <SelectItem value="TopThreeMonths">Top 3 Months</SelectItem>
          <SelectItem value="TopSixMonths">Top 6 Months</SelectItem>
          <SelectItem value="TopNineMonths">Top 9 Months</SelectItem>
          <SelectItem value="Controversial">Controversial</SelectItem>
        </SelectContent>
      </Select>
      <Button type="submit">Filter</Button>
    </form>
  );
}
