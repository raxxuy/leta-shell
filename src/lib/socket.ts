import Gio from "gi://Gio";
import GLib from "gi://GLib";
import request from "@/lib/request";

const SOCKET_PATH = `${GLib.get_user_runtime_dir()}/leta-shell.sock`;

function handleConnection(connection: Gio.SocketConnection): void {
  const stream = new Gio.DataInputStream({
    base_stream: connection.get_input_stream(),
  });

  stream.read_line_async(GLib.PRIORITY_DEFAULT, null, (s, result) => {
    const [line] = (s as Gio.DataInputStream).read_line_finish_utf8(result);
    const output = connection.get_output_stream();

    if (line) {
      request(line.trim().split(/\s+/), (res) => {
        output.write(`${res}\n`, null);
        connection.close(null);
      });
    } else {
      output.write("ERROR: Empty command\n", null);
      connection.close(null);
    }
  });
}

export function startSocket(): void {
  const file = Gio.File.new_for_path(SOCKET_PATH);
  if (file.query_exists(null)) file.delete(null);

  const service = new Gio.SocketService();

  service.add_address(
    Gio.UnixSocketAddress.new(SOCKET_PATH),
    Gio.SocketType.STREAM,
    Gio.SocketProtocol.DEFAULT,
    null,
  );

  service.connect("incoming", (_service, connection) => {
    handleConnection(connection);
    return true;
  });

  service.start();
}

export function stopSocket(): void {
  const file = Gio.File.new_for_path(SOCKET_PATH);
  if (file.query_exists(null)) file.delete(null);
}
