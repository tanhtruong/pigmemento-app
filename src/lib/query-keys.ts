export const queryKeys = {
  cases: ['cases'],
  case: (id: string) => ['cases', id],
  'random-case': ['cases', 'random'],
  'attempted-cases': ['cases', 'attempted'],
  'latest-attempt': (caseId: string) => ['attempts', 'latest', caseId],
  me: ['me'],
  'me-stats': ['me', 'progress'],
} as const;
