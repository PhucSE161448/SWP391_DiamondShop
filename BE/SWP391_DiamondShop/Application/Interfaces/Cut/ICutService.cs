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
        Task<IEnumerable<CutDTO>> GetAllCutAsync();
        Task<CutDTO> GetCutAsync(int id);
        Task<CutDTO> CreateCutAsync(UpsertCutDTO CreatedCutDTO);
        Task<CutDTO> UpdateCutAsync(int id, UpsertCutDTO CutDTO);
        Task DeleteCutAsync(int id);
    }
}
