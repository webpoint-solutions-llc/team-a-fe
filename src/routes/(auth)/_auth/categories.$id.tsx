import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/_auth/categories/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const params = Route.useParams();

  return <div>Hello "/(auth)/_auth/categories/$id"! {params.id}</div>;
}
