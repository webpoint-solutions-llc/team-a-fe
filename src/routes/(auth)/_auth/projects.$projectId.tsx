import ProjectsDocumentsTable from "@/components/modules/documents-table/table";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const searchParamsSchema = z.object({
  page: z.number().optional().catch(1),
  limit: z.number().optional().catch(15),
  sort: z.string().optional(),
  order: z.string().optional(),
  search: z.string().optional(),
});

export const Route = createFileRoute("/(auth)/_auth/projects/$projectId")({
  component: RouteComponent,
  validateSearch: searchParamsSchema,
});

function RouteComponent() {
  const params = Route.useParams();

  return (
    <div className="px-4 py-10">
      <div className="container">
        <ProjectsDocumentsTable projectId={params.projectId} />
      </div>
    </div>
  );
}
