export type Difficulty = "easy" | "med" | "hard";
export type Label = "benign" | "malignant";
export type Patient = {
  age?: number;
  site?: string;
};
export type Probs = {
  benign: number;
  malignant: number;
};

export interface CaseDto {
  id: string;
  imageUrl: string;
  difficulty: Difficulty;
  patient: Patient;
}

export interface CaseDetail extends CaseDto {
  label?: Label; // only in feedback flow
  teachingPoints?: string[];
}

export interface InferResponseDto {
  probs: Probs;
  camPngUrl?: string;
}

export interface LoginResponse {
  accessToken: string;
}
