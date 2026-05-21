import useClock from "@/hooks/features/clock/useClock";

export default function Clock() {
  const time = useClock();
  return <label class="font-bold text-base" label={time} />;
}
