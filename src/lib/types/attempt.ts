import { Label } from "./case";

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

export interface AnswerListItemDto {
  id: string;
  caseId: string;
  answer: Label;
  correct: boolean;
  timeToAnswerMs: number;
  createdAt: string; // ISO UTC
}
