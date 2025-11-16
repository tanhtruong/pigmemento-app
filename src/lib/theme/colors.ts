// Dark Mode
export const colors = {
  // --- Base backgrounds ---
  background: '#0B1220' as const, // app background
  surface: '#111827' as const, // cards, modals, elevated blocks
  surfaceAlt: '#0F172A' as const, // subtle alt surface for differentiation
  border: '#1E293B' as const,

  // --- Text ---
  textPrimary: '#E5E7EB' as const, // main text
  textSecondary: '#94A3B8' as const, // muted labels, subtext
  textDisabled: '#64748B' as const, // lower contrast / inactive

  // --- Accent (Cyan family) ---
  accent: '#38BDF8' as const, // primary accent (links, highlights, icons)
  accentSoft: '#0E2133' as const, // background tint for accent highlights
  accentForeground: '#0B1220' as const,

  // --- Status / feedback ---
  success: '#22C55E' as const,
  warning: '#F59E0B' as const,
  danger: '#F43F5E' as const,

  // --- Inputs & UI ---
  inputBackground: '#111827' as const,
  inputBorder: '#1E293B' as const,
  focusRing: '#38BDF8' as const,

  // --- Brand / extras ---
  purpleAccent: '#A78BFA' as const, // optional secondary accent for variety
  overlay: 'rgba(0,0,0,0.5)', // for modals, Grad-CAM overlay bg
};

// Light Mode
export const lightColors = {
  background: '#F9FAFB' as const,
  surface: '#FFFFFF' as const,
  surfaceAlt: '#F1F5F9' as const,
  border: '#E2E8F0' as const,

  textPrimary: '#0F172A' as const,
  textSecondary: '#475569' as const,
  textDisabled: '#94A3B8' as const,

  accent: '#06B6D4' as const,
  accentSoft: '#E0F7FA' as const,
  accentForeground: '#083344' as const,

  success: '#16A34A' as const,
  warning: '#F59E0B' as const,
  danger: '#DC2626' as const,

  inputBackground: '#FFFFFF' as const,
  inputBorder: '#CBD5E1' as const,
  focusRing: '#06B6D4' as const,

  // --- Brand / extras ---
  purpleAccent: '#8B5CF6' as const,
  overlay: 'rgba(0,0,0,0.25)',
};
