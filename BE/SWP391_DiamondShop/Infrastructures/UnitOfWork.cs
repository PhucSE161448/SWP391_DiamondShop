using Application.Interfaces;
using Application.IRepositories.Accounts;
using Application.IRepositories.CaratWeights;
using Application.IRepositories.Clarities;
using Application.IRepositories.Cuts;
using Application.IRepositories.Origins;
using Application.IRepositories.Products;
using Application.IRepositories.WarrantyDocuments;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructures
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly SWP391_DiamondShopContext context;

        private readonly ICaratWeightRepo caratWeightRepo;
        private readonly IClarityRepo clarityRepo;
        private readonly ICutRepo cutRepo;
        private readonly IOriginRepo originRepo;
        private readonly IWarrantyDocumentRepo warrantyDocumentRepo;
        private readonly IAccountRepo accountRepo;
        private readonly IProductRepo productRepo;
        public UnitOfWork(SWP391_DiamondShopContext _context, ICaratWeightRepo _caratWeightRepo,
            IClarityRepo _clarityRepo, ICutRepo _cutRepo,
            IOriginRepo _originRepo, IWarrantyDocumentRepo _warrantyDocumentRepo, IAccountRepo _accountRepo, IProductRepo _productRepo)
        {
            context = _context;
            caratWeightRepo = _caratWeightRepo;
            clarityRepo = _clarityRepo;
            cutRepo = _cutRepo;
            originRepo = _originRepo;
            warrantyDocumentRepo = _warrantyDocumentRepo;
            accountRepo = _accountRepo;
            productRepo = _productRepo;
        }

        public ICutRepo CutRepo => cutRepo;
        public IClarityRepo ClarityRepo => clarityRepo;
        public ICaratWeightRepo CaratWeightRepo => caratWeightRepo;
        public IOriginRepo OriginRepo => originRepo;
        public IWarrantyDocumentRepo WarrantyDocumentRepo => warrantyDocumentRepo;
        public IAccountRepo AccountRepo => accountRepo;
        public IProductRepo ProductRepo => productRepo;
        public async Task<int> SaveChangeAsync()
        {
            return await context.SaveChangesAsync();
        }
    }
}
