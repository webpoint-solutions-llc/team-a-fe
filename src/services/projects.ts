import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import type { IProject } from "@/types/project";
import { GET_PROJECTS } from "@/constants/query-keys/project";
import type { IPaginationFilter, IResponsePayload } from "@/types/common";

interface GetProjectOptions extends IPaginationFilter {}

export const useGetProjects = (options?: GetProjectOptions) => {
  return useQuery({
    queryKey: [GET_PROJECTS, options],
    queryFn: () => getAllProjects(options),
  });
};

// Function Calls

export const createProject = async (data: any): Promise<any> => {
  try {
    const response = await api.post("/", data);
    return response.data;
  } catch (error) {
    console.error("Error creating project:", error);
    throw error;
  }
};

export const getAllProjects = async (options?: GetProjectOptions) => {
  const response = await api.get("/projects");
  return response.data as IResponsePayload<{
    pagination: IPaginationFilter;
    projects: Array<IProject>;
  }>;
};

export const getProjectById = async (id: string): Promise<any> => {
  try {
    const response = await api.get(`/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching project with ID ${id}:`, error);
    throw error;
  }
};

export const updateProject = async (id: string, data: any): Promise<any> => {
  try {
    const response = await api.put(`/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(`Error updating project with ID ${id}:`, error);
    throw error;
  }
};

export const deleteProject = async (id: string): Promise<any> => {
  try {
    const response = await api.delete(`/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting project with ID ${id}:`, error);
    throw error;
  }
};
