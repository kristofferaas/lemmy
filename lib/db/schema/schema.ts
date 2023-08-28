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
  adminPersonId: integer("admin_person_id"),
  postId: integer("post_id"),
  reason: text("reason"),
  when: timestamp("when_", { withTimezone: true }),
});

export const adminPurgeCommunity = pgTable("admin_purge_community", {
  id: integer("id").primaryKey(),
  adminPersonId: integer("admin_person_id"),
  reason: text("reason"),
  when: timestamp("when_", { withTimezone: true }),
});

export const adminPurgePost = pgTable("admin_purge_post", {
  id: integer("id").primaryKey(),
  adminPersonId: integer("admin_person_id"),
  communityId: integer("community_id"),
  reason: text("reason"),
  when: timestamp("when_", { withTimezone: true }),
});

export const captchaAnswer = pgTable("captcha_answer", {
  id: integer("id").primaryKey(),
  uuid: uuid("uuid"),
  answer: text("answer"),
  published: timestamp("published", { withTimezone: true }),
});

export const adminPurgePerson = pgTable("admin_purge_person", {
  id: integer("id").primaryKey(),
  adminPersonId: integer("admin_person_id"),
  reason: text("reason"),
  when: timestamp("when_", { withTimezone: true }),
});

export const comment = pgTable("comment", {
  id: serial("id").primaryKey(),
  creator_id: integer("creator_id"),
  post_id: integer("post_id"),
  content: text("content"),
  removed: boolean("removed"),
  published: timestamp("published", { withTimezone: true }),
  updated: timestamp("updated", { withTimezone: true }),
  deleted: boolean("deleted"),
  ap_id: varchar("ap_id", { length: 255 }),
  local: boolean("local"),
  path: ltree("path"),
  distinguished: boolean("distinguished"),
  language_id: integer("language_id"),
});

export const commentAggregates = pgTable("comment_aggregates", {
  id: serial("id").primaryKey(),
  comment_id: integer("comment_id"),
  score: bigint("score", { mode: "number" }),
  upvotes: bigint("upvotes", { mode: "number" }),
  downvotes: bigint("downvotes", { mode: "number" }),
  published: timestamp("published", { withTimezone: true }),
  child_count: integer("child_count"),
  hot_rank: integer("hot_rank"),
  controversy_rank: doublePrecision("controversy_rank"),
});

export const commentLike = pgTable("comment_like", {
  id: serial("id").primaryKey(),
  person_id: integer("person_id"),
  comment_id: integer("comment_id"),
  post_id: integer("post_id"),
  score: smallint("score"),
  published: timestamp("published", { withTimezone: true }),
});

export const commentReply = pgTable("comment_reply", {
  id: serial("id").primaryKey(),
  recipient_id: integer("recipient_id"),
  comment_id: integer("comment_id"),
  read: boolean("read"),
  published: timestamp("published", { withTimezone: true }),
});

export const commentReport = pgTable("comment_report", {
  id: serial("id").primaryKey(),
  creator_id: integer("creator_id"),
  comment_id: integer("comment_id"),
  original_comment_text: text("original_comment_text"),
  reason: text("reason"),
  resolved: boolean("resolved"),
  resolver_id: integer("resolver_id"),
  published: timestamp("published", { withTimezone: true }),
  updated: timestamp("updated", { withTimezone: true }),
});

export const commentSaved = pgTable("comment_saved", {
  id: serial("id").primaryKey(),
  comment_id: integer("comment_id"),
  person_id: integer("person_id"),
  published: timestamp("published", { withTimezone: true }),
});

export const community = pgTable("community", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }),
  title: varchar("title", { length: 255 }),
  description: text("description"),
  removed: boolean("removed"),
  published: timestamp("published", { withTimezone: true }),
  updated: timestamp("updated", { withTimezone: true }),
  deleted: boolean("deleted"),
  nsfw: boolean("nsfw"),
  actor_id: varchar("actor_id", { length: 255 }),
  local: boolean("local"),
  private_key: text("private_key"),
  public_key: text("public_key"),
  last_refreshed_at: timestamp("last_refreshed_at", { withTimezone: true }),
  icon: text("icon"),
  banner: text("banner"),
  followers_url: varchar("followers_url", { length: 255 }),
  inbox_url: varchar("inbox_url", { length: 255 }),
  shared_inbox_url: varchar("shared_inbox_url", { length: 255 }),
  hidden: boolean("hidden"),
  posting_restricted_to_mods: boolean("posting_restricted_to_mods"),
  instance_id: integer("instance_id"),
  moderators_url: varchar("moderators_url", { length: 255 }),
  featured_url: varchar("featured_url", { length: 255 }),
});

export const communityAggregates = pgTable("community_aggregates", {
  id: serial("id").primaryKey(),
  community_id: integer("community_id"),
  subscribers: bigint("subscribers", { mode: "number" }),
  posts: bigint("posts", { mode: "number" }),
  comments: bigint("comments", { mode: "number" }),
  published: timestamp("published", { withTimezone: true }),
  users_active_day: bigint("users_active_day", { mode: "number" }),
  users_active_week: bigint("users_active_week", { mode: "number" }),
  users_active_month: bigint("users_active_month", { mode: "number" }),
  users_active_half_year: bigint("users_active_half_year", { mode: "number" }),
  hot_rank: integer("hot_rank"),
});

export const communityBlock = pgTable("community_block", {
  id: serial("id").primaryKey(),
  person_id: integer("person_id"),
  community_id: integer("community_id"),
  published: timestamp("published", { withTimezone: true }),
});

export const communityFollower = pgTable("community_follower", {
  id: serial("id").primaryKey(),
  community_id: integer("community_id"),
  person_id: integer("person_id"),
  published: timestamp("published", { withTimezone: true }),
  pending: boolean("pending"),
});

export const communityLanguage = pgTable("community_language", {
  id: serial("id").primaryKey(),
  community_id: integer("community_id"),
  language_id: integer("language_id"),
});

export const communityModerator = pgTable("community_moderator", {
  id: serial("id").primaryKey(),
  community_id: integer("community_id"),
  person_id: integer("person_id"),
  published: timestamp("published", { withTimezone: true }),
});

export const communityPersonBan = pgTable("community_person_ban", {
  id: serial("id").primaryKey(),
  community_id: integer("community_id"),
  person_id: integer("person_id"),
  published: timestamp("published", { withTimezone: true }),
  expires: timestamp("expires", { withTimezone: true }),
});

export const customEmoji = pgTable("custom_emoji", {
  id: serial("id").primaryKey(),
  local_site_id: integer("local_site_id"),
  shortcode: varchar("shortcode", { length: 128 }),
  image_url: text("image_url"),
  alt_text: text("alt_text"),
  category: text("category"),
  published: timestamp("published", { withTimezone: true }),
  updated: timestamp("updated", { withTimezone: true }),
});

export const customEmojiKeyword = pgTable("custom_emoji_keyword", {
  id: serial("id").primaryKey(),
  custom_emoji_id: integer("custom_emoji_id"),
  keyword: varchar("keyword", { length: 128 }),
});

export const emailVerification = pgTable("email_verification", {
  id: serial("id").primaryKey(),
  local_user_id: integer("local_user_id"),
  email: text("email"),
  verification_token: text("verification_token"),
  published: timestamp("published", { withTimezone: true }),
});

export const federationAllowlist = pgTable("federation_allowlist", {
  id: serial("id").primaryKey(),
  instance_id: integer("instance_id"),
  published: timestamp("published", { withTimezone: true }),
  updated: timestamp("updated", { withTimezone: true }),
});

export const federationBlocklist = pgTable("federation_blocklist", {
  id: serial("id").primaryKey(),
  instance_id: integer("instance_id"),
  published: timestamp("published", { withTimezone: true }),
  updated: timestamp("updated", { withTimezone: true }),
});

export const instance = pgTable("instance", {
  id: serial("id").primaryKey(),
  domain: varchar("domain", { length: 255 }),
  published: timestamp("published", { withTimezone: true }),
  updated: timestamp("updated", { withTimezone: true }),
  software: varchar("software", { length: 255 }),
  version: varchar("version", { length: 255 }),
});

export const language = pgTable("language", {
  id: serial("id").primaryKey(),
  code: varchar("code", { length: 3 }),
  name: text("name"),
});

export const localSite = pgTable("local_site", {
  id: serial("id").primaryKey(),
  site_id: integer("site_id"),
  site_setup: boolean("site_setup"),
  enable_downvotes: boolean("enable_downvotes"),
  enable_nsfw: boolean("enable_nsfw"),
  community_creation_admin_only: boolean("community_creation_admin_only"),
  require_email_verification: boolean("require_email_verification"),
  application_question: text("application_question"),
  private_instance: boolean("private_instance"),
  default_theme: text("default_theme"),
  default_post_listing_type: listingTypeEnum("default_post_listing_type"),
  legal_information: text("legal_information"),
  hide_modlog_mod_names: boolean("hide_modlog_mod_names"),
  application_email_admins: boolean("application_email_admins"),
  slur_filter_regex: text("slur_filter_regex"),
  actor_name_max_length: integer("actor_name_max_length"),
  federation_enabled: boolean("federation_enabled"),
  captcha_enabled: boolean("captcha_enabled"),
  captcha_difficulty: varchar("captcha_difficulty", { length: 255 }),
  published: timestamp("published", { withTimezone: true }),
  updated: timestamp("updated", { withTimezone: true }),
  registration_mode: registrationModeEnum("registration_mode"),
  reports_email_admins: boolean("reports_email_admins"),
});

export const localSiteRateLimit = pgTable("local_site_rate_limit", {
  id: serial("id").primaryKey(),
  local_site_id: integer("local_site_id"),
  message: integer("message"),
  message_per_second: integer("message_per_second"),
  post: integer("post"),
  post_per_second: integer("post_per_second"),
  register: integer("register"),
  register_per_second: integer("register_per_second"),
  image: integer("image"),
  image_per_second: integer("image_per_second"),
  comment: integer("comment"),
  comment_per_second: integer("comment_per_second"),
  search: integer("search"),
  search_per_second: integer("search_per_second"),
  published: timestamp("published", { withTimezone: true }),
  updated: timestamp("updated", { withTimezone: true }),
});

export const localUser = pgTable("local_user", {
  id: serial("id").primaryKey(),
  person_id: integer("person_id"),
  password_encrypted: text("password_encrypted"),
  email: text("email"),
  show_nsfw: boolean("show_nsfw"),
  theme: text("theme"),
  default_sort_type: sortTypeEnum("default_sort_type"),
  default_listing_type: listingTypeEnum("default_listing_type"),
  interface_language: varchar("interface_language", { length: 20 }),
  show_avatars: boolean("show_avatars"),
  send_notifications_to_email: boolean("send_notifications_to_email"),
  validator_time: timestamp("validator_time", { withTimezone: true }),
  show_scores: boolean("show_scores"),
  show_bot_accounts: boolean("show_bot_accounts"),
  show_read_posts: boolean("show_read_posts"),
  show_new_post_notifs: boolean("show_new_post_notifs"),
  email_verified: boolean("email_verified"),
  accepted_application: boolean("accepted_application"),
  totp_2fa_secret: text("totp_2fa_secret"),
  totp_2fa_url: text("totp_2fa_url"),
  open_links_in_new_tab: boolean("open_links_in_new_tab"),
  blur_nsfw: boolean("blur_nsfw"),
  auto_expand: boolean("auto_expand"),
  infinite_scroll_enabled: boolean("infinite_scroll_enabled"),
  admin: boolean("admin"),
});

export const localUserLanguage = pgTable("local_user_language", {
  id: serial("id").primaryKey(),
  local_user_id: integer("local_user_id"),
  language_id: integer("language_id"),
});

export const modAdd = pgTable("mod_add", {
  id: serial("id").primaryKey(),
  mod_person_id: integer("mod_person_id"),
  other_person_id: integer("other_person_id"),
  removed: boolean("removed"),
  when_: timestamp("when_", { withTimezone: true }),
});

export const modAddCommunity = pgTable("mod_add_community", {
  id: serial("id").primaryKey(),
  mod_person_id: integer("mod_person_id"),
  other_person_id: integer("other_person_id"),
  community_id: integer("community_id"),
  removed: boolean("removed"),
  when_: timestamp("when_", { withTimezone: true }),
});

export const modBan = pgTable("mod_ban", {
  id: serial("id").primaryKey(),
  mod_person_id: integer("mod_person_id"),
  other_person_id: integer("other_person_id"),
  reason: text("reason"),
  banned: boolean("banned"),
  expires: timestamp("expires", { withTimezone: true }),
  when_: timestamp("when_", { withTimezone: true }),
});

export const modBanFromCommunity = pgTable("mod_ban_from_community", {
  id: serial("id").primaryKey(),
  mod_person_id: integer("mod_person_id"),
  other_person_id: integer("other_person_id"),
  community_id: integer("community_id"),
  reason: text("reason"),
  banned: boolean("banned"),
  expires: timestamp("expires", { withTimezone: true }),
  when_: timestamp("when_", { withTimezone: true }),
});

export const modFeaturePost = pgTable("mod_feature_post", {
  id: serial("id").primaryKey(),
  mod_person_id: integer("mod_person_id"),
  post_id: integer("post_id"),
  featured: boolean("featured"),
  when_: timestamp("when_", { withTimezone: true }),
  is_featured_community: boolean("is_featured_community"),
});

export const modHideCommunity = pgTable("mod_hide_community", {
  id: serial("id").primaryKey(),
  community_id: integer("community_id"),
  mod_person_id: integer("mod_person_id"),
  when_: timestamp("when_", { withTimezone: true }),
  reason: text("reason"),
  hidden: boolean("hidden"),
});

export const modLockPost = pgTable("mod_lock_post", {
  id: serial("id").primaryKey(),
  mod_person_id: integer("mod_person_id"),
  post_id: integer("post_id"),
  locked: boolean("locked"),
  when_: timestamp("when_", { withTimezone: true }),
});

export const modRemoveComment = pgTable("mod_remove_comment", {
  id: serial("id").primaryKey(),
  mod_person_id: integer("mod_person_id"),
  comment_id: integer("comment_id"),
  reason: text("reason"),
  removed: boolean("removed"),
  when_: timestamp("when_", { withTimezone: true }),
});

export const modRemoveCommunity = pgTable("mod_remove_community", {
  id: serial("id").primaryKey(),
  mod_person_id: integer("mod_person_id"),
  community_id: integer("community_id"),
  reason: text("reason"),
  removed: boolean("removed"),
  expires: timestamp("expires", { withTimezone: true }),
  when_: timestamp("when_", { withTimezone: true }),
});

export const modRemovePost = pgTable("mod_remove_post", {
  id: serial("id").primaryKey(),
  mod_person_id: integer("mod_person_id"),
  post_id: integer("post_id"),
  reason: text("reason"),
  removed: boolean("removed"),
  when_: timestamp("when_", { withTimezone: true }),
});

export const modTransferCommunity = pgTable("mod_transfer_community", {
  id: serial("id").primaryKey(),
  mod_person_id: integer("mod_person_id"),
  other_person_id: integer("other_person_id"),
  community_id: integer("community_id"),
  when_: timestamp("when_", { withTimezone: true }),
});

export const passwordResetRequest = pgTable("password_reset_request", {
  id: serial("id").primaryKey(),
  token: text("token"),
  published: timestamp("published", { withTimezone: true }),
  local_user_id: integer("local_user_id"),
});

export const person = pgTable("person", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }),
  display_name: varchar("display_name", { length: 255 }),
  avatar: text("avatar"),
  banned: boolean("banned").notNull(),
  published: timestamp("published", { withTimezone: true }),
  updated: timestamp("updated", { withTimezone: true }),
  actor_id: varchar("actor_id", { length: 255 }),
  bio: text("bio"),
  local: boolean("local"),
  private_key: text("private_key"),
  public_key: text("public_key"),
  last_refreshed_at: timestamp("last_refreshed_at", { withTimezone: true }),
  banner: text("banner"),
  deleted: boolean("deleted"),
  inbox_url: varchar("inbox_url", { length: 255 }),
  shared_inbox_url: varchar("shared_inbox_url", { length: 255 }),
  matrix_user_id: text("matrix_user_id"),
  bot_account: boolean("bot_account"),
  ban_expires: timestamp("ban_expires", { withTimezone: true }).notNull(),
  instance_id: integer("instance_id"),
});

export const personAggregates = pgTable("person_aggregates", {
  id: integer("id").primaryKey(),
  personId: integer("person_id"),
  postCount: bigint("post_count", { mode: "number" }),
  postScore: bigint("post_score", { mode: "number" }),
  commentCount: bigint("comment_count", { mode: "number" }),
  commentScore: bigint("comment_score", { mode: "number" }),
});

export const personBan = pgTable("person_ban", {
  id: integer("id").primaryKey(),
  personId: integer("person_id"),
  published: timestamp("published", { withTimezone: true }),
});

export const personBlock = pgTable("person_block", {
  id: integer("id").primaryKey(),
  personId: integer("person_id"),
  targetId: integer("target_id"),
  published: timestamp("published", { withTimezone: true }),
});

export const personFollower = pgTable("person_follower", {
  id: integer("id").primaryKey(),
  personId: integer("person_id"),
  followerId: integer("follower_id"),
  published: timestamp("published", { withTimezone: true }),
  pending: boolean("pending"),
});

export const personMention = pgTable("person_mention", {
  id: integer("id").primaryKey(),
  recipientId: integer("recipient_id"),
  commentId: integer("comment_id"),
  read: boolean("read"),
  published: timestamp("published", { withTimezone: true }),
});

export const personPostAggregates = pgTable("person_post_aggregates", {
  id: integer("id").primaryKey(),
  personId: integer("person_id"),
  postId: integer("post_id"),
  readComments: bigint("read_comments", { mode: "number" }),
  published: timestamp("published", { withTimezone: true }),
});

export const post = pgTable("post", {
  id: integer("id").primaryKey(),
  name: varchar("name", { length: 200 }),
  url: varchar("url", { length: 512 }),
  body: text("body"),
  creatorId: integer("creator_id"),
  communityId: integer("community_id"),
  removed: boolean("removed"),
  locked: boolean("locked"),
  published: timestamp("published", { withTimezone: true }),
  updated: timestamp("updated", { withTimezone: true }),
  deleted: boolean("deleted"),
  nsfw: boolean("nsfw"),
  embedTitle: text("embed_title"),
  embedDescription: text("embed_description"),
  thumbnailUrl: text("thumbnail_url"),
  apId: varchar("ap_id", { length: 255 }),
  local: boolean("local"),
  embedVideoUrl: text("embed_video_url"),
  languageId: integer("language_id"),
  featuredCommunity: boolean("featured_community"),
  featuredLocal: boolean("featured_local"),
});

export const postAggregates = pgTable("post_aggregates", {
  id: integer("id").primaryKey(),
  postId: integer("post_id"),
  comments: bigint("comments", { mode: "number" }),
  score: bigint("score", { mode: "number" }),
  upvotes: bigint("upvotes", { mode: "number" }),
  downvotes: bigint("downvotes", { mode: "number" }),
  published: timestamp("published", { withTimezone: true }),
  newestCommentTimeNecro: timestamp("newest_comment_time_necro", {
    withTimezone: true,
  }),
  newestCommentTime: timestamp("newest_comment_time", { withTimezone: true }),
  featuredCommunity: boolean("featured_community"),
  featuredLocal: boolean("featured_local"),
  hotRank: integer("hot_rank"),
  hotRankActive: integer("hot_rank_active"),
  communityId: integer("community_id"),
  creatorId: integer("creator_id"),
  controversyRank: doublePrecision("controversy_rank"),
});

export const postLike = pgTable("post_like", {
  id: integer("id").primaryKey(),
  postId: integer("post_id"),
  personId: integer("person_id"),
  score: smallint("score"),
  published: timestamp("published", { withTimezone: true }),
});

export const postRead = pgTable("post_read", {
  id: integer("id").primaryKey(),
  postId: integer("post_id"),
  personId: integer("person_id"),
  published: timestamp("published", { withTimezone: true }),
});

export const postReport = pgTable("post_report", {
  id: integer("id").primaryKey(),
  creatorId: integer("creator_id"),
  postId: integer("post_id"),
  originalPostName: varchar("original_post_name", { length: 200 }),
  originalPostUrl: text("original_post_url"),
  originalPostBody: text("original_post_body"),
  reason: text("reason"),
  resolved: boolean("resolved"),
  resolverId: integer("resolver_id"),
  published: timestamp("published", { withTimezone: true }),
  updated: timestamp("updated", { withTimezone: true }),
});

export const postSaved = pgTable("post_saved", {
  id: integer("id").primaryKey(),
  postId: integer("post_id"),
  personId: integer("person_id"),
  published: timestamp("published", { withTimezone: true }),
});

export const privateMessage = pgTable("private_message", {
  id: integer("id").primaryKey(),
  creatorId: integer("creator_id"),
  recipientId: integer("recipient_id"),
  content: text("content"),
  deleted: boolean("deleted"),
  read: boolean("read"),
  published: timestamp("published", { withTimezone: true }),
  updated: timestamp("updated", { withTimezone: true }),
  apId: varchar("ap_id", { length: 255 }),
  local: boolean("local"),
});

export const privateMessageReport = pgTable("private_message_report", {
  id: integer("id").primaryKey(),
  creatorId: integer("creator_id"),
  privateMessageId: integer("private_message_id"),
  originalPmText: text("original_pm_text"),
  reason: text("reason"),
  resolved: boolean("resolved"),
  resolverId: integer("resolver_id"),
  published: timestamp("published", { withTimezone: true }),
  updated: timestamp("updated", { withTimezone: true }),
});

export const sentActivity = pgTable("sent_activity", {
  id: bigint("id", { mode: "number" }).primaryKey(),
  apId: text("ap_id"),
  data: json("data"),
  sensitive: boolean("sensitive"),
  published: timestamp("published", { withTimezone: true }),
});

export const site = pgTable("site", {
  id: integer("id").primaryKey(),
  name: varchar("name", { length: 20 }),
  sidebar: text("sidebar"),
  published: timestamp("published", { withTimezone: true }),
  updated: timestamp("updated", { withTimezone: true }),
  icon: text("icon"),
  banner: text("banner"),
  description: varchar("description", { length: 150 }),
  actorId: varchar("actor_id", { length: 255 }),
  lastRefreshedAt: timestamp("last_refreshed_at", { withTimezone: true }),
  inboxUrl: varchar("inbox_url", { length: 255 }),
  privateKey: text("private_key"),
  publicKey: text("public_key"),
  instanceId: integer("instance_id"),
});

export const siteAggregates = pgTable("site_aggregates", {
  id: integer("id").primaryKey(),
  siteId: integer("site_id"),
  users: bigint("users", { mode: "number" }),
  posts: bigint("posts", { mode: "number" }),
  comments: bigint("comments", { mode: "number" }),
  communities: bigint("communities", { mode: "number" }),
  usersActiveDay: bigint("users_active_day", { mode: "number" }),
  usersActiveWeek: bigint("users_active_week", { mode: "number" }),
  usersActiveMonth: bigint("users_active_month", { mode: "number" }),
  usersActiveHalfYear: bigint("users_active_half_year", { mode: "number" }),
});

export const siteLanguage = pgTable("site_language", {
  id: integer("id").primaryKey(),
  siteId: integer("site_id"),
  languageId: integer("language_id"),
});

export const tagline = pgTable("tagline", {
  id: integer("id").primaryKey(),
  localSiteId: integer("local_site_id"),
  content: text("content"),
  published: timestamp("published", { withTimezone: true }),
  updated: timestamp("updated", { withTimezone: true }),
});
