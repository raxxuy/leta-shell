import { LauncherContext } from "@/contexts/LauncherContext";

export const useLauncherItem = (index: number) => {
  const { results } = LauncherContext.use();

  const result = results((r) => r[index]);
  const visible = result((r) => !!r);
  const icon = result((r) => r?.icon ?? "");
  const label = result((r) => r?.label ?? "");
  const description = result((r) => r?.description ?? "");
  const hasDescription = result((r) => !!r?.description);

  const activate = () => result.peek()?.activate();

  return {
    result,
    visible,
    icon,
    label,
    description,
    hasDescription,
    activate,
  };
};
