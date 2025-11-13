import type AstalApps from "gi://AstalApps";
import Pango from "gi://Pango";
import { Align, Orientation } from "@/enums";
import { toggleWindow } from "@/lib/utils/widget";

interface LauncherItemProps {
  app: AstalApps.Application;
}

export default function LauncherItem({ app }: LauncherItemProps) {
  return (
    <button
      class="launcher-item app-button"
      onClicked={() => {
        toggleWindow("launcher");
        app.launch();
      }}
      focusOnClick={false}
    >
      <box spacing={16}>
        <image pixelSize={24} iconName={app.iconName} />
        <box valign={Align.CENTER} orientation={Orientation.VERTICAL}>
          <label
            halign={Align.START}
            class={"app-name"}
            ellipsize={Pango.EllipsizeMode.END}
            label={app.name}
          />
          {app.description && (
            <label
              class={"app-description"}
              ellipsize={Pango.EllipsizeMode.END}
              label={app.description}
            />
          )}
        </box>
      </box>
    </button>
  );
}
