import { useMemo } from "react";

import type { TAccessControlPolicy } from "./type";
import { AccessControlContext } from "./access-control-context";

export const AccessControlProvider: React.FC<{
  children: React.ReactNode;
  accessControlPolicy: TAccessControlPolicy;
}> = ({ children, accessControlPolicy }) => {
  const value = useMemo(
    () => ({
      accessControlPolicy,
    }),
    [accessControlPolicy],
  );

  return (
    <AccessControlContext.Provider value={value}>
      {children}
    </AccessControlContext.Provider>
  );
};
