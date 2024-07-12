using Application.Interfaces.Vouchers;
using Application.ViewModels.Diamonds;
using Application.ViewModels.Vouchers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers.Vouchers
{
    public class VoucherController : BaseController
    {
        private readonly IVoucherService _voucherService;
        public VoucherController(IVoucherService voucherService)
        {
            _voucherService = voucherService;
        }
        [HttpPost]
        public async Task<IActionResult> CreateVoucher([FromBody] CreateVoucherDTO createVoucherDTO)
        {
            return Created(nameof(CreateVoucher), await _voucherService.CreateVoucherAsync(createVoucherDTO));
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetVoucherById(int id)
        {
            var response = await _voucherService.GetVoucherByIdAsync(id);
            return Ok(response);

        }
        [HttpGet]
        public async Task<IActionResult> GetAllVoucher()
        {
            var response = await _voucherService.GetAllVoucherAsync();
            return Ok(response);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVoucher(int id)
        {
            var isSuccess = await _voucherService.DeleteVoucherAsync(id);

                return Ok(isSuccess);
        }
    }
}
