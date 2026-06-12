import Gio from "gi://Gio";
import AuthService from "@/services/auth";

export const setupLockListener = () => {
  const connection = Gio.bus_get_sync(Gio.BusType.SYSTEM, null);

  connection.signal_subscribe(
    "org.freedesktop.login1",
    "org.freedesktop.login1.Session",
    "Lock",
    null,
    null,
    Gio.DBusSignalFlags.NONE,
    () => AuthService.get_default().lock(),
  );
};
