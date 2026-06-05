import AstalHyprland from "gi://AstalHyprland";
import { createBinding, createMemo } from "ags";
import clsx from "clsx/lite";
import { Cursor } from "@/constants";

const stateClasses = {
  focused: "bg-primary px-5 scale-y-130",
  occupied: "bg-primary/60",
  empty: "bg-primary/20",
} as const;

const stateCursors = {
  focused: Cursor.DEFAULT,
  occupied: Cursor.POINTER,
  empty: Cursor.POINTER,
} as const;

export default function useWorkspaceState(workspace: AstalHyprland.Workspace) {
  const hypr = AstalHyprland.get_default();

  const clients = createBinding(workspace, "clients");
  const focused = createBinding(hypr, "focusedWorkspace");

  const state = createMemo(() => {
    clients(); // track client changes to recompute state

    const isOccupied = hypr.get_workspace(workspace.id)?.clients.length > 0;
    const isFocused = focused()?.id === workspace.id;

    if (isFocused) return "focused";
    if (isOccupied) return "occupied";
    return "empty";
  });

  const className = createMemo(() =>
    clsx(
      "transform-cpu rounded-lg px-2 min-h-4 transition-[transform,color] ease-[cubic-bezier(0.34,1.56,0.64,1)] origin-center duration-300",
      stateClasses[state()],
    ),
  );

  const cursor = state((s) => stateCursors[s]);

  return { state, className, cursor };
}
