using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.Interfaces;
using Application.Interfaces.Orders;
using Application.Interfaces.VnPay;
using Application.Ultils;
using Domain.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace Application.Services.VnPay
{
    public class VnPayService : IVnPayService
    {
        private readonly IConfiguration _configuration;
        private readonly IClaimsService _claimsService;
        private readonly IOrderService _orderService;
        private const decimal USD = 25000m;
        public VnPayService(IConfiguration configuration, IClaimsService claimsService, IOrderService orderService)
        {
            _configuration = configuration;
            _claimsService = claimsService;
            _orderService = orderService;
        }
        public async Task<string> GetPaymentUrl(int orderId, int userId, int paymentId)
        {
            CreatePayLib pay = new CreatePayLib(); var url = _configuration.GetValue<string>("VNPay:Url");
            var returnUrl = _configuration.GetValue<string>("VNPay:ReturnUrl");
            var tmnCode = _configuration.GetValue<string>("VNPay:TmnCode");
            var hashSecret = _configuration.GetValue<string>("VNPay:HashSecret");
            //var userId = _claimsService.GetCurrentUser;

            var order = await _orderService.GetOrderById(orderId);

            pay.AddRequestData("vnp_Version", "2.1.0"); //Phiên bản api mà merchant kết nối. Phiên bản hiện tại là 2.1.0
            pay.AddRequestData("vnp_Command", "pay"); //Mã API sử dụng, mã cho giao dịch thanh toán là 'pay'
            pay.AddRequestData("vnp_TmnCode", tmnCode); //Mã website của merchant trên hệ thống của VNPAY (khi đăng ký tài khoản sẽ có trong mail VNPAY gửi về)
            pay.AddRequestData("vnp_Amount", (order.TotalPrice * USD * 100).ToString()); //số tiền cần thanh toán, công thức: số tiền * 100 - ví dụ 10.000 (mười nghìn đồng) --> 1000000
            pay.AddRequestData("vnp_BankCode", ""); //Mã Ngân hàng thanh toán (tham khảo: https://sandbox.vnpayment.vn/apis/danh-sach-ngan-hang/), có thể để trống, người dùng có thể chọn trên cổng thanh toán VNPAY
            pay.AddRequestData("vnp_CreateDate", DateTime.Now.ToString("yyyyMMddHHmmss")); //ngày thanh toán theo định dạng yyyyMMddHHmmss
            pay.AddRequestData("vnp_CurrCode", "VND"); //Đơn vị tiền tệ sử dụng thanh toán. Hiện tại chỉ hỗ trợ VND
            pay.AddRequestData("vnp_IpAddr", "123.21.100.96") /*HttpContext.Request.ToString())*/; //Địa chỉ IP của khách hàng thực hiện giao dịch
            pay.AddRequestData("vnp_Locale", "vn"); //Ngôn ngữ giao diện hiển thị - Tiếng Việt (vn), Tiếng Anh (en)
            pay.AddRequestData("vnp_OrderInfo", "Pay order of DiamondShop"); //Thông tin mô tả nội dung thanh toán
            pay.AddRequestData("vnp_OrderType", "Bill Payment"); //topup: Nạp tiền điện thoại - billpayment: Thanh toán hóa đơn - fashion: Thời trang - other: Thanh toán trực tuyến
            pay.AddRequestData("vnp_ReturnUrl", $"{returnUrl}?userId={userId}&orderId={orderId}&paymentId={paymentId}"); //URL thông báo kết quả giao dịch khi Khách hàng kết thúc thanh toán
            pay.AddRequestData("vnp_TxnRef", Guid.NewGuid().ToString()); //mã hóa đơn
            string paymentUrl = pay.CreateRequestUrl(url, hashSecret);
            return paymentUrl;
        }
        public async Task<bool> Success(int userId , int orderId, int paymentId, string responseCode)
        {
            if (responseCode == "00")
            {
                var success = await _orderService.CreateOrderStatusAsync(orderId, "Paid", userId, paymentId);
                if (success) return true;
            }
            var cancel = await _orderService.CreateOrderStatusAsync(orderId, "Cancelled", userId, paymentId);
            if (cancel) return true;
            return false;
        }
    }
}
