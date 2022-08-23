using Core.Entities.Concrete;
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
    public interface IUserOperationClaimService
    {
        IDataResult<List<UserOperationClaim>> GetAll();
        IDataResult<UserOperationClaim> GetById(int userOperationClaimId);
        IResult Add(UserOperationClaim userOperationClaim);
        IResult Delete(int userOperationClaimId);
        IResult Update(UserOperationClaim userOperationClaim);
    }
}
