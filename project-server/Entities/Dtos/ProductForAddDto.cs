using Core.Entities;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Dtos
{
    public class ProductForAddDto : IDto
    {
        public int CategoryId { get; set; }
        public int? BrandId { get; set; }
        public int? ColorId { get; set; }
        public int UsingStateId { get; set; }
        public string Name { get; set; }
        public int Price { get; set; }
        public string Description { get; set; }
        public bool IsOfferable { get; set; }
        public bool IsSold { get; set; }
        public int OwnerId { get; set; }
        public IFormFile file { get; set; }

    }
}
