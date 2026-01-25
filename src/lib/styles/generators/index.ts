import { STATES } from "@/lib/styles/constants";
import { generateAnimation } from "@/lib/styles/generators/animation";
import { generateBorder } from "@/lib/styles/generators/border";
import { generateColor } from "@/lib/styles/generators/color";
import { generateFilter } from "@/lib/styles/generators/filter";
import { generateOpacity } from "@/lib/styles/generators/opacity";
import { generateRounded } from "@/lib/styles/generators/rounded";
import { generateShadow } from "@/lib/styles/generators/shadow";
import { generateSpacing } from "@/lib/styles/generators/spacing";
import { generateTransition } from "@/lib/styles/generators/transition";
import { generateTypography } from "@/lib/styles/generators/typography";

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
    generateColor,
    generateRounded,
    generateTypography,
    generateOpacity,
    generateBorder,
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
