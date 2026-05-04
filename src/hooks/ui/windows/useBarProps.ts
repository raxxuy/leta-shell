import useConfig from "@/hooks/services/useConfig";

export default function useBarProps() {
  const [position] = useConfig("bar", "position");
  const [height] = useConfig("bar", "height");

  const anchor = position((p) => (p === "top" ? "top-full" : "bottom-full"));

  return { anchor, height };
}
