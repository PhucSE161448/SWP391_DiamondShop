using Application.Exceptions;
using Application.Interfaces;
using Application.Interfaces.Certificates;
using Application.ViewModels.Certificates;
using Domain.Model;
using Mapster;

namespace Application.Services.Certificates;

public class CertificateService : ICertificateService
{
    private readonly IUnitOfWork _unitOfWork;

    public CertificateService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }
    public async Task<GetCertificateIdDTO> CreateCertificate(CreateCertificateDTO createCertificateDto)
    {
        var certificate = await _unitOfWork.CertificateRepo.GetAsync(x =>
            x.ReportNumber == createCertificateDto.ReportNumber
            && x.Origin == createCertificateDto.Origin);
        if (certificate is not null)
        {
            throw new BadRequestException("Certificate is already existed");
        }

        var newCertificate = createCertificateDto.Adapt<Certificate>();
        await _unitOfWork.CertificateRepo.AddAsync(newCertificate);
        await _unitOfWork.SaveChangeAsync();
        return new GetCertificateIdDTO
        {
            Id = newCertificate.Id
        };
    }

    public async Task UpdateCertificate(int id, UpdateCertificateDTO updateCertificateDto)
    {
        var certificate = await _unitOfWork.CertificateRepo.GetAsync(x => x.Id == id, includeProperties: "Diamond");
        if (certificate is null)
        {
            throw new NotFoundException("Certificate is not existed");
        }
        var existingCertificate = await _unitOfWork.CertificateRepo.GetAsync(x =>
            x.ReportNumber == updateCertificateDto.ReportNumber
            && x.Origin == updateCertificateDto.Origin);
        if (existingCertificate is not null && existingCertificate.Id != id)
        {
            throw new BadRequestException("Another certificate with the same origin and report number already exists");
        }
        _unitOfWork.CertificateRepo.Update(updateCertificateDto.Adapt(certificate));
        if (certificate.Diamond is not null)
        {
            _unitOfWork.DiamondRepo.Update(updateCertificateDto.Adapt(certificate.Diamond));
            certificate.Diamond.Name = certificate.Diamond.Origin + " " + certificate.Diamond.CaratWeight + " " + certificate.Diamond.Color + " "
                                       + certificate.Diamond.Clarity + " "
                                       + certificate.Diamond.Cut;
        }

        await _unitOfWork.SaveChangeAsync();
    }

    public async Task<GetCertificateDTO> GetCertificateByOriginAndReportNumberForCreateDiamond(string origin, string reportNumber)
    {
        var certificate = await _unitOfWork.CertificateRepo.GetAsync(x =>
            x.ReportNumber == reportNumber
            && x.Origin == origin, includeProperties: "Diamond");
        if (certificate is null)
        {
            throw new NotFoundException("Certificate is not existed");
        }

        if (certificate.Diamond is not null)
        {
            throw new BadRequestException("This certificate is already related with another diamond");
        }

        return certificate.Adapt<GetCertificateDTO>();
    }

    public async Task<List<GetListCertificateDTO>> GetAllCertificates()
    {
        var certificates = await _unitOfWork.CertificateRepo.GetAllAsync();
        return certificates.Adapt<List<GetListCertificateDTO>>();
    }

    public async Task<GetCertificateDTO> GetCertificateById(int id)
    {
        var certificate = await _unitOfWork.CertificateRepo.GetByIdAsync(id);
        if (certificate is null)
        {
            throw new NotFoundException("Certificate is not existed");
        }
        return certificate.Adapt<GetCertificateDTO>();
    }

    public async Task<ExportCertificate> GetCertificatesByOrderIdAsync(int orderId) =>
        await _unitOfWork.CertificateRepo.GetCertificatesByOrderIdAsync(orderId);
}