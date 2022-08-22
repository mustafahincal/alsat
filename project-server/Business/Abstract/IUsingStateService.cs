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
        IDataResult<List<UsingState>> GetAll();
        IDataResult<UsingState> GetById(int usingStateId);
        IResult Add(UsingState usingState);
        IResult Delete(int usingStateId);
        IResult Update(UsingStateForUpdateDto usingStateForUpdateDto);
    }
}
