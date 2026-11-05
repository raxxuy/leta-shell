import { getContext } from "gnim";
import { ThemeContext } from "@/providers/contexts";

export const useTheme = () => {
  const context = getContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
