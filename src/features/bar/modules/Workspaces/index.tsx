import AstalHyprland from "gi://AstalHyprland";

import { With } from "ags";

import { Align } from "@/enums";
import { useHyprland } from "@/hooks/services/useHyprland";
import { cleanupWidget } from "@/lib/theme/plugin";
import { useTheme } from "@/providers/ThemeProvider";
import WorkspaceButton from "./WorkspaceButton";

export default function Workspaces() {
  const { spacing } = useTheme();
  const { focusedMonitor, indexedWorkspaces } = useHyprland();

  return (
    <box halign={Align.CENTER}>
      <With cleanup={cleanupWidget} value={focusedMonitor}>
        {(monitor) => (
          <box spacing={spacing.sm}>
            {indexedWorkspaces.map((workspace, index) => (
              <box>
                <With cleanup={cleanupWidget} value={workspace}>
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
    </box>
  );
}
