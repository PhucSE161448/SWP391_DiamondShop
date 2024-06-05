using Application.IRepositories;
using Application.IRepositories.Accounts;
using Application.IRepositories.CaratWeights;
using Application.IRepositories.Clarities;
using Application.IRepositories.Cuts;
using Application.IRepositories.Diamonds;
using Application.IRepositories.Origins;
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
        public ICaratWeightRepo CaratWeightRepo { get; }
        public IClarityRepo ClarityRepo { get; }
        public ICutRepo CutRepo { get; }
        public IOriginRepo OriginRepo { get; }
        public IWarrantyDocumentRepo WarrantyDocumentRepo { get; }
        public IDiamondRepo DiamondRepo { get; }
        public IAccountRepo AccountRepo { get; }
        public IProductRepo ProductRepo { get; }
        public ICategoryRepo CategoryRepo { get; }
        public Task<int> SaveChangeAsync();
    }
}
