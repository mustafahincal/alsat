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
    public interface IUsingStateService
    {
        Task<IDataResult<List<UsingState>>> GetAll();
        Task<IDataResult<UsingState>> GetById(int usingStateId);
        Task<IResult> Add(UsingState usingState);
        Task<IResult> Delete(int usingStateId);
        Task<IResult> Update(UsingStateForUpdateDto usingStateForUpdateDto);
    }
}
