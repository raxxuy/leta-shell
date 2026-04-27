import useNotifications from "@/hooks/services/useNotifications";

export default function useNotificationsProps() {
  const { hasNotifications } = useNotifications();

  return {
    hasNotifications,
  };
}
