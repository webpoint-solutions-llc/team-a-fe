import { Select, SelectItem } from "@heroui/react";

import { cn } from "@/utils/cn";
import { useGetCategories } from "@/services/get-categories";
import { useNavigate, useSearch } from "@tanstack/react-router";

interface CategoriesSelectProps {
  projectId: string;
  errorMessage?: string;
  disableSearchAppend?: boolean;
  onSelect?: (value: string) => void;
  className?: string;
  label?: string;
  value?: string;
}
export default function DocumentCategoriesSelect({
  disableSearchAppend = false,
  className,
  label,
  value,
  ...props
}: CategoriesSelectProps) {
  const { data, isLoading } = useGetCategories(props.projectId);

  const search = useSearch({
    strict: false,
  });

  const navigate = useNavigate();

  return (
    <Select
      label={label}
      labelPlacement="outside"
      // @ts-ignore
      selectedKeys={value ? [value] : [search.categoryId]}
      className={cn(["max-w-xs", className])}
      placeholder="Category"
      isLoading={isLoading}
      items={data?.data?.data || []}
      errorMessage={props.errorMessage}
      isInvalid={Boolean(props.errorMessage)}
      onChange={(e) => {
        const value = e.target.value;

        if (!disableSearchAppend && value) {
          navigate({
            // @ts-ignore
            search: (pre) => ({ ...pre, categoryId: value }),
          });
        }
        props.onSelect?.(value);
      }}
    >
      {(category) => <SelectItem key={category.id}>{category.name}</SelectItem>}
    </Select>
  );
}
