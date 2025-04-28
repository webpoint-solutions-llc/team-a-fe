import { useLocalStorage } from "@mantine/hooks";
import React from "react";

interface ISidebarContext {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

const SidebarContext = React.createContext<ISidebarContext>(
  {} as ISidebarContext,
);

/*
 *  Provider of the sidebar context
 */
export const SidebarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [collapsed, setCollapsed] = useLocalStorage({
    key: "sidebar-collapsed",
    defaultValue: false,
  });

  return (
    <SidebarContext.Provider value={{ collapsed, setCollapsed }}>
      {children}
    </SidebarContext.Provider>
  );
};

/*
 *  hook to get the sidebar context
 */
export const useSidebar = () => {
  if (!SidebarContext) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }

  return React.useContext(SidebarContext);
};
