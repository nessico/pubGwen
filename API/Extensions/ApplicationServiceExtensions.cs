using System;
using Infrastructure.Data;
using API.Helpers;
using Core.Interfaces;
using API.Services;
using API.SignalR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace API.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
            services.AddSingleton<PresenceTracker>();
            services.Configure<CloudinarySettings>(config.GetSection("CloudinarySettings"));
            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<IPhotoService, PhotoService>();
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddScoped<LogUserActivity>();
            services.AddAutoMapper(typeof(AutoMapperProfiles).Assembly);
            services.AddDbContext<StoreContext>(options => options.UseNpgsql(config.GetConnectionString("DefaultConnection")));
            services.AddDbContext<DataContext>(options =>
            {
                var env = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");
                // Depending on if in development or production, use either AWS or default connection
                // For AWS/Github Code Pipeline LESSSS GOO!!
                if (env == "Development")
                {
                    // Use connection string from file.
                    options.UseNpgsql(config.GetConnectionString("DefaultConnection"));
                }
                else
                {
                    //use AWS connection string
                    string dbname = Environment.GetEnvironmentVariable("RDS_DB_NAME");
                    string username = Environment.GetEnvironmentVariable("RDS_USERNAME");
                    string password = Environment.GetEnvironmentVariable("RDS_PASSWORD");
                    string hostname = Environment.GetEnvironmentVariable("RDS_HOSTNAME");
                    string port = Environment.GetEnvironmentVariable("RDS_PORT");

                    string awsConnection = "Server=" + hostname + ";Database=" + dbname + ";User ID=" + username + ";Password=" + password + ";";
                    options.UseNpgsql(awsConnection);
                }
            });
            return services;
        }
    }
}