import data from "./data/names/autonomies.json";
import { optionsAutonomy, Autonomy } from "./types/index";

/**
 * Returns an array of autonomies that match the specified filter criteria.
 * @param options (optional) An object with options.
 * @param options.code A string or number representing the code of the autonomy to filter by.
 * @param options.name A string representing the name of the autonomy to filter by.
 */
export const autonomies = (options: optionsAutonomy = {}): Autonomy[] => {
  const { code, name } = options;

  return data.filter((item: Autonomy) => {
    if (code !== undefined && item.code != code) return false;

    if (name !== undefined && !item.name.toLocaleLowerCase().includes(name.toLocaleLowerCase())) {
      return false;
    }

    return true;
  });
}