import { exec } from "./process";

export const shutdown = () => exec("systemctl poweroff");
export const reboot = () => exec("systemctl reboot");
export const logout = () => exec("loginctl terminate-user $USER");
export const suspend = () => exec("systemctl suspend");
export const lock = () => exec("loginctl lock-session");
