import type { StoreApi } from "zustand";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";

import type { AuthState } from "@/store/auth-store";

export interface IRouteContext {
  authStore: StoreApi<AuthState>;
}

export const Route = createRootRouteWithContext<IRouteContext>()({
  component: RootLayout,
});

function RootLayout() {
  return (
    <>
      <Outlet />
      {/* <TanStackRouterDevtools /> */}
    </>
  );
}
