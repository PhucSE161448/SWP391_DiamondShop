using Application.ViewModels.Certificates;

namespace Application.Interfaces.Certificates;

public interface ICertificateService
{
    Task<GetCertificateIdDTO> CreateCertificate(CreateCertificateDTO createCertificateDto);
    Task UpdateCertificate(int id, UpdateCertificateDTO updateCertificateDto);
    Task<GetCertificateDTO> GetCertificateByOriginAndReportNumberForCreateDiamond(string origin, string reportNumber);
    Task<List<GetListCertificateDTO>> GetAllCertificates();
    Task<GetCertificateDTO> GetCertificateById(int id);
}