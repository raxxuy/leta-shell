import { TRANSITION_PROPERTIES, TRANSITION_TIMINGS } from "../constants";

export const generateTransition = (cls: string): string[] | null => {
  // Match: transition
  if (cls === "transition") {
    return ["transition: all 150ms ease-in-out"];
  }

  // Match property values: transition-none, transition-all, transition-colors
  const propertyMatch = cls.match(/^transition-(.+)$/);

  if (propertyMatch) {
    const prop =
      TRANSITION_PROPERTIES[
        propertyMatch[1] as keyof typeof TRANSITION_PROPERTIES
      ];
    if (prop) {
      return prop === "none"
        ? ["transition: none"]
        : [`transition: ${prop} 150ms ease-in-out`];
    }
  }

  // Match arbitrary duration: duration-[300ms], duration-[0.5s]
  const durationArbitraryMatch = cls.match(/^duration-\[(.+)\]$/);

  if (durationArbitraryMatch) {
    return [`transition-duration: ${durationArbitraryMatch[1]}`];
  }

  // Match numeric duration: duration-300, duration-500
  const durationMatch = cls.match(/^duration-(\d+)$/);

  if (durationMatch) {
    return [`transition-duration: ${durationMatch[1]}ms`];
  }

  // Match arbitrary timing: ease-[cubic-bezier(0.4,0,0.2,1)]
  const timingArbitraryMatch = cls.match(/^ease-\[(.+)\]$/);

  if (timingArbitraryMatch) {
    return [`transition-timing-function: ${timingArbitraryMatch[1]}`];
  }

  // Match: ease-in, ease-out, ease-in-out, ease-linear
  const timingMatch = cls.match(/^ease-(.+)$/);

  if (timingMatch) {
    const timing =
      TRANSITION_TIMINGS[timingMatch[1] as keyof typeof TRANSITION_TIMINGS];
    if (timing) {
      return [`transition-timing-function: ${timing}`];
    }
  }

  // Match arbitrary delay: delay-[150ms], delay-[0.2s]
  const delayArbitraryMatch = cls.match(/^delay-\[(.+)\]$/);

  if (delayArbitraryMatch) {
    return [`transition-delay: ${delayArbitraryMatch[1]}`];
  }

  // Match numeric delay: delay-300, delay-500
  const delayMatch = cls.match(/^delay-(\d+)$/);

  if (delayMatch) {
    return [`transition-delay: ${delayMatch[1]}ms`];
  }

  return null;
};
