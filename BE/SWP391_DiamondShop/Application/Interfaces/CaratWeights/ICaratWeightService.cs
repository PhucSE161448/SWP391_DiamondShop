using Application.Services;
using Application.ViewModels.CaratWeights;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces.CaratWeights
{
    public interface ICaratWeightService
    {
        Task<ServiceResponse<IEnumerable<CaratWeightDTO>>> GetAllCaratWeightAsync();
        Task<ServiceResponse<CaratWeightDTO>> GetCaratWeightAsync(int id);
        Task<ServiceResponse<CaratWeightDTO>> CreateCaratWeightAsync(UpsertCaratWeightDTO CreatedCaratWeightDTO);
        Task<ServiceResponse<CaratWeightDTO>> UpdateCaratWeightAsync(int id, UpsertCaratWeightDTO CaratWeightDTO);
        Task<ServiceResponse<bool>> DeleteCaratWeightAsync(int id);
    }
}
