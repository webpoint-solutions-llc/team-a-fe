import type { AuthState } from "@/store/auth-store";

import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import type { StoreApi } from "zustand";
// import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

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
