import Adw from "gi://Adw";
import AstalHyprland from "gi://AstalHyprland";
import { createBinding, createComputed } from "ags";
import { CURSORS } from "@/constants";
import { Orientation } from "@/enums";
import { configs } from "@/lib/config";

const { count, spacing } = configs.bar.modules.workspaces;

const WorkspaceButton = ({
  workspace,
}: {
  workspace: AstalHyprland.Workspace;
}) => {
  const hyprland = AstalHyprland.get_default();
  const focusedWorkspace = createBinding(hyprland, "focusedWorkspace");
  const clients = createBinding(hyprland, "clients");

  const classNames = createComputed([focusedWorkspace, clients], (focused) => {
    const classes = ["workspace-button"];

    if (focused.id === workspace.id) {
      classes.push("active");
    }

    if (hyprland.get_workspace(workspace.id)?.clients.length > 0) {
      classes.push("occupied");
    }

    return classes;
  });

  return (
    <button
      cssClasses={classNames}
      cursor={CURSORS.pointer}
      onClicked={() => workspace.focus()}
    />
  );
};

export default function Workspaces() {
  const workspaces = Array.from({ length: count }, (_, i) =>
    AstalHyprland.Workspace.dummy(i + 1, null),
  );

  return (
    <Adw.Clamp maximumSize={16} orientation={Orientation.VERTICAL}>
      <box class="workspaces" spacing={spacing}>
        {workspaces.map((workspace) => (
          <WorkspaceButton workspace={workspace} />
        ))}
      </box>
    </Adw.Clamp>
  );
}
