export interface IPagination {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
}

// T is an array of numbers
// Result is list of members, pagination is stored in pagination
export class PaginatedResult<T> {
  result!: T;
  pagination!: IPagination;
}
