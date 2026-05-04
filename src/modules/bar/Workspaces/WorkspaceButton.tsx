import type AstalHyprland from "gi://AstalHyprland";
import { Align } from "@/enums";
import useWorkspaceState from "@/hooks/features/workspaces/useWorkspaceState";
import { setup } from "@/lib/theme";

interface WorkspaceButtonProps {
  workspace: AstalHyprland.Workspace;
}

export default function WorkspaceButton({ workspace }: WorkspaceButtonProps) {
  const { state, className, cursor } = useWorkspaceState(workspace);

  const onWorkspaceClick = () => {
    if (state.peek() === "focused") return;
    workspace.focus();
  };

  return (
    <button
      $={setup}
      class={className}
      cursor={cursor}
      focusable={false}
      onClicked={onWorkspaceClick}
      valign={Align.CENTER}
    />
  );
}
