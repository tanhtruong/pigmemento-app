import { Label } from "./case";

export interface AttemptPostRequest {
  caseId: string;
  answer: Label; // user's guess
  timeToAnswerMs: number; // latency
}

export interface AnswerListItemDto {
  id: string;
  caseId: string;
  answer: Label;
  correct: boolean;
  timeToAnswerMs: number;
  createdAt: string; // ISO UTC
}

export type DailyAttempts = {
  limit: number;
  used: number;
  remaining: number;
  resetAtLocal: string; // ISO
  resetAtUtc: string; // UTC
};
