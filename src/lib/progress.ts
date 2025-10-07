import { api } from "./api";

export type ProgressSummary = {
  accuracy: number; // 0..1
  sensitivity: number; // 0..1
  specificity: number; // 0..1
  avgTimeMs: number; // milliseconds
  totalAttempts: number;
  streakDays: number;
  trend?: Array<{ date: string; accuracy: number; sensitivity: number }>;
};

export type RecentAttempt = {
  id: string;
  caseId: string;
  correct: boolean;
  answer: "benign" | "malignant";
  createdAt: string;
  timeToAnswerMs: number;
};

export async function getProgress(): Promise<ProgressSummary> {
  const { data } = await api.get<ProgressSummary>("/me/progress");
  return data;
}

export async function getRecentAttempts(limit = 5): Promise<RecentAttempt[]> {
  const { data } = await api.get<RecentAttempt[]>(
    `/me/recent-attempts?limit=${limit}`
  );
  return data;
}

export async function getDrillsDue(): Promise<{
  count: number;
  nextDueAt?: string;
}> {
  const { data } = await api.get<{ count: number; nextDueAt?: string }>(
    `/me/drills-due`
  );
  return data;
}
