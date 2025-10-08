// =========================
// Shared enums & literals
// =========================
export type Label = "benign" | "malignant";
export type Difficulty = "easy" | "med" | "hard";

// Owned patient snippet (flattened in DB, nested in JSON)
export interface Patient {
  age?: number | null;
  site?: string | null;
  sex?: string | null;
  fitzpatrickType?: string | null; // "I"..."VI" or free text
}

// =========================
// Auth
// =========================
export interface RegisterRequest {
  name?: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  name?: string | null;
  email: string;
  role: "user" | "admin" | "educator";
  createdAtUtc: string; // ISO
  isActive: boolean;
  lastLoginUtc?: string | null; // ISO or null
}

export interface AuthResponse {
  token: string; // JWT
  user: AuthUser;
}

// =========================
// Cases
// =========================

// List item: no ground-truth fields in list (per spec)
export interface CaseListItem {
  id: string;
  imageUrl: string;
  difficulty: Difficulty;
  patient: Patient;
  // no 'label' here
}

// Single case (used in guided review/feedback screen)
// Include truth and teaching points
export interface CaseDetail {
  id: string;
  imageUrl: string;
  label: Label; // truth shown only in feedback/review flow
  difficulty: Difficulty;
  patient: Patient;
  metadata?: string | null;
  teachingPoints?: TeachingPoint[];
}

export interface TeachingPoint {
  id: string;
  caseId: string;
  points: string; // bullet text (render as bullets client-side)
}

// =========================
// Attempts (analytics)
// =========================
export interface AttemptPostRequest {
  caseId: string;
  answer: Label; // user's guess
  timeToAnswerMs: number; // latency
}

export interface AttemptDto {
  id: string;
  userId: string;
  caseId: string;
  answer: Label;
  correct: boolean;
  timeToAnswerMs: number;
  createdAt: string; // ISO
}

// =========================
// Inference
// =========================
export interface InferResponseDto {
  probs: {
    benign: number; // 0..1
    malignant: number; // 0..1
  };
  camPngUrl: string; // URL to overlay
}

// =========================
// Pagination helpers
// =========================
export interface Page<T> {
  items: T[];
  nextCursor?: string | null; // or pageNumber/pageSize if you choose those
}

// =========================
// API error shape
// =========================
export interface ApiError {
  status: number;
  code?: string;
  message: string;
  details?: unknown;
}
