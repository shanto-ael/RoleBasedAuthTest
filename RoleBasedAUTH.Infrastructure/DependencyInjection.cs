using Microsoft.Extensions.DependencyInjection;
using RoleBasedAUTH.Infrastructure.Abstraction;

namespace RoleBasedAUTH.Infrastructure
{
    public static class DependencyInjection
    {
        public static IServiceCollection ConfigureDatabase(this IServiceCollection services)
        {
            services.AddSingleton<DapperDbContext>();
            services.AddScoped<IAuthRepository, AuthRepository>();
            services.AddScoped<ServiceConfigure>();
            return services;
        }

    }
}
