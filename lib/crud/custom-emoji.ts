import { InferSelectModel, eq } from "drizzle-orm";
import { db } from "../db";
import {
  customEmoji,
  customEmojiKeyword,
  localSite,
} from "../db/schema/schema";
import { CustomEmojiResponse, CustomEmojiView } from "lemmy-js-client";
import { replaceNullWithUndefined } from "../utils/replaceNullWithUndefined";

export async function getCustomEmojis(
  localSiteId: InferSelectModel<typeof localSite>["id"],
) {
  const response = await db
    .select()
    .from(customEmoji)
    .where(eq(localSite.id, localSiteId))
    .leftJoin(
      customEmojiKeyword,
      eq(customEmojiKeyword.custom_emoji_id, customEmoji.id),
    )
    .orderBy(customEmoji.category)
    .orderBy(customEmoji.id);

  return fiddle(response);
}

const fiddle = (
  items: {
    custom_emoji: InferSelectModel<typeof customEmoji>;
    custom_emoji_keyword: InferSelectModel<typeof customEmojiKeyword> | null;
  }[],
): CustomEmojiView[] => {
  const result: CustomEmojiView[] = [];

  for (const item of items) {
    const emojiId = item.custom_emoji.id;
    if (!result[emojiId]) {
      result[emojiId] = {
        custom_emoji: replaceNullWithUndefined(item.custom_emoji),
        keywords: [],
      };
    }
    if (item.custom_emoji_keyword) {
      result[emojiId]?.keywords.push(item.custom_emoji_keyword);
    }
  }

  return result;
};
