import React from "react";
import { LogOutIcon } from "lucide-react";

import { useLogout } from "@/hooks/use-logout";
import { cn } from "@/utils/cn";

export const SidebarUserMenu: React.FC = () => {
  const logout = useLogout();
  return (
    <div>
      <button
        type="button"
        className={cn([
          "relative",
          "flex cursor-pointer items-center gap-2",
          "w-full rounded px-4 py-2 hover:bg-danger-50 hover:text-danger-600",
        ])}
        onClick={logout}
      >
        <LogOutIcon />
        Logout
      </button>
    </div>
  );
};
