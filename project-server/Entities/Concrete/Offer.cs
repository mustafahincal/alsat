using Core.Entities;
using Core.Entities.Concrete;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Concrete
{
    public class Offer : IEntity
    {
        [Key]
        public int OfferId { get; set; }
        public int ProductId { get; set; }
        public int UserId { get; set; }
        public int OfferedPrice { get; set; }
        public bool IsApproved { get; set; }
        public Product? Product { get; set; }
        public User? User { get; set; }
    }
}
