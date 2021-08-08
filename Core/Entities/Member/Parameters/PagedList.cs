using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Core.Entities.Member.Parameters
{
    // Take <T> types of any entity
    public class PagedList<T> : List<T>
    {

        public int CurrentPage { get; set; }
        public int TotalPages { get; set; }
        public int PageSize { get; set; }
        public int TotalCount { get; set; }
        public PagedList(IEnumerable<T> items, int count, int pageNumber, int pageSize)
        {
            // If total count is 10, and page size is 5, then we have 2 pages in this query
            CurrentPage = pageNumber;
            TotalPages = (int)Math.Ceiling(count / (double)pageSize);
            PageSize = pageSize;
            TotalCount = count;
            AddRange(items);
        }

        // Creates new instance of this PagedList which returns these new PagedList<T> properties
        public static async Task<PagedList<T>> CreateAsync(IQueryable<T> source, int pageNumber,
            int pageSize)
        {
            // How many items are in the query
            var count = await source.CountAsync();
            // Skip the pages number - 1 multipled by page size, take the page size and then execute it with toListASync
            // E.g. if you're on page Number 2 - 1 = 1, 1 * 5 (page size), then you take 5, which means u will be on second page of next five records
            var items = await source.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToListAsync();
            return new PagedList<T>(items, count, pageNumber, pageSize);
        }
    }
}