using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Dtos
{
    public class ProductDetailDto : IDto
    {
        public int ProductId { get; set; }
        public string OwnerName { get; set; }
        public int CategoryId { get; set; }
        public int BrandId { get; set; }
        public int ColorId { get; set; }
        public int UsingStateId { get; set; }
        public int OwnerId { get; set; }
        public string ProductName { get; set; }
        public string CategoryName { get; set; }
        public string BrandName { get; set; }
        public string ColorName { get; set; }
        public string Description { get; set; }
        public string UsingStateName { get; set; }
        public int Price { get; set; }
        public bool IsOfferable { get; set; }
        public bool IsSold { get; set; }
        public int ProductImageId { get; set; } 
        public string ImagePath { get; set; }
    }
}
