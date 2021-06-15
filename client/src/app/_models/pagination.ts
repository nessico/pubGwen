export interface Pagination {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
}

//T is an array of numbers
//result is list of members, pagination is stored in pagination
export class PaginatedResult<T> {
  result!: T;
  pagination!: Pagination;
}
