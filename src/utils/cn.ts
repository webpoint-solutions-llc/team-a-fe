import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  const twMerge = extendTailwindMerge({
    extend: {},
  });

  return twMerge(clsx(inputs));
}
