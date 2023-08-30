import { customType, pgEnum } from "drizzle-orm/pg-core";

export const ltree = customType<{ data: string }>({
  dataType() {
    return "ltree";
  },
});

export const listingTypeEnum = pgEnum("listing_type_enum", [
  "All",
  "Local",
  "Subscribed",
]);

export const registrationModeEnum = pgEnum("registration_mode_enum", [
  "Closed",
  "RequireApplication",
  "Open",
]);

export const sortTypeEnum = pgEnum("sort_type_enum", [
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
]);
