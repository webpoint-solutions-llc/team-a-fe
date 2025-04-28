import React from "react";

import type { TAction, TResource } from "./type";
import { usePermissions } from "./access-control-hook";

/**
 * info: Access control gate
 *
 * This component is used to gate access to certain resources and actions.
 * It takes in a resource, action, and optional recordId.
 * It then checks the access control policy to determine if the user has the necessary permissions to access the resource and action.
 * If the user does not have the necessary permissions, it will render the fallback component or null if none is provided.
 *
 **/
export const AccessControlGate: React.FC<{
  resource: TResource;
  action: TAction;
  recordId?: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}> = ({ resource, action, recordId, children, fallback = null }) => {
  const { checkPermission } = usePermissions();

  if (!checkPermission(resource, action, recordId)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};
