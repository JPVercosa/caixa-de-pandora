export function createAttemptController({ hints = [], initialCount = 0, onHint, onContact, onChange }) {
  let count = initialCount;
  return {
    get count() {
      return count;
    },
    wrong() {
      count += 1;
      onChange?.(count);
      if (count === 3) onHint?.(hints[0]);
      if (count === 7) onHint?.(hints[1]);
      if (count >= 12) onContact?.();
      return count;
    }
  };
}
