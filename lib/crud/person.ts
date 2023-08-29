import { InferSelectModel, eq } from "drizzle-orm";
import { localUser, person, personAggregates, personBlock } from "../db/schema/schema";
import { db } from "../db";
import { alias } from "drizzle-orm/pg-core";

const targetPersonAlias = alias(person, "targetPerson");

export async function getPersonBlockViewForPerson(
  personId: InferSelectModel<typeof person>["id"]
) {
  const response = await db
    .select()
    .from(personBlock)
    .innerJoin(person, eq(person.id, person.id))
    .innerJoin(
      targetPersonAlias,
      eq(personBlock.target_id, targetPersonAlias.id)
    )
    .where(eq(personBlock.person_id, personId))
    .where(eq(targetPersonAlias.deleted, false))
    .orderBy(personBlock.published);

  return response;
}

export async function getLocalUserViewById(
  localUserId: InferSelectModel<typeof localUser>["id"]
) {
  const response = await db
    .select()
    .from(localUser)
    .where(eq(localUser.id, localUserId))
    .innerJoin(person, eq(localUser.id, person.id))
    .innerJoin(personAggregates, eq(person.id, personAggregates.id))
    .limit(1);

  return response.at(0);
}
