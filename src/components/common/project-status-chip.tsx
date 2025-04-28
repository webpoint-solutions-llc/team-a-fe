import React from "react";
import { ProjectStatus } from "@/types/project";
import { Chip, type ChipProps } from "@heroui/react";

const statusColorMap = new Map([
  [
    ProjectStatus.Active,
    {
      color: "success",
      label: "Success",
    },
  ],
  [
    ProjectStatus.Archived,
    {
      color: "default",
      label: "Archived",
    },
  ],
  [
    ProjectStatus.Completed,
    {
      color: "primary",
      label: "Completed",
    },
  ],
]);

interface ProjectStatusChipProps extends Omit<ChipProps, "color" | "children"> {
  status: ProjectStatus;
}
const ProjectStatusChip: React.FC<ProjectStatusChipProps> = ({
  status,
  ...props
}) => {
  const content = statusColorMap.get(status);
  return (
    <Chip color={content?.color as any} {...props}>
      {content?.label}
    </Chip>
  );
};

export default ProjectStatusChip;
