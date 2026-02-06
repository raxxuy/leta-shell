import { STATES } from "@/constants/styles";
import { generateAnimation } from "./animation";
import { generateBorder } from "./border";
import { generateColor } from "./color";
import { generateFilter } from "./filter";
import { generateOpacity } from "./opacity";
import { generateOutline } from "./outline";
import { generateRounded } from "./rounded";
import { generateShadow } from "./shadow";
import { generateSpacing } from "./spacing";
import { generateTransition } from "./transition";
import { generateTypography } from "./typography";

type UtilityMap = Record<string, string[]>;

const utilities: UtilityMap = {};

const parseState = (className: string): [string, string] => {
  for (const state of STATES.slice(1)) {
    if (className.startsWith(`${state}:`)) {
      return [state, className.slice(state.length + 1)];
    }
  }
  return ["", className];
};

const generateUtility = (className: string): string[] | null => {
  const [_, cls] = parseState(className);

  const generators = [
    generateSpacing,
    generateRounded,
    generateBorder,
    generateTypography,
    generateColor,
    generateOutline,
    generateOpacity,
    generateFilter,
    generateShadow,
    generateAnimation,
    generateTransition,
  ];

  for (const generator of generators) {
    const result = generator(cls);
    if (result) return result;
  }

  return null;
};

export const generateUtilityClasses = (): UtilityMap => {
  return utilities;
};

export const getUtility = (className: string): string[] | null => {
  if (utilities[className]) {
    return utilities[className];
  }

  const generated = generateUtility(className);

  if (generated) {
    utilities[className] = generated;
    return generated;
  }

  return null;
};
