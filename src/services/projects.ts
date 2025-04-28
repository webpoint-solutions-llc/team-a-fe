import qs from "qs";
import urlJoin from "url-join";

import api from "@/lib/api";
import type { IProject } from "@/types/project";
import { useQuery } from "@tanstack/react-query";
import { GET_PROJECTS } from "@/constants/query-keys/project";
import type { IPaginationFilter, IResponsePayload } from "@/types/common";
import { mockProjects } from "@/mock/projects";

interface GetProjectOptions extends IPaginationFilter {}

const getProjects = async (options?: GetProjectOptions) => {
  return {
    pagination: {
      page: options?.page || 1,
      limit: 10,
      total: 10,
    },
    projects: mockProjects,
  };
  //   const searchParams = qs.stringify(options);
  //   const res = await api.get<
  //     IResponsePayload<{
  //       pagination: IPagination;
  //       projects: Array<IProject>;
  //     }>
  //   >(urlJoin("/projects", `?${searchParams}`));

  //   return res.data;
};

export const useGetProjects = (options?: GetProjectOptions) => {
  return useQuery({
    queryKey: [GET_PROJECTS, options],
    queryFn: () => getProjects(options),
  });
};
