import { LemmyHttp } from "lemmy-js-client";
import { env } from "./env";

export const client = new LemmyHttp(env.NEXT_PUBLIC_LEMMY_URL);
