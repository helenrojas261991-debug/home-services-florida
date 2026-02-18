import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, decimal, json, boolean } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Content table for managing hero images, service descriptions, and other editable content
 */
export const content = mysqlTable("content", {
  id: int("id").autoincrement().primaryKey(),
  key: varchar("key", { length: 128 }).notNull().unique(), // e.g., "hero_image", "service_plumbing_description"
  titleEn: text("titleEn"),
  titleEs: text("titleEs"),
  descriptionEn: text("descriptionEn"),
  descriptionEs: text("descriptionEs"),
  imageUrl: text("imageUrl"), // S3 URL
  videoUrl: text("videoUrl"), // S3 URL
  metadata: json("metadata"), // Additional data as JSON
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Content = typeof content.$inferSelect;
export type InsertContent = typeof content.$inferInsert;

/**
 * Google Business Profile reviews cache
 */
export const googleReviews = mysqlTable("googleReviews", {
  id: int("id").autoincrement().primaryKey(),
  googleReviewId: varchar("googleReviewId", { length: 128 }).notNull().unique(),
  authorName: varchar("authorName", { length: 255 }).notNull(),
  rating: int("rating").notNull(), // 1-5 stars
  comment: text("comment"),
  replyComment: text("replyComment"),
  replyTime: timestamp("replyTime"),
  authorPhotoUrl: text("authorPhotoUrl"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type GoogleReview = typeof googleReviews.$inferSelect;
export type InsertGoogleReview = typeof googleReviews.$inferInsert;

/**
 * Instagram feed cache
 */
export const instagramPosts = mysqlTable("instagramPosts", {
  id: int("id").autoincrement().primaryKey(),
  instagramId: varchar("instagramId", { length: 128 }).notNull().unique(),
  caption: text("caption"),
  mediaType: varchar("mediaType", { length: 50 }).notNull(), // IMAGE, VIDEO, CAROUSEL_ALBUM
  mediaUrl: text("mediaUrl").notNull(), // S3 URL or Instagram CDN
  permalink: text("permalink"),
  timestamp: timestamp("timestamp"),
  likeCount: int("likeCount").default(0),
  commentCount: int("commentCount").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type InstagramPost = typeof instagramPosts.$inferSelect;
export type InsertInstagramPost = typeof instagramPosts.$inferInsert;

/**
 * API credentials and settings for integrations
 */
export const integrationSettings = mysqlTable("integrationSettings", {
  id: int("id").autoincrement().primaryKey(),
  service: varchar("service", { length: 50 }).notNull().unique(), // "google_business", "instagram"
  accessToken: text("accessToken"),
  refreshToken: text("refreshToken"),
  businessId: varchar("businessId", { length: 128 }),
  instagramBusinessAccountId: varchar("instagramBusinessAccountId", { length: 128 }),
  googleLocationName: varchar("googleLocationName", { length: 255 }),
  lastSyncedAt: timestamp("lastSyncedAt"),
  isActive: boolean("isActive").default(true),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type IntegrationSettings = typeof integrationSettings.$inferSelect;
export type InsertIntegrationSettings = typeof integrationSettings.$inferInsert;

/**
 * Contact form submissions
 */
export const contactSubmissions = mysqlTable("contactSubmissions", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 20 }),
  message: text("message").notNull(),
  subject: varchar("subject", { length: 255 }),
  status: mysqlEnum("status", ["new", "read", "responded"]).default("new").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type ContactSubmission = typeof contactSubmissions.$inferSelect;
export type InsertContactSubmission = typeof contactSubmissions.$inferInsert;
