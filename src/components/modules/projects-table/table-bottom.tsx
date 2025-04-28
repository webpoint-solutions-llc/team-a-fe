import { Pagination } from "@heroui/pagination";
import { useNavigate, useSearch } from "@tanstack/react-router";

type Props = {
  pagination: {
    totalPages: number;
  };
};

/*
 * Table bottom component
 * shows pagination if there are more than 1 pages
 */
export default function TableBottom({ pagination }: Props) {
  const search = useSearch({
    from: "/(auth)/_auth/projects/",
  });

  const navigate = useNavigate({
    from: "/projects",
  });

  const currentPage = search.page || 1;

  const handlePageChange = (page: number) => {
    navigate({
      search: (pre) => ({ ...pre, page: page }),
    });
  };

  const showPagination = pagination?.totalPages > 1;

  return (
    <div className="sticky bottom-2 z-10 flex w-full justify-center">
      {showPagination && (
        <Pagination
          showShadow
          isCompact
          showControls
          color="primary"
          page={currentPage}
          total={pagination?.totalPages ?? 1}
          onChange={handlePageChange}
        />
      )}
    </div>
  );
}
