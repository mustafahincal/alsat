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
    public class EfProductDal : EfEntityRepositoryBase<Product, PrimeforContext> , IProductDal
    {
        public List<ProductDetailDto> GetProductDetails(Expression<Func<ProductDetailDto, bool>> filter = null)
        {
            using (PrimeforContext context = new PrimeforContext())
            {
                var result = from p in context.Products
                             join c in context.Categories
                             on p.CategoryId equals c.CategoryId
                             join b in context.Brands
                             on p.BrandId equals b.BrandId
                             join cl in context.Colors
                             on p.ColorId equals cl.ColorId
                             select new ProductDetailDto
                             {
                                 ProductId = p.ProductId,
                                 CategoryId = c.CategoryId,
                                 ColorId = cl.ColorId,
                                 BrandId = b.BrandId,
                                 ProductName = p.Name,
                                 CategoryName = c.Name,
                                 ColorName = cl.Name,
                                 BrandName = b.Name,
                                 Price = p.Price,
                                 IsOfferable = p.IsOfferable,
                                 IsSold = p.IsSold,
                                 ImagePath = (from pi in context.ProductImages where pi.ProductId == p.ProductId select pi.ImagePath).FirstOrDefault()
                             };
                return filter == null
                ? result.ToList()
                : result.Where(filter).ToList();

            }
        }
    }
}
