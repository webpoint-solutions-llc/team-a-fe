import { type ErrorComponentProps, redirect } from "@tanstack/react-router";

import { ForbiddenError, UnAuthorizedError } from "@/lib/route-interrupts";

interface IPageErrorComponent extends ErrorComponentProps {
  forbiddenComponent?: (
    errorComponentProps: ErrorComponentProps,
  ) => React.ReactNode;
  genericErrorComponent?: (
    errorComponentProps: ErrorComponentProps,
  ) => React.ReactNode;
  unauthorizedComponent?: (
    errorComponentProps: ErrorComponentProps,
  ) => React.ReactNode;
}

export default function PageErrorComponent({
  genericErrorComponent,
  forbiddenComponent,
  unauthorizedComponent,
  ...errorComponentProps
}: IPageErrorComponent) {
  {
    // handles unauthorized errors
    if (errorComponentProps.error instanceof UnAuthorizedError) {
      if (unauthorizedComponent) {
        return unauthorizedComponent(errorComponentProps);
      } else {
        throw redirect({
          to: "/login",
          search: {
            // Use the current location to power a redirect after login
            // (Do not use `router.state.resolvedLocation` as it can
            // potentially lag behind the actual current location)
            redirect: location.href,
          },
        });
      }
    }

    // handles forbidden errors
    if (errorComponentProps.error instanceof ForbiddenError) {
      if (forbiddenComponent) {
        return forbiddenComponent(errorComponentProps);
      } else
        return (
          <div className="text-red-500">
            <h1>Permission not granted</h1>
            <p>{errorComponentProps.error.message}</p>
          </div>
        );
    }

    // handles other/generic errors
    if (genericErrorComponent) {
      return genericErrorComponent(errorComponentProps);
    }
    // Generic error handling
    return (
      <div className="text-red-500">
        <h1>Something went wrong</h1>
        <p>
          {errorComponentProps.error.message || "An unexpected error occurred."}
        </p>
      </div>
    );
  }
}
