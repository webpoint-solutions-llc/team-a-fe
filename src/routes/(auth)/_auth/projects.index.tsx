import ProjectsTable from "@/components/modules/projects-table/table";
import { createFileRoute } from "@tanstack/react-router";
import z from "zod";

const searchParamsSchema = z.object({
  page: z.number().optional().catch(1),
  limit: z.number().optional().catch(15),
  sort: z.string().optional(),
  order: z.string().optional(),
  search: z.string().optional(),
});

export const Route = createFileRoute("/(auth)/_auth/projects/")({
  component: RouteComponent,
  validateSearch: searchParamsSchema,
});

function RouteComponent() {
  return (
    <div className="px-8 py-10">
      <div className="container">
        <ProjectsTable />
      </div>
    </div>
  );
}
