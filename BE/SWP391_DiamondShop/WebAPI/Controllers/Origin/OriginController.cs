using Application.Interfaces.Origin;
using Application.ViewModels.Clarities;
using Application.ViewModels.Origins;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Buffers.Text;

namespace WebAPI.Controllers.Origin
{

    public class OriginController : BaseController
    {
        private readonly IOriginService service;
        public OriginController(IOriginService _service)
        {
            service = _service;
        }
        [HttpGet]
        public async Task<IActionResult> GetList()
        {
            var result = await service.GetAllOriginAsync();
            return Ok(result);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var result = await service.GetOriginAsync(id);
            return Ok(result);
        }
        [HttpPost]
        public async Task<IActionResult> Create([FromForm] UpsertOriginDTO createdDTO)
        {
            var result = await service.CreateOriginAsync(createdDTO);
            return Created(nameof(Create), result);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromForm] UpsertOriginDTO DTO)
        {
            var result = await service.UpdateOriginAsync(id, DTO);
            return Ok(result);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await service.DeleteOriginAsync(id);
            return NoContent();
        }
    }
}
