import { createComputed, createState } from "ags";
import { useAuthService } from "@/hooks/services/useAuthService";

export const useLockScreen = () => {
  const { authenticate } = useAuthService();

  const [password, setPassword] = createState("");
  const [error, setError] = createState(false);
  const [loading, setLoading] = createState(false);
  const [visible, setVisible] = createState(false);

  const visibilityIconName = visible((v) => (v ? "eye-off" : "eye"));

  const canSubmit = createComputed(() => {
    return password().length > 0 && !loading();
  });

  const submit = async () => {
    const value = password.peek();

    if (!value || loading.peek()) return false;

    setLoading(true);
    setError(false);

    const ok = await authenticate(value);

    if (!ok) {
      setError(true);
      setPassword("");
    } else setError(false);

    setLoading(false);

    return ok;
  };

  const reset = () => {
    setPassword("");
    setError(false);
    setLoading(false);
  };

  return {
    password,
    setPassword,
    visible,
    setVisible,
    visibilityIconName,
    error,
    loading,
    submit,
    canSubmit,
    reset,
  };
};
