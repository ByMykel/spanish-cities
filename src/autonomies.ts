import data from "./data";

interface AutonomyOptions {
  code?: string | number;
}
export interface Autonomy {
  code: string;
  name: string;
}

export const autonomies = (options: AutonomyOptions = {}): Autonomy[] => {
  const { code } = options;

  const filteredAutonomies = code !== undefined
    ? data.autonomies.filter((item) => item.code == code)
    : data.autonomies;

  return filteredAutonomies;
}
