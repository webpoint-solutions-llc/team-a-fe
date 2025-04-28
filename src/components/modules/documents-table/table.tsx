import {
  Table,
  Spinner,
  TableRow,
  TableBody,
  TableCell,
  TableHeader,
  TableColumn,
} from "@heroui/react";

import { formatDateTime } from "@/utils/date-time";
import { useGetProjectDocuments } from "@/services/project-documents";

import { TableTop } from "./table-top";
import TableBottom from "./table-bottom";
import { useSearch } from "@tanstack/react-router";

interface ProjectDocumentsTableProps {
  projectId: string;
}

export default function ProjectsDocumentsTable(
  props: ProjectDocumentsTableProps,
) {
  const projectId = props.projectId;

  const searchParams = useSearch({
    from: "/(auth)/_auth/projects/$projectId",
  });

  const { data: documentsRes, isLoading } = useGetProjectDocuments({
    projectId,
    search: searchParams.search,
    categoryId: searchParams.categoryId,
  });

  const hasFilters = searchParams.search || searchParams.categoryId;

  return (
    <Table
      removeWrapper
      isHeaderSticky
      topContent={<TableTop projectId={projectId} />}
      bottomContent={
        <TableBottom
          pagination={{
            totalPages: 10,
          }}
        />
      }
    >
      <TableHeader>
        <TableColumn>Title</TableColumn>
        <TableColumn>Link</TableColumn>
        <TableColumn>Category</TableColumn>
        <TableColumn>Created By</TableColumn>
        <TableColumn>Tags</TableColumn>
        <TableColumn>Created At</TableColumn>
      </TableHeader>

      <TableBody
        isLoading={isLoading}
        emptyContent={
          <div>{hasFilters ? "No results found" : "No documents added."}</div>
        }
        loadingContent={<Spinner label="Loading..." />}
        items={documentsRes?.data?.data || []}
      >
        {(item) => (
          <TableRow
            key={item.id}
            className="hover:bg-primary-50/50 hover:text-primary-600"
          >
            {/* TITLE */}
            <TableCell>
              <h6>{item.title}</h6>
              <p>{item.description}</p>
            </TableCell>

            <TableCell>
              <a
                href={item.link}
                target="_blank"
                rel="noreferer"
                className="text-ellipsis text-primary-600"
              >
                {item.link}
              </a>
            </TableCell>

            <TableCell>{item.category.name}</TableCell>

            <TableCell className="capitalize">
              {item.createdBy.fullName}
            </TableCell>

            <TableCell>
              <div className="flex flex-wrap items-center gap-2">
                {item.tags?.split(",").map((s) => <span key={s}>{s}</span>)}
              </div>
            </TableCell>
            <TableCell>{formatDateTime(item.createdAt)}</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
