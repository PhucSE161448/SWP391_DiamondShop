using Application.Interfaces.Diamond;
using Application.Interfaces.Products;
using Application.ViewModels.Diamonds;
using Application.ViewModels.Products;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers.Diamond
{
    public class DiamondController : BaseController
    {
        private readonly IDiamondService service;
        public DiamondController(IDiamondService _service)
        {
            service = _service;
        }
        [HttpGet]
        public async Task<IActionResult> GetPagedDiamonds([FromQuery] QueryDiamondDTO queryDiamondDTO)
        {
            return Ok(await service.GetPageDiamonds(queryDiamondDTO));
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetDiamondDetailById(int id)
        {
            var response = await service.GetDiamondDetailById(id);
            return Ok(response);

        }
    }
}
