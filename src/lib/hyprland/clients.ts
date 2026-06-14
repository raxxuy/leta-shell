import type { Client } from "@/types/hyprland";
import { exec } from "../process";

export const getActiveWindow = async (): Promise<Client> => {
  const json = await exec("hyprctl activewindow -j");
  return JSON.parse(json) as Client;
};
