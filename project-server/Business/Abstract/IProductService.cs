using Core.Utilities.Results;
using Entities.Concrete;
using Entities.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Abstract
{
    public interface IProductService
    {
        IDataResult<List<Product>> GetAll();
        IDataResult<List<Product>> GetAllByCategoryId(int id);
        IDataResult<List<Product>> GetByUnitPrice(decimal min, decimal max);
        IDataResult<List<ProductDetailDto>> GetProductDetails();
        IDataResult<Product> GetById(int productId);
        IDataResult<List<Product>> Add(ProductForAddDto productForAddDto);
        IResult Delete(Product product);
        IResult Update(Product product);

        IDataResult<List<ProductDetailDto>> GetProductDetailsById(int id);
        IDataResult<List<ProductDetailDto>> GetProductDetailsByBrandId(int brandId);
        IDataResult<List<ProductDetailDto>> GetProductDetailsByColorId(int colorId);
        IDataResult<List<ProductDetailDto>> GetProductDetailsByCategoryId(int categoryId);
        IDataResult<List<ProductDetailDto>> GetProductDetailsByOwnerId(int ownerId);
    }
}
