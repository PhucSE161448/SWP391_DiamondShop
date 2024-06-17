using Application.Interfaces;
using Application.Interfaces.Account;
using Application.Interfaces.Authenticates;
using Application.Interfaces.Categories;
using Application.Interfaces.Diamond;
using Application.Interfaces.Images;
using Application.Interfaces.ProductParts;
using Application.Interfaces.Products;
using Application.Interfaces.ProductSizes;
using Application.Interfaces.WarrantyDocument;
using Application.IRepositories.Accounts;
using Application.IRepositories.Categories;
using Application.IRepositories.Diamonds;
using Application.IRepositories.Images;
using Application.IRepositories.ProductParts;
using Application.IRepositories.Products;
using Application.IRepositories.ProductSizes;
using Application.IRepositories.Roles;
using Application.IRepositories.WarrantyDocuments;
using Application.Services;
using Application.Services.Accounts;
using Application.Services.Authenticates;
using Application.Services.Categories;
using Application.Services.Diamonds;
using Application.Services.Images;
using Application.Services.ProductParts;
using Application.Services.Products;
using Application.Services.ProductSizes;
using Application.Services.WarrantyDocuments;
using Google.Cloud.Storage.V1;
using Infrastructures.Mappers;
using Infrastructures.Repositories.Accounts;
using Infrastructures.Repositories.Categories;
using Infrastructures.Repositories.Diamonds;
using Infrastructures.Repositories.Images;
using Infrastructures.Repositories.ProductParts;
using Infrastructures.Repositories.Products;
using Infrastructures.Repositories.ProductSizes;
using Infrastructures.Repositories.Roles;
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
            services.AddScoped<IProductPartService, ProductPartService>();

            services.AddScoped<IProductSizeRepo, ProductSizeRepo>();
            services.AddScoped<IProductSizeService, ProductSizeService>();

            services.AddScoped<IRoleRepo, RoleRepo>();

            services.AddSingleton<ICurrentTime, CurrentTime>();
            
            services.AddSingleton(opt => StorageClient.Create());

            services.AddScoped<IFirebaseStorageService, FirebaseStorageService>();

            services.AddScoped<IImageRepo, ImageRepo>();
            services.AddScoped<IImageService, ImageService>();
            //services.AddDbContext<AppDbContext>(option => option.UseInMemoryDatabase("test"));
            services.AddDbContext<SWP391_DiamondShopContext>(options =>
            {
                options.UseSqlServer(databaseConnection);
            });
            services.AddMapsterConfigurations();
            return services;
        }
    }
}
