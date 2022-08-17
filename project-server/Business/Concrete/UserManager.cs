using Business.Abstract;
using Business.Constants;
using Core.Entities.Concrete;
using Core.Entities.Dtos;
using Core.Utilities.Results;
using DataAccess.Abstract;
using DataAccess.Concrete.EntityFramework.UnitOfWork;
using Entities.Concrete;
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
        IUnitOfWork _unitOfWork;
        public UserManager(IUserDal userDal, IUnitOfWork unitOfWork)
        {
            _userDal = userDal;
            _unitOfWork = unitOfWork;
        }
        public IResult Add(User user)
        {
            _userDal.Add(user);
            _unitOfWork.SaveChanges();
            return new SuccessResult("Kullanıcı eklendi");
        }

        public IResult Delete(int id)
        {
            var userToDelete = _userDal.Get(p => p.UserId == id);
            _userDal.Delete(userToDelete);
            _unitOfWork.SaveChanges();
            return new SuccessResult("Kullanıcı silindi");
        }

        public IDataResult<List<User>> GetAll()
        {
            return new SuccessDataResult<List<User>>(_userDal.GetAll());
        }

        public IDataResult<User> GetById(int userId)
        {
            return new SuccessDataResult<User>(_userDal.Get(u => u.UserId == userId));
        }

        public IDataResult<User> GetByMail(string email)
        {
            return new SuccessDataResult<User>(_userDal.Get(u => u.Email == email));
        }

        public IDataResult<List<OperationClaim>> GetClaims(User user)
        {
            return new SuccessDataResult<List<OperationClaim>>(_userDal.GetClaims(user));
        }

        public IDataResult<List<UserDetailDto>> GetUserDetails()
        {
            return new SuccessDataResult<List<UserDetailDto>>(_userDal.GetUserDetails(), "Kullanıcılar Listelendi");
        }
        public IDataResult<List<UserDetailDto>> GetUserDetailsById(int userId)
        {
            return new SuccessDataResult<List<UserDetailDto>>(_userDal.GetUserDetails(u => u.UserId == userId), "Kullanıcı Listelendi");
        }


        public IResult Update(User user)
        {
            _userDal.Update(user);
            _unitOfWork.SaveChanges();
            return new SuccessResult();
        }
    }
}
