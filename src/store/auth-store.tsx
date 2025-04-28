import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { IUserMeta } from "@/types/user/user-meta";

export interface AuthState {
  user?: IUserMeta;
  setUser: (user: IUserMeta) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: undefined,
      setUser: (user) => set({ user }),
    }),
    {
      name: "auth-store",
    },
  ),
);
