import { LemmyHttp } from "lemmy-js-client";
import { env } from "./env";

const nextFetch = fetch;

export const client = new LemmyHttp(env.LEMMY_URL, {
  fetchFunction: nextFetch,
});
