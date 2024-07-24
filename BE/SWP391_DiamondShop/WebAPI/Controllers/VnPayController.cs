using Application.Interfaces.Orders;
using Application.Interfaces.VnPay;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Net.payOS.Types;
using Net.payOS;
using Application.Interfaces;
using Application.Ultils;

namespace WebAPI.Controllers
{
    public class VnPayController : BaseController
    {
        private readonly IConfiguration _configuration;
        private readonly IClaimsService _claimsService;
        private readonly IOrderService _orderService;
        private const decimal USD = 25m;
        public VnPayController(IConfiguration configuration, IClaimsService claimsService, IOrderService orderService)
        {
            _configuration = configuration;
            _claimsService = claimsService;
            _orderService = orderService;
        }
        [HttpPost]
        public async Task<IActionResult> Checkout([FromQuery] int userId, [FromQuery] int orderId, [FromQuery] int paymentId)
        {
            try
            {
                CreatePayLib pay = new CreatePayLib();
                var url = _configuration.GetValue<string>("VNPay:Url");
                var returnUrl = _configuration.GetValue<string>("VNPay:ReturnUrl");
                var tmnCode = _configuration.GetValue<string>("VNPay:TmnCode");
                var hashSecret = _configuration.GetValue<string>("VNPay:HashSecret");

                var order = await _orderService.GetOrderById(orderId);

                pay.AddRequestData("vnp_Version", "2.1.0"); 
                pay.AddRequestData("vnp_Command", "pay"); 
                pay.AddRequestData("vnp_TmnCode", tmnCode); 
                pay.AddRequestData("vnp_Amount", ((int)order.TotalPrice * USD * 1000).ToString()); 
                pay.AddRequestData("vnp_BankCode", ""); 
                pay.AddRequestData("vnp_CreateDate", DateTime.Now.ToString("yyyyMMddHHmmss"));
                pay.AddRequestData("vnp_CurrCode", "VND");
                pay.AddRequestData("vnp_IpAddr", "123.21.100.96");
                pay.AddRequestData("vnp_Locale", "vn"); 
                pay.AddRequestData("vnp_OrderInfo", "Pay order of DiamondShop"); 
                pay.AddRequestData("vnp_OrderType", "Bill Payment");
                pay.AddRequestData("vnp_ReturnUrl", $"{returnUrl}?userId={userId}&orderId={orderId}&paymentId={paymentId}");
                pay.AddRequestData("vnp_TxnRef", Guid.NewGuid().ToString());
                string paymentUrl = pay.CreateRequestUrl(url, hashSecret);
                return Ok(new
                {
                    message = "redirect",
                    url = paymentUrl
                });
            }
            catch (System.Exception exception)
            {
                Console.WriteLine(exception);
                return Redirect("https://deploy-swp-391.vercel.app/order");
            }
        }

        [HttpGet]
        public async Task<IActionResult> Success([FromQuery] int userId, [FromQuery] int orderId,[FromQuery] int paymentId, [FromQuery] string vnp_ResponseCode)
        {
            if (vnp_ResponseCode == "00")
            {
                var success = await _orderService.CreateOrderStatusAsync(orderId, "Paid", userId, paymentId);
                if (success) return Redirect("https://deploy-swp-391.vercel.app/payment/success");
            }
            var cancel = await _orderService.CreateOrderStatusAsync(orderId, "Cancelled", userId, paymentId);
            return Redirect("https://deploy-swp-391.vercel.app/order");
        }
    }
}
