import AstalHyprland from "gi://AstalHyprland?version=0.1";
import { With } from "gnim";
import { useHyprland } from "@/hooks/useHyprland";
import { scan } from "@/lib/theme/plugin";
import WorkspaceButton from "./WorkspaceButton";

export default function Workspaces() {
  const { focusedMonitor, indexedWorkspaces } = useHyprland();

  return (
    <With value={focusedMonitor}>
      {(monitor) => (
        <box ref={scan} spacing={4}>
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
