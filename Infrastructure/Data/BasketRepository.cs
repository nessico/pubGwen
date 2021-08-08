using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using System.Text.Json;
using StackExchange.Redis;
using System;

namespace Infrastructure.Data.Identity
{
    // Redis database, NoSQL won't need Entity Framework
    public class BasketRepository : IBasketRepository
    {
        private readonly IDatabase _database;
        public BasketRepository(IConnectionMultiplexer redis)
        {
            _database = redis.GetDatabase();
        }

        public async Task<bool> DeleteBasketAsync(string basketId)
        {
            return await _database.KeyDeleteAsync(basketId);
        }


        // Baskets stored as strings in redis database
        // Take our Json objects, which will be serialized into a string which is stored into the redis database as a string
        // Deserialize when taking it out and goes to our customer basket
        public async Task<CustomerBasket> GetBasketAsync(string basketId)
        {
            var data = await _database.StringGetAsync(basketId);

            return data.IsNullOrEmpty ? null : JsonSerializer.Deserialize<CustomerBasket>(data);
        }


        // If updating basket, replace existing basket in redis database, replacing with the new basket
        // Basket memory lifetime will reset for 7 days
        public async Task<CustomerBasket> AddOrUpdateBasketAsync(CustomerBasket basket)
        {
            var created = await _database.StringSetAsync(basket.Id, JsonSerializer.Serialize(basket),
                TimeSpan.FromDays(7));

            if (!created) return null;

            return await GetBasketAsync(basket.Id);
        }
    }
}