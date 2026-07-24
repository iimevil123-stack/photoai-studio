// ============================================================
// PhotoAI Studio - Shared TypeScript Types
// ============================================================

// ---- User ----
export type MembershipTier = "free" | "pro" | "enterprise";
export type UserRole = "user" | "admin";

export interface User {
  id: string;
  email: string;
  displayName: string | null;
  avatarUrl: string | null;
  role: UserRole;
  membershipTier: MembershipTier;
  analysisCount: number;
  storageUsedBytes: number;
  createdAt: string;
  updatedAt: string;
}

// ---- Project ----
export type ProjectType =
  | "portrait"
  | "wedding"
  | "landscape"
  | "commercial"
  | "event"
  | "street"
  | "general";

export type ProjectStatus = "draft" | "shooting" | "editing" | "completed" | "archived";

export interface Project {
  id: string;
  userId: string;
  name: string;
  description: string | null;
  type: ProjectType;
  status: ProjectStatus;
  coverImageUrl: string | null;
  imageCount: number;
  createdAt: string;
  updatedAt: string;
}

// ---- Image ----
export interface ImageRecord {
  id: string;
  projectId: string | null;
  userId: string;
  originalFilename: string;
  storagePath: string;
  publicUrl: string;
  thumbnailUrl: string | null;
  fileSizeBytes: number;
  mimeType: string;
  width: number | null;
  height: number | null;
  exifStripped: boolean;
  isAnalyzed: boolean;
  createdAt: string;
}

// ---- AI Report ----
export type ReportType = "analysis" | "assist" | "postprocess";

export interface TechnicalDimension {
  score: number; // 1-5
  label: string;
  comment: string;
}

export interface TechnicalAnalysis {
  clarity: TechnicalDimension;
  exposure: TechnicalDimension;
  color: TechnicalDimension;
}

export interface CompositionAnalysis {
  strengths: string[];
  weaknesses: string[];
}

export interface Suggestion {
  priority: number;
  title: string;
  detail: string;
}

export interface AIReport {
  id: string;
  imageId: string;
  userId: string;
  reportType: ReportType;
  overallScore: number | null; // 0-100
  technicalAnalysis: TechnicalAnalysis;
  compositionAnalysis: CompositionAnalysis;
  suggestions: Suggestion[];
  rawResponse: unknown;
  aiModel: string;
  aiProvider: string;
  tokenUsage: { promptTokens: number; completionTokens: number } | null;
  processingTimeMs: number | null;
  isPartial: boolean;
  createdAt: string;
}

// ---- API ----
export interface ApiError {
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
}

export interface UploadResponse {
  id: string;
  url: string;
  thumbnailUrl: string | null;
}

export interface AnalyzeResponse {
  report: AIReport;
  isPartial: boolean;
}

// ---- Shooting Plan ----
export interface ShootingPlanInput {
  theme: string;
  scene: string;
  subjectType?: string;
  style?: string;
}

export interface ShootingPlan {
  id: string;
  userId: string;
  theme: string;
  scene: string;
  subjectType: string | null;
  style: string | null;
  planData: {
    outfitSuggestions: string[];
    poseSuggestions: string[];
    lensRecommendations: string[];
    cameraSettings: Record<string, string>;
    lightingTips: string[];
  };
  createdAt: string;
}

// ---- On-Site Assessment ----
export interface OnSiteAssessment {
  id: string;
  userId: string;
  imageId: string | null;
  conditions: {
    weather: string;
    lighting: string;
    backgroundQuality: string;
    colorTemperature: number;
  };
  plans: {
    planLabel: string;
    title: string;
    actions: string[];
    poseAdjustment: string;
  }[];
  createdAt: string;
}

// ---- Post-Process Guide ----
export interface PostProcessGuide {
  id: string;
  userId: string;
  imageId: string | null;
  adjustments: {
    exposure: number;
    shadows: number;
    colorTemperature: number;
    contrast: number;
    highlights: number;
    saturation: number;
    vibrance: number;
  };
  guideText: string | null;
  createdAt: string;
}

// ---- Portfolio ----
export interface Portfolio {
  id: string;
  userId: string;
  projectId: string | null;
  name: string;
  description: string | null;
  styleAnalysis: {
    detectedStyle: string;
    colorPalette: string[];
    saturationLevel: string;
    keywords: string[];
  };
  templateId: string | null;
  siteSlug: string | null;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}
