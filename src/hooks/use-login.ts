import React from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";

import { UserRole } from "@/constants/user";
import { useAuthStore } from "@/store/auth-store";
import { clearAccessToken, clearRefreshToken } from "@/utils/access-token";

interface LoginCredentials {
  email: string;
  password: string;
}

export const useLogin = () => {
  const [isLoggingIn] = React.useState(false);

  const search = useSearch({
    from: "/login",
  });
  const navigate = useNavigate();

  const login = (credentials: LoginCredentials) => {
    useAuthStore.setState({
      user: {
        id: "sasas",
        firstName: "John",
        lastName: "Cena",
        email: credentials.email,
        role: UserRole.Developer,
      },
    });

    clearAccessToken();
    clearRefreshToken();

    // navigate to login page
    navigate({
      to: search.redirect ? decodeURIComponent(search.redirect) : "/dashboard",
    });
  };

  return { login, isLoggingIn };
};
