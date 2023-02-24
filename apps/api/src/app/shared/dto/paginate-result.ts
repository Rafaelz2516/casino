export type PaginateResult<T> = {
  page?: number;
  results?: T[];
  totalPages?: number;
  totalResults?: number;
};
