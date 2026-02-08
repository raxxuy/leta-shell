import Gio from "gi://Gio";
import { Gtk } from "ags/gtk4";
import ImageWrapper from "@/components/ImageWrapper";
import { Cursors } from "@/constants";
import { Overflow } from "@/enums";
import { useGlobalConfig } from "@/hooks/useConfig";

Gio._promisify(Gtk.FileDialog.prototype, "open", "open_finish");

export default function UserAvatar() {
  const { avatar, setAvatar } = useGlobalConfig();

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
        await setAvatar(path);
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
      src={avatar}
      tooltipText="Change avatar"
    />
  );
}
