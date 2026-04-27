import { bindMenuButtonState } from "@/lib/gtk";

type MenuButtonProps = JSX.IntrinsicElements["menubutton"];

export default function MenuButton(props: MenuButtonProps) {
  return <menubutton {...props} $={bindMenuButtonState} />;
}
