using Core.Utilities.Results;
using Entities.Concrete;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Abstract
{
    public interface IProductImageService
    {
        IResult Add(IFormFile file, ProductImage productImage, int productId);
        IResult Delete(ProductImage productImage);
        IResult Update(IFormFile file, ProductImage productImage, int productId, int productImageId);

        IDataResult<List<ProductImage>> GetAll();
        IDataResult<List<ProductImage>> GetByProductId(int productId);
        IDataResult<ProductImage> GetByImageId(int imageId);
    }
}
