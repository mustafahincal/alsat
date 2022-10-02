using DataAccess.Repository.EntityFramework;
using DataAccess.Abstract;
using DataAccess.Concrete.EntityFramework.Context;
using Entities.Concrete;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using Entities.Dtos;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.Concrete.EntityFramework
{
    public class EfCreditCard : EfEntityRepositoryBase<CreditCard>, ICreditCardDal
    {
        PrimeforContext _primeforContext;
        public EfCreditCard(PrimeforContext primeforContext) : base(primeforContext)
        {
            _primeforContext = primeforContext;
        }

        public async Task< List<CreditCardDetailDto>> GetCreditCardDetails(Expression<Func<CreditCardDetailDto, bool>> filter = null)
        {

            var result = from cc in _primeforContext.CreditCards
                         join u in _primeforContext.Users
                         on cc.UserId equals u.UserId
                         select new CreditCardDetailDto
                         {
                             UserId = cc.UserId,
                             FirstName = u.FirstName,
                             LastName = u.LastName,
                             Status = u.Status,
                             CardHolder = cc.CardHolder,
                             CardNumber = cc.CardNumber,
                             ExpirationDate = cc.ExpirationDate,
                             CvvCode = cc.CvvCode,
                             Email = u.Email,
                             CreditCardId = cc.CreditCardId
                         };
            return filter == null
            ? await result.ToListAsync()
            : await result.Where(filter).ToListAsync();

        }
    }
}
