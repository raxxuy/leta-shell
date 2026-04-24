import AstalHyprland from "gi://AstalHyprland";
import { For } from "ags";
import { range } from "es-toolkit";
import { Align } from "@/enums";
import { useConfig } from "@/hooks/services/config/useConfig";
import { useSpacing } from "@/hooks/services/config/useSpacing";
import WorkspaceButton from "./WorkspaceButton";

export default function Workspaces() {
  const [count] = useConfig("bar", "settings.workspaces.count");
  const spacing = useSpacing();

  const workspaces = count((c) =>
    range(c).map((i) => AstalHyprland.Workspace.dummy(i + 1, null)),
  );

  return (
    <box halign={Align.CENTER} spacing={spacing.sm}>
      <For each={workspaces}>
        {(workspace) => <WorkspaceButton workspace={workspace} />}
      </For>
    </box>
  );
}
