import type AstalApps from "gi://AstalApps";
import Pango from "gi://Pango";
import { createState } from "ags";
import { timeout } from "ags/time";
import { Align, Orientation, RevealerTransitionType } from "@/enums";
import { toggleWindow } from "@/lib/utils/widget";

interface LauncherItemProps {
  app: AstalApps.Application;
  delay?: number;
}

export default function LauncherItem({ app, delay = 0 }: LauncherItemProps) {
  const [revealed, setRevealed] = createState<boolean>(false);

  timeout(0, () => setRevealed(true));

  return (
    <revealer
      revealChild={revealed}
      transitionDuration={delay}
      transitionType={RevealerTransitionType.SLIDE_UP}
    >
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
    </revealer>
  );
}
