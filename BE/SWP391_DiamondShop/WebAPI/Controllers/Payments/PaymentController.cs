using Application.Interfaces.Categories;
using Application.Interfaces.Payments;
using Application.ViewModels.Categories;
using Application.ViewModels;
using Application.ViewModels.Payments;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers.Payments
{
    public class PaymentController : BaseController
    {
        private readonly IPaymentService _service;

        public PaymentController(IPaymentService service)
        {
            _service = service;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] AddPaymentDTO addPaymentDto)
        {
            var result = await _service.AddPayment(addPaymentDto);
            return Created(nameof(Create), result);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] UpdatePaymentDTO updatePaymentDto)
        {
            var result = await _service.UpdatePayment(id, updatePaymentDto);
            return Ok(result);
        }

        [HttpPut("{PaymentId}/{isDeleted}")]
        public async Task<IActionResult> Delete(int PaymentId, int isDeleted)
        {
            await _service.DeleteOrEnable(PaymentId, isDeleted > 0);
            return NoContent();
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var result = await _service.GetPaymentById(id);
            return Ok(result);
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var result = await _service.GetAllPayment();
            return Ok(result);
        }
    }
}
