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
        Core.Utilities.Results.IResult Add(IFormFile file, int productId);
        Core.Utilities.Results.IResult Delete(int productImageId);
        Core.Utilities.Results.IResult Update(IFormFile file, int productImageId);

        IDataResult<List<ProductImage>> GetAll();
        IDataResult<List<ProductImage>> GetByProductId(int productId);
        IDataResult<ProductImage> GetByImageId(int imageId);
    }
}
