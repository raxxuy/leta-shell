import AstalHyprland from "gi://AstalHyprland";
import GLib from "gi://GLib";
import type GObject from "ags/gobject";
import { getter, register } from "ags/gobject";
import { subprocess } from "ags/process";
import { exec } from "@/lib/utils";
import Service from "@/services/base";
import type { Keyboard } from "@/types/hyprland";

interface HyprlandSignals extends GObject.Object.SignalSignatures {}

@register({ GTypeName: "Hyprland" })
export default class Hyprland extends Service<HyprlandSignals> {
  private static instance: Hyprland;
  #mainKeyboard: Keyboard = {} as Keyboard;
  #astalHyprland: AstalHyprland.Hyprland = AstalHyprland.get_default();

  static get_default() {
    if (!Hyprland.instance) Hyprland.instance = new Hyprland();
    return Hyprland.instance;
  }

  @getter(AstalHyprland.Hyprland)
  get astalHyprland() {
    return this.#astalHyprland;
  }

  @getter(Object)
  get mainKeyboard() {
    return this.#mainKeyboard;
  }

  workspaceDummy(
    id: number,
    monitor: AstalHyprland.Monitor | null | undefined,
  ) {
    return AstalHyprland.Workspace.dummy(id, monitor);
  }

  changeWorkspace(direction: number) {
    this.#astalHyprland.dispatch("workspace", direction < 0 ? "-1" : "+1");
  }

  changeKeyboardLayout() {
    exec(["hyprctl", "switchxkblayout", this.#mainKeyboard.name, "next"]);
  }

  async #startSocketListener() {
    const signature = GLib.getenv("HYPRLAND_INSTANCE_SIGNATURE");
    const runtimeDir = GLib.get_user_runtime_dir();
    const socketPath = `${runtimeDir}/hypr/${signature}/.socket2.sock`;

    subprocess(["nc", "-U", socketPath], async (out) => {
      const [event, data] = out.split(">>");

      if (event === "activelayout") {
        const [keyboardName] = data.split(",");

        if (keyboardName === this.#mainKeyboard.name) {
          await this.#updateMainKeyboard(keyboardName);
        }
      }
    });
  }

  async #updateMainKeyboard(keyboardName: string) {
    try {
      const devices = JSON.parse(await exec(["hyprctl", "devices", "-j"]));
      const keyboard = devices.keyboards.find(
        (kb: Keyboard) => kb.name === keyboardName,
      );

      if (keyboard) {
        this.#mainKeyboard = keyboard;
        this.notify("main-keyboard");
      }
    } catch (error) {
      console.error("Failed to update keyboard:", error);
    }
  }

  async #initializeDevices() {
    try {
      const devices = JSON.parse(await exec(["hyprctl", "devices", "-j"]));
      this.#mainKeyboard = devices.keyboards.find(
        (keyboard: Keyboard) => keyboard.main,
      );

      if (!this.#mainKeyboard) {
        throw new Error("No main keyboard found");
      }

      this.notify("main-keyboard");
    } catch (error) {
      console.error("Failed to initialize devices:", error);
    }
  }

  constructor() {
    super();
    this.#initializeDevices();
    this.#startSocketListener();
  }
}
