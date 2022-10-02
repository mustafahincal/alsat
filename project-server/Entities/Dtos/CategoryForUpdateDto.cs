using Core.Entities;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Dtos
{
    public class CategoryForUpdateDto : IDto
    {
        public int CategoryId { get; set; }
        public string Name { get; set; }

    }
}


