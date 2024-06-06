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
using Application.IRepositories.Categories;

namespace Application.Interfaces
{
    public interface IUnitOfWork
    {
        public IWarrantyDocumentRepo WarrantyDocumentRepo { get; }
        public IDiamondRepo DiamondRepo { get; }
        public IAccountRepo AccountRepo { get; }
        public IProductRepo ProductRepo { get; }
        public ICategoryRepo CategoryRepo { get; }
        public Task<int> SaveChangeAsync();
    }
}
