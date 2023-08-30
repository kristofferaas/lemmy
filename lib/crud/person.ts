import { InferSelectModel, eq } from "drizzle-orm";
import { alias } from "drizzle-orm/pg-core";
import { LocalUserView, PersonBlockView } from "lemmy-js-client";
import { db } from "../db";
import {
  localUser,
  person,
  personAggregates,
  personBlock,
} from "../db/schema/schema";
import { replaceNullWithUndefined } from "../utils/replaceNullWithUndefined";

const targetPersonAlias = alias(person, "target_person");

export async function getPersonBlockViewForPerson(
  personId: InferSelectModel<typeof person>["id"],
) {
  const response = await db
    .select({
      person: person,
      target: targetPersonAlias,
    })
    .from(personBlock)
    .innerJoin(person, eq(personBlock.person_id, person.id))
    .innerJoin(
      targetPersonAlias,
      eq(personBlock.target_id, targetPersonAlias.id),
    )
    .where(eq(personBlock.person_id, personId))
    .where(eq(targetPersonAlias.deleted, false))
    .orderBy(personBlock.published);

  return fiddle(response);
}

const fiddle = (
  item: {
    person: InferSelectModel<typeof person>;
    target: InferSelectModel<typeof person>;
  }[],
): PersonBlockView[] => {
  return replaceNullWithUndefined(item);
};

export async function getLocalUserViewById(
  localUserId: InferSelectModel<typeof localUser>["id"],
) {
  const response = await db
    .select({
      local_user: localUser,
      person: person,
      counts: personAggregates,
    })
    .from(localUser)
    .where(eq(localUser.id, localUserId))
    .innerJoin(person, eq(localUser.id, person.id))
    .innerJoin(personAggregates, eq(person.id, personAggregates.id))
    .limit(1);

  return fiddle2(response);
}

const fiddle2 = (
  items: {
    local_user: InferSelectModel<typeof localUser>;
    person: InferSelectModel<typeof person>;
    counts: InferSelectModel<typeof personAggregates>;
  }[],
): LocalUserView | undefined => {
  const first = items.at(0);
  return replaceNullWithUndefined(first);
};
