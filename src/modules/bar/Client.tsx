import { createBinding, With } from "ags";
import { EllipsizeMode } from "@/enums";
import { useHyprland } from "@/hooks/useHyprland";

export default function Client() {
  const { hyprland } = useHyprland();
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
