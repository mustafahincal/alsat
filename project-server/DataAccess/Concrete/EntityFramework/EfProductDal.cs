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
                             join us in context.UsingStates
                             on p.UsingStateId equals us.UsingStateId
                             select new ProductDetailDto
                             {
                                 ProductId = p.ProductId,
                                 CategoryId = c.CategoryId,
                                 ColorId = (from cl in context.Colors where cl.ColorId == p.ColorId select cl.ColorId).FirstOrDefault(),
                                 BrandId = (from b in context.Brands where b.BrandId == p.BrandId select b.BrandId).FirstOrDefault(),
                                 UsingStateId = us.UsingStateId,
                                 OwnerId = (int)p.OwnerId,
                                 ProductName = p.Name,
                                 CategoryName = c.Name,
                                 ColorName = (from cl in context.Colors where cl.ColorId == p.ColorId select cl.Name).FirstOrDefault(),
                                 BrandName = (from b in context.Brands where b.BrandId == p.BrandId select b.Name).FirstOrDefault(),
                                 UsingStateName = us.Name,
                                 Price = p.Price,
                                 Description = p.Description,
                                 IsOfferable = p.IsOfferable,
                                 IsSold = p.IsSold,
                                 ImagePath = (from pi in context.ProductImages where pi.ProductId == p.ProductId select pi.ImagePath).FirstOrDefault(),
                                 ProductImageId = (from pi in context.ProductImages where pi.ProductId == p.ProductId select pi.ProductImageId).FirstOrDefault()
                             };
                return filter == null
                ? result.ToList()
                : result.Where(filter).ToList();

            }
        }
    }
}
/*
 O şeyden kaynaklanıyo sen arayüzden onu gönder dediğinde boolean veri türünün default değeri false olduğu için backend'e false gidiyor o yüzden true gelmez
 O default true kuralını veritabanına koymak da doğru değil pek, yani, tmama öyle deiyeyim de 1 sn
 */