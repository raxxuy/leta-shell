import app from "ags/gtk4/app";

export const toggleWindow = (windowName: string): void => {
  const window = app.get_window(windowName);

  if (!window) {
    console.warn(`Window "${windowName}" not found`);
    return;
  }

  window.visible ? window.hide() : window.show();
};
