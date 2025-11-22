import { MODEL_NAME } from '@lib/constants/model';

type Probs = { benign: number; malignant: number };

export function getDermLensSummary({ benign, malignant }: Probs): string {
  const total = benign + malignant || 1;
  const b = benign / total;
  const m = malignant / total;

  // High malignant probability
  if (m >= 0.85) {
    return `I'm picking up several features in this lesion that strongly resemble the malignant examples I've been trained on.`;
  }

  if (m >= 0.65) {
    return `I'm seeing a noticeable number of features that resemble malignant patterns, though it's not completely clear to me.`;
  }

  // Ambiguous
  if (m >= 0.45 && m <= 0.55) {
    return `I'm unsure here. The features look quite balanced between benign and malignant patterns in my training data.`;
  }

  if (m >= 0.25) {
    return `I'm leaning toward benign-like features, though I do notice a few elements that resemble malignant patterns.`;
  }

  // Strong benign probability
  return `I'm mostly seeing features that match benign examples from my training data.`;
}
