import { useLocation, useNavigate } from "@tanstack/react-router";
import { useAuthStore } from "@/store/auth-store";

import { clearAccessToken, clearRefreshToken } from "@/utils/access-token";

export const useLogout = () => {
  const { pathname } = useLocation();

  const navigate = useNavigate();

  const handleLogout = () => {
    useAuthStore.setState({
      user: undefined,
    });

    clearAccessToken();
    clearRefreshToken();

    // navigate to login page
    navigate({
      to: "/login",
      search: {
        redirect: pathname,
      },
    });
  };

  return handleLogout;
};
