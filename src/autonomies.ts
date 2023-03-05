import data from "./data/names/autonomies.json";
import geojson from "./data/geojson/autonomies/index";
import { optionsAutonomy, Autonomy, MultipleFeatures } from "./types/index";

export const autonomies = (options: optionsAutonomy = {}): Autonomy[] => {
  const { code, with_geojson } = options;

  const filtered = data.filter((item: Autonomy) => {
    if (code !== undefined && item.code != code) return false;
    return true;
  });

  return filtered.map((item: Autonomy) => {
    if (with_geojson === true) {
      item.geojson = (<MultipleFeatures>geojson)[item.code];
    }

    return item;
  });
}