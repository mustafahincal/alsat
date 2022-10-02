using Core.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Concrete
{
    public class UsingState : IEntity
    {
        [Key]
        public int UsingStateId { get; set; }
        public string Name { get; set; }
    }
}
