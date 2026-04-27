import useConfig from "./useConfig";

export default function useSpacing() {
  const [spacing] = useConfig("global", "spacing");

  const xs = spacing((s) => s.xs);
  const sm = spacing((s) => s.sm);
  const md = spacing((s) => s.md);
  const lg = spacing((s) => s.lg);
  const xl = spacing((s) => s.xl);

  return {
    xs,
    sm,
    md,
    lg,
    xl,
  };
}
