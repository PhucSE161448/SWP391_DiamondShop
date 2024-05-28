using Application.Interfaces;
using Application.IRepositories.CaratWeights;
using Application.IRepositories.Clarity;
using Application.IRepositories.Cut;
using Application.IRepositories.Origin;
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

        public UnitOfWork(SWP391_DiamondShopContext _context, ICaratWeightRepo _caratWeightRepo,
            IClarityRepo _clarityRepo, ICutRepo _cutRepo,
            IOriginRepo _originRepo)
        {
            context = _context;
            caratWeightRepo = _caratWeightRepo;
            clarityRepo = _clarityRepo;
            cutRepo = _cutRepo;
            originRepo = _originRepo;
        }

        public ICutRepo CutRepo => cutRepo;
        public IClarityRepo ClarityRepo => clarityRepo;
        public ICaratWeightRepo CaratWeightRepo => caratWeightRepo;
        public IOriginRepo OriginRepo => originRepo;
        public async Task<int> SaveChangeAsync()
        {
            return await context.SaveChangesAsync();
        }
    }
}
