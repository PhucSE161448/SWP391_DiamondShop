
using AutoMapper;
using Application.Commons;
using Domain.Model;
using Application.ViewModels.WarrantyDocuments;
using Application.ViewModels.Accounts;
using Application.ViewModels.Products;
using Application.ViewModels.Categories;
using Application.ViewModels.Diamonds;
using Application.ViewModels.ProductSize;
using Application.ViewModels.Images;
using Application.ViewModels.ProductParts;

namespace Infrastructures.Mappers
{
    public class MapperConfigurationsProfile : Profile
    {
        public MapperConfigurationsProfile()
        {
            CreateMap(typeof(Pagination<>), typeof(Pagination<>));

            CreateMap<Account, AccountDTO>().ReverseMap();
            CreateMap<Account, CreatedAccountDTO>().ReverseMap();
            CreateMap<RegisterAccountDTO, Account>().ReverseMap();
            CreateMap<RegisterAccountDTO, AccountDTO>();
            CreateMap<Account, UpdatedAccountDTO>().ReverseMap();
            

            CreateMap<WarrantyDocument, WarrantyDocumentDTO>().ReverseMap();
            CreateMap<WarrantyDocumentDTO, UpsertWarrantyDocumentDTO>().ReverseMap();
            CreateMap<WarrantyDocument, UpsertWarrantyDocumentDTO>().ReverseMap();

            CreateMap<GetProductPaginationDTO, Product>().ReverseMap();
            CreateMap<GetProductDetailDTO, Product>().ReverseMap();

            CreateMap<CategoryDTO, Category>().ReverseMap();
            CreateMap<Category, CreatedAccountDTO>().ReverseMap();
            CreateMap<Category, UpdateCategoryDTO>().ReverseMap();

            CreateMap<DiamondDTO, Diamond>().ReverseMap();
            CreateMap<GetDiamondPaginationDTO, Diamond>().ReverseMap();
            CreateMap<GetDiamondDetailDTO, Diamond>().ReverseMap();
            CreateMap<Diamond, CreateDiamondDTO>().ReverseMap();
            CreateMap<UpdateDiamondDTO, Diamond>()
                .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null));

            CreateMap<ProductSize, ProductSizeDTO>().ReverseMap();

            CreateMap<ProductPart, ProductPartDTO>().ReverseMap();

            CreateMap<Image, ImageDTO>().ReverseMap();
        }
    }
}
