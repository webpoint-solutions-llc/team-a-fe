import { Select, SelectItem } from "@heroui/react";

import { useGetCategories } from "@/services/get-categories";
import { useNavigate, useSearch } from "@tanstack/react-router";

interface CategoriesSelectProps {
  projectId: string;
  errorMessage?: string;
  disableSearchAppend?: boolean;
  onSelect?: (value: string) => void;
}
export default function DocumentCategoriesSelect({
  disableSearchAppend = false,
  ...props
}: CategoriesSelectProps) {
  const { data, isLoading } = useGetCategories(props.projectId);

  const search = useSearch({
    strict: false,
  });

  const navigate = useNavigate();

  return (
    <Select
      // @ts-ignore
      selectedKeys={[search.categoryId]}
      className="max-w-xs"
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
