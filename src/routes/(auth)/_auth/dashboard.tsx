import { AccessControlGate } from "@/features/access-control";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/_auth/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      Hello "/(auth)/_auth/dashboard"!
      <AccessControlGate action="delete" resource="posts">
        <button>Delete Post</button>
      </AccessControlGate>
    </div>
  );
}
