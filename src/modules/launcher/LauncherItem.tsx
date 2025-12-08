import type AstalApps from "gi://AstalApps";
import { createState } from "ags";
import { timeout } from "ags/time";
import {
  Align,
  EllipsizeMode,
  Orientation,
  RevealerTransitionType,
} from "@/enums";
import { configs } from "@/lib/config";
import { toggleWindow } from "@/lib/utils";

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

  const handleClick = () => {
    toggleWindow("launcher");
    app.launch();
  };

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
        onClicked={handleClick}
      >
        <box spacing={spacing}>
          <image pixelSize={pixelSize} iconName={app.iconName} />
          <box valign={Align.CENTER} orientation={Orientation.VERTICAL}>
            <label
              class={"app-name"}
              label={app.name}
              halign={Align.START}
              ellipsize={EllipsizeMode.END}
            />
            {app.description && (
              <label
                class={"app-description"}
                label={app.description}
                ellipsize={EllipsizeMode.END}
              />
            )}
          </box>
        </box>
      </button>
    </revealer>
  );
}
