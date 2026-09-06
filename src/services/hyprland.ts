import AstalHyprland from "gi://AstalHyprland";

import type GObject from "ags/gobject";
import { getter, gtype, register } from "ags/gobject";

import { connect, emitNotify } from "@/decorators/gobject";
import Service from "./base";

interface HyprlandServiceSignals extends GObject.Object.SignalSignatures {}

@register({ GTypeName: "HyprlandService" })
export default class HyprlandService extends Service<HyprlandServiceSignals> {
  private static instance: HyprlandService;

  #workspaces: Record<number, AstalHyprland.Workspace> = {};

  static get_default(): HyprlandService {
    if (!HyprlandService.instance)
      HyprlandService.instance = new HyprlandService();
    return HyprlandService.instance;
  }

  get internal(): AstalHyprland.Hyprland {
    return AstalHyprland.get_default();
  }

  @getter(gtype<Record<number, AstalHyprland.Workspace>>(Object))
  get workspaces(): Record<number, AstalHyprland.Workspace> {
    return this.#workspaces;
  }

  @emitNotify("workspaces")
  private setWorkspaces(
    workspaces: Record<number, AstalHyprland.Workspace>,
  ): void {
    this.#workspaces = workspaces;
  }

  @connect("workspace-added", () => AstalHyprland.get_default())
  protected onWorkspaceAdded(
    _: AstalHyprland.Hyprland,
    workspace: AstalHyprland.Workspace,
  ): void {
    this.setWorkspaces({ ...this.#workspaces, [workspace.id - 1]: workspace });
  }

  @connect("workspace-removed", () => AstalHyprland.get_default())
  protected onWorkspaceRemoved(_: AstalHyprland.Hyprland, id: number): void {
    const { [id - 1]: _removed, ...rest } = this.#workspaces;
    this.setWorkspaces(rest);
  }

  constructor() {
    super();

    const hyprland = AstalHyprland.get_default();

    for (const workspace of hyprland.workspaces) {
      this.#workspaces[workspace.id - 1] = workspace;
    }
  }
}
