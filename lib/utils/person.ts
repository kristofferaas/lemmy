import { LocalUser, Person } from "lemmy-js-client";
import { Claims } from "./claims";

export function checkValidatorTime(checkLocalUser: LocalUser, claims: Claims) {
  const { validator_time } = checkLocalUser;
  if (validator_time) {
    if (new Date(claims.iat) < new Date(validator_time)) {
      return false;
    }
  }
  return true;
}

export function checkPersonValid(checkPerson: Person) {
  const { banned, ban_expires, deleted } = checkPerson;
  if (isBanned(banned, ban_expires)) {
    return false;
  }
  if (deleted) {
    return false;
  }
  return true;
}

export function isBanned(banned: boolean, ban_expires?: string) {
  if (banned) {
    if (ban_expires) {
      if (new Date(ban_expires) > new Date()) {
        return true;
      }
    } else {
      return true;
    }
  }
  return false;
}
