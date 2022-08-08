using Core.Utilities.Results;
using Entities.Concrete;
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
        IResult Delete(UsingState usingState);
        IResult Update(UsingState usingState);
    }
}
