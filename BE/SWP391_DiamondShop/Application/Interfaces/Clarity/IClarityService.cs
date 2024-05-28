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
        Task<ServiceResponse<IEnumerable<ClarityDTO>>> GetAllClarityAsync();
        Task<ServiceResponse<ClarityDTO>> GetClarityAsync(int id);
        Task<ServiceResponse<ClarityDTO>> CreateClarityAsync(UpsertClarityDTO CreatedClarityDTO);
        Task<ServiceResponse<ClarityDTO>> UpdateClarityAsync(int id, UpsertClarityDTO ClarityDTO);
        Task<ServiceResponse<bool>> DeleteClarityAsync(int id);
    }
}
