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
    public interface IColorService
    {
        Task<IDataResult<List<Color>>> GetAll();
        Task<IDataResult<Color>> GetById(int colorId);
        Task<IResult> Add(Color color);
        Task<IResult> Delete(int colorId);
        Task<IResult> Update(ColorForUpdateDto colorForUpdateDto);
    }
}
