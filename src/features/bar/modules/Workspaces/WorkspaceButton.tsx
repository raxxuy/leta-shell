import type AstalHyprland from "gi://AstalHyprland";

import { createMemo } from "ags";

import { Cursors } from "@/constants";
import { Align } from "@/enums";
import { useHyprland } from "@/hooks/services/useHyprland";
import { focusWorkspace } from "@/lib/hyprland/dispatch";
import { scan } from "@/lib/theme/plugin";

interface WorkspaceButtonProps {
  id: number;
  workspace: AstalHyprland.Workspace;
}

const stateClasses = {
  focused: "bg-primary px-6 animate-workspace-focus",
  occupied: "bg-primary/60",
  empty: "bg-primary/20",
} as const;

export default function WorkspaceButton({
  id,
  workspace,
}: WorkspaceButtonProps) {
  const { focusedWorkspace } = useHyprland();

  const state = createMemo(() => {
    const isOccupied = workspace.clients.length > 0;
    const isFocused = focusedWorkspace().id === workspace.id;

    if (isFocused) return "focused";
    if (isOccupied) return "occupied";
    return "empty";
  });

  const workspaceClass = state(
    (s) =>
      `rounded-lg px-2 min-h-4 transition-[transform,color] origin-center ${stateClasses[s]} shadow-md`,
  );

  return (
    <button
      $={scan}
      cursor={Cursors.POINTER}
      focusable={false}
      onClicked={() => focusWorkspace(id)}
      valign={Align.CENTER}
    >
      <box class={workspaceClass} />
    </button>
  );
}
