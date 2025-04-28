import ProjectsDocumentsTable from "@/components/modules/documents-table/table";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/_auth/projects/$projectId")({
  component: RouteComponent,
});

function RouteComponent() {
  const params = Route.useParams();

  return (
    <div className="px-4 py-10">
      id:{params.projectId}
      <ProjectsDocumentsTable />
    </div>
  );
}
