import { eq, InferSelectModel } from "drizzle-orm";
import { db } from "../db";
import {
  community,
  communityBlock,
  communityFollower,
  communityModerator,
  person,
} from "../db/schema/schema";
import {
  CommunityBlockView,
  CommunityFollowerView,
  CommunityModeratorView,
} from "lemmy-js-client";
import { replaceNullWithUndefined } from "../utils/replaceNullWithUndefined";

export async function communityFollowerViewForPerson(
  personId: InferSelectModel<typeof person>["id"],
) {
  const response = await db
    .select({
      community: community,
      follower: person,
    })
    .from(communityFollower)
    .innerJoin(community, eq(community.id, communityFollower.community_id))
    .innerJoin(person, eq(person.id, communityFollower.person_id))
    .where(eq(communityFollower.person_id, personId))
    .where(eq(community.deleted, false))
    .where(eq(community.removed, false))
    .orderBy(community.title);

  return fiddle3(response);
}

const fiddle3 = (
  item: {
    community: InferSelectModel<typeof community>;
    follower: InferSelectModel<typeof person>;
  }[],
): CommunityFollowerView[] => {
  return replaceNullWithUndefined(item);
};

export async function communityBlockViewForPerson(
  personId: InferSelectModel<typeof person>["id"],
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

  return fiddle(response);
}

const fiddle = (
  item: {
    person: InferSelectModel<typeof person>;
    community: InferSelectModel<typeof community>;
    community_block: InferSelectModel<typeof communityBlock>;
  }[],
): CommunityBlockView[] => {
  return replaceNullWithUndefined(item);
};

export async function getCommunityModeratorViewsForPerson(
  personId: InferSelectModel<typeof person>["id"],
) {
  const response = await db
    .select({
      community: community,
      moderator: person,
    })
    .from(communityModerator)
    .innerJoin(community, eq(community.id, communityModerator.community_id))
    .innerJoin(person, eq(person.id, communityModerator.person_id))
    .where(eq(communityModerator.person_id, personId))
    .where(eq(community.deleted, false))
    .where(eq(community.removed, false));

  return fiddle2(response);
}

const fiddle2 = (
  item: {
    community: InferSelectModel<typeof community>;
    moderator: InferSelectModel<typeof person>;
  }[],
): CommunityModeratorView[] => {
  return replaceNullWithUndefined(item);
};
