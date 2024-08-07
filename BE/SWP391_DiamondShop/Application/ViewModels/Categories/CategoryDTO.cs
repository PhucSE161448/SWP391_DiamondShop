﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.ViewModels.Groups;

namespace Application.ViewModels.Categories
{
    public class CategoryDTO
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public bool? IsDeleted { get; set; }
        public GroupDTO Group { get; set; }
    }
}
