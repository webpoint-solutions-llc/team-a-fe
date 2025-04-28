import qs from "qs";
import urlJoin from "url-join";

import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import type { IResponsePayload } from "@/types/common";
import type { IProjectDocument } from "@/types/document";

const LIST_PROJECT_DOCUMENTS = "list-project-docs";

interface GetProjectDocumentsPayload {
  projectId: string;
  search?: string;
  categoryId?: string;
}
const getProjectDocuments = async ({
  projectId,
  categoryId,
  search,
}: GetProjectDocumentsPayload) => {
  const searchParams = qs.stringify(
    { search, categoryId },
    {
      skipNulls: true,
    },
  );

  const res = await api.get(
    urlJoin("documents", projectId, `?${searchParams}`),
  );

  return res.data as IResponsePayload<{
    data: Array<IProjectDocument>;
  }>;
};

export const useGetProjectDocuments = (params: GetProjectDocumentsPayload) => {
  return useQuery({
    queryKey: [LIST_PROJECT_DOCUMENTS, params],
    queryFn: () => getProjectDocuments(params),
  });
};
