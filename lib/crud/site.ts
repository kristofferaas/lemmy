import { eq } from "drizzle-orm";
import { db } from "../db";
import {
  localSite,
  localSiteRateLimit,
  localUser,
  person,
  personAggregates,
  site,
  siteAggregates,
} from "../db/schema/schema";
import {
  communityBlockViewForPerson,
  communityFollowerViewForPerson,
  getCommunityModeratorViewsForPerson,
} from "./community";
import { getCustomEmojis } from "./custom-emoji";
import {
  getLanguages,
  getLocalUserLanguage,
  getSiteLanguageRaw,
} from "./language";
import { getLocalUserViewById, getPersonBlockViewForPerson } from "./person";
import { getAllTaglines } from "./tagline";
import { checkPersonValid, checkValidatorTime } from "../utils/person";
import { decodeJwt } from "../utils/claims";
import { z } from "zod";
import type { GetSiteResponse } from "lemmy-js-client";

async function readLocal() {
  const [response] = await db
    .select()
    .from(site)
    .innerJoin(localSite, eq(site.id, localSite.id))
    .innerJoin(localSiteRateLimit, eq(site.id, localSiteRateLimit.id))
    .innerJoin(siteAggregates, eq(site.id, siteAggregates.id))
    .limit(1);

  if (!response) {
    return null;
  }

  response.site.private_key = null;

  return {
    site: response.site,
    local_site: response.local_site,
    local_site_rate_limit: response.local_site_rate_limit,
    counts: response.site_aggregates,
  };
}

async function getAdmins() {
  const response = await db
    .select()
    .from(person)
    .innerJoin(personAggregates, eq(person.id, personAggregates.id))
    .leftJoin(localUser, eq(person.id, localUser.id))
    .where(eq(localUser.admin, true))
    .where(eq(person.deleted, false))
    .orderBy(person.published);

  return response;
}

export const getSiteRequestSchema = z.object({
  auth: z.string().optional(),
});

type GetSiteRequest = z.infer<typeof getSiteRequestSchema>;

export async function getSite(request: GetSiteRequest) {
  const site_view = await readLocal();
  if (!site_view) {
    throw new Error("Site not found");
  }

  const admins = await getAdmins();
  const my_user = await getMyUser(request);

  // Build the local user
  const all_languages = await getLanguages();
  const discussion_languages = await getSiteLanguageRaw();
  const taglines = await getAllTaglines(site_view.local_site.id);
  const custom_emojis = await getCustomEmojis(site_view.local_site.id);

  return {
    site_view,
    admins,
    version: "serverless-0.0.1-dev",
    my_user,
    all_languages,
    discussion_languages,
    taglines,
    custom_emojis,
  } satisfies GetSiteResponse;
}

async function getMyUser(request: GetSiteRequest) {
  const local_user_view = await localUserSettingsViewFromJwtOpt(request.auth);

  if (local_user_view) {
    const person_id = local_user_view.person.id;
    const local_user_id = local_user_view.local_user.id;

    const follows = await communityFollowerViewForPerson(person_id);
    const community_blocks = await communityBlockViewForPerson(person_id);
    const person_blocks = await getPersonBlockViewForPerson(person_id);
    const moderates = await getCommunityModeratorViewsForPerson(person_id);
    const discussion_languages = await getLocalUserLanguage(local_user_id);

    return {
      local_user_view,
      follows,
      moderates,
      community_blocks,
      person_blocks,
      discussion_languages,
    };
  } else {
    return null;
  }
}

export async function localUserSettingsViewFromJwtOpt(jwt: string | undefined) {
  if (!jwt) {
    return null;
  }

  const claims = await decodeJwt(jwt);

  const local_user_id = claims.sub;
  if (!local_user_id) {
    return null;
  }

  const local_user_view = await getLocalUserViewById(Number(local_user_id));

  if (!local_user_view) {
    return null;
  }
  if (!checkPersonValid(local_user_view.person)) {
    return null;
  }

  if (!checkValidatorTime(local_user_view.local_user, claims)) {
    return null;
  }

  return local_user_view;
}
