import { InferSelectModel, eq } from "drizzle-orm";
import { db } from "../db";
import { customEmoji, customEmojiKeyword, localSite } from "../db/schema/schema";

export async function getCustomEmojis(
  localSiteId: InferSelectModel<typeof localSite>["id"]
) {
  const response = await db
    .select()
    .from(customEmoji)
    .where(eq(localSite.id, localSiteId))
    .leftJoin(
      customEmojiKeyword,
      eq(customEmojiKeyword.custom_emoji_id, customEmoji.id)
    )
    .orderBy(customEmoji.category)
    .orderBy(customEmoji.id);
    
  return response;
}
