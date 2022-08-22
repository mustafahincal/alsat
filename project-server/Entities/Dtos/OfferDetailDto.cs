using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Dtos
{
    public class OfferDetailDto : IDto
    {
        public int OfferId { get; set; }
        public bool IsApproved { get; set; }
        public int ProductId { get; set; }
        public int UserId { get; set; }
        public int OwnerId { get; set; }
        public int Price { get; set; }
        public int OfferedPrice { get; set; }
        public bool IsSold { get; set; }
        public string ProductName { get; set; }
        public string UserName { get; set; }
        public string OwnerName { get; set; }
        public int ProductImageId { get; set; }
        public string ImagePath { get; set; }
    }
}
