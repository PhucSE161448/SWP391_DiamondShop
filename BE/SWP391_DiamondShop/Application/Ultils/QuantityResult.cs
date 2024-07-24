using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Ultils
{
    public class QuantityResult
    {
        public bool IsValid => !ErrorMessages.Any();
        public List<string> ErrorMessages { get; set; } = new List<string>();
    }
}
