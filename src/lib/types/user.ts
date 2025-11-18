type Role = 'admin' | 'user';

export type User = {
  id: string;
  name: string;
  email: string;
  role: Role;
  createdAt: string;
  lastLoginAt: string | null;
};

export type UpdateUserPayload = {
  name?: string | null;
  email?: string | null;
};

export type UserStats = {
  totalAttempts: number;
  uniqueCasesAttempted: number;
  accuracy: number | null;
  sensitivity: number | null;
  specificity: number | null;
  firstAttemptAt?: string | null;
  lastAttemptAt?: string | null;
};
