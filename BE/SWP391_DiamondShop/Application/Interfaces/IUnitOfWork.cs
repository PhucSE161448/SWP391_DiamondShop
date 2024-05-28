using Application.IRepositories.CaratWeights;
using Application.IRepositories.Clarities;
using Application.IRepositories.Cuts;
using Application.IRepositories.Origins;
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
        public Task<int> SaveChangeAsync();
    }
}
