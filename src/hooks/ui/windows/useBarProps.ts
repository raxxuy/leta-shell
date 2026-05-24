import useConfig from "@/hooks/services/config/useConfig";

export default function useBarProps() {
  const [position] = useConfig("bar", "position");
  const [height] = useConfig("bar", "height");

  const anchor = position((p) => (p === "top" ? "top-full" : "bottom-full"));

  // const containerClassName = position((p) =>
  //   clsx(
  //     "bar-container",
  //     p === "top"
  //       ? "border-t-0 rounded-b-2xl"
  //       : "border-b-0 -mb-1 rounded-t-2xl",
  //   ),
  // );

  return { anchor, height };
}
