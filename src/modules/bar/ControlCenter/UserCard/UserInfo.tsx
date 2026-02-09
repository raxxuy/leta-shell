import { HOST_NAME, USER_NAME } from "@/constants";
import { Align, Orientation } from "@/enums";
import { useGlobalConfig } from "@/hooks/useConfig";
import { useUptime } from "@/hooks/useUptime";
import Usage from "./Usage";

export default function UserInfo() {
  const { spacing } = useGlobalConfig();
  const uptime = useUptime();

  return (
    <box
      class="py-2"
      orientation={Orientation.VERTICAL}
      spacing={spacing("medium")}
    >
      <box orientation={Orientation.VERTICAL} spacing={spacing("small")}>
        <label
          class="font-bold text-lg"
          halign={Align.START}
          label={USER_NAME}
          tooltipText={`${USER_NAME}@${HOST_NAME}`}
        />
        <label
          class="font-medium text-outline text-sm"
          halign={Align.START}
          label={uptime}
        />
      </box>
      <Usage />
    </box>
  );
}
