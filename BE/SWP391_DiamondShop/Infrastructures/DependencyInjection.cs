using Application.Interfaces;
using Application.Interfaces.Account;
using Application.Interfaces.Authenticates;
using Application.Interfaces.CaratWeights;
using Application.Interfaces.Clarity;
using Application.Interfaces.Cut;
using Application.Interfaces.Origin;
using Application.Interfaces.Products;
using Application.Interfaces.WarrantyDocument;
using Application.IRepositories.Accounts;
using Application.IRepositories.CaratWeights;
using Application.IRepositories.Clarities;
using Application.IRepositories.Cuts;
using Application.IRepositories.Origins;
using Application.IRepositories.Products;
using Application.IRepositories.WarrantyDocuments;
using Application.Services.Accounts;
using Application.Services.Authenticates;
using Application.Services.CaratWeights;
using Application.Services.Clarities;
using Application.Services.Cuts;
using Application.Services.Origins;
using Application.Services.Products;
using Application.Services.WarrantyDocuments;
using Infrastructures.Mappers;
using Infrastructures.Repositories.Accounts;
using Infrastructures.Repositories.CaratWeights;
using Infrastructures.Repositories.Clarities;
using Infrastructures.Repositories.Cuts;
using Infrastructures.Repositories.Origins;
using Infrastructures.Repositories.Products;
using Infrastructures.Repositories.WarrantyDocuments;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Restaurant.Application.Services;

namespace Infrastructures
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructuresService(this IServiceCollection services, string databaseConnection)
        {
            
            services.AddScoped<IUnitOfWork, UnitOfWork>();

            services.AddScoped<ICutRepo, CutRepo>();
            services.AddScoped<ICutService, CutService>();

            services.AddScoped<IClarityRepo, ClarityRepo>();
            services.AddScoped<IClarityService, ClarityService>();

            services.AddScoped<IOriginRepo, OriginRepo>();
            services.AddScoped<IOriginService, OriginService>();

            services.AddScoped<ICaratWeightRepo, CaratWeightRepo>();
            services.AddScoped<ICaratWeightService, CaratWeightService>();

            services.AddScoped<IWarrantyDocumentRepo, WarrantyDocumentRepo>();
            services.AddScoped<IWarrantyDocumentService, WarrantyDocumentService>();

            services.AddScoped<IAccountRepo, AccountRepo>();
            services.AddScoped<IAccountService, AccountService>();

            services.AddScoped<IProductRepo, ProductRepo>();
            services.AddScoped<IProductService, ProductService>();

            services.AddScoped<IAuthenticationService, AuthenticationService>();

            services.AddSingleton<ICurrentTime, CurrentTime>();
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
