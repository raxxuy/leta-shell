import type AstalHyprland from "gi://AstalHyprland";
import { Align } from "@/enums";
import useWorkspaceState from "@/hooks/features/workspaces/useWorkspaceState";
import { exec } from "@/lib/process";
import { scan } from "@/lib/theme";

interface WorkspaceButtonProps {
  workspace: AstalHyprland.Workspace;
}

export default function WorkspaceButton({ workspace }: WorkspaceButtonProps) {
  const { state, className, cursor } = useWorkspaceState(workspace);

  const onWorkspaceClick = () => {
    if (state.peek() === "focused") return;
    exec(`hyprctl dispatch 'hl.dsp.focus({ workspace = ${workspace.id} })'`);
  };

  return (
    <button
      $={scan}
      class={className}
      cursor={cursor}
      focusable={false}
      onClicked={onWorkspaceClick}
      valign={Align.CENTER}
    />
  );
}
