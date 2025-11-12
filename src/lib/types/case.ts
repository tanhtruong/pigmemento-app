// Labels
import z from "zod";

// MARK: Label
const labels = {
    benign: "benign",
    malignant: "malignant",
} as const;

export const labelSchema = z.enum([labels.benign, labels.malignant],
    {required_error: "Select one of the options."});

export type Label = (typeof labels)[keyof typeof labels];

// MARK: Difficulty
const difficulties = {
    easy: "easy",
    medium: "medium",
    hard: "hard",
} as const;

export type Difficulty = (typeof difficulties)[keyof typeof difficulties];

/**
 * List item: no ground-truth fields in list (per spec)
 */
export interface CaseListItem {
    id: string;
    imageUrl: string;
    difficulty: Difficulty;
    patientAge: number;
    site: string;
}

/**
 *  Case item: Used when viewing a single case prior to answering
 *  NOTE: No label here (answer is checked via /answer)
 **/
export interface CaseDetail {
    id: string;
    imageUrl: string;
    patientAge: number;
    site: string;
    clinicalNote: string;
}
