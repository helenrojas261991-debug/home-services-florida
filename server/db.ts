import { eq, desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { 
  InsertUser, users, 
  content, Content, InsertContent,
  googleReviews, GoogleReview, InsertGoogleReview,
  instagramPosts, InstagramPost, InsertInstagramPost,
  integrationSettings, IntegrationSettings, InsertIntegrationSettings,
  contactSubmissions, ContactSubmission, InsertContactSubmission,
} from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

// ============================================================================
// User Operations
// ============================================================================

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// ============================================================================
// Content Operations
// ============================================================================

export async function getContentByKey(key: string): Promise<Content | undefined> {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(content).where(eq(content.key, key)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getAllContent(): Promise<Content[]> {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(content);
}

export async function upsertContent(data: InsertContent): Promise<Content> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  if (!data.key) throw new Error("Content key is required");

  const existing = await getContentByKey(data.key);

  if (existing) {
    await db.update(content).set(data).where(eq(content.key, data.key));
    return { ...existing, ...data };
  } else {
    await db.insert(content).values(data);
    const result = await getContentByKey(data.key);
    if (!result) throw new Error("Failed to create content");
    return result;
  }
}

export async function deleteContent(key: string): Promise<void> {
  const db = await getDb();
  if (!db) return;

  await db.delete(content).where(eq(content.key, key));
}

// ============================================================================
// Google Reviews Operations
// ============================================================================

export async function getGoogleReviews(limit: number = 10): Promise<GoogleReview[]> {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(googleReviews).orderBy(desc(googleReviews.reviewTime)).limit(limit);
}

export async function upsertGoogleReview(review: InsertGoogleReview): Promise<GoogleReview> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  if (!review.googleReviewId) throw new Error("Google review ID is required");

  const existing = await db.select().from(googleReviews).where(eq(googleReviews.googleReviewId, review.googleReviewId)).limit(1);

  if (existing.length > 0) {
    await db.update(googleReviews).set(review).where(eq(googleReviews.googleReviewId, review.googleReviewId));
    return { ...existing[0], ...review };
  } else {
    await db.insert(googleReviews).values(review);
    const result = await db.select().from(googleReviews).where(eq(googleReviews.googleReviewId, review.googleReviewId)).limit(1);
    if (result.length === 0) throw new Error("Failed to create review");
    return result[0];
  }
}

export async function deleteGoogleReview(googleReviewId: string): Promise<void> {
  const db = await getDb();
  if (!db) return;

  await db.delete(googleReviews).where(eq(googleReviews.googleReviewId, googleReviewId));
}

// ============================================================================
// Instagram Posts Operations
// ============================================================================

export async function getInstagramPosts(limit: number = 12): Promise<InstagramPost[]> {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(instagramPosts).orderBy(desc(instagramPosts.timestamp)).limit(limit);
}

export async function upsertInstagramPost(post: InsertInstagramPost): Promise<InstagramPost> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  if (!post.instagramId) throw new Error("Instagram ID is required");

  const existing = await db.select().from(instagramPosts).where(eq(instagramPosts.instagramId, post.instagramId)).limit(1);

  if (existing.length > 0) {
    await db.update(instagramPosts).set(post).where(eq(instagramPosts.instagramId, post.instagramId));
    return { ...existing[0], ...post };
  } else {
    await db.insert(instagramPosts).values(post);
    const result = await db.select().from(instagramPosts).where(eq(instagramPosts.instagramId, post.instagramId)).limit(1);
    if (result.length === 0) throw new Error("Failed to create post");
    return result[0];
  }
}

export async function deleteInstagramPost(instagramId: string): Promise<void> {
  const db = await getDb();
  if (!db) return;

  await db.delete(instagramPosts).where(eq(instagramPosts.instagramId, instagramId));
}

// ============================================================================
// Integration Settings Operations
// ============================================================================

export async function getIntegrationSettings(service: string): Promise<IntegrationSettings | undefined> {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(integrationSettings).where(eq(integrationSettings.service, service)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function upsertIntegrationSettings(settings: InsertIntegrationSettings): Promise<IntegrationSettings> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  if (!settings.service) throw new Error("Service name is required");

  const existing = await getIntegrationSettings(settings.service);

  if (existing) {
    await db.update(integrationSettings).set(settings).where(eq(integrationSettings.service, settings.service));
    return { ...existing, ...settings };
  } else {
    await db.insert(integrationSettings).values(settings);
    const result = await getIntegrationSettings(settings.service);
    if (!result) throw new Error("Failed to create settings");
    return result;
  }
}

// ============================================================================
// Contact Submissions Operations
// ============================================================================

export async function getContactSubmissions(limit: number = 50): Promise<ContactSubmission[]> {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(contactSubmissions).orderBy(desc(contactSubmissions.createdAt)).limit(limit);
}

export async function createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.insert(contactSubmissions).values(submission);
  
  const result = await db.select().from(contactSubmissions).orderBy(desc(contactSubmissions.createdAt)).limit(1);
  if (result.length === 0) throw new Error("Failed to create submission");
  return result[0];
}

export async function updateContactSubmissionStatus(id: number, status: "new" | "read" | "responded"): Promise<void> {
  const db = await getDb();
  if (!db) return;

  await db.update(contactSubmissions).set({ status }).where(eq(contactSubmissions.id, id));
}
