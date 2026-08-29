/**
 * Normalises a code filter to the stored, zero-padded form.
 *
 * Codes are compared loosely elsewhere, so both `9` and `"9"` match a stored
 * `"09"`. An index lookup needs an exact key, so numeric input is re-padded to
 * the stored width. Non-numeric input is passed through and simply misses.
 */
export const normalizeCode = (
  value: string | number,
  width: number
): string => {
  const raw = String(value);

  return /^\d+$/.test(raw) ? String(Number(raw)).padStart(width, "0") : raw;
};

/**
 * Groups row positions by key, building the map on first use.
 *
 * Positions rather than rows, so the caller can keep using them to reach into
 * parallel structures such as the name index.
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
