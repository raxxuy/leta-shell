import { createState } from "ags";
import clsx from "clsx/lite";

export type Category = "bar" | "global" | "launcher" | "wallpaper";

const categories: Category[] = ["bar", "global", "launcher", "wallpaper"];

const [active, setActive] = createState<Category>("bar");

const baseClass =
  "rounded-lg px-3 py-1.5 font-medium transition-colors text-base";
const activeClass =
  "bg-primary/15 text-primary hover:bg-primary/20 active:bg-primary/25";
const inactiveClass =
  "text-white/50 hover:text-white/80 hover:bg-white/5 active:bg-white/8";

export default function useSettingsCategory() {
  const getCategoryClass = (category: Category) =>
    active((a) =>
      clsx(baseClass, a === category ? activeClass : inactiveClass),
    );

  return { active, categories, setActive, getCategoryClass };
}
