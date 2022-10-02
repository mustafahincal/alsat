using DataAccess.Repository.EntityFramework;
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
using Microsoft.EntityFrameworkCore;

namespace DataAccess.Concrete.EntityFramework
{
    public class EfOfferDal : EfEntityRepositoryBase<Offer>, IOfferDal
    {
        PrimeforContext _primeforContext;
        public EfOfferDal(PrimeforContext primeforContext) : base(primeforContext)
        {
            _primeforContext = primeforContext;
        }

        public async Task<List<OfferDetailDto>> GetOfferDetails(Expression<Func<OfferDetailDto, bool>> filter = null)
        {
           
                var result = from o in _primeforContext.Offers
                             join p in _primeforContext.Products
                             on o.ProductId equals p.ProductId
                             join u in _primeforContext.Users
                             on p.OwnerId equals u.UserId
                             join u2 in _primeforContext.Users
                             on o.UserId equals u2.UserId
                             select new OfferDetailDto
                             {
                                 OfferId = o.OfferId,
                                 ProductId = p.ProductId,
                                 OwnerId = (int)p.OwnerId,
                                 UserId = (int)o.UserId,
                                 IsApproved = o.IsApproved,
                                 Price = p.Price,
                                 OfferedPrice = o.OfferedPrice,
                                 IsSold = p.IsSold,
                                 ProductName = p.Name,
                                 OwnerName = u.FirstName + " " + u.LastName,
                                 UserName = u2.FirstName + " " + u2.LastName,
                                 ProductImageId = (from pi in _primeforContext.ProductImages where pi.ProductId == p.ProductId select pi.ProductImageId).FirstOrDefault(),
                                 ImagePath = (from pi in _primeforContext.ProductImages where pi.ProductId == p.ProductId select pi.ImagePath).FirstOrDefault(),
                             };
                return filter == null
                ? await result.ToListAsync()
                : await result.Where(filter).ToListAsync();
            
        }
    }
}