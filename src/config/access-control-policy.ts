import type { TAccessControlPolicy } from "@/features/access-control";

export const accessControlPolicy: TAccessControlPolicy = [
  {
    resource: "posts",
    actions: ["delete"],
    effect: "allow",
  },
  {
    resource: "church-event",
    actions: ["delete"],
    effect: "deny",
    records: ["post1", "post2"],
  },
  {
    resource: "evangelistic-meeting",
    actions: ["create"],
    effect: "deny",
  },
];
