import { createBinding } from "ags";
import HyprlandService from "@/services/hyprland";

export const useHyprland = () => {
  const hyprlandService = HyprlandService.get_default();

  return {
    hyprland: hyprlandService.astalHyprland,
    workspaceDummy: hyprlandService.workspaceDummy,
    changeWorkspace: (direction: number) => hyprlandService.changeWorkspace(direction),
    changeKeyboardLayout: () => hyprlandService.changeKeyboardLayout(),
    mainKeyboard: createBinding(hyprlandService, "mainKeyboard"),
  };
};
