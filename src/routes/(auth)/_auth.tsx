import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

import AppLayout from "@/components/layout";
import { AccessControlProvider } from "@/features/access-control";
import { accessControlPolicy } from "@/config/access-control-policy";
import PageErrorComponent from "@/components/common/page-error-component";

export const Route = createFileRoute("/(auth)/_auth")({
  component: RouteComponent,
  notFoundComponent: () => <div>Not Found</div>,
  errorComponent: PageErrorComponent,
  beforeLoad: ({ context, location }) => {
    // redirect to login page if user is not logged in
    if (!context.authStore.getState().user) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
    }
  },
});

function RouteComponent() {
  return (
    <AccessControlProvider accessControlPolicy={accessControlPolicy}>
      <AppLayout>
        <Outlet />
      </AppLayout>
    </AccessControlProvider>
  );
}
