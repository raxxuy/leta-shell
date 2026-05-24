import { Align } from "@/enums";
import { toggleWindow } from "@/lib/window";

export default function Settings() {
  return (
    <button
      class="bar-menubutton"
      onClicked={() => toggleWindow("settings")}
      valign={Align.CENTER}
    >
      <image iconName="settings-01" />
    </button>
  );
}
