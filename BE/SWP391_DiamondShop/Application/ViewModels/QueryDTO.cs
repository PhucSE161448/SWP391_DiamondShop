using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.ViewModels
{
    public record QueryDTO
    (
        int PageNumber = 1,
        int PageSize = 10,
        string SortBy = "id", 
        bool OrderByDesc = false
    );
}
