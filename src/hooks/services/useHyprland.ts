import { range } from "es-toolkit";

import { createBindings } from "@/lib/binding";
import HyprlandService from "@/services/hyprland";

export const useHyprland = () => {
  const service = HyprlandService.get_default();

  const { workspaces } = createBindings(service, {
    workspaces: true,
  });

  const { focusedWorkspace, focusedMonitor } = createBindings(
    service.internal,
    {
      focusedWorkspace: true,
      focusedMonitor: true,
    },
  );

  const indexedWorkspaces = range(10).map((id) =>
    workspaces((ws) => (id in ws ? ws[id] : null)),
  );

  return { focusedWorkspace, focusedMonitor, workspaces, indexedWorkspaces };
};
