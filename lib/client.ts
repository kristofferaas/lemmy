import { LemmyHttp } from "lemmy-js-client";
import { env } from "./env";

export const client = new LemmyHttp(env.LEMMY_URL);
