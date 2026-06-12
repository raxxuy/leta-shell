import { createBinding } from "ags";
import AuthService from "@/services/auth";

export const useAuthService = () => {
  const service = AuthService.get_default();

  const attempts = createBinding(service, "attempts");

  const authenticate = async (password: string) =>
    await service.authenticate(password);
  const lock = () => service.lock();

  return {
    attempts,
    authenticate,
    lock,
  };
};
