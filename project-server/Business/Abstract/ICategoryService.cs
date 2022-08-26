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
    public interface ICategoryService
    {

        Task<IResult> Add(Category category);
        Task<IResult> Delete(int categoryId);
        Task<IResult> Update(CategoryForUpdateDto categoryForUpdateDto);
        Task<IDataResult<List<Category>>> GetAll();
        Task<IDataResult<Category>> GetById(int categoryId);
    }
}
