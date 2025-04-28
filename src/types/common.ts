export interface IResponsePayload<T> {
  status: string;
  message: string;
  data: T;
}

export interface IPaginationResponse {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface IPaginationFilter {
  page?: number;
  limit?: number;
  total?: number;
  totalPages?: number;
}
