import Gio from "gi://Gio";
import GLib from "gi://GLib";
import request from "@/lib/request";

const SOCKET_PATH = `/run/user/${GLib.getenv("UID") || "1000"}/leta-shell.sock`;

export class SocketService {
  private service: Gio.SocketService | null = null;

  start() {
    const file = Gio.File.new_for_path(SOCKET_PATH);
    if (file.query_exists(null)) file.delete(null);

    this.service = new Gio.SocketService();
    this.service.add_address(
      Gio.UnixSocketAddress.new(SOCKET_PATH),
      Gio.SocketType.STREAM,
      Gio.SocketProtocol.DEFAULT,
      null,
    );

    this.service.connect("incoming", (_service, connection) => {
      const stream = new Gio.DataInputStream({
        base_stream: connection.get_input_stream(),
      });

      stream.read_line_async(GLib.PRIORITY_DEFAULT, null, (s, result) => {
        const [line] = (s as Gio.DataInputStream).read_line_finish_utf8(result);

        if (line) {
          const args = line.trim().split(/\s+/);
          request(args, (response) => {
            connection.get_output_stream().write(`${response}\n`, null);
            connection.close(null);
          });
        } else {
          connection.get_output_stream().write("ERROR: Empty command\n", null);
          connection.close(null);
        }
      });

      return true;
    });

    this.service.start();
  }

  stop() {
    if (this.service) {
      this.service.stop();
      const file = Gio.File.new_for_path(SOCKET_PATH);
      if (file.query_exists(null)) file.delete(null);
    }
  }
}

export const socketService = new SocketService();
