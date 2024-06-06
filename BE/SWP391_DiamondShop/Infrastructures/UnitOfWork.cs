using Application.Interfaces;
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

namespace Infrastructures
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly SWP391_DiamondShopContext context;

        private readonly IWarrantyDocumentRepo warrantyDocumentRepo;
        private readonly IAccountRepo accountRepo;
        private readonly IProductRepo productRepo;
        private readonly IDiamondRepo diamondRepo;
        private readonly ICategoryRepo categoryRepo;
        public UnitOfWork(SWP391_DiamondShopContext _context, IWarrantyDocumentRepo _warrantyDocumentRepo,
            IAccountRepo _accountRepo, IProductRepo _productRepo,
            IDiamondRepo _diamondRepo, ICategoryRepo _categoryRepo)
        {
            context = _context;
            warrantyDocumentRepo = _warrantyDocumentRepo;
            accountRepo = _accountRepo;
            productRepo = _productRepo;
            diamondRepo = _diamondRepo;
            categoryRepo = _categoryRepo;
        }
        
        public IWarrantyDocumentRepo WarrantyDocumentRepo => warrantyDocumentRepo;
        public IAccountRepo AccountRepo => accountRepo;
        public IProductRepo ProductRepo => productRepo;
        public IDiamondRepo DiamondRepo => diamondRepo;

        public ICategoryRepo CategoryRepo => categoryRepo;
        public async Task<int> SaveChangeAsync()
        {
            return await context.SaveChangesAsync();
        }
    }
}
