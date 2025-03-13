import { background } from "./background";
import { foreground } from "./foreground";

function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

export function getRandomCombination() {
  return {
    background: getRandomElement(Object.keys(background)),
    foreground: getRandomElement(Object.keys(foreground))
  };
}
