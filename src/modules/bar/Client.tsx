import { createBinding, With } from "ags";
import { EllipsizeMode } from "@/enums";
import HyprlandService from "@/services/hyprland";

export default function Client() {
  const hyprland = HyprlandService.get_default().astalHyprland;
  const client = createBinding(hyprland, "focusedClient");

  return (
    <box>
      <With value={client}>
        {(client) => {
          if (!client) return null;

          const title = createBinding(client, "title")(String);

          return (
            <label
              class="font-bold text-sm"
              ellipsize={EllipsizeMode.END}
              label={title}
              maxWidthChars={30}
              tooltipText={title}
            />
          );
        }}
      </With>
    </box>
  );
}
