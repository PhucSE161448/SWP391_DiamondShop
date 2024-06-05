using Application.Commons;
using Application.ViewModels.Diamonds;
using Domain.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.IRepositories.Diamonds
{
    public interface IDiamondRepo : IGenericRepository<Diamond>
    {
        Task<Diamond?> GetDiamondDetailById(int id);
        Task<Pagination<Diamond>> GetPagedDiamonds(QueryDiamondDTO queryDiamondDTO);
    }
}
