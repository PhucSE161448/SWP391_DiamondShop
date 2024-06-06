using Application.Commons;
using Application.Services;
using Application.ViewModels.Diamonds;
using Application.ViewModels.Products;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces.Diamond
{
    public interface IDiamondService
    {
        Task<GetDiamondIdDTO> CreateDiamond(CreateDiamondDTO createDiamondDto);
        Task UpdateDiamond(int id, UpdateDiamondDTO updateDiamondDto);
        Task<Pagination<GetDiamondPaginationDTO>> GetPageDiamonds(QueryDiamondDTO queryDiamondDTO);
        Task<GetDiamondDetailDTO> GetDiamondDetailById(int id);
    }
}
