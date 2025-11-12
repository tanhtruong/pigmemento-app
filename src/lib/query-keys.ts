export const queryKeys = {
    cases: ["cases"],
    case: (id: string) => ["cases", id],
    "random-case": ["cases", "random"],
} as const;
