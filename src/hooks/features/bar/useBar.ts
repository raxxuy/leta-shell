import clsx from "clsx/lite";
import { BarConfigContext } from "@/contexts/BarConfig";

export const useBar = () => {
  const {
    position,
    height,
    layout,
    clockFormat,
    workspaceCount,
    centerNotchMode,
    visualizerCount,
  } = BarConfigContext.use();

  const anchor = position[0]((p) => (p === "top" ? "top-full" : "bottom-full"));

  const containerClassName = position[0]((p) =>
    clsx(
      "bar-container",
      p === "top"
        ? "border-t-0 rounded-b-2xl"
        : "border-b-0 -mb-1 rounded-t-2xl",
    ),
  );

  return {
    position,
    height,
    layout,
    clockFormat,
    workspaceCount,
    centerNotchMode,
    visualizerCount,
    anchor,
    containerClassName,
  };
};
