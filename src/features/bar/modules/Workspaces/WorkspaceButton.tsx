import type AstalHyprland from "gi://AstalHyprland?version=0.1";
import { computed, createAccessor } from "gnim";
import { Cursors } from "@/constants";
import { Align } from "@/enums";
import { useHyprland } from "@/hooks/useHyprland";
import { focusWorkspace } from "@/lib/hyprland/dispatch";
import { scan } from "@/lib/theme/plugin";

interface WorkspaceButtonProps {
  id: number;
  workspace: AstalHyprland.Workspace;
}

const stateClasses = {
  focused: "min-w-6 bg-zinc-900",
  occupied: "min-w-2 bg-zinc-900/60",
  empty: "min-w-2 bg-zinc-900/25",
} as const;

export default function WorkspaceButton({
  id,
  workspace,
}: WorkspaceButtonProps) {
  const { focusedWorkspace } = useHyprland();

  const occupied = createAccessor(
    () => workspace.get_clients().length > 0,
    (notify) => {
      const handler = workspace.connect("notify::clients", notify);
      return () => workspace.disconnect(handler);
    },
  );

  const state = computed(() => {
    const isOccupied = occupied();
    const isFocused = focusedWorkspace().id === workspace.id;

    if (isFocused) return "focused";
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
      ref={scan}
      tooltipText={`Workspace ${id}`}
      valign={Align.CENTER}
    >
      <box class={workspaceClass} />
    </button>
  );
}
