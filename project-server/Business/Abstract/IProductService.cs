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
        Task<IDataResult<List<Product>>> GetAll();
        Task<IDataResult<List<Product>>> GetAllByCategoryId(int id);
        Task<IDataResult<List<Product>>> GetByUnitPrice(decimal min, decimal max);
        Task<IDataResult<List<ProductDetailDto>>> GetProductDetails();
        Task<IDataResult<Product>> GetById(int productId);
        Task<IDataResult<List<Product>>> Add(ProductForAddDto productForAddDto);
        Task<IResult> Delete(int productId);
        Task<IResult> Update(ProductForUpdateDto productForUpdateDto);

        Task<IDataResult<List<ProductDetailDto>>> GetProductDetailsById(int id);
        Task<IDataResult<List<ProductDetailDto>>> GetProductDetailsByBrandId(int brandId);
        Task<IDataResult<List<ProductDetailDto>>> GetProductDetailsByColorId(int colorId);
        Task<IDataResult<List<ProductDetailDto>>> GetProductDetailsByUsingStateId(int usingStateId);
        Task<IDataResult<List<ProductDetailDto>>> GetProductDetailsByCategoryId(int categoryId);
        Task<IDataResult<List<ProductDetailDto>>> GetProductDetailsByOwnerId(int ownerId);
        Task<IDataResult<List<Product>>> GetAllByOwnerId(int ownerId);
    }
}
