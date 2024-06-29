using Application.IRepositories;
using Application.IRepositories.Accounts;
using Application.IRepositories.Diamonds;
using Application.IRepositories.Products;
using Application.IRepositories.WarrantyDocuments;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.IRepositories.Carts;
using Application.IRepositories.Categories;
using Application.IRepositories.Collections;
using Application.IRepositories.DiamondCases;
using Application.IRepositories.Images;
using Application.IRepositories.ProductParts;
using Application.IRepositories.ProductSizes;
using Application.IRepositories.Roles;

namespace Application.Interfaces
{
    public interface IUnitOfWork
    {
        public IWarrantyDocumentRepo WarrantyDocumentRepo { get; }
        public IDiamondRepo DiamondRepo { get; }
        public IAccountRepo AccountRepo { get; }
        public IProductRepo ProductRepo { get; }
        public ICategoryRepo CategoryRepo { get; }
        public ICartRepository CartRepository { get; }
        public IProductPartRepo ProductPartRepo { get; }
        public IProductSizeRepo ProductSizeRepo { get; }
        public IRoleRepo RoleRepo { get; }
        public IImageRepo ImageRepo { get; }
        public IDiamondCaseRepo DiamondCaseRepo { get; }
        public ICollectionRepo CollectionRepo { get; }
        public Task<int> SaveChangeAsync();
    }
}
