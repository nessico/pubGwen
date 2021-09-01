using System;
using System.Threading.Tasks;

namespace Core.Interfaces
{
    public interface IResponseCacheService
    {
        // Cache responses from database into Redis memory
        // cacheKey is comprised of our query that's coming into the API
        // e.g. key, response (list of products, page 1)
        // When user asks for the same thing, it will retrieve from Redis instead of database

        Task CacheResponseAsync(string cacheKey, object response, TimeSpan timeToLive);

        Task<string> GetCachedResponseAsync(string cacheKey);
    }
}