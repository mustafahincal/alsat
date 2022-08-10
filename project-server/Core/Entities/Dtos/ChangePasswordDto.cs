using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities.Dtos
{
    public class ChangePasswordDto : IDto
    {
        public int UserId { get; set; }
        public string UserEmail { get; set; }

        public byte[] OldPass { get; set; }
        public byte[] NewPass { get; set; }
    }
}
