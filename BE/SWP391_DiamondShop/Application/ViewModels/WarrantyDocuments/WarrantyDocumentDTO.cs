﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.ViewModels.WarrantyDocuments
{
    public class WarrantyDocumentDTO
    {
        public int Id { get; set; }
        public int Period { get; set; }
        public string TermsAndConditions { get; set; }
    }   
}
