import React from "react";
import { Plus, Search } from "lucide-react";
import { Button, Input } from "@heroui/react";
import AddDocumentDrawer from "../add-document-sheet";
import { useDebouncedCallback } from "@mantine/hooks";
import { useNavigate, useSearch } from "@tanstack/react-router";
import DocumentCategoriesSelect from "@/components/common/document-categories";

interface TableTopProps {
  projectId: string;
}
export const TableTop: React.FC<TableTopProps> = ({ projectId }) => {
  const searchParams = useSearch({
    from: "/(auth)/_auth/projects/$projectId",
  });

  const [search, setSearch] = React.useState(searchParams.search || "");

  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const navigate = useNavigate();

  const hasFilters = searchParams.categoryId || searchParams.search;

  const handleSearch = useDebouncedCallback(async (value: string) => {
    navigate({
      // @ts-expect-error type issue
      search: (pre) => ({ ...pre, search: value }),
    });
  }, 500);

  const clearFilter = () => {
    navigate({
      // @ts-ignore
      search: {},
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Projects Documents</h1>
          <p className="text-sm text-gray-500">Manage your project documents</p>
        </div>
        <div>
          <Button
            color="primary"
            startContent={<Plus />}
            onPress={() => setIsDrawerOpen(true)}
          >
            Add Document
          </Button>

          <AddDocumentDrawer
            categoryId="ss"
            onOpenChange={setIsDrawerOpen}
            open={isDrawerOpen}
          />
        </div>
      </div>
      <div className="mt-6 flex items-center justify-start gap-3">
        <Input
          value={search}
          startContent={<Search />}
          placeholder="Search"
          className="max-w-[400px]"
          onChange={(e) => {
            const q = e.target.value;
            setSearch(q);
            handleSearch(q);
          }}
        />

        <DocumentCategoriesSelect projectId={projectId} />

        {hasFilters && (
          <Button
            color="danger"
            className="opacity-50 hover:opacity-100"
            onPress={clearFilter}
          >
            Clear Filters
          </Button>
        )}
      </div>
    </div>
  );
};
