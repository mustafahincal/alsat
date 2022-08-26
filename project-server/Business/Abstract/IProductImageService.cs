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
        Task<Core.Utilities.Results.IResult> Add(IFormFile file, int productId);
        Task<Core.Utilities.Results.IResult> Delete(int productImageId);
        Task<Core.Utilities.Results.IResult> Update(IFormFile file, int productImageId);
        Task<IDataResult<List<ProductImage>>> GetAll();
        Task<IDataResult<List<ProductImage>>> GetByProductId(int productId);
        Task<IDataResult<ProductImage>> GetByImageId(int imageId);
    }
}
