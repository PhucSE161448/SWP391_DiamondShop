using Application.IRepositories.CaratWeights;
using Application.IRepositories.Clarity;
using Application.IRepositories.Cut;
using Application.IRepositories.Origin;
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
