/**
 * Used for progress summary on the Dashboard
 */
export type ProgressSummary = {
  accuracy: number; // 0..1
  sensitivity: number; // 0..1
  specificity: number; // 0..1
  avgTimeMs: number; // milliseconds
  totalAttempts: number;
  streakDays: number;
  trend?: Array<{ date: string; accuracy: number; sensitivity: number }>;
};
