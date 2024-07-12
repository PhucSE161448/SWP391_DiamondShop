using Application.ViewModels.Certificates;
using Domain.Model;

namespace Application.IRepositories.Certificates;

public interface ICertificateRepo : IGenericRepository<Certificate>
{
    Task<ExportCertificate> GetCertificatesByOrderIdAsync(int orderId);
}