import { createBinding } from "ags";
import ConfigService from "@/services/config";

export const useUser = () => {
  const configService = ConfigService.get_default();

  return {
    setAvatar: (path: string) => configService.setAvatar(path),
    avatar: createBinding(configService, "avatar"),
  };
};
