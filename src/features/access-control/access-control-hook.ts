import { useContext } from "react";

import type { TAction, TResource } from "./type";
import { AccessControlContext } from "./access-control-context";

// Custom Hook for checking permissions
export const usePermissions = () => {
  const context = useContext(AccessControlContext);
  if (!context) {
    throw new Error("usePermissions must be used within an AuthProvider");
  }

  const checkPermission = (
    resource: TResource,
    action: TAction,
    recordId?: string,
  ): boolean => {
    const { accessControlPolicy } = context;

    let hasMatchingStatement = false;
    let isAllowed = false;

    for (const statement of accessControlPolicy) {
      // Skip if resource doesn't match
      if (statement.resource !== resource) continue;

      // Skip if action doesn't match
      const actionMatches =
        statement.actions.includes("*") || statement.actions.includes(action);
      if (!actionMatches) continue;

      // If recordId is provided, check record-level permissions
      if (recordId && statement.records) {
        if (!statement.records.includes(recordId)) continue;
      }

      // We found a matching statement
      hasMatchingStatement = true;

      // Apply the effect
      if (statement.effect === "allow") {
        isAllowed = true;
      } else if (statement.effect === "deny") {
        // Deny takes precedence over allow
        return false;
      }
    }

    // If we found no matching statements, default to denied
    if (!hasMatchingStatement) {
      return false;
    }

    return isAllowed;
  };

  return { checkPermission };
};

// specialized hook for resource-specific permissions
interface AccessCheckArg {
  resource: TResource;
  action: TAction;
  recordId?: string;
}

// type safe overloading
export function useHasAccess(rss: AccessCheckArg[]): boolean[];
export function useHasAccess(rss: AccessCheckArg): boolean;

/**
 * info: This hook is used to check if the user has access to a resource and action.
 * It takes in a resource, action, and optional recordId.
 * It returns a boolean value indicating whether the user has access to the resource to perform the action.
 */
export function useHasAccess(rss: AccessCheckArg | AccessCheckArg[]) {
  const { checkPermission } = usePermissions();

  if (Array.isArray(rss)) {
    return rss.map(({ resource, action, recordId }) =>
      checkPermission(resource, action, recordId),
    );
  } else {
    return checkPermission(rss.resource, rss.action, rss.recordId);
  }
}
