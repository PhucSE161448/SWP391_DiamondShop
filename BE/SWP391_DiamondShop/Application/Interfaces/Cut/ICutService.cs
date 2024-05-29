using Application.Services;
using Application.ViewModels.Cuts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces.Cut
{
    public interface ICutService
    {
        Task<ServiceResponse<IEnumerable<CutDTO>>> GetAllCutAsync();
        Task<ServiceResponse<CutDTO>> GetCutAsync(int id);
        Task<ServiceResponse<CutDTO>> CreateCutAsync(UpsertCutDTO CreatedCutDTO);
        Task<ServiceResponse<CutDTO>> UpdateCutAsync(int id, UpsertCutDTO CutDTO);
        Task<ServiceResponse<bool>> DeleteCutAsync(int id);
    }
}
