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
        Task<IEnumerable<CaratWeightDTO>> GetAllCaratWeightAsync();
        Task<CaratWeightDTO> GetCaratWeightAsync(int id);
        Task<CaratWeightDTO> CreateCaratWeightAsync(UpsertCaratWeightDTO CreatedCaratWeightDTO);
        Task<CaratWeightDTO> UpdateCaratWeightAsync(int id, UpsertCaratWeightDTO CaratWeightDTO);
        Task DeleteCaratWeightAsync(int id);
    }
}
