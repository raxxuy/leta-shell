import Adw from "gi://Adw";
import { createState, For } from "ags";
import { Gtk } from "ags/gtk4";
import { timeout } from "ags/time";
import { range } from "es-toolkit/math";
import { Align, EventControllerScrollFlags, Orientation } from "@/enums";
import { useBarConfig, useGlobalConfig } from "@/hooks/useConfig";
import { useHyprland } from "@/hooks/useHyprland";
import WorkspaceButton from "./WorkspaceButton";

export default function Workspaces() {
  const {
    modules: { workspaces },
  } = useBarConfig();
  const { spacing } = useGlobalConfig();
  const { changeWorkspace, workspaceDummy } = useHyprland();

  const [isScrolling, setIsScrolling] = createState<boolean>(false);

  const ws = workspaces((ws) =>
    range(ws.count).map((_, i) => workspaceDummy(i + 1, null)),
  );

  const handleScroll = (direction: number) => {
    const delta = Math.sign(direction);
    if (!delta || isScrolling.peek()) return;

    setIsScrolling(true);
    changeWorkspace(delta);

    timeout(200, () => {
      setIsScrolling(false);
    });
  };

  return (
    <Adw.Clamp maximumSize={16} orientation={Orientation.VERTICAL}>
      <Gtk.EventControllerScroll
        flags={EventControllerScrollFlags.VERTICAL}
        onScroll={(_, __, direction) => handleScroll(direction)}
      />
      <box halign={Align.CENTER} spacing={spacing("small")}>
        <For each={ws}>
          {(workspace) => <WorkspaceButton workspace={workspace} />}
        </For>
      </box>
    </Adw.Clamp>
  );
}
