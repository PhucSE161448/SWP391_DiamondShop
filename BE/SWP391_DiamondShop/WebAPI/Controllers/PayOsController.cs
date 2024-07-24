using Application.Interfaces.Orders;
using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Net.payOS;
using Net.payOS.Types;

namespace WebAPI.Controllers
{
    public class PayOsController : BaseController
    {
        private readonly PayOS _payOs;
        private readonly IOrderService _service;
        private const decimal USD = 25000m;
        public PayOsController(PayOS payOs, IOrderService service)
        {
            _payOs = payOs;
           _service = service;
        }

        [HttpPost]
        public async Task<IActionResult> Checkout([FromQuery] int userId, [FromQuery] int orderId, [FromQuery] int paymentId)
        {
            try
            {
                int orderCode = int.Parse(DateTimeOffset.Now.ToString("ffffff"));
                var total = 0.0;
                List<ItemData> items = new List<ItemData>();
                var order = await _service.GetOrderDetailAsync(orderId);
                var orders = await _service.GetOrderById(orderId);
                foreach (var o in order)
                {
                    ItemData item = new ItemData(o.Cart.Product != null ? o.Cart.Product.Name : o.Cart.Diamond.Name, (int)o.Cart.Quantity,(int) (o.Cart.TotalPrice * USD));
                    items.Add(item);
                }
                var baseUrl = "https://diamond-shopp.azurewebsites.net/api/" + "PayOs/Success";

                var url = $"{baseUrl}?userId={userId}&orderId={orderId}&paymentId={paymentId}";
                PaymentData paymentData = new PaymentData(orderCode, (int)(orders.TotalPrice * USD), "Pay Order", items,
                    url, url);
                CreatePaymentResult createPayment = await _payOs.createPaymentLink(paymentData);

                return Ok(new
                {
                    message = "redirect",
                    url = createPayment.checkoutUrl
                });
            }
            catch (System.Exception exception)
            {
                Console.WriteLine(exception);
                return Redirect("https://deploy-swp-391.vercel.app/order");
            }
        }

        [HttpGet]
        public async Task<IActionResult> Success([FromQuery] int userId, [FromQuery] int orderId, [FromQuery] int paymentId, [FromQuery] string status)
        {
            if (status == "CANCELLED")
            {
                var cancel = await _service.CreateOrderStatusAsync(orderId, "Cancelled", userId, paymentId);
                return Redirect("https://deploy-swp-391.vercel.app/order");
            }
            var success = await _service.CreateOrderStatusAsync(orderId, "Paid", userId, paymentId);
            if (success)
            {
                return Redirect("https://deploy-swp-391.vercel.app/payment/success");
            }
            return Redirect("https://deploy-swp-391.vercel.app/order");
        }
    }
}
