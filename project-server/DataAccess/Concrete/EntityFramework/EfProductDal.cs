using Core.DataAccess.EntityFramework;
using DataAccess.Abstract;
using DataAccess.Concrete.EntityFramework.Context;
using Entities.Concrete;
using Entities.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Concrete.EntityFramework
{
    public class EfProductDal : EfEntityRepositoryBase<Product, PrimeforContext> , IProductDal
    {
        public List<ProductDetailDto> GetProductDetails()
        {
            using (PrimeforContext context = new PrimeforContext())
            {
                var result = from p in context.Products
                             join c in context.Categories
                             on p.CategoryId equals c.CategoryId
                             select new ProductDetailDto
                             {
                                 ProductId = p.ProductId,
                                 ProductName = p.Name,
                                 CategoryName = c.Name,
                                 Price = p.Price
                             };
                return result.ToList();
            }
        }
    }
}
