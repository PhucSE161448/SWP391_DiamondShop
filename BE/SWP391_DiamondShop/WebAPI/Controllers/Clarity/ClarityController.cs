using Application.Interfaces.Clarity;
using Application.ViewModels.Clarities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers.Clarity
{
    public class ClarityController : BaseController
    {
        private readonly IClarityService service;
        public ClarityController(IClarityService _service)
        {
            service = _service;
        }
        [HttpGet]
        public async Task<IActionResult> GetList()
        {
            var result = await service.GetAllClarityAsync();
            return Ok(result);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var result = await service.GetClarityAsync(id);
            return Ok(result);
        }
        [HttpPost]
        public async Task<IActionResult> Create([FromForm] UpsertClarityDTO createdDTO)
        {
            var result = await service.CreateClarityAsync(createdDTO);
            return Created(nameof(Create), result);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromForm] UpsertClarityDTO DTO)
        {
            var result = await service.UpdateClarityAsync(id, DTO);
            return Ok(result);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await service.DeleteClarityAsync(id);
            return NoContent();
        }
    }
}
