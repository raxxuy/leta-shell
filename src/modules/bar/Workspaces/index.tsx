import { For } from "ags";
import { Align } from "@/enums";
import useSpacing from "@/hooks/core/useSpacing";
import useWorkspaces from "@/hooks/features/workspaces/useWorkspaces";
import WorkspaceButton from "./WorkspaceButton";

export default function Workspaces() {
  const spacing = useSpacing();
  const workspaces = useWorkspaces();

  return (
    <box halign={Align.CENTER} spacing={spacing.sm}>
      <For each={workspaces}>
        {(workspace) => <WorkspaceButton workspace={workspace} />}
      </For>
    </box>
  );
}
