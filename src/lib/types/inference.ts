export interface InferResponseDto {
  probs: {
    benign: number; // 0..1
    malignant: number; // 0..1
  };
  camPngUrl: string; // URL to overlay
}
