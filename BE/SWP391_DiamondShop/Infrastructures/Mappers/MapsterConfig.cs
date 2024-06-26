using Application.ViewModels.Categories;
using Application.ViewModels.DiamondCases;
using Application.ViewModels.Diamonds;
using Application.ViewModels.Products;
using Domain.Model;
using Microsoft.Extensions.DependencyInjection;
using Mapster;
namespace Infrastructures.Mappers;

public static class MapsterConfig
{
    public static IServiceCollection AddMapsterConfigurations( this IServiceCollection services)
    {
        services.AddMapster();
        TypeAdapterConfig<UpdateDiamondDTO, Diamond>.NewConfig().IgnoreNullValues(true);
        TypeAdapterConfig<UpdateProductDTO, Product>.NewConfig().IgnoreNullValues(true);
        TypeAdapterConfig<UpdateCategoryDTO, Category>.NewConfig().IgnoreNullValues(true);
        TypeAdapterConfig<UpdateDiamondCaseDTO, DiamondCase>.NewConfig().IgnoreNullValues(true);
        return services;
    }
}