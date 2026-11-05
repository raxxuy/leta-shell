import type AstalHyprland from "gi://AstalHyprland?version=0.1";
import { computed } from "gnim";
import { Cursors } from "@/constants";
import { Align } from "@/enums";
import { useHyprland } from "@/hooks/useHyprland";
import { focusWorkspace } from "@/lib/hyprland/dispatch";

const stateClasses = {
  focused: "min-w-6 bg-zinc-400",
  occupied: "min-w-2 bg-zinc-400/60",
  empty: "min-w-2 bg-zinc-400/25",
} as const;

interface WorkspaceButtonProps {
  id: number;
  workspace: AstalHyprland.Workspace;
}

export default function WorkspaceButton({
  id,
  workspace,
}: WorkspaceButtonProps) {
  const { focusedWorkspace, clients } = useHyprland();

  const state = computed(() => {
    const isFocused = focusedWorkspace()?.id === workspace.id;
    if (isFocused) return "focused";

    const isOccupied = clients().some(
      (client) => client.workspace?.id === workspace.id,
    );
    if (isOccupied) return "occupied";

    return "empty";
  });

  const workspaceClass = state.as(
    (s) =>
      `min-h-1 rounded-full transition-[min-width,background-color] ${stateClasses[s]}`,
  );

  return (
    <button
      cursor={Cursors.POINTER}
      focusable={false}
      onClicked={() => focusWorkspace(id)}
      valign={Align.CENTER}
    >
      <box class={workspaceClass} />
    </button>
  );
}
