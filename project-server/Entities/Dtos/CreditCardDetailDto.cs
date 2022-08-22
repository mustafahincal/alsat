using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Dtos
{
    public class CreditCardDetailDto : IDto
    {
        public int CreditCardId { get; set; }
        public int UserId { get; set; }
        public string CardHolder { get; set; }
        public string CardNumber { get; set; }
        public string ExpirationDate { get; set; }
        public string CvvCode { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public bool Status { get; set; }
    }
}
