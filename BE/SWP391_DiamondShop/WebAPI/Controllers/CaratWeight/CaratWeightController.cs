using Application.Interfaces.CaratWeights;
using Application.ViewModels.CaratWeights;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers.CaratWeight
{
    public class CaratWeightController : BaseController
    {
        private readonly ICaratWeightService service;
        public CaratWeightController(ICaratWeightService _service)
        {
            service = _service;
        }
        [HttpGet]
        public async Task<IActionResult> GetList()
        {
            var result = await service.GetAllCaratWeightAsync();
            return Ok(result);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var result = await service.GetCaratWeightAsync(id);
            return Ok(result);
        }
        [HttpPost]
        public async Task<IActionResult> Create([FromForm] UpsertCaratWeightDTO createdDTO)
        {
            var result = await service.CreateCaratWeightAsync(createdDTO);
            return Created(nameof(Create), result);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromForm] UpsertCaratWeightDTO DTO)
        {
            var result = await service.UpdateCaratWeightAsync(id, DTO);
            return Ok(result);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await service.DeleteCaratWeightAsync(id);
            return NoContent();
        }
    }
}
