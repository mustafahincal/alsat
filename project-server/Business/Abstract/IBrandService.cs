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
    public interface IBrandService
    {

        Task<IDataResult<List<Brand>>> GetAll();
        Task<IDataResult<Brand>> GetById(int brandId);
        Task<IResult> Add(Brand brand);
        Task<IResult> Delete(int brandId);
        Task<IResult> Update(BrandForUpdateDto brandForUpdateDto);
    }
}
