/**
 * Owned patient snippet (flattened in DB, nested in JSON)
 */
export interface Patient {
  age?: number | null;
  site?: string | null;
  sex?: string | null;
  fitzpatrickType?: string | null; // "I"..."VI" or free text
}
