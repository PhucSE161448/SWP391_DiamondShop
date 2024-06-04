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
        Task<IEnumerable<OriginDTO>> GetAllOriginAsync();
        Task<OriginDTO> GetOriginAsync(int id);
        Task<OriginDTO> CreateOriginAsync(UpsertOriginDTO CreatedOriginDTO);
        Task<OriginDTO> UpdateOriginAsync(int id, UpsertOriginDTO OriginDTO);
        Task DeleteOriginAsync(int id);
    }
}
