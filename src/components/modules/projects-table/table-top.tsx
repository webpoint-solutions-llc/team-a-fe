import { Button } from "@heroui/react";
import { Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import React from "react";

export const TableTop: React.FC = () => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-semibold">Projects</h1>
        <p className="text-sm text-gray-500">Manage your project documents</p>
      </div>
      <div>
        <Button
          color="primary"
          startContent={<Plus />}
          as={Link}
          to="/projects/add"
        >
          Add Project
        </Button>
      </div>
    </div>
  );
};
