using Microsoft.Extensions.DependencyInjection;
using RoleBasedAUTH.Application.Abstraction;

namespace RoleBasedAUTH.Application
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddConfigureServices(this IServiceCollection services)
        {
            services.AddScoped<IAuthService,AuthService>();
            services.AddScoped<IUserService,UserService>();
            return services;
        }
    }
}
