import {
  pgTable,
  text,
  integer,
  boolean,
  timestamp,
  uuid,
  bigint,
  jsonb,
  uniqueIndex,
  index,
  check,
} from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

// ============================================================
// users - extends Supabase auth.users
// ============================================================
export const users = pgTable(
  "users",
  {
    id: uuid("id").primaryKey().notNull(),
    email: text("email").notNull().unique(),
    displayName: text("display_name"),
    avatarUrl: text("avatar_url"),
    role: text("role").notNull().default("user"),
    membershipTier: text("membership_tier").notNull().default("free"),
    analysisCount: integer("analysis_count").notNull().default(0),
    storageUsedBytes: bigint("storage_used_bytes", { mode: "number" })
      .notNull()
      .default(0),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    check("users_role_check", sql`${table.role} IN ('user', 'admin')`),
    check(
      "users_membership_tier_check",
      sql`${table.membershipTier} IN ('free', 'pro', 'enterprise')`
    ),
  ]
)

// ============================================================
// projects
// ============================================================
export const projects = pgTable(
  "projects",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    description: text("description"),
    type: text("type").notNull().default("general"),
    status: text("status").notNull().default("active"),
    coverImageUrl: text("cover_image_url"),
    imageCount: integer("image_count").notNull().default(0),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    index("idx_projects_user_id").on(table.userId),
    index("idx_projects_status").on(table.status),
    index("idx_projects_created_at").on(table.createdAt.desc()),
    check(
      "projects_type_check",
      sql`${table.type} IN ('portrait', 'wedding', 'landscape', 'commercial', 'event', 'street', 'general')`
    ),
    check(
      "projects_status_check",
      sql`${table.status} IN ('draft', 'shooting', 'editing', 'completed', 'archived')`
    ),
  ]
)

// ============================================================
// images
// ============================================================
export const images = pgTable(
  "images",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    projectId: uuid("project_id").references(() => projects.id, {
      onDelete: "set null",
    }),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    originalFilename: text("original_filename").notNull(),
    storagePath: text("storage_path").notNull().unique(),
    publicUrl: text("public_url").notNull(),
    thumbnailUrl: text("thumbnail_url"),
    fileSizeBytes: bigint("file_size_bytes", { mode: "number" }).notNull(),
    mimeType: text("mime_type").notNull(),
    width: integer("width"),
    height: integer("height"),
    exifStripped: boolean("exif_stripped").notNull().default(true),
    isAnalyzed: boolean("is_analyzed").notNull().default(false),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    index("idx_images_user_id").on(table.userId),
    index("idx_images_project_id").on(table.projectId),
    index("idx_images_is_analyzed").on(table.isAnalyzed),
  ]
)

// ============================================================
// ai_reports
// ============================================================
export const aiReports = pgTable(
  "ai_reports",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    imageId: uuid("image_id")
      .notNull()
      .unique()
      .references(() => images.id, { onDelete: "cascade" }),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    reportType: text("report_type").notNull().default("analysis"),
    overallScore: integer("overall_score"),
    technicalAnalysis: jsonb("technical_analysis").notNull().default({}),
    compositionAnalysis: jsonb("composition_analysis").notNull().default({}),
    suggestions: jsonb("suggestions").notNull().default([]),
    rawResponse: jsonb("raw_response"),
    aiModel: text("ai_model").notNull(),
    aiProvider: text("ai_provider").notNull(),
    tokenUsage: jsonb("token_usage"),
    processingTimeMs: integer("processing_time_ms"),
    isPartial: boolean("is_partial").notNull().default(false),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    index("idx_ai_reports_image_id").on(table.imageId),
    index("idx_ai_reports_user_id").on(table.userId),
    index("idx_ai_reports_report_type").on(table.reportType),
    index("idx_ai_reports_created_at").on(table.createdAt.desc()),
    check(
      "ai_reports_report_type_check",
      sql`${table.reportType} IN ('analysis', 'assist', 'postprocess')`
    ),
    check(
      "ai_reports_score_check",
      sql`${table.overallScore} >= 0 AND ${table.overallScore} <= 100`
    ),
  ]
)

// ============================================================
// shooting_plans
// ============================================================
export const shootingPlans = pgTable(
  "shooting_plans",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    theme: text("theme").notNull(),
    scene: text("scene").notNull(),
    subjectType: text("subject_type"),
    style: text("style"),
    planData: jsonb("plan_data").notNull().default({}),
    aiModel: text("ai_model").notNull(),
    aiProvider: text("ai_provider").notNull(),
    tokenUsage: jsonb("token_usage"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [index("idx_shooting_plans_user_id").on(table.userId)]
)

// ============================================================
// on_site_assessments
// ============================================================
export const onSiteAssessments = pgTable(
  "on_site_assessments",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    imageId: uuid("image_id").references(() => images.id, {
      onDelete: "set null",
    }),
    conditions: jsonb("conditions").notNull().default({}),
    plans: jsonb("plans").notNull().default([]),
    aiModel: text("ai_model").notNull(),
    aiProvider: text("ai_provider").notNull(),
    tokenUsage: jsonb("token_usage"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [index("idx_on_site_user_id").on(table.userId)]
)

// ============================================================
// postprocess_guides
// ============================================================
export const postprocessGuides = pgTable(
  "postprocess_guides",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    imageId: uuid("image_id").references(() => images.id, {
      onDelete: "set null",
    }),
    adjustments: jsonb("adjustments").notNull().default({}),
    guideText: text("guide_text"),
    aiModel: text("ai_model").notNull(),
    aiProvider: text("ai_provider").notNull(),
    tokenUsage: jsonb("token_usage"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [index("idx_postprocess_user_id").on(table.userId)]
)

// ============================================================
// portfolios
// ============================================================
export const portfolios = pgTable(
  "portfolios",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    projectId: uuid("project_id").references(() => projects.id, {
      onDelete: "set null",
    }),
    name: text("name").notNull(),
    description: text("description"),
    styleAnalysis: jsonb("style_analysis").notNull().default({}),
    templateId: text("template_id"),
    siteSlug: text("site_slug").unique(),
    siteConfig: jsonb("site_config"),
    isPublished: boolean("is_published").notNull().default(false),
    publishedAt: timestamp("published_at", { withTimezone: true }),
    aiModel: text("ai_model").notNull(),
    aiProvider: text("ai_provider").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    index("idx_portfolios_user_id").on(table.userId),
    index("idx_portfolios_project_id").on(table.projectId),
  ]
)

// ============================================================
// analysis_cache
// ============================================================
export const analysisCache = pgTable(
  "analysis_cache",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    cacheKey: text("cache_key").notNull().unique(),
    reportType: text("report_type").notNull(),
    result: jsonb("result").notNull(),
    aiModel: text("ai_model").notNull(),
    hitCount: integer("hit_count").notNull().default(1),
    expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    index("idx_analysis_cache_key").on(table.cacheKey),
    index("idx_analysis_cache_expires").on(table.expiresAt),
  ]
)

// ============================================================
// subscriptions
// ============================================================
export const subscriptions = pgTable(
  "subscriptions",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .unique()
      .references(() => users.id, { onDelete: "cascade" }),
    plan: text("plan").notNull().default("free"),
    status: text("status").notNull().default("active"),
    currentPeriodStart: timestamp("current_period_start", {
      withTimezone: true,
    }).notNull(),
    currentPeriodEnd: timestamp("current_period_end", {
      withTimezone: true,
    }).notNull(),
    canceledAt: timestamp("canceled_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    check(
      "subscriptions_plan_check",
      sql`${table.plan} IN ('free', 'monthly_29', 'monthly_59', 'yearly_299')`
    ),
    check(
      "subscriptions_status_check",
      sql`${table.status} IN ('active', 'canceled', 'expired', 'past_due')`
    ),
  ]
)
