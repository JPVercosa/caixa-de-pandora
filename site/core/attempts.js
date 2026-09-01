export function createAttemptController({ hints = [], onHint, onContact }) {
  let count = 0;
  return {
    get count() {
      return count;
    },
    wrong() {
      count += 1;
      if (count === 3) onHint?.(hints[0]);
      if (count === 7) onHint?.(hints[1]);
      if (count >= 12) onContact?.();
      return count;
    }
  };
}
