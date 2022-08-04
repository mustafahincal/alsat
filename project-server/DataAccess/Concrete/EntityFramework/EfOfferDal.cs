using Core.DataAccess.EntityFramework;
using DataAccess.Abstract;
using DataAccess.Concrete.EntityFramework.Context;
using Entities.Concrete;
using Entities.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Concrete.EntityFramework
{
    public class EfOfferDal : EfEntityRepositoryBase<Offer, PrimeforContext>, IOfferDal
    {
        public List<OfferDetailDto> GetOfferDetails(Expression<Func<OfferDetailDto, bool>> filter = null)
        {
            using (PrimeforContext context = new PrimeforContext())
            {
                var result = from o in context.Offers
                             join p in context.Products
                             on o.ProductId equals p.ProductId
                             join u in context.Users
                             on p.OwnerId equals u.UserId
                             join u2 in context.Users
                             on o.UserId equals u2.UserId
                             select new OfferDetailDto
                             {
                                 OfferId = o.OfferId,
                                 ProductId = p.ProductId,
                                 OwnerId = p.OwnerId,
                                 IsApproved = o.IsApproved,
                                 OfferedPrice = o.OfferedPrice,
                                 ProductName = p.Name,
                                 OwnerName = u.FirstName + " " + u.LastName,
                                 UserName = u2.FirstName + " " + u2.LastName,
                             };
                return filter == null
                ? result.ToList()
                : result.Where(filter).ToList();
            }
        }
    }
}