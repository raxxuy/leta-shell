import Gio from "gi://Gio";
import { Gtk } from "ags/gtk4";
import ImageWrapper from "@/components/ImageWrapper";
import { Cursors, USER_PICTURE_FILE } from "@/constants";
import { Overflow } from "@/enums";
import { exec } from "@/utils";

Gio._promisify(Gtk.FileDialog.prototype, "open", "open_finish");

export default function UserAvatar() {
  const handleImageClick = async () => {
    const fileChooser = new Gtk.FileDialog({
      title: "Select an image",
      acceptLabel: "Select",
      defaultFilter: new Gtk.FileFilter({
        name: "Images",
        patterns: ["*.png", "*.jpg", "*.jpeg"],
      }),
    });

    try {
      const file = await fileChooser.open(null, null);

      if (file) {
        const path = file.get_path() as string;
        exec(["cp", path, USER_PICTURE_FILE]);
        console.log("Image updated successfully!");
      }
    } catch (_err) {
      console.log("User cancelled or error occurred");
    }
  };

  return (
    <ImageWrapper
      button
      class="h-20 w-20 rounded-xl border-primary/40 shadow-lg"
      cursor={Cursors.POINTER}
      file
      onClicked={handleImageClick}
      overflow={Overflow.HIDDEN}
      src={USER_PICTURE_FILE}
      tooltipText="Change avatar"
    />
  );
}
