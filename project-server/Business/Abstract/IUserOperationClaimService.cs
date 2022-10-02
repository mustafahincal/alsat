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
        Task<IDataResult<List<UserOperationClaim>>> GetAll();
        Task<IDataResult<UserOperationClaim>> GetById(int userOperationClaimId);
        Task<IResult> Add(UserOperationClaim userOperationClaim);
        Task<IResult> Delete(int userOperationClaimId);
        Task<IResult> Update(UserOperationClaim userOperationClaim);
    }
}
