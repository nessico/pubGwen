using System;
using Infrastructure.Data.Identity;
using API.Helpers;
using Core.Interfaces;
using Infrastructure.Services;
using API.Services;
using API.SignalR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using API.Errors;
using StackExchange.Redis;

namespace API.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
            services.AddSingleton<IConnectionMultiplexer>(c =>
          {
              var configuration = ConfigurationOptions.Parse(config.GetConnectionString("Redis"), true);
              return ConnectionMultiplexer.Connect(configuration);
          });
            services.AddSingleton<IResponseCacheService, ResponseCacheService>();
            services.AddSingleton<PresenceTracker>();
            services.Configure<CloudinarySettings>(config.GetSection("CloudinarySettings"));
            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<IOrderService, OrderService>();
            services.AddScoped<IPaymentService, PaymentService>();
            services.AddScoped<IPhotoService, PhotoService>();
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddScoped<IProductRepository, ProductRepository>();
            services.AddScoped<IBasketRepository, BasketRepository>();
            services.AddScoped(typeof(IGenericRepository<>), (typeof(GenericRepository<>)));
            services.AddScoped<LogUserActivity>();
            services.AddAutoMapper(typeof(AutoMapperProfiles).Assembly);
            services.Configure<ApiBehaviorOptions>(options =>
           {
               options.InvalidModelStateResponseFactory = actionContext =>
               {
                   var errors = actionContext.ModelState
                       .Where(e => e.Value.Errors.Count > 0)
                       .SelectMany(x => x.Value.Errors)
                       .Select(x => x.ErrorMessage).ToArray();

                   var errorResponse = new ApiValidationErrorResponse
                   {
                       Errors = errors
                   };

                   return new BadRequestObjectResult(errorResponse);
               };
           });

            // https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features.managing.db.html
            // Default connection goes to a Docker PostgreSQL localhost server
            services.AddDbContext<StoreContext>(options =>
            {
                var env = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");
                // Depending on if in development or production, use either AWS RDS or localhost
                // For AWS/Github Code Pipeline
                if (env == "Development")
                {
                    // Use connection string from file.
                    options.UseNpgsql(config.GetConnectionString("DefaultConnection"));
                }
                else
                {
                    // Use AWS connection string
                    // string dbname = Environment.GetEnvironmentVariable("RDS_DB_NAME");
                    // string username = Environment.GetEnvironmentVariable("RDS_USERNAME");
                    // string password = Environment.GetEnvironmentVariable("RDS_PASSWORD");
                    // string hostname = Environment.GetEnvironmentVariable("RDS_HOSTNAME");
                    // string port = Environment.GetEnvironmentVariable("RDS_PORT");

                    // string awsConnection = "Data Source=" + hostname + ";Initial Catalog=" + dbname + ";User ID=" + username + ";Password=" + password + ";";
                    // options.UseNpgsql(awsConnection);

                    options.UseNpgsql(config.GetConnectionString("AwsConnection"));
                }
            });

            // Default connection goes to a Docker PostgreSQL localhost server
            services.AddDbContext<IdentityDataContext>(options =>
            {
                var env = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");
                // Depending on if in development or production, use either AWS RDS or localhost
                // For AWS/Github Code Pipeline
                if (env == "Development")
                {
                    // Use connection string from file.
                    options.UseNpgsql(config.GetConnectionString("DefaultConnection"));
                }
                else
                {
                    // Use AWS connection string
                    // string dbname = Environment.GetEnvironmentVariable("RDS_DB_NAME");
                    // string username = Environment.GetEnvironmentVariable("RDS_USERNAME");
                    // string password = Environment.GetEnvironmentVariable("RDS_PASSWORD");
                    // string hostname = Environment.GetEnvironmentVariable("RDS_HOSTNAME");
                    // string port = Environment.GetEnvironmentVariable("RDS_PORT");

                    // string awsConnection = "Data Source=" + hostname + ";Initial Catalog=" + dbname + ";User ID=" + username + ";Password=" + password + ";";
                    // options.UseNpgsql(awsConnection);

                    options.UseNpgsql(config.GetConnectionString("AwsConnection"));
                }
            });

            return services;
        }
    }
}