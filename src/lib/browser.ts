import { exec } from "./process";

export const focusBrowser = () => {
  exec(
    [
      'BROWSER_CLASS=$(xdg-settings get default-web-browser | sed "s/\\.desktop$//")',
      'hyprctl dispatch "hl.dsp.focus({ window = \\"class:$BROWSER_CLASS\\" })"',
    ].join(" && "),
  );
}

export const openUrl = (url: string) => {
  exec(`xdg-open ${url}`);
  focusBrowser();
}
