import { computed } from "gnim";
import { Cursors } from "@/constants";
import { Align } from "@/enums";
import { useHyprland } from "@/hooks/useHyprland";
import { focusWorkspace } from "@/lib/hyprland/dispatch";

const stateClasses = {
  focused: "min-w-8 bg-zinc-400",
  occupied: "min-w-2 bg-zinc-400/60",
  empty: "min-w-2 bg-zinc-400/25",
} as const;

interface WorkspaceButtonProps {
  id: number;
}

export default function WorkspaceButton({ id }: WorkspaceButtonProps) {
  const { focusedWorkspace, clients } = useHyprland();

  const state = computed(() => {
    if (focusedWorkspace()?.id === id) return "focused";

    if (clients().some((client) => client.workspace?.id === id)) {
      return "occupied";
    }

    return "empty";
  });

  const workspaceClass = state.as(
    (s) =>
      `min-h-2 rounded-full transition-[min-width,background-color] ${stateClasses[s]}`,
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
