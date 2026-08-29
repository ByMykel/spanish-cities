/**
 * An index lookup needs an exact key, but codes are compared loosely, so a
 * numeric `9` has to reach the stored `"09"`. Non-numeric input passes through
 * and simply misses.
 */
export const normalizeCode = (
  value: string | number,
  width: number
): string => {
  const raw = String(value);

  return /^\d+$/.test(raw) ? String(Number(raw)).padStart(width, "0") : raw;
};

/**
 * Groups row positions by key, building the map on first use. Positions rather
 * than rows, so callers can index into the parallel name index too.
 */
export const createIndex = <T>(rows: T[], key: (row: T) => string) => {
  let index: Map<string, number[]> | null = null;

  return (value: string): number[] => {
    if (index === null) {
      index = new Map();

      for (let position = 0; position < rows.length; position += 1) {
        const found = index.get(key(rows[position]));

        if (found) {
          found.push(position);
        } else {
          index.set(key(rows[position]), [position]);
        }
      }
    }

    return index.get(value) ?? [];
  };
};
