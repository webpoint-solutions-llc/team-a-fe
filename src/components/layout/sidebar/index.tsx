import { Link } from "@tanstack/react-router";
import { ChartNoAxesColumn, LayoutDashboard, Users } from "lucide-react";

import { useSidebar } from "./sidebar-context";

import { cn } from "@/utils/cn";
import type { TSidebarMenu } from "@/types/layout/sidebar";

import { SidebarUserMenu } from "./sidebar-user-menu";

const MENUS: Array<TSidebarMenu> = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Projects",
    icon: ChartNoAxesColumn,
    href: "/projects",
  },
  {
    label: "Users",
    icon: Users,
    href: "/users",
  },
];

export default function Sidebar() {
  const sidebar = useSidebar();

  return (
    <aside
      data-collapsed={sidebar.collapsed}
      className={cn([
        "group relative shrink-0",
        "flex h-full flex-col border-r border-r-divider",
        "duration-200 ease-in-out",
        sidebar.collapsed ? "w-16" : "w-62",
        "p-2",
      ])}
    >
      <div className="mb-2 px-4 py-4 text-2xl font-bold">BRAND</div>

      {/* nav menu */}
      <div className="flex grow flex-col gap-y-0.5 overflow-y-auto">
        {MENUS.map((menu, i) => (
          <Link
            to={menu.href}
            key={menu.label + i}
            className={cn([
              "relative",
              "flex items-center gap-2",
              "w-full rounded px-4 py-2 hover:bg-primary-50 hover:text-primary-600",
              "[&.active]:bg-primary-50 [&.active]:text-primary-600",
              "after:absolute after:top-1/2 after:left-0 after:h-1/2 after:w-0.5 after:-translate-y-1/2 after:scale-y-0 after:rounded after:bg-primary-400",
              "[&.active]:after:scale-y-100",
            ])}
          >
            {menu.label}
          </Link>
        ))}
      </div>
      <SidebarUserMenu />
    </aside>
  );
}
