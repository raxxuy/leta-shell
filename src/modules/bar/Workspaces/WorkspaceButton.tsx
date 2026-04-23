import type AstalHyprland from "gi://AstalHyprland";
import { createComputed } from "ags";
import clsx from "clsx/lite";
import { Cursor } from "@/constants";
import { Align } from "@/enums";
import { useWorkspaceState } from "@/hooks/useWorkspaceState";
import { loadClasses } from "@/lib/theme";

interface WorkspaceButtonProps {
  workspace: AstalHyprland.Workspace;
}

const workspaceStateClasses = {
  focused: "bg-(--primary) px-5 transform-[scaleY(1.3)]",
  occupied: "bg-zinc-100",
  empty: "bg-black outline outline-zinc-600",
} as const;

const workspaceStateCursors = {
  focused: Cursor.DEFAULT,
  occupied: Cursor.POINTER,
  empty: Cursor.POINTER,
} as const;

export default function WorkspaceButton({ workspace }: WorkspaceButtonProps) {
  const state = useWorkspaceState(workspace);

  const className = createComputed(() =>
    clsx(
      "rounded-lg px-2 min-h-4 transition-transform origin-center duration-500",
      workspaceStateClasses[state()],
    ),
  );

  const onWorkspaceClick = () => {
    if (state.peek() === "focused") return;
    workspace.focus();
  };

  return (
    <button
      $={loadClasses(WorkspaceButton)}
      class={className}
      cursor={state((s) => workspaceStateCursors[s])}
      focusable={false}
      onClicked={onWorkspaceClick}
      valign={Align.CENTER}
    />
  );
}
