import {
  Table,
  Spinner,
  TableRow,
  TableBody,
  TableCell,
  TableHeader,
  TableColumn,
} from "@heroui/react";

import { Link, useSearch } from "@tanstack/react-router";
import { useGetProjects } from "@/services/projects";
import TableBottom from "./table-bottom";
import { formatDateTime } from "@/utils/date-time";
import { DateTime } from "luxon";
import ProjectStatusChip from "@/components/common/project-status-chip";
import { TableTop } from "./table-top";

export default function ProjectsTable() {
  const search = useSearch({
    from: "/(auth)/_auth/projects/",
  });

  const projectsResponse = useGetProjects({
    page: search.page,
    limit: search.limit,
  });
  console.log("projectsResponse", projectsResponse?.data?.data?.projects);
  return (
    <Table
      removeWrapper
      isHeaderSticky
      topContent={<TableTop />}
      bottomContent={
        <TableBottom
          pagination={{
            totalPages: 10,
          }}
        />
      }
    >
      <TableHeader>
        <TableColumn>Project</TableColumn>
        <TableColumn>Members</TableColumn>
        <TableColumn>Status</TableColumn>
        <TableColumn>KickOff</TableColumn>
        <TableColumn>Deadline</TableColumn>
      </TableHeader>

      <TableBody
        isLoading={projectsResponse.isLoading}
        emptyContent={<div>No Projects!</div>}
        loadingContent={<Spinner label="Loading..." />}
        items={projectsResponse?.data?.data?.projects || []}
      >
        {(item) => (
          <TableRow
            key={item.id}
            className="hover:bg-primary-50/50 hover:text-primary-600"
          >
            {/* TITLE */}
            <TableCell>
              <Link
                to="/projects/$projectId"
                params={{
                  projectId: item.id,
                }}
                className="cursor-pointer"
              >
                <div>
                  <h6 className="font-semibold"> {item.title}</h6>
                  <p>{item.description}</p>
                </div>
              </Link>
            </TableCell>

            {/* MEMBERS */}
            <TableCell>
              {item?.projectMembers?.map((m) => (
                <span key={m.id}>{m.user.fullName}</span>
              ))}
            </TableCell>

            {/* STATUS */}
            <TableCell>
              <ProjectStatusChip size="sm" status={item.status} />
            </TableCell>

            {/* KICKOFF DATE */}
            <TableCell>
              {formatDateTime(item.kickoffDate, {
                format: DateTime.DATE_MED,
              })}
            </TableCell>

            {/* DEADLINE DATE */}
            <TableCell>
              {formatDateTime(item.deadline, {
                format: DateTime.DATE_MED,
              })}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
