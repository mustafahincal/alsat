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
    public class EfProductDal : EfEntityRepositoryBase<Product>, IProductDal
    {
        PrimeforContext _primeforContext;
        public EfProductDal(PrimeforContext primeforContext) : base(primeforContext)
        {
            _primeforContext = primeforContext;
        }

        public async Task<List<ProductDetailDto>> GetProductDetails(Expression<Func<ProductDetailDto, bool>> filter = null)
        {
         
            var result = from p in _primeforContext.Products
                         join c in _primeforContext.Categories
                         on p.CategoryId equals c.CategoryId
                         join us in _primeforContext.UsingStates
                         on p.UsingStateId equals us.UsingStateId
                         join u in _primeforContext.Users
                         on p.OwnerId equals u.UserId
                         select new ProductDetailDto
                         {
                             ProductId = p.ProductId,
                             CategoryId = c.CategoryId,
                             ColorId = (from cl in _primeforContext.Colors where cl.ColorId == p.ColorId select cl.ColorId).FirstOrDefault(),
                             BrandId = (from b in _primeforContext.Brands where b.BrandId == p.BrandId select b.BrandId).FirstOrDefault(),
                             UsingStateId = us.UsingStateId,
                             OwnerId = (int)p.OwnerId,
                             OwnerName = u.FirstName + " " + u.LastName,
                             ProductName = p.Name,
                             CategoryName = c.Name,
                             ColorName = (from cl in _primeforContext.Colors where cl.ColorId == p.ColorId select cl.Name).FirstOrDefault(),
                             BrandName = (from b in _primeforContext.Brands where b.BrandId == p.BrandId select b.Name).FirstOrDefault(),
                             UsingStateName = us.Name,
                             Price = p.Price,
                             Description = p.Description,
                             IsOfferable = p.IsOfferable,
                             IsSold = p.IsSold,
                             ImagePath = (from pi in _primeforContext.ProductImages where pi.ProductId == p.ProductId select pi.ImagePath).FirstOrDefault(),
                             ProductImageId = (from pi in _primeforContext.ProductImages where pi.ProductId == p.ProductId select pi.ProductImageId).FirstOrDefault()
                         };
            return filter == null
            ? await result.ToListAsync()
            : await result.Where(filter).ToListAsync();
        }

    }
}
