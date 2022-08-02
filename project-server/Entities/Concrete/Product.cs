using Core.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Concrete
{
    public class Product : IEntity
    {
        [Key]
        public int ProductId { get; set; }
        public int CategoryId { get; set; }
        public int ColorId { get; set; }
        public int BrandId { get; set; }
        public string Name { get; set; }
        public int Price { get; set; }
        public bool IsOfferable { get; set; }
        public bool IsSold { get; set; }

        public Category Category { get; set; }
        public Brand Brand { get; set; }
        public Color Color { get; set; }


    }
}
