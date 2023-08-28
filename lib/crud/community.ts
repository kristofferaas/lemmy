import { eq, InferSelectModel } from "drizzle-orm";
import { db } from "../db";
import {
  community,
  communityBlock,
  communityFollower,
  communityModerator,
  person,
} from "../db/schema/schema";

export async function communityFollowerViewForPerson(
  personId: InferSelectModel<typeof person>["id"]
) {
  const response = await db
    .select()
    .from(communityFollower)
    .innerJoin(community, eq(community.id, communityFollower.community_id))
    .innerJoin(person, eq(person.id, communityFollower.person_id))
    .where(eq(communityFollower.person_id, personId))
    .where(eq(community.deleted, false))
    .where(eq(community.removed, false))
    .orderBy(community.title);

  return response;
}

export async function communityBlockViewForPerson(
  personId: InferSelectModel<typeof person>["id"]
) {
  const response = await db
    .select()
    .from(communityBlock)
    .innerJoin(person, eq(person.id, communityBlock.person_id))
    .innerJoin(community, eq(community.id, communityBlock.community_id))
    .where(eq(communityBlock.person_id, personId))
    .where(eq(community.deleted, false))
    .where(eq(community.removed, false))
    .orderBy(communityBlock.published);

  return response;
}

export async function getCommunityModeratorViewsForPerson(
  personId: InferSelectModel<typeof person>["id"]
) {
  const response = await db
    .select()
    .from(communityModerator)
    .innerJoin(community, eq(community.id, communityModerator.community_id))
    .innerJoin(person, eq(person.id, communityModerator.person_id))
    .where(eq(communityModerator.person_id, personId))
    .where(eq(community.deleted, false))
    .where(eq(community.removed, false));

  return response;
}
