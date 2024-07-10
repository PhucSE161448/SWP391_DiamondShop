using Application.Interfaces;
using Application.Interfaces.Account;
using Application.Interfaces.Authenticates;
using Application.Interfaces.Carts;
using Application.Interfaces.Categories;
using Application.Interfaces.Collections;
using Application.Interfaces.Diamond;
using Application.Interfaces.DiamondCases;
using Application.Interfaces.Groups;
using Application.Interfaces.Images;
using Application.Interfaces.Orders;
using Application.Interfaces.Payments;
using Application.Interfaces.ProductParts;
using Application.Interfaces.Products;
using Application.Interfaces.ProductSizes;
using Application.Interfaces.Vouchers;
using Application.Interfaces.WarrantyDocument;
using Application.IRepositories.Accounts;
using Application.IRepositories.Carts;
using Application.IRepositories.Categories;
using Application.IRepositories.Collections;
using Application.IRepositories.DiamondCases;
using Application.IRepositories.Diamonds;
using Application.IRepositories.Groups;
using Application.IRepositories.Images;
using Application.IRepositories.Orders;
using Application.IRepositories.Payments;
using Application.IRepositories.ProductParts;
using Application.IRepositories.Products;
using Application.IRepositories.ProductSizes;
using Application.IRepositories.Roles;
using Application.IRepositories.Vouchers;
using Application.IRepositories.WarrantyDocuments;
using Application.Services;
using Application.Services.Accounts;
using Application.Services.Authenticates;
using Application.Services.Carts;
using Application.Services.Categories;
using Application.Services.Collections;
using Application.Services.DiamondCases;
using Application.Services.Diamonds;
using Application.Services.Groups;
using Application.Services.Images;
using Application.Services.Orders;
using Application.Services.Payments;
using Application.Services.ProductParts;
using Application.Services.Products;
using Application.Services.ProductSizes;
using Application.Services.Vouchers;
using Application.Services.WarrantyDocuments;
using Google.Cloud.Storage.V1;
using Infrastructures.Mappers;
using Infrastructures.Repositories.Accounts;
using Infrastructures.Repositories.Carts;
using Infrastructures.Repositories.Categories;
using Infrastructures.Repositories.Collections;
using Infrastructures.Repositories.DiamondCases;
using Infrastructures.Repositories.Diamonds;
using Infrastructures.Repositories.Groups;
using Infrastructures.Repositories.Images;
using Infrastructures.Repositories.Orders;
using Infrastructures.Repositories.Payments;
using Infrastructures.Repositories.ProductParts;
using Infrastructures.Repositories.Products;
using Infrastructures.Repositories.ProductSizes;
using Infrastructures.Repositories.Roles;
using Infrastructures.Repositories.Vouchers;
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

            services.AddScoped<IVoucherService, VoucherService>();
            services.AddScoped<IVoucherRepository, VoucherRepository>();
            
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

            services.AddScoped<ICartRepository, CartRepository>();
            services.AddScoped<ICartService, CartService>();

            services.AddScoped<IPaymentRepo, PaymentRepo>();
            services.AddScoped<IPaymentService, PaymentService>();

            services.AddScoped<IGroupRepo, GroupRepo>();
            services.AddScoped<IGroupService, GroupService>();

            services.AddScoped<IRoleRepo, RoleRepo>();

            services.AddSingleton<ICurrentTime, CurrentTime>();
            
            services.AddSingleton(opt => StorageClient.Create());

            services.AddScoped<IFirebaseStorageService, FirebaseStorageService>();

            services.AddScoped<IImageRepo, ImageRepo>();
            services.AddScoped<IImageService, ImageService>();
            
            services.AddScoped<IDiamondCaseRepo, DiamondCaseRepo>();
            services.AddScoped<IDiamondCaseService, DiamondCaseService>();

            services.AddScoped<ICollectionRepo, CollectionRepo>();
            services.AddScoped<ICollectionService, CollectionService>();

            services.AddScoped<IOrderRepo, OrderRepo>();
            services.AddScoped<IOrderService, OrderService>();
            
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
