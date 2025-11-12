import { Label } from "./case";

export interface AttemptRequest {
  chosenLabel: Label; // user's guess
}

export interface AttemptResponse {
    "correct": boolean,
    "correctLabel": Label,
    "teachingPoints": string[],
    "disclaimer": string
}
