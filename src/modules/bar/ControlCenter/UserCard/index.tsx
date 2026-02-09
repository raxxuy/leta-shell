import { useGlobalConfig } from "@/hooks/useConfig";
import UserAvatar from "./UserAvatar";
import UserInfo from "./UserInfo";

export default function UserCard() {
  const { spacing } = useGlobalConfig();

  return (
    <box
      class="rounded-xl border border-outline/20 bg-background p-2.5"
      spacing={spacing("medium")}
    >
      <UserAvatar />
      <UserInfo />
    </box>
  );
}
