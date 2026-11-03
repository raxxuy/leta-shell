import {
  LayerWindow as BaseLayerWindow,
  type LayerWindowProps,
} from "gnim-kit";
import { cleanupWidget, scan } from "../lib/theme/plugin";

export type { Anchor, LayerWindowProps } from "gnim-kit";

export const LayerWindow = (props: LayerWindowProps) => (
  <BaseLayerWindow
    {...props}
    onCleanup={(window) => {
      cleanupWidget?.(window);
      props.onCleanup?.(window);
    }}
    onMount={(window) => {
      Promise.resolve(scan?.(window)).catch(console.error);
      props.onMount?.(window);
    }}
  />
);

export default LayerWindow;
