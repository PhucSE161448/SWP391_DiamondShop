using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.Interfaces;
using Application.Interfaces.VnPay;
using Application.Ultils;
using Microsoft.Extensions.Configuration;

namespace Application.Services.VnPay
{
    public class VnPayService : IVnPayService
    {
        IConfiguration _configuration;
        private readonly IClaimsService _claimsService;

        public VnPayService(IConfiguration configuration, IClaimsService claimsService)
        {
            _configuration = configuration;
            _claimsService = claimsService;
        }
        public async Task<string> GetPaymentUrl(int orderId)
        {
            CreatePayLib pay = new CreatePayLib(); var url = _configuration.GetValue<string>("VNPay:Url");
            var returnUrl = _configuration.GetValue<string>("VNPay:ReturnUrl");
            var tmnCode = _configuration.GetValue<string>("VNPay:TmnCode");
            var hashSecret = _configuration.GetValue<string>("VNPay:HashSecret");
            //var userId = _claimsService.GetCurrentUser;

            //----------------------------SỬA Ở ĐÂY-----------------------------------
            //var cartData = await _orderService.GetOrderById(orderId);

            pay.AddRequestData("vnp_Version", "2.1.0"); //Phiên bản api mà merchant kết nối. Phiên bản hiện tại là 2.1.0
            pay.AddRequestData("vnp_Command", "pay"); //Mã API sử dụng, mã cho giao dịch thanh toán là 'pay'
            pay.AddRequestData("vnp_TmnCode", tmnCode); //Mã website của merchant trên hệ thống của VNPAY (khi đăng ký tài khoản sẽ có trong mail VNPAY gửi về)
            //----------------------------SỬA Ở ĐÂY-----------------------------------
            //pay.AddRequestData("vnp_Amount", (cartData.Data.TotalPrice * 100).ToString()); //số tiền cần thanh toán, công thức: số tiền * 100 - ví dụ 10.000 (mười nghìn đồng) --> 1000000
            pay.AddRequestData("vnp_BankCode", ""); //Mã Ngân hàng thanh toán (tham khảo: https://sandbox.vnpayment.vn/apis/danh-sach-ngan-hang/), có thể để trống, người dùng có thể chọn trên cổng thanh toán VNPAY
            pay.AddRequestData("vnp_CreateDate", DateTime.Now.ToString("yyyyMMddHHmmss")); //ngày thanh toán theo định dạng yyyyMMddHHmmss
            pay.AddRequestData("vnp_CurrCode", "VND"); //Đơn vị tiền tệ sử dụng thanh toán. Hiện tại chỉ hỗ trợ VND
            pay.AddRequestData("vnp_IpAddr", "123.21.100.96") /*HttpContext.Request.ToString())*/; //Địa chỉ IP của khách hàng thực hiện giao dịch
            pay.AddRequestData("vnp_Locale", "vn"); //Ngôn ngữ giao diện hiển thị - Tiếng Việt (vn), Tiếng Anh (en)
            pay.AddRequestData("vnp_OrderInfo", "Pay for order "); //Thông tin mô tả nội dung thanh toán
            pay.AddRequestData("vnp_OrderType", "Order Payment"); //topup: Nạp tiền điện thoại - billpayment: Thanh toán hóa đơn - fashion: Thời trang - other: Thanh toán trực tuyến
            pay.AddRequestData("vnp_ReturnUrl", returnUrl); //URL thông báo kết quả giao dịch khi Khách hàng kết thúc thanh toán
            pay.AddRequestData("vnp_TxnRef", Guid.NewGuid().ToString()); //mã hóa đơn
            string paymentUrl = pay.CreateRequestUrl(url, hashSecret);
            //CustomerPaymentDTO customerPaymentDTO = new CustomerPaymentDTO
            //{
            //    AccountId = userId,
            //    Status = "VNPay"
            //};
            //----------------------------SỬA Ở ĐÂY-----------------------------------
            return paymentUrl;
        }
    }
}
