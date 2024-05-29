using Application.IRepositories.Accounts;
using Application.IRepositories.CaratWeights;
using Application.IRepositories.Clarities;
using Application.IRepositories.Cuts;
using Application.IRepositories.Origins;
using Application.IRepositories.WarrantyDocuments;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface IUnitOfWork
    {
        public ICaratWeightRepo CaratWeightRepo { get; }
        public IClarityRepo ClarityRepo { get; }
        public ICutRepo CutRepo { get; }
        public IOriginRepo OriginRepo { get; }
        public IWarrantyDocumentRepo WarrantyDocumentRepo { get; }

        public IAccountRepo AccountRepo { get; }
        public Task<int> SaveChangeAsync();
    }
}
