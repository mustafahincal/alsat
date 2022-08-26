using Business.Abstract;
using Core.Entities.Concrete;
using Core.Utilities.Results;
using DataAccess.Abstract;
using DataAccess.Concrete.EntityFramework.UnitOfWork;
using Entities.Concrete;
using Entities.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Concrete
{
    public class UserOperationClaimManager : IUserOperationClaimService
    {
        IUserOperationClaimDal _userOperationClaimDal;
        public UserOperationClaimManager(IUserOperationClaimDal userOperationClaimDal)
        {
            _userOperationClaimDal = userOperationClaimDal;
        }

        public async Task<IDataResult<List<UserOperationClaim>>> GetAll()
        {
            return new SuccessDataResult<List<UserOperationClaim>>(await _userOperationClaimDal.GetAll());
        }

        public async Task<IDataResult<UserOperationClaim>> GetById(int userOperationClaimId)
        {
            return new SuccessDataResult<UserOperationClaim>(await _userOperationClaimDal.Get(uc => uc.UserOperationClaimId == userOperationClaimId));
        }

        public async Task<IResult> Add(UserOperationClaim userOperationClaim)
        {
            _userOperationClaimDal.Add(userOperationClaim);
            await _userOperationClaimDal.Commit();
            return new SuccessResult("OperationClaim eklendi");
        }

        public async Task<IResult> Delete(int userOperationClaimId)
        {
            var userOperationClaimToDelete = await  _userOperationClaimDal.Get(uc => uc.UserOperationClaimId == userOperationClaimId);
            _userOperationClaimDal.Delete(userOperationClaimToDelete);
            await _userOperationClaimDal.Commit();
            return new SuccessResult("OperationClaim silindi");
        }

        public async Task<IResult> Update(UserOperationClaim userOperationClaim)
        {
            //var colorToUpdate = _userOperationClaimDal.Get(c => c.ColorId == colorForUpdateDto.ColorId);
            //colorToUpdate.Name = colorForUpdateDto.Name;
            //_userOperationClaimDal.Update(colorToUpdate);
            //_userOperationClaimDal.Commit();
            
            return new SuccessResult("OperationClaim ....");
        }
    }
}
