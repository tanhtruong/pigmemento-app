import { useRef, useCallback } from "react";
import { AppState } from "react-native";

export function useAnswerTimer() {
  const startRef = useRef<number | null>(null);
  const pausedAtRef = useRef<number | null>(null);
  const accumulatedRef = useRef(0);

  // Prefer performance.now() (monotonic) if available; fallback to Date.now()
  const now = () =>
    (global as any).performance?.now
      ? (global as any).performance.now()
      : Date.now();

  const start = useCallback(() => {
    if (startRef.current !== null) return; // already running
    startRef.current = now();

    // Optional: pause/resume on app background/foreground
    const sub = AppState.addEventListener("change", (state) => {
      if (state === "background" || state === "inactive") {
        if (startRef.current !== null && pausedAtRef.current === null) {
          pausedAtRef.current = now();
        }
      } else if (state === "active") {
        if (pausedAtRef.current !== null) {
          accumulatedRef.current += now() - pausedAtRef.current;
          pausedAtRef.current = null;
        }
      }
    });

    // Store subscriber so caller can remove on stop
    (start as any)._sub = sub;
  }, []);

  const stop = useCallback(() => {
    if (startRef.current === null) return 0;
    const end = now();

    // If paused, include the paused segment into accumulated and clear
    if (pausedAtRef.current !== null) {
      accumulatedRef.current += end - pausedAtRef.current;
      pausedAtRef.current = null;
    }

    const elapsed = end - startRef.current - accumulatedRef.current;

    // cleanup
    (start as any)._sub?.remove?.();
    startRef.current = null;
    accumulatedRef.current = 0;

    // Clamp to sane bounds (0..10 min)
    return Math.max(0, Math.min(Math.round(elapsed), 10 * 60 * 1000));
  }, []);

  const reset = useCallback(() => {
    (start as any)._sub?.remove?.();
    startRef.current = null;
    pausedAtRef.current = null;
    accumulatedRef.current = 0;
  }, []);

  return { start, stop, reset };
}
