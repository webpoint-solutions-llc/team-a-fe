import type { TAction, TResource } from "./type";
import { usePermissions } from "./access-control-hook";

export const withAccessControl = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  WrappedComponent: React.ComponentType<any>,
  resource: TResource,
  action: TAction,
  fallback?: React.ReactNode | (() => void),
) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function PermissionGuardedComponent(props: any) {
    const { checkPermission } = usePermissions();

    if (!checkPermission(resource, action)) {
      if (typeof fallback === "function") {
        return fallback();
      }
      return fallback;
    }

    return <WrappedComponent {...props} />;
  };
};
