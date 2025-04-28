export type TSidebarMenu = {
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  className?: string;
} & (
  | {
      href: string;
      submenus?: never;
    }
  | {
      href?: never;
      submenus: Array<{
        label: string;
        href: string;
        icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
      }>;
    }
);
