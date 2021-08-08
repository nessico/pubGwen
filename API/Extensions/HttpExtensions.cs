using System.Text.Json;
using API.Helpers;
using Microsoft.AspNetCore.Http;

namespace API.Extensions
{
    public static class HttpExtensions
    {
        public static void AddPaginationHeader(this HttpResponse response, int currentPage, int itemsPerPage,
         int totalItems, int totalPages)
        {
            // Creating a pagination header
            var paginationHeader = new PaginationHeader(currentPage, itemsPerPage, totalItems, totalPages);
            // Make it camelcase
            var options = new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            };
            // Serialize as json and add cors header to make it accessible
            response.Headers.Add("Pagination", JsonSerializer.Serialize(paginationHeader, options));
            response.Headers.Add("Access-Control-Expose-Headers", "Pagination");

            // Create UserParams class in helpers folder to receive pagination parameters from the user,
            // Take those parameters as a query string and store it as an object
        }

    }
}