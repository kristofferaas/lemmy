import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    LEMMY_URL: z.string().url(),
    SECRET: z.string(),
  },
  client: {
    NEXT_PUBLIC_LEMMY_URL: z.string().url(),
  },
  // If you're using Next.js < 13.4.4, you'll need to specify the runtimeEnv manually
  runtimeEnv: {
    LEMMY_URL: process.env.LEMMY_URL,
    NEXT_PUBLIC_LEMMY_URL: process.env.NEXT_PUBLIC_LEMMY_URL,
    SECRET: process.env.SECRET,
  },
});
