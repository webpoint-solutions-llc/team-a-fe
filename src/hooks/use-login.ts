import React from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";

// import { UserRole } from "@/constants/user";
import { useAuthStore } from "@/store/auth-store";
import {
  clearAccessToken,
  clearRefreshToken,
  setAccessToken,
} from "@/utils/access-token";
import api from "@/lib/api";

interface LoginCredentials {
  email: string;
  password: string;
}

export const useLogin = () => {
  const [isLoggingIn, setIsLoggingIn] = React.useState(false);

  const search = useSearch({
    strict: false,
  });
  const navigate = useNavigate();

  const login = async (credentials: LoginCredentials) => {
    setIsLoggingIn(true);

    try {
      const response = await api.post("/users/login", {
        email: credentials.email,
        password: credentials.password,
      });

      if (response.data.success) {
        const { token, user } = response.data.data;

        setAccessToken(token);

        useAuthStore.setState({
          user: {
            id: user.id,
            fullName: user.fullName,
            email: user.email,
          },
        });

        navigate({
          to: search.redirect
            ? decodeURIComponent(search.redirect)
            : "/dashboard",
        });
      } else {
        console.error("Login failed:", response.data.message);
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
    } finally {
      setIsLoggingIn(false);
    }
  };

  return { login, isLoggingIn };
};
