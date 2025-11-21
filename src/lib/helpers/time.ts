export const formatMsSmart = (ms: number): string => {
  if (ms < 100) {
    return `${ms} ms`;
  }

  if (ms < 1000) {
    const fractional = (ms / 1000).toFixed(1); // e.g. 0.4
    return `${fractional} seconds`;
  }

  // 1 second and above
  const totalSeconds = Math.floor(ms / 1000);

  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const parts: string[] = [];

  if (days > 0) parts.push(`${days} day${days === 1 ? '' : 's'}`);
  if (hours > 0) parts.push(`${hours} hour${hours === 1 ? '' : 's'}`);
  if (minutes > 0) parts.push(`${minutes} minute${minutes === 1 ? '' : 's'}`);

  // Always show seconds unless it's exactly 0 AND we have larger units
  if (seconds > 0 || parts.length === 0) {
    parts.push(`${seconds} second${seconds === 1 ? '' : 's'}`);
  }

  return parts.join(' ');
};
