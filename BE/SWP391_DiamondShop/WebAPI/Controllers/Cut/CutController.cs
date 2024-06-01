using Application.Interfaces.Cut;
using Application.ViewModels.Clarities;
using Application.ViewModels.Cuts;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers.Cut
{
    public class CutController : BaseController
    {
        private readonly ICutService service;
        public CutController(ICutService _service)
        {
            service = _service;
        }
        [HttpGet]
        public async Task<IActionResult> GetList()
        {
            var result = await service.GetAllCutAsync();
            return Ok(result);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var result = await service.GetCutAsync(id);
            return Ok(result);
        }
        [HttpPost]
        public async Task<IActionResult> Create([FromForm] UpsertCutDTO createdDTO)
        {
            var result = await service.CreateCutAsync(createdDTO);
            if (!result.Success)
            {
                return BadRequest(result);
            }
            else
            {
                return Ok(result);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromForm] UpsertCutDTO DTO)
        {
            var result = await service.UpdateCutAsync(id, DTO);
            if (!result.Success)
            {
                return NotFound(result);
            }
            return Ok(result);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await service.DeleteCutAsync(id);
            if (!result.Success)
            {
                return NotFound(result);
            }
            return Ok(result);
        }
    }
}
