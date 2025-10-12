import z from "zod";
import { Patient } from "./patient";

export const labelSchema = z.enum(["benign", "malignant"], {
  required_error: "Please pick one",
});
export type Label = z.infer<typeof labelSchema>;
export type Difficulty = "easy" | "med" | "hard";

/**
 * List item: no ground-truth fields in list (per spec)
 */
export interface CaseListItem {
  id: string;
  imageUrl: string;
  difficulty: Difficulty;
  patient: Patient;
  // no 'label' here
}

/**
 * Single case (used in guided review/feedback screen)
 * Include truth and teaching points
 */
export interface CaseDetail {
  id: string;
  imageUrl: string;
  label: Label; // truth shown only in feedback/review flow
  diagnosis2?: string | null;
  diagnosis3?: string | null;
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
