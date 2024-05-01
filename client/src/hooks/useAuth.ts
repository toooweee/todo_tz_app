import { useAppSelector } from "../store/hooks.ts";

export const useAuth = () => {
  const isAuth = useAppSelector((state) => state.user.isAuth);

  return isAuth;
};
