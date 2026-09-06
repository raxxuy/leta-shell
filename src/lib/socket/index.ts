import Gio from "gi://Gio";
import GLib from "gi://GLib";

import { register } from "ags/gobject";

import { connect } from "@/decorators/gobject";
import request from "./request";

const SOCKET_PATH = `${GLib.get_user_runtime_dir()}/leta-shell.sock`;

@register({ GTypeName: "LetaSocket" })
export default class LetaSocket extends Gio.SocketService {
  private static instance: LetaSocket;

  static get_default(): LetaSocket {
    if (!LetaSocket.instance) LetaSocket.instance = new LetaSocket();
    return LetaSocket.instance;
  }

  _init(): void {
    super._init();

    try {
      this.setAddress();
      this.start();
    } catch (e) {
      logError(e);
    }
  }

  private setAddress() {
    const file = Gio.File.new_for_path(SOCKET_PATH);
    if (file.query_exists(null)) file.delete(null);

    const address = Gio.UnixSocketAddress.new(SOCKET_PATH);
    this.add_address(
      address,
      Gio.SocketType.STREAM,
      Gio.SocketProtocol.DEFAULT,
      null,
    );
  }

  private writeAll(
    output: Gio.OutputStream,
    data: string,
    onDone?: () => void,
  ) {
    output.write_all_async(data, GLib.PRIORITY_DEFAULT, null, (s, result) => {
      try {
        s?.write_all_finish(result);
      } catch (e) {
        logError(e);
      } finally {
        onDone?.();
      }
    });
  }

  @connect("incoming", this)
  protected onIncoming(_: LetaSocket, connection: Gio.SocketConnection) {
    const stream = new Gio.DataInputStream({
      base_stream: connection.get_input_stream(),
    });

    stream.read_line_async(GLib.PRIORITY_DEFAULT, null, (s, result) => {
      if (!s) return;

      const [line] = s.read_line_finish_utf8(result);
      const output = connection.get_output_stream();

      if (line) {
        request(line.trim().split(/\s+/), (res) => {
          this.writeAll(output, `${res}\n`, () => connection.close(null));
        });
      } else {
        this.writeAll(output, "ERROR: Empty command\n", () => {
          connection.close(null);
        });
      }
    });
  }
}
