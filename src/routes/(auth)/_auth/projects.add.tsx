import AddProjectForm from "@/components/modules/add-project-form";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/_auth/projects/add")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="px-4 py-10">
      <div className="mx-auto max-w-[600px]">
        <AddProjectForm />
      </div>
    </div>
  );
}
