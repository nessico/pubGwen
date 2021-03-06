import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { PaginatedResult } from 'src/app/shared/_models/accountModels/pagination';

export function getPaginatedResult<T>(url: any, params: any, http: HttpClient) {
  const paginatedResult: PaginatedResult<T> = new PaginatedResult<T>();
  return http.get<T>(url, { observe: 'response', params }).pipe(
    map((response: any) => {
      paginatedResult.result = response.body;
      if (response.headers.get('Pagination') !== null) {
        paginatedResult.pagination = JSON.parse(
          response.headers.get('Pagination')
        );
      }
      return paginatedResult;
    })
  );
}

export function getPaginationHeaders(pageIndex: number, pageSize: number) {
  // Lets us serialize our parameters and take cares of adding it onto the query string

  let params = new HttpParams();

  // Passing page number & page size to the param
  params = params.append('pageIndex', pageIndex.toString());
  params = params.append('pageSize', pageSize.toString());

  return params;
}
