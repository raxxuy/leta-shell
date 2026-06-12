import AstalAuth from "gi://AstalAuth";
import { getter, register } from "ags/gobject";
import { emitNotify } from "@/decorators/gobject";
import { toggleWindow } from "@/lib/window";
import Service from "./base";

@register({ GTypeName: "AuthService" })
export default class AuthService extends Service {
  private static instance: AuthService;
  private locked = false;

  #attempts = 0;

  static get_default(): AuthService {
    if (!AuthService.instance) AuthService.instance = new AuthService();
    return AuthService.instance;
  }

  static isLocked() {
    return AuthService.get_default()?.locked ?? false;
  }

  @getter(Number)
  get attempts() {
    return this.#attempts;
  }

  @emitNotify("attempts")
  async authenticate(password: string): Promise<boolean> {
    const success = await new Promise<boolean>((resolve) => {
      AstalAuth.Pam.authenticate(password, (_, task) => {
        try {
          AstalAuth.Pam.authenticate_finish(task);
          resolve(true);
        } catch {
          resolve(false);
        }
      });
    });

    if (success) {
      this.#attempts = 0;
      this.locked = false;
      toggleWindow("lock-screen");
    } else {
      this.#attempts++;
    }

    return success;
  }

  lock() {
    this.locked = true;
    toggleWindow("lock-screen");
  }
}
