import GLib from "gi://GLib?version=2.0";
import { programArgs, programInvocationName } from "system";
import { App } from "./App";

const { gettext: t } = App.gettext;

GLib.set_prgname("leta-shell");
GLib.set_application_name(t("Gnim Demo Layer Shell App"));
GLib.setenv("LD_PRELOAD", "", true);

const app = new App();
app.runAsync([programInvocationName, ...programArgs]).catch(console.error);
