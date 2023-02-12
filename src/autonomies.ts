import data from "./data";
import { optionsAutonomy, Autonomy } from "./types";

export const autonomies = (options: optionsAutonomy = {}): Autonomy[] => {
  const { code } = options;

  const filteredAutonomies = code !== undefined
    ? data.autonomies.filter((item) => item.code == code)
    : data.autonomies;

  return filteredAutonomies;
}
