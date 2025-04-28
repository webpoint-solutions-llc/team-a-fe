import { Button, Input } from "@heroui/react";
import { Link } from "@tanstack/react-router";
import { Plus, Search } from "lucide-react";
import React from "react";
import AddDocumentDrawer from "../add-document-sheet";

export const TableTop: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
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
      <div className="mt-6">
        <Input
          startContent={<Search />}
          placeholder="Search"
          className="max-w-[400px]"
        />
      </div>
    </div>
  );
};
