export const queryKeys = {
  "drills-due": ["drills-due"],
  "me-progress": ["me-progress"],
  "recent-attempts": ["recent-attempts"],
  case: (id: string) => ["case", id],
} as const;
