import React from "react";
import type { TAccessControlContextType } from "./type";

export const AccessControlContext =
  React.createContext<TAccessControlContextType | null>(null);
