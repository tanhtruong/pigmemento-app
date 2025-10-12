export const queryKeys = {
  "drills-due": ["drills-due"],
  "me-progress": ["me-progress"],
  "recent-attempts": ["recent-attempts"],
  "daily-attempts": ["daily-attempts"],
  cases: ["cases"],
  case: (id: string) => ["case", id],
} as const;
