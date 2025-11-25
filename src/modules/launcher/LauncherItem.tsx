import type AstalApps from "gi://AstalApps";
import Pango from "gi://Pango";
import { createState } from "ags";
import { timeout } from "ags/time";
import { Align, Orientation, RevealerTransitionType } from "@/enums";
import { configs } from "@/lib/config";
import { toggleWindow } from "@/lib/utils/widget";

interface LauncherItemProps {
  app: AstalApps.Application;
  delay?: number;
}

const {
  spacing,
  icon: { pixelSize },
} = configs.launcher.content.list.item;

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
        focusOnClick={false}
        onClicked={() => {
          toggleWindow("launcher");
          app.launch();
        }}
      >
        <box spacing={spacing}>
          <image pixelSize={pixelSize} iconName={app.iconName} />
          <box valign={Align.CENTER} orientation={Orientation.VERTICAL}>
            <label
              class={"app-name"}
              label={app.name}
              halign={Align.START}
              ellipsize={Pango.EllipsizeMode.END}
            />
            {app.description && (
              <label
                class={"app-description"}
                label={app.description}
                ellipsize={Pango.EllipsizeMode.END}
              />
            )}
          </box>
        </box>
      </button>
    </revealer>
  );
}
