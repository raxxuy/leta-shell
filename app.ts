import app from "ags/gtk4/app";
import style from "scss/index.scss";
import ConfigService from "@/services/config";
import BarWindow from "@/windows/Bar";

app.start({
  css: style,
  main() {
    ConfigService.get_default();
    app.monitors.forEach((mon) => {
      BarWindow(mon);
    });
  },
});
