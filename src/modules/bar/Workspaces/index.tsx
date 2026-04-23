import AstalHyprland from "gi://AstalHyprland";
import { For } from "ags";
import { range } from "es-toolkit";
import { Align } from "@/enums";
import { useConfig } from "@/hooks/useConfig";
import { useSpacing } from "@/hooks/useSpacing";
import WorkspaceButton from "./WorkspaceButton";

export default function Workspaces() {
  const [count] = useConfig("bar", "settings.workspaces.count");
  const spacing = useSpacing();

  const workspaces = count((c) =>
    range(c).map((i) => AstalHyprland.Workspace.dummy(i + 1, null)),
  );

  return (
    <box
      class="rounded-lg bg-black px-3.5 shadow-lg"
      halign={Align.CENTER}
      spacing={spacing.sm}
    >
      <For each={workspaces}>
        {(workspace) => <WorkspaceButton workspace={workspace} />}
      </For>
    </box>
  );
}
