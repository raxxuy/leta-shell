import { createBinding } from "ags";
import MprisService from "@/services/mpris";

export const useActivePlayer = () => {
  const mprisService = MprisService.get_default();
  return createBinding(mprisService, "active");
};
