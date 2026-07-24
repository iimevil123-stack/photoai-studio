// ============================================================
// PhotoAI Studio - App Constants
// ============================================================

// ---- Upload Limits ----
export const MAX_FILE_SIZE_BYTES = 30 * 1024 * 1024; // 30MB
export const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/heif",
];
export const MAX_IMAGE_DIMENSION = 4096; // max pixels for longest edge before processing
export const PROCESSED_IMAGE_MAX_DIMENSION = 2048; // resize to max 2048px before AI
export const THUMBNAIL_MAX_DIMENSION = 400;

// ---- Guest Limits ----
export const GUEST_MAX_UPLOADS = 1;
export const GUEST_MAX_ANALYSES = 1;

// ---- Rate Limiting ----
export const RATE_LIMIT_GUEST_PER_SESSION = 1;
export const RATE_LIMIT_FREE_PER_DAY = 20;
export const RATE_LIMIT_PRO_PER_DAY = 200;

// ---- AI ----
export const AI_RETRY_MAX = 3;
export const AI_RETRY_DELAYS_MS = [1000, 3000, 7000]; // exponential backoff
export const AI_CACHE_TTL_DAYS = 7;
export const AI_DAILY_BUDGET_USD = Number(process.env.AI_DAILY_BUDGET_USD) || 10;

export const AI_MODEL_PRIMARY = "claude-opus-4-8";
export const AI_PROVIDER_PRIMARY = "anthropic";
export const AI_MODEL_FALLBACK = "gpt-4o";
export const AI_PROVIDER_FALLBACK = "openai";

// ---- Project Types (UI labels) ----
export const PROJECT_TYPE_LABELS: Record<string, string> = {
  portrait: "人像",
  wedding: "婚礼",
  landscape: "风景",
  commercial: "商业",
  event: "活动",
  street: "街拍",
  general: "通用",
};

export const PROJECT_STATUS_LABELS: Record<string, string> = {
  draft: "草稿",
  shooting: "拍摄中",
  editing: "后期中",
  completed: "已完成",
  archived: "已归档",
};

// ---- Storage Buckets ----
export const STORAGE_BUCKET_UPLOADS = "user-uploads";
export const STORAGE_BUCKET_PORTFOLIOS = "portfolios";
export const STORAGE_BUCKET_THUMBNAILS = "thumbnails";

// ---- Pricing (future) ----
export const PRICING_PLANS = {
  free: { name: "免费版", price: 0, analysesPerDay: 5 },
  monthly_29: { name: "专业版", price: 29, analysesPerDay: 50 },
  monthly_59: { name: "工作室版", price: 59, analysesPerDay: 200 },
};
