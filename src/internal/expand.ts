import { PLACEHOLDER_COAT, PLACEHOLDER_FLAG, WIKIMEDIA_PREFIX } from "./constants";

export interface Images {
  flag: string;
  coat_of_arms: string;
  has_flag: boolean;
  has_coat_of_arms: boolean;
}

/**
 * Expands the two image columns of a data row.
 *
 * The data files store the Wikimedia Commons path, or null when no image is
 * known. Missing images fall back to a placeholder URL so callers can always
 * use the value directly, with `has_flag` / `has_coat_of_arms` telling the
 * two cases apart.
 */
export const expandImages = (
  flag: string | null,
  coat_of_arms: string | null
): Images => ({
  flag: flag ? WIKIMEDIA_PREFIX + flag : PLACEHOLDER_FLAG,
  coat_of_arms: coat_of_arms ? WIKIMEDIA_PREFIX + coat_of_arms : PLACEHOLDER_COAT,
  has_flag: Boolean(flag),
  has_coat_of_arms: Boolean(coat_of_arms),
});

/** Loose code comparison, so both `"09"` and `9` match a code of `"09"`. */
export const matchesCode = (
  value: string,
  filter: string | number | undefined
): boolean => filter === undefined || value == filter;

/** Case-insensitive substring match. */
export const matchesName = (
  value: string,
  filter: string | undefined
): boolean =>
  filter === undefined ||
  value.toLocaleLowerCase().includes(filter.toLocaleLowerCase());
