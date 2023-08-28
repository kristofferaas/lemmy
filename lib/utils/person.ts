import { InferSelectModel } from "drizzle-orm";
import { localUser, person } from "../db/schema/schema";
import { Claims } from "./claims";

export function checkValidatorTime(
  checkLocalUser: InferSelectModel<typeof localUser>,
  claims: Claims
) {
  const { validator_time } = checkLocalUser;
  if (validator_time) {
    if (claims.iat < validator_time) {
      return false;
    }
  }
  return true;
}

export function checkPersonValid(checkPerson: InferSelectModel<typeof person>) {
  const { banned, ban_expires, deleted } = checkPerson;
  if (isBanned(banned, ban_expires)) {
    return false;
  }
  if (deleted) {
    return false;
  }
  return true;
}

export function isBanned(banned: boolean, ban_expires: Date) {
  if (banned) {
    if (ban_expires) {
      if (ban_expires > new Date()) {
        return true;
      }
    } else {
      return true;
    }
  }
  return false;
}
