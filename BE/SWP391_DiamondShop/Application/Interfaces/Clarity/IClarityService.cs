using Application.Services;
using Application.ViewModels.Clarities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces.Clarity
{
    public interface IClarityService
    {
        Task<IEnumerable<ClarityDTO>> GetAllClarityAsync();
        Task<ClarityDTO> GetClarityAsync(int id);
        Task<ClarityDTO> CreateClarityAsync(UpsertClarityDTO CreatedClarityDTO);
        Task<ClarityDTO> UpdateClarityAsync(int id, UpsertClarityDTO ClarityDTO);
        Task DeleteClarityAsync(int id);
    }
}
