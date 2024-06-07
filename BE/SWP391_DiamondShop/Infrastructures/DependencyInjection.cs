using Application.Interfaces;
using Application.Interfaces.Account;
using Application.Interfaces.Authenticates;
using Application.Interfaces.Categories;
using Application.Interfaces.Diamond;
using Application.Interfaces.Products;
using Application.Interfaces.WarrantyDocument;
using Application.IRepositories.Accounts;
using Application.IRepositories.Categories;
using Application.IRepositories.Diamonds;
using Application.IRepositories.ProductParts;
using Application.IRepositories.Products;
using Application.IRepositories.ProductSizes;
using Application.IRepositories.WarrantyDocuments;
using Application.Services.Accounts;
using Application.Services.Authenticates;
using Application.Services.Categories;
using Application.Services.Diamonds;
using Application.Services.Products;
using Application.Services.WarrantyDocuments;
using Infrastructures.Mappers;
using Infrastructures.Repositories.Accounts;
using Infrastructures.Repositories.Categories;
using Infrastructures.Repositories.Diamonds;
using Infrastructures.Repositories.ProductParts;
using Infrastructures.Repositories.Products;
using Infrastructures.Repositories.ProductSizes;
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
            

            services.AddScoped<IWarrantyDocumentRepo, WarrantyDocumentRepo>();
            services.AddScoped<IWarrantyDocumentService, WarrantyDocumentService>();

            services.AddScoped<IAccountRepo, AccountRepo>();
            services.AddScoped<IAccountService, AccountService>();

            services.AddScoped<IProductRepo, ProductRepo>();
            services.AddScoped<IProductService, ProductService>();

            services.AddScoped<IDiamondRepo, DiamondRepo>();
            services.AddScoped<IDiamondService, DiamondService>();

            services.AddScoped<IAuthenticationService, AuthenticationService>();

            services.AddScoped<ICategoryRepo, CategoryRepo>();
            services.AddScoped<ICategoryService, CategoryService>();

            services.AddScoped<IProductPartRepo, ProductPartRepo>();

            services.AddScoped<IProductSizeRepo, ProductSizeRepo>();

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
