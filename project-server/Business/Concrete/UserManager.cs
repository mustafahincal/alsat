using Business.Abstract;
using Business.Constants;
using Core.Entities.Concrete;
using Core.Entities.Dtos;
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
    public class UserManager : IUserService
    {
        IUserDal _userDal;
        IUserOperationClaimService _userOperationClaimService;
        IProductService _productService;
        public UserManager(IUserDal userDal, IUserOperationClaimService userOperationClaimService, IProductService productService)
        {
            _userDal = userDal;
            _userOperationClaimService = userOperationClaimService;
            _productService = productService;
        }
        public async Task<IResult> Add(User user)
        {
            _userDal.Add(user);
            await _userDal.Commit();

            UserOperationClaim userOperationClaimToAdd = new UserOperationClaim
            {
                UserId = user.UserId,
                OperationClaimId = 2,
            };
            await _userOperationClaimService.Add(userOperationClaimToAdd);

            return new SuccessResult("Kullanıcı eklendi");
        }

        public async Task<IResult> Delete(int id)
        {
            var userToDelete = await _userDal.Get(u => u.UserId == id);
            var productsToDelete = await _productService.GetAllByOwnerId(userToDelete.UserId);

            foreach (var product in productsToDelete.Data)
            {
                await _productService.Delete(product.ProductId);
            }

            _userDal.Delete(userToDelete);
            await _userDal.Commit();
            return new SuccessResult("Kullanıcı silindi");
        }

        public async Task<IDataResult<List<User>>> GetAll()
        {
            return new SuccessDataResult<List<User>>(await _userDal.GetAll());
        }

        public async Task<IDataResult<User>> GetById(int userId)
        {
            return new SuccessDataResult<User>(await _userDal.Get(u => u.UserId == userId));
        }

        public async Task<IDataResult<User>> GetByMail(string email)
        {
            return new SuccessDataResult<User>(await _userDal.Get(u => u.Email == email));
        }

        public async Task<IDataResult<List<OperationClaim>>> GetClaims(User user)
        {
            return new SuccessDataResult<List<OperationClaim>>(await _userDal.GetClaims(user));
        }

        public async Task<IDataResult<List<UserDetailDto>>> GetUserDetails()
        {
            return new SuccessDataResult<List<UserDetailDto>>(await _userDal.GetUserDetails(), "Kullanıcılar Listelendi");
        }
        public async Task<IDataResult<List<UserDetailDto>>> GetUserDetailsById(int userId)
        {
            return new SuccessDataResult<List<UserDetailDto>>(await _userDal.GetUserDetails(u => u.UserId == userId), "Kullanıcı Listelendi");
        }


        public async Task<IResult> Update(UserForUpdateDto userForUpdateDto)
        {
            var userToUpdate =await _userDal.Get(u => u.UserId == userForUpdateDto.UserId);
            userToUpdate.Status = userForUpdateDto.Status;
            userToUpdate.Email = userForUpdateDto.Email;
            userToUpdate.FirstName = userForUpdateDto.FirstName;
            userToUpdate.LastName = userForUpdateDto.LastName;
            userToUpdate.PasswordHash = userForUpdateDto.PasswordHash;
            userToUpdate.PasswordSalt = userForUpdateDto.PasswordSalt;

            _userDal.Update(userToUpdate);
            await _userDal.Commit();
            return new SuccessResult();
        }
    }
}
