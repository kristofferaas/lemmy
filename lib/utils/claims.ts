import { EncryptJWT, jwtVerify } from "jose";
import { z } from "zod";
import { env } from "../env";

const claimsSchema = z.object({
  sub: z.string(),
  iss: z.string(),
  iat: z.number(),
});

export type Claims = z.infer<typeof claimsSchema>;

export async function jwt(localUserId: string, hostname: string) {
  const claims = {
    sub: localUserId,
    iss: hostname,
    iat: new Date().getTime(),
  };

  const jwt = new EncryptJWT(claims);
  const secret = new TextEncoder().encode(env.SECRET);
  return await jwt.encrypt(secret);
}

export async function decodeJwt(jwt: string) {
  const secret = new TextEncoder().encode(env.SECRET);
  const data = await jwtVerify(jwt, secret);
  return claimsSchema.parse(data.payload);
}
