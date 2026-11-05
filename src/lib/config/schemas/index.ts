import { ThemeSchema } from "./theme";

export const configs = {
  theme: ThemeSchema.prefault({}),
};

export { ThemeSchema, themeDefaults } from "./theme";
