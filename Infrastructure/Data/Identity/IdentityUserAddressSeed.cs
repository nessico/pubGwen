using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Core.Entities.Identity;
using Microsoft.Extensions.Logging;

namespace Infrastructure.Data.Identity
{
    public class IdentityUserAddressSeed

    {
        public static async Task SeedAsync(IdentityDataContext context, ILoggerFactory loggerFactory)
        {
            try
            {
                if (!context.Address.Any())
                {
                    var addressData = File.ReadAllText("../Infrastructure/Data/SeedData/UserSeedAddressData.json");
                    var address = JsonSerializer.Deserialize<List<Address>>(addressData);

                    foreach (var item in address)
                    {
                        context.Address.Add(item);
                    }

                    await context.SaveChangesAsync();
                }
            }
            catch (Exception ex)
            {
                var logger = loggerFactory.CreateLogger<StoreContextSeed>();
                logger.LogError(ex.Message);
            }
        }
    }
}