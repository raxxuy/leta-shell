import AstalHyprland from "gi://AstalHyprland?version=0.1";
import { With } from "gnim";
import { useHyprland } from "@/hooks/useHyprland";
import { useTheme } from "@/hooks/useTheme";
import WorkspaceButton from "./WorkspaceButton";

export default function Workspaces() {
  const { spacing } = useTheme();
  const { focusedMonitor, indexedWorkspaces } = useHyprland();

  return (
    <With value={focusedMonitor}>
      {(monitor) => (
        <box spacing={spacing.sm}>
          {indexedWorkspaces.map((workspace, index) => (
            <box>
              <With value={workspace}>
                {(workspace) => (
                  <WorkspaceButton
                    id={index + 1}
                    workspace={
                      workspace ??
                      AstalHyprland.Workspace.dummy(index + 1, monitor)
                    }
                  />
                )}
              </With>
            </box>
          ))}
        </box>
      )}
    </With>
  );
}
