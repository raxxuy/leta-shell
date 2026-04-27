import AstalHyprland from "gi://AstalHyprland";
import { createBinding, createComputed } from "ags";
import clsx from "clsx/lite";
import { Cursor } from "@/constants";

const stateClasses = {
  focused: "bg-(--primary) px-5 transform-[scaleY(1.3)]",
  occupied: "bg-(--primary)/60",
  empty: "bg-(--primary)/20",
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

  const state = createComputed(() => {
    clients(); // track client changes to recompute state

    const isOccupied = hypr.get_workspace(workspace.id)?.clients.length > 0;
    const isFocused = focused()?.id === workspace.id;

    if (isFocused) return "focused";
    if (isOccupied) return "occupied";
    return "empty";
  });

  const className = createComputed(() =>
    clsx(
      "rounded-lg px-2 min-h-4 transition-transform origin-center duration-500",
      stateClasses[state()],
    ),
  );

  const cursor = state((s) => stateCursors[s]);

  return { state, className, cursor };
}
