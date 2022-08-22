using Core.Entities;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Dtos
{
    public class OfferForUpdateDto : IDto
    {
        public int OfferId { get; set; }
        public int ProductId { get; set; }
        public int UserId { get; set; }
        public int OfferedPrice { get; set; }
        public bool IsApproved { get; set; }
    }
}


