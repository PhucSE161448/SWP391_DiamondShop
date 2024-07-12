using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.ViewModels.Certificates
{
    public class ExportCertificate
    {
        public List<GetCertificateDTO> Certificates { get; set; } = new List<GetCertificateDTO>();
    }
}
