using Application.Services;
using Application.ViewModels.Origins;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces.Origin
{
    public interface IOriginService
    {
        Task<ServiceResponse<IEnumerable<OriginDTO>>> GetAllOriginAsync();
        Task<ServiceResponse<OriginDTO>> GetOriginAsync(int id);
        Task<ServiceResponse<OriginDTO>> CreateOriginAsync(UpsertOriginDTO CreatedOriginDTO);
        Task<ServiceResponse<OriginDTO>> UpdateOriginAsync(int id, UpsertOriginDTO OriginDTO);
        Task<ServiceResponse<bool>> DeleteOriginAsync(int id);
    }
}
