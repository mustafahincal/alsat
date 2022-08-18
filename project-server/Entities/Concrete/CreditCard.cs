using Core.Entities;
using Core.Entities.Concrete;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Entities.Concrete
{
    public class CreditCard : IEntity
    {
        [Key]
        public int CreditCardId { get; set; }
        public int UserId { get; set; }
        public string CardHolder { get; set; }
        public string CardNumber { get; set; }
        public string ExpirationDate { get; set; }
        public string CvvCode { get; set; }
        public User? User { get; set; }

    }
}