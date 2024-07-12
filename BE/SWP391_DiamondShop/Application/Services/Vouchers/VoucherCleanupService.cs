using Application.Interfaces;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services.Vouchers
{

    public class VoucherCleanupService : BackgroundService
    {
        private readonly IServiceProvider _serviceProvider;

        public VoucherCleanupService(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                using (var scope = _serviceProvider.CreateScope())
                {
                    var unitOfWork = scope.ServiceProvider.GetRequiredService<IUnitOfWork>();
                    var vouchers = await unitOfWork.VoucherRepository.GetAllVoucherAsync();
                    var currentDate = DateTime.Now;

                    foreach (var voucher in vouchers)
                    {
                        if (voucher.EndDate <= currentDate)
                        {
                            await unitOfWork.VoucherRepository.DeleteVoucherAsync(voucher.Id);
                        }
                    }

                    // Lưu thay đổi sau khi xóa
                    await unitOfWork.SaveChangeAsync();
                }

                // Thực hiện tác vụ sau mỗi 24 giờ
                await Task.Delay(TimeSpan.FromDays(1), stoppingToken);
            }
        }
    }
}
