using Application.Interfaces;
using Infrastructures.Mappers;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;


namespace Infrastructures
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructuresService(this IServiceCollection services, string databaseConnection)
        {
            
            services.AddScoped<IUnitOfWork, UnitOfWork>();




            //services.AddDbContext<AppDbContext>(option => option.UseInMemoryDatabase("test"));
            services.AddDbContext<SWP391_DiamondShopContext>(options =>
            {
                options.UseSqlServer(databaseConnection);
            });
            services.AddAutoMapper(typeof(MapperConfigurationsProfile).Assembly);

            return services;
        }
    }
}
