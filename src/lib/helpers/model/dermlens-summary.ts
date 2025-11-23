import { MODEL_NAME } from '@lib/constants/model';

type Probs = { benign: number; malignant: number };

export function getDermLensSummary({ benign, malignant }: Probs): string {
  const total = benign + malignant || 1;
  const b = benign / total;
  const m = malignant / total;

  // Very strong malignant-leaning pattern
  if (m >= 0.95) {
    return `This analysis highlights a pattern that very strongly leans toward features commonly emphasized when teaching about melanoma recognition. In a learning context, this would be a case to study carefully.`;
  }

  // Clear malignant-leaning pattern
  if (m >= 0.85) {
    return `The visual cues here are clearly skewed toward patterns often highlighted in melanoma-focused teaching examples, although this alone should never be used for diagnosis.`;
  }

  // Moderate malignant-leaning pattern
  if (m >= 0.65) {
    return `I'm seeing several features that tilt toward melanoma-like patterns, but there are still some elements that are less specific. This would be a good example for reviewing what pushes a lesion into a more concerning zone.`;
  }

  // Slight malignant-leaning pattern
  if (m > 0.55) {
    return `There is a mild tilt toward melanoma-like visual cues, but the overall picture is still somewhat mixed. This kind of case can be useful for practicing how to weigh borderline features.`;
  }

  // Ambiguous / balanced
  if (m >= 0.45 && m <= 0.55) {
    return `The pattern here is quite balanced, without a clear lean toward either benign or melanoma-like features. In teaching terms, this would be considered a genuinely uncertain example where clinical context and expert review are especially important.`;
  }

  // Slight benign-leaning pattern
  if (m >= 0.35) {
    return `The visual impression leans modestly toward benign-like features, though there are a few aspects that prevent a clearly reassuring pattern. This type of case is useful for exploring subtle warning signs.`;
  }

  // Clear benign-leaning pattern
  if (m >= 0.15) {
    return `Most of the cues here line up with patterns usually associated with benign lesions, with only limited elements that might raise concern. It’s a helpful example of a generally reassuring appearance with small points to double-check.`;
  }

  // Very strong benign-leaning pattern
  return `The lesion shows a pattern that strongly aligns with benign-appearing examples in educational materials, with few features that stand out as worrisome in this kind of visual analysis.`;
}
