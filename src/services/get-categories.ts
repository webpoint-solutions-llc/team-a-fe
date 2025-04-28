import api from "@/lib/api";
import type { IProjectCategory } from "@/types/categories";
import type { IResponsePayload } from "@/types/common";
import { useQuery } from "@tanstack/react-query";
import urlJoin from "url-join";

export const GET_CATEGORIES = "ss";

export const useGetCategories = (projectId: string) => {
  return useQuery({
    queryKey: [GET_CATEGORIES, projectId],
    queryFn: async () => {
      const res = await api.get(
        urlJoin("document-categories", "project", projectId),
      );

      return res.data as IResponsePayload<{
        data: Array<IProjectCategory>;
      }>;
    },
    enabled: !!projectId,
  });
};
