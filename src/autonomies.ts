import data from "./data";

interface optionsAutonomy {
  code?: string | number;
}
export interface Autonomy {
  code: string;
  name: string;
}

export const autonomies = (options: optionsAutonomy = {}): Autonomy[] => {
  const { code } = options;

  const filteredAutonomies = code !== undefined
    ? data.autonomies.filter((item) => item.code == code)
    : data.autonomies;

  return filteredAutonomies;
}
