import {
  bigint,
  boolean,
  doublePrecision,
  integer,
  json,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
  uuid,
  smallint,
} from "drizzle-orm/pg-core";
import {
  listingTypeEnum,
  ltree,
  registrationModeEnum,
  sortTypeEnum,
} from "./utils";

export const adminPurgeComment = pgTable("admin_purge_comment", {
  id: integer("id").primaryKey(),
  adminPersonId: integer("admin_person_id").notNull(),
  postId: integer("post_id").notNull(),
  reason: text("reason"),
  when: timestamp("when_", { withTimezone: true, mode: "string" }).notNull(),
});

export const adminPurgeCommunity = pgTable("admin_purge_community", {
  id: integer("id").primaryKey(),
  adminPersonId: integer("admin_person_id").notNull(),
  reason: text("reason"),
  when: timestamp("when_", { withTimezone: true, mode: "string" }).notNull(),
});

export const adminPurgePerson = pgTable("admin_purge_person", {
  id: integer("id").primaryKey(),
  adminPersonId: integer("admin_person_id").notNull(),
  reason: text("reason"),
  when: timestamp("when_", { withTimezone: true, mode: "string" }).notNull(),
});

export const adminPurgePost = pgTable("admin_purge_post", {
  id: integer("id").primaryKey(),
  adminPersonId: integer("admin_person_id").notNull(),
  communityId: integer("community_id").notNull(),
  reason: text("reason"),
  when: timestamp("when_", { withTimezone: true, mode: "string" }).notNull(),
});

export const captchaAnswer = pgTable("captcha_answer", {
  id: integer("id").primaryKey(),
  uuid: uuid("uuid").notNull(),
  answer: text("answer").notNull(),
  published: timestamp("published", {
    withTimezone: true,
    mode: "string",
  }).notNull(),
});

export const comment = pgTable("comment", {
  id: integer("id").primaryKey(),
  creator_id: integer("creator_id").notNull(),
  post_id: integer("post_id").notNull(),
  content: text("content").notNull(),
  removed: boolean("removed").notNull(),
  published: timestamp("published", {
    withTimezone: true,
    mode: "string",
  }).notNull(),
  updated: timestamp("updated", { withTimezone: true, mode: "string" }),
  deleted: boolean("deleted").notNull(),
  ap_id: varchar("ap_id", { length: 255 }).notNull(),
  local: boolean("local").notNull(),
  path: ltree("path").notNull(),
  distinguished: boolean("distinguished").notNull(),
  language_id: integer("language_id").notNull(),
});

export const commentAggregates = pgTable("comment_aggregates", {
  id: integer("id").primaryKey(),
  comment_id: integer("comment_id").notNull(),
  score: bigint("score", { mode: "number" }).notNull(),
  upvotes: bigint("upvotes", { mode: "number" }).notNull(),
  downvotes: bigint("downvotes", { mode: "number" }).notNull(),
  published: timestamp("published", {
    withTimezone: true,
    mode: "string",
  }).notNull(),
  child_count: integer("child_count").notNull(),
  hot_rank: integer("hot_rank").notNull(),
  controversy_rank: doublePrecision("controversy_rank").notNull(),
});

export const commentLike = pgTable("comment_like", {
  id: integer("id").primaryKey().notNull(),
  person_id: integer("person_id").notNull(),
  comment_id: integer("comment_id").notNull(),
  post_id: integer("post_id").notNull(),
  score: smallint("score").notNull(),
  published: timestamp("published", {
    withTimezone: true,
    mode: "string",
  }).notNull(),
});

export const commentReply = pgTable("comment_reply", {
  id: integer("id").primaryKey().notNull(),
  recipient_id: integer("recipient_id").notNull(),
  comment_id: integer("comment_id").notNull(),
  read: boolean("read").notNull(),
  published: timestamp("published", {
    withTimezone: true,
    mode: "string",
  }).notNull(),
});

export const commentReport = pgTable("comment_report", {
  id: integer("id").primaryKey().notNull(),
  creator_id: integer("creator_id").notNull(),
  comment_id: integer("comment_id").notNull(),
  original_comment_text: text("original_comment_text").notNull(),
  reason: text("reason").notNull(),
  resolved: boolean("resolved").notNull(),
  resolver_id: integer("resolver_id"),
  published: timestamp("published", {
    withTimezone: true,
    mode: "string",
  }).notNull(),
  updated: timestamp("updated", { withTimezone: true, mode: "string" }),
});

export const commentSaved = pgTable("comment_saved", {
  id: integer("id").primaryKey().notNull(),
  comment_id: integer("comment_id").notNull(),
  person_id: integer("person_id").notNull(),
  published: timestamp("published", {
    withTimezone: true,
    mode: "string",
  }).notNull(),
});

export const community = pgTable("community", {
  id: integer("id").primaryKey().notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  removed: boolean("removed").notNull(),
  published: timestamp("published", {
    withTimezone: true,
    mode: "string",
  }).notNull(),
  updated: timestamp("updated", { withTimezone: true, mode: "string" }),
  deleted: boolean("deleted").notNull(),
  nsfw: boolean("nsfw").notNull(),
  actor_id: varchar("actor_id", { length: 255 }).notNull(),
  local: boolean("local").notNull(),
  private_key: text("private_key"),
  public_key: text("public_key").notNull(),
  last_refreshed_at: timestamp("last_refreshed_at", {
    withTimezone: true,
    mode: "string",
  }).notNull(),
  icon: text("icon"),
  banner: text("banner"),
  followers_url: varchar("followers_url", { length: 255 }).notNull(),
  inbox_url: varchar("inbox_url", { length: 255 }).notNull(),
  shared_inbox_url: varchar("shared_inbox_url", { length: 255 }),
  hidden: boolean("hidden").notNull(),
  posting_restricted_to_mods: boolean("posting_restricted_to_mods").notNull(),
  instance_id: integer("instance_id").notNull(),
  moderators_url: varchar("moderators_url", { length: 255 }),
  featured_url: varchar("featured_url", { length: 255 }),
});

export const communityAggregates = pgTable("community_aggregates", {
  id: integer("id").primaryKey().notNull(),
  community_id: integer("community_id").notNull(),
  subscribers: bigint("subscribers", { mode: "number" }).notNull(),
  posts: bigint("posts", { mode: "number" }).notNull(),
  comments: bigint("comments", { mode: "number" }).notNull(),
  published: timestamp("published", {
    withTimezone: true,
    mode: "string",
  }).notNull(),
  users_active_day: bigint("users_active_day", { mode: "number" }).notNull(),
  users_active_week: bigint("users_active_week", { mode: "number" }).notNull(),
  users_active_month: bigint("users_active_month", {
    mode: "number",
  }).notNull(),
  users_active_half_year: bigint("users_active_half_year", {
    mode: "number",
  }).notNull(),
  hot_rank: integer("hot_rank").notNull(),
});

export const communityBlock = pgTable("community_block", {
  id: integer("id").primaryKey().notNull(),
  person_id: integer("person_id").notNull(),
  community_id: integer("community_id").notNull(),
  published: timestamp("published", {
    withTimezone: true,
    mode: "string",
  }).notNull(),
});

export const communityFollower = pgTable("community_follower", {
  id: integer("id").primaryKey().notNull(),
  community_id: integer("community_id").notNull(),
  person_id: integer("person_id").notNull(),
  published: timestamp("published", {
    withTimezone: true,
    mode: "string",
  }).notNull(),
  pending: boolean("pending").notNull(),
});

export const communityLanguage = pgTable("community_language", {
  id: integer("id").primaryKey().notNull(),
  community_id: integer("community_id").notNull(),
  language_id: integer("language_id").notNull(),
});

export const communityModerator = pgTable("community_moderator", {
  id: integer("id").primaryKey().notNull(),
  community_id: integer("community_id").notNull(),
  person_id: integer("person_id").notNull(),
  published: timestamp("published", {
    withTimezone: true,
    mode: "string",
  }).notNull(),
});

export const communityPersonBan = pgTable("community_person_ban", {
  id: integer("id").primaryKey().notNull(),
  community_id: integer("community_id").notNull(),
  person_id: integer("person_id").notNull(),
  published: timestamp("published", {
    withTimezone: true,
    mode: "string",
  }).notNull(),
  expires: timestamp("expires", { withTimezone: true, mode: "string" }),
});

export const customEmoji = pgTable("custom_emoji", {
  id: integer("id").primaryKey().notNull(),
  local_site_id: integer("local_site_id").notNull(),
  shortcode: varchar("shortcode", { length: 128 }).notNull(),
  image_url: text("image_url").notNull(),
  alt_text: text("alt_text").notNull(),
  category: text("category").notNull(),
  published: timestamp("published", {
    withTimezone: true,
    mode: "string",
  }).notNull(),
  updated: timestamp("updated", { withTimezone: true, mode: "string" }),
});

export const customEmojiKeyword = pgTable("custom_emoji_keyword", {
  id: integer("id").primaryKey().notNull(),
  custom_emoji_id: integer("custom_emoji_id").notNull(),
  keyword: varchar("keyword", { length: 128 }).notNull(),
});

export const emailVerification = pgTable("email_verification", {
  id: integer("id").primaryKey().notNull(),
  local_user_id: integer("local_user_id").notNull(),
  email: text("email").notNull(),
  verification_token: text("verification_token").notNull(),
  published: timestamp("published", {
    withTimezone: true,
    mode: "string",
  }).notNull(),
});

export const federationAllowlist = pgTable("federation_allowlist", {
  id: integer("id").primaryKey().notNull(),
  instance_id: integer("instance_id").notNull(),
  published: timestamp("published", {
    withTimezone: true,
    mode: "string",
  }).notNull(),
  updated: timestamp("updated", { withTimezone: true, mode: "string" }),
});

export const federationBlocklist = pgTable("federation_blocklist", {
  id: integer("id").primaryKey().notNull(),
  instance_id: integer("instance_id").notNull(),
  published: timestamp("published", {
    withTimezone: true,
    mode: "string",
  }).notNull(),
  updated: timestamp("updated", { withTimezone: true, mode: "string" }),
});

export const instance = pgTable("instance", {
  id: integer("id").primaryKey().notNull(),
  domain: varchar("domain", { length: 255 }).notNull(),
  published: timestamp("published", {
    withTimezone: true,
    mode: "string",
  }).notNull(),
  updated: timestamp("updated", { withTimezone: true, mode: "string" }),
  software: varchar("software", { length: 255 }),
  version: varchar("version", { length: 255 }),
});

export const language = pgTable("language", {
  id: integer("id").primaryKey().notNull(),
  code: varchar("code", { length: 3 }).notNull(),
  name: text("name").notNull(),
});

export const localSite = pgTable("local_site", {
  id: integer("id").primaryKey().notNull(),
  site_id: integer("site_id").notNull(),
  site_setup: boolean("site_setup").notNull(),
  enable_downvotes: boolean("enable_downvotes").notNull(),
  enable_nsfw: boolean("enable_nsfw").notNull(),
  community_creation_admin_only: boolean(
    "community_creation_admin_only",
  ).notNull(),
  require_email_verification: boolean("require_email_verification").notNull(),
  application_question: text("application_question"),
  private_instance: boolean("private_instance").notNull(),
  default_theme: text("default_theme").notNull(),
  default_post_listing_type: listingTypeEnum(
    "default_post_listing_type",
  ).notNull(),
  legal_information: text("legal_information"),
  hide_modlog_mod_names: boolean("hide_modlog_mod_names").notNull(),
  application_email_admins: boolean("application_email_admins").notNull(),
  slur_filter_regex: text("slur_filter_regex"),
  actor_name_max_length: integer("actor_name_max_length").notNull(),
  federation_enabled: boolean("federation_enabled").notNull(),
  captcha_enabled: boolean("captcha_enabled").notNull(),
  captcha_difficulty: varchar("captcha_difficulty", { length: 255 }).notNull(),
  published: timestamp("published", {
    withTimezone: true,
    mode: "string",
  }).notNull(),
  updated: timestamp("updated", { withTimezone: true, mode: "string" }),
  registration_mode: registrationModeEnum("registration_mode").notNull(),
  reports_email_admins: boolean("reports_email_admins").notNull(),
});

export const localSiteRateLimit = pgTable("local_site_rate_limit", {
  id: integer("id").primaryKey().notNull(),
  local_site_id: integer("local_site_id").notNull(),
  message: integer("message").notNull(),
  message_per_second: integer("message_per_second").notNull(),
  post: integer("post").notNull(),
  post_per_second: integer("post_per_second").notNull(),
  register: integer("register").notNull(),
  register_per_second: integer("register_per_second").notNull(),
  image: integer("image").notNull(),
  image_per_second: integer("image_per_second").notNull(),
  comment: integer("comment").notNull(),
  comment_per_second: integer("comment_per_second").notNull(),
  search: integer("search").notNull(),
  search_per_second: integer("search_per_second").notNull(),
  published: timestamp("published", {
    withTimezone: true,
    mode: "string",
  }).notNull(),
  updated: timestamp("updated", { withTimezone: true, mode: "string" }),
});

export const localUser = pgTable("local_user", {
  id: integer("id").primaryKey().notNull(),
  person_id: integer("person_id").notNull(),
  password_encrypted: text("password_encrypted").notNull(),
  email: text("email"),
  show_nsfw: boolean("show_nsfw").notNull(),
  theme: text("theme").notNull(),
  default_sort_type: sortTypeEnum("default_sort_type").notNull(),
  default_listing_type: listingTypeEnum("default_listing_type").notNull(),
  interface_language: varchar("interface_language", { length: 20 }).notNull(),
  show_avatars: boolean("show_avatars").notNull(),
  send_notifications_to_email: boolean("send_notifications_to_email").notNull(),
  validator_time: timestamp("validator_time", {
    withTimezone: true,
    mode: "string",
  }).notNull(),
  show_scores: boolean("show_scores").notNull(),
  show_bot_accounts: boolean("show_bot_accounts").notNull(),
  show_read_posts: boolean("show_read_posts").notNull(),
  show_new_post_notifs: boolean("show_new_post_notifs").notNull(),
  email_verified: boolean("email_verified").notNull(),
  accepted_application: boolean("accepted_application").notNull(),
  totp_2fa_secret: text("totp_2fa_secret"),
  totp_2fa_url: text("totp_2fa_url"),
  open_links_in_new_tab: boolean("open_links_in_new_tab").notNull(),
  blur_nsfw: boolean("blur_nsfw").notNull(),
  auto_expand: boolean("auto_expand").notNull(),
  infinite_scroll_enabled: boolean("infinite_scroll_enabled").notNull(),
  admin: boolean("admin").notNull(),
});

export const localUserLanguage = pgTable("local_user_language", {
  id: integer("id").primaryKey().notNull(),
  local_user_id: integer("local_user_id").notNull(),
  language_id: integer("language_id").notNull(),
});

export const modAdd = pgTable("mod_add", {
  id: integer("id").primaryKey().notNull(),
  mod_person_id: integer("mod_person_id").notNull(),
  other_person_id: integer("other_person_id").notNull(),
  removed: boolean("removed").notNull(),
  when_: timestamp("when_", { withTimezone: true, mode: "string" }).notNull(),
});

export const modAddCommunity = pgTable("mod_add_community", {
  id: integer("id").primaryKey().notNull(),
  mod_person_id: integer("mod_person_id").notNull(),
  other_person_id: integer("other_person_id").notNull(),
  community_id: integer("community_id").notNull(),
  removed: boolean("removed").notNull(),
  when_: timestamp("when_", { withTimezone: true, mode: "string" }).notNull(),
});

export const modBan = pgTable("mod_ban", {
  id: integer("id").primaryKey().notNull(),
  mod_person_id: integer("mod_person_id").notNull(),
  other_person_id: integer("other_person_id").notNull(),
  reason: text("reason"),
  banned: boolean("banned").notNull(),
  expires: timestamp("expires", { withTimezone: true, mode: "string" }),
  when_: timestamp("when_", { withTimezone: true, mode: "string" }).notNull(),
});

export const modBanFromCommunity = pgTable("mod_ban_from_community", {
  id: integer("id").primaryKey().notNull(),
  mod_person_id: integer("mod_person_id").notNull(),
  other_person_id: integer("other_person_id").notNull(),
  community_id: integer("community_id").notNull(),
  reason: text("reason"),
  banned: boolean("banned").notNull(),
  expires: timestamp("expires", { withTimezone: true, mode: "string" }),
  when_: timestamp("when_", { withTimezone: true, mode: "string" }).notNull(),
});

export const modFeaturePost = pgTable("mod_feature_post", {
  id: integer("id").primaryKey().notNull(),
  mod_person_id: integer("mod_person_id").notNull(),
  post_id: integer("post_id").notNull(),
  featured: boolean("featured").notNull(),
  when_: timestamp("when_", { withTimezone: true, mode: "string" }).notNull(),
  is_featured_community: boolean("is_featured_community").notNull(),
});

export const modHideCommunity = pgTable("mod_hide_community", {
  id: integer("id").primaryKey().notNull(),
  community_id: integer("community_id").notNull(),
  mod_person_id: integer("mod_person_id").notNull(),
  when_: timestamp("when_", { withTimezone: true, mode: "string" }).notNull(),
  reason: text("reason"),
  hidden: boolean("hidden").notNull(),
});

export const modLockPost = pgTable("mod_lock_post", {
  id: integer("id").primaryKey().notNull(),
  mod_person_id: integer("mod_person_id").notNull(),
  post_id: integer("post_id").notNull(),
  locked: boolean("locked").notNull(),
  when_: timestamp("when_", { withTimezone: true, mode: "string" }).notNull(),
});

export const modRemoveComment = pgTable("mod_remove_comment", {
  id: integer("id").primaryKey().notNull(),
  mod_person_id: integer("mod_person_id").notNull(),
  comment_id: integer("comment_id").notNull(),
  reason: text("reason"),
  removed: boolean("removed").notNull(),
  when_: timestamp("when_", { withTimezone: true, mode: "string" }).notNull(),
});

export const modRemoveCommunity = pgTable("mod_remove_community", {
  id: integer("id").primaryKey().notNull(),
  mod_person_id: integer("mod_person_id").notNull(),
  community_id: integer("community_id").notNull(),
  reason: text("reason"),
  removed: boolean("removed").notNull(),
  expires: timestamp("expires", { withTimezone: true, mode: "string" }),
  when_: timestamp("when_", { withTimezone: true, mode: "string" }).notNull(),
});

export const modRemovePost = pgTable("mod_remove_post", {
  id: integer("id").primaryKey().notNull(),
  mod_person_id: integer("mod_person_id").notNull(),
  post_id: integer("post_id").notNull(),
  reason: text("reason").notNull(),
  removed: boolean("removed"),
  when_: timestamp("when_", { withTimezone: true, mode: "string" }).notNull(),
});

export const modTransferCommunity = pgTable("mod_transfer_community", {
  id: integer("id").primaryKey().notNull(),
  mod_person_id: integer("mod_person_id").notNull(),
  other_person_id: integer("other_person_id").notNull(),
  community_id: integer("community_id").notNull(),
  when_: timestamp("when_", { withTimezone: true, mode: "string" }).notNull(),
});

export const passwordResetRequest = pgTable("password_reset_request", {
  id: integer("id").primaryKey().notNull(),
  token: text("token").notNull(),
  published: timestamp("published", {
    withTimezone: true,
    mode: "string",
  }).notNull(),
  local_user_id: integer("local_user_id").notNull(),
});

export const person = pgTable("person", {
  id: integer("id").primaryKey().notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  display_name: varchar("display_name", { length: 255 }),
  avatar: text("avatar"),
  banned: boolean("banned").notNull(),
  published: timestamp("published", {
    withTimezone: true,
    mode: "string",
  }).notNull(),
  updated: timestamp("updated", { withTimezone: true, mode: "string" }),
  actor_id: varchar("actor_id", { length: 255 }).notNull(),
  bio: text("bio"),
  local: boolean("local").notNull(),
  private_key: text("private_key"),
  public_key: text("public_key").notNull(),
  last_refreshed_at: timestamp("last_refreshed_at", {
    withTimezone: true,
    mode: "string",
  }).notNull(),
  banner: text("banner"),
  deleted: boolean("deleted").notNull(),
  inbox_url: varchar("inbox_url", { length: 255 }).notNull(),
  shared_inbox_url: varchar("shared_inbox_url", { length: 255 }),
  matrix_user_id: text("matrix_user_id"),
  bot_account: boolean("bot_account").notNull(),
  ban_expires: timestamp("ban_expires", { withTimezone: true, mode: "string" }),
  instance_id: integer("instance_id").notNull(),
});

export const personAggregates = pgTable("person_aggregates", {
  id: integer("id").primaryKey().notNull(),
  person_id: integer("person_id").notNull(),
  post_count: bigint("post_count", { mode: "number" }).notNull(),
  post_score: bigint("post_score", { mode: "number" }).notNull(),
  comment_count: bigint("comment_count", { mode: "number" }).notNull(),
  comment_score: bigint("comment_score", { mode: "number" }).notNull(),
});

export const personBan = pgTable("person_ban", {
  id: integer("id").primaryKey().notNull(),
  person_id: integer("person_id").notNull(),
  published: timestamp("published", {
    withTimezone: true,
    mode: "string",
  }).notNull(),
});

export const personBlock = pgTable("person_block", {
  id: integer("id").primaryKey().notNull(),
  person_id: integer("person_id").notNull(),
  target_id: integer("target_id").notNull(),
  published: timestamp("published", {
    withTimezone: true,
    mode: "string",
  }).notNull(),
});

export const personFollower = pgTable("person_follower", {
  id: integer("id").primaryKey().notNull(),
  person_id: integer("person_id").notNull(),
  follower_id: integer("follower_id").notNull(),
  published: timestamp("published", {
    withTimezone: true,
    mode: "string",
  }).notNull(),
  pending: boolean("pending").notNull(),
});

export const personMention = pgTable("person_mention", {
  id: integer("id").primaryKey().notNull(),
  recipient_id: integer("recipient_id").notNull(),
  comment_id: integer("comment_id").notNull(),
  read: boolean("read").notNull(),
  published: timestamp("published", {
    withTimezone: true,
    mode: "string",
  }).notNull(),
});

export const personPostAggregates = pgTable("person_post_aggregates", {
  id: integer("id").primaryKey().notNull(),
  person_id: integer("person_id").notNull(),
  post_id: integer("post_id").notNull(),
  read_comments: bigint("read_comments", { mode: "number" }).notNull(),
  published: timestamp("published", {
    withTimezone: true,
    mode: "string",
  }).notNull(),
});

export const post = pgTable("post", {
  id: integer("id").primaryKey().notNull(),
  name: varchar("name", { length: 200 }).notNull(),
  url: varchar("url", { length: 512 }),
  body: text("body"),
  creator_id: integer("creator_id").notNull(),
  community_id: integer("community_id").notNull(),
  removed: boolean("removed").notNull(),
  locked: boolean("locked").notNull(),
  published: timestamp("published", {
    withTimezone: true,
    mode: "string",
  }).notNull(),
  updated: timestamp("updated", { withTimezone: true, mode: "string" }),
  deleted: boolean("deleted").notNull(),
  nsfw: boolean("nsfw").notNull(),
  embed_title: text("embed_title"),
  embed_description: text("embed_description"),
  thumbnail_url: text("thumbnail_url"),
  ap_id: varchar("ap_id", { length: 255 }).notNull(),
  local: boolean("local").notNull(),
  embed_video_url: text("embed_video_url"),
  language_id: integer("language_id").notNull(),
  featured_community: boolean("featured_community").notNull(),
  featured_local: boolean("featured_local").notNull(),
});

export const postAggregates = pgTable("post_aggregates", {
  id: integer("id").primaryKey().notNull(),
  post_id: integer("post_id").notNull(),
  comments: bigint("comments", { mode: "number" }).notNull(),
  score: bigint("score", { mode: "number" }).notNull(),
  upvotes: bigint("upvotes", { mode: "number" }).notNull(),
  downvotes: bigint("downvotes", { mode: "number" }).notNull(),
  published: timestamp("published", {
    withTimezone: true,
    mode: "string",
  }).notNull(),
  newest_comment_time_necro: timestamp("newest_comment_time_necro", {
    withTimezone: true,
    mode: "string",
  }).notNull(),
  newest_comment_time: timestamp("newest_comment_time", {
    withTimezone: true,
    mode: "string",
  }).notNull(),
  featured_community: boolean("featured_community").notNull(),
  featured_local: boolean("featured_local").notNull(),
  hot_rank: integer("hot_rank").notNull(),
  hot_rank_active: integer("hot_rank_active").notNull(),
  community_id: integer("community_id").notNull(),
  creator_id: integer("creator_id").notNull(),
  controversy_rank: doublePrecision("controversy_rank").notNull(),
});

export const postLike = pgTable("post_like", {
  id: integer("id").primaryKey().notNull(),
  post_id: integer("post_id").notNull(),
  person_id: integer("person_id").notNull(),
  score: smallint("score").notNull(),
  published: timestamp("published", {
    withTimezone: true,
    mode: "string",
  }).notNull(),
});

export const postRead = pgTable("post_read", {
  id: integer("id").primaryKey().notNull(),
  post_id: integer("post_id").notNull(),
  person_id: integer("person_id").notNull(),
  published: timestamp("published", {
    withTimezone: true,
    mode: "string",
  }).notNull(),
});

export const postReport = pgTable("post_report", {
  id: integer("id").primaryKey().notNull(),
  creator_id: integer("creator_id").notNull(),
  post_id: integer("post_id").notNull(),
  original_post_name: varchar("original_post_name", { length: 200 }).notNull(),
  original_post_url: text("original_post_url"),
  original_post_body: text("original_post_body"),
  reason: text("reason").notNull(),
  resolved: boolean("resolved").notNull(),
  resolver_id: integer("resolver_id"),
  published: timestamp("published", {
    withTimezone: true,
    mode: "string",
  }).notNull(),
  updated: timestamp("updated", { withTimezone: true, mode: "string" }),
});

export const postSaved = pgTable("post_saved", {
  id: integer("id").primaryKey().notNull(),
  post_id: integer("post_id").notNull(),
  person_id: integer("person_id").notNull(),
  published: timestamp("published", {
    withTimezone: true,
    mode: "string",
  }).notNull(),
});

export const privateMessage = pgTable("private_message", {
  id: integer("id").primaryKey().notNull(),
  creator_id: integer("creator_id").notNull(),
  recipient_id: integer("recipient_id").notNull(),
  content: text("content").notNull(),
  deleted: boolean("deleted").notNull(),
  read: boolean("read").notNull(),
  published: timestamp("published", {
    withTimezone: true,
    mode: "string",
  }).notNull(),
  updated: timestamp("updated", { withTimezone: true, mode: "string" }),
  ap_id: varchar("ap_id", { length: 255 }).notNull(),
  local: boolean("local").notNull(),
});

export const privateMessageReport = pgTable("private_message_report", {
  id: integer("id").primaryKey().notNull(),
  creator_id: integer("creator_id").notNull(),
  private_message_id: integer("private_message_id").notNull(),
  original_pm_text: text("original_pm_text").notNull(),
  reason: text("reason").notNull(),
  resolved: boolean("resolved").notNull(),
  resolver_id: integer("resolver_id"),
  published: timestamp("published", {
    withTimezone: true,
    mode: "string",
  }).notNull(),
  updated: timestamp("updated", { withTimezone: true, mode: "string" }),
});

export const receivedActivity = pgTable("received_activity", {
  id: bigint("id", { mode: "number" }).primaryKey().notNull(),
  ap_id: text("ap_id").notNull(),
  published: timestamp("published", {
    withTimezone: true,
    mode: "string",
  }).notNull(),
});

export const registrationApplication = pgTable("registration_application", {
  id: integer("id").primaryKey().notNull(),
  local_user_id: integer("local_user_id").notNull(),
  answer: text("answer").notNull(),
  admin_id: integer("admin_id"),
  deny_reason: text("deny_reason"),
  published: timestamp("published", {
    withTimezone: true,
    mode: "string",
  }).notNull(),
});

export const secret = pgTable("secret", {
  id: integer("id").primaryKey().notNull(),
  jwt_secret: varchar("jwt_secret").notNull(),
});

export const sentActivity = pgTable("sent_activity", {
  id: bigint("id", { mode: "number" }).primaryKey().notNull(),
  ap_id: text("ap_id").notNull(),
  data: json("data").notNull(),
  sensitive: boolean("sensitive").notNull(),
  published: timestamp("published", {
    withTimezone: true,
    mode: "string",
  }).notNull(),
});

export const site = pgTable("site", {
  id: integer("id").primaryKey().notNull(),
  name: varchar("name", { length: 20 }).notNull(),
  sidebar: text("sidebar"),
  published: timestamp("published", {
    withTimezone: true,
    mode: "string",
  }).notNull(),
  updated: timestamp("updated", { withTimezone: true, mode: "string" }),
  icon: text("icon"),
  banner: text("banner"),
  description: varchar("description", { length: 150 }),
  actor_id: varchar("actor_id", { length: 255 }).notNull(),
  last_refreshed_at: timestamp("last_refreshed_at", {
    withTimezone: true,
    mode: "string",
  }).notNull(),
  inbox_url: varchar("inbox_url", { length: 255 }).notNull(),
  private_key: text("private_key"),
  public_key: text("public_key").notNull(),
  instance_id: integer("instance_id").notNull(),
});

export const siteAggregates = pgTable("site_aggregates", {
  id: integer("id").primaryKey().notNull(),
  site_id: integer("site_id").notNull(),
  users: bigint("users", { mode: "number" }).notNull(),
  posts: bigint("posts", { mode: "number" }).notNull(),
  comments: bigint("comments", { mode: "number" }).notNull(),
  communities: bigint("communities", { mode: "number" }).notNull(),
  users_active_day: bigint("users_active_day", { mode: "number" }).notNull(),
  users_active_week: bigint("users_active_week", { mode: "number" }).notNull(),
  users_active_month: bigint("users_active_month", {
    mode: "number",
  }).notNull(),
  users_active_half_year: bigint("users_active_half_year", {
    mode: "number",
  }).notNull(),
});

export const siteLanguage = pgTable("site_language", {
  id: integer("id").primaryKey().notNull(),
  site_id: integer("site_id").notNull(),
  language_id: integer("language_id").notNull(),
});

export const tagline = pgTable("tagline", {
  id: integer("id").primaryKey().notNull(),
  local_site_id: integer("local_site_id").notNull(),
  content: text("content").notNull(),
  published: timestamp("published", {
    withTimezone: true,
    mode: "string",
  }).notNull(),
  updated: timestamp("updated", { withTimezone: true, mode: "string" }),
});
