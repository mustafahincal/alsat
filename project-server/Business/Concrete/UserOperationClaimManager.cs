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

        public IDataResult<List<UserOperationClaim>> GetAll()
        {
            return new SuccessDataResult<List<UserOperationClaim>>(_userOperationClaimDal.GetAll());
        }

        public IDataResult<UserOperationClaim> GetById(int userOperationClaimId)
        {
            return new SuccessDataResult<UserOperationClaim>(_userOperationClaimDal.Get(uc => uc.UserOperationClaimId == userOperationClaimId));
        }

        public IResult Add(UserOperationClaim userOperationClaim)
        {
            _userOperationClaimDal.Add(userOperationClaim);
            _userOperationClaimDal.Commit();
            return new SuccessResult("OperationClaim eklendi");
        }

        public IResult Delete(int userOperationClaimId)
        {
            var userOperationClaimToDelete = _userOperationClaimDal.Get(uc => uc.UserOperationClaimId == userOperationClaimId);
            _userOperationClaimDal.Delete(userOperationClaimToDelete);
            _userOperationClaimDal.Commit();
            return new SuccessResult("OperationClaim silindi");
        }

        public IResult Update(UserOperationClaim userOperationClaim)
        {
            //var colorToUpdate = _userOperationClaimDal.Get(c => c.ColorId == colorForUpdateDto.ColorId);
            //colorToUpdate.Name = colorForUpdateDto.Name;
            //_userOperationClaimDal.Update(colorToUpdate);
            //_userOperationClaimDal.Commit();
            return new SuccessResult("OperationClaim ....");
        }
    }
}
