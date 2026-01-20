import { createBinding, With } from "ags";
import { EllipsizeMode } from "@/enums";
import Hyprland from "@/services/hyprland";

export default function Client() {
  const hyprland = Hyprland.get_default().astalHyprland;
  const client = createBinding(hyprland, "focusedClient");

  return (
    <box>
      <With value={client}>
        {(client) => {
          if (!client) return null;

          const title = createBinding(client, "title");

          return (
            <label
              class="font-bold text-sm"
              ellipsize={EllipsizeMode.END}
              label={title(String)}
              maxWidthChars={30}
              tooltipText={title(String)}
            />
          );
        }}
      </With>
    </box>
  );
}
